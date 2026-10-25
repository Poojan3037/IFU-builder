"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { type ActionResult, fail, fromZodError, ok } from "@/lib/action-result";
import { prisma } from "@/lib/prisma";
import { recordAuditEvent } from "@/server/services/audit";
import { DocumentNotFoundError, getOwnedDocumentOrThrow } from "@/server/services/documents/get-owned-document";
import { getSession } from "@/server/services/session";

import { deleteDocumentSchema } from "./schema";

/** FR-DASH-01: create an empty DRAFT and open Step 1. */
export const createDocumentAction = async (): Promise<ActionResult> => {
  const session = await getSession();
  if (!session) return fail("UNAUTHENTICATED", "Please sign in again.");

  let id: string;
  try {
    id = await prisma.$transaction(async (tx) => {
      const doc = await tx.ifuDocument.create({ data: { ownerId: session.user.id }, select: { id: true } });
      await recordAuditEvent({ userId: session.user.id, action: "CREATED", documentId: doc.id }, tx);
      return doc.id;
    });
  } catch {
    return fail("INTERNAL", "Couldn't create the document. Please try again.");
  }
  redirect(`/ifu/${id}/basic-info`);
};

/** FR-DASH-07: soft delete (`deletedAt`), restorable by support for 30 days. */
export const deleteDocumentAction = async (input: unknown): Promise<ActionResult> => {
  const session = await getSession();
  if (!session) return fail("UNAUTHENTICATED", "Please sign in again.");

  const parsed = deleteDocumentSchema.safeParse(input);
  if (!parsed.success) return fromZodError(parsed.error);

  try {
    const doc = await getOwnedDocumentOrThrow(parsed.data.id, session.user.id, { id: true, deviceName: true });
    await prisma.$transaction(async (tx) => {
      await tx.ifuDocument.update({ where: { id: doc.id }, data: { deletedAt: new Date() } });
      await recordAuditEvent(
        { userId: session.user.id, action: "DELETED", documentId: doc.id, meta: { deviceName: doc.deviceName } },
        tx,
      );
    });
  } catch (error) {
    if (error instanceof DocumentNotFoundError) return fail("NOT_FOUND", "Document not found.");
    return fail("INTERNAL", "Couldn't delete the document. Please try again.");
  }

  revalidatePath("/dashboard");
  return ok(null);
};
