"use server";

import { revalidatePath } from "next/cache";

import { type ActionResult, fail, fromZodError, ok } from "@/lib/action-result";
import { prisma } from "@/lib/prisma";
import { recordAuditEvent } from "@/server/services/audit";
import { DocumentNotFoundError, getOwnedDocumentOrThrow } from "@/server/services/documents/get-owned-document";
import { markComplianceStale } from "@/server/services/documents/mark-compliance-stale";
import { getSession } from "@/server/services/session";

import { getStepIndex } from "./navigation";
import { hasWrittenContent } from "./queries";
import { getApplicableSections } from "./rules/applicability";
import {
  basicInfoDraftSchema,
  basicInfoSchema,
  categoryRiskDraftSchema,
  categoryRiskSchema,
  normalisePhone,
  saveBasicInfoSchema,
  saveCategoryRiskSchema,
} from "./schema";
import type { DeviceProfile, SectionKey } from "./types";

/** Steps 1 save: `draft` / `autosave` check formats only (FR-S1-02/05); `continue` runs full validation (FR-S1-03). */
export const saveBasicInfoAction = async (input: unknown): Promise<ActionResult<{ savedAt: string }>> => {
  const session = await getSession();
  if (!session) return fail("UNAUTHENTICATED", "Please sign in again.");

  const envelope = saveBasicInfoSchema.safeParse(input);
  if (!envelope.success) return fromZodError(envelope.error);
  const { documentId, mode } = envelope.data;

  const parsed = (mode === "continue" ? basicInfoSchema : basicInfoDraftSchema).safeParse(envelope.data.values);
  if (!parsed.success) return fromZodError(parsed.error);
  const v = parsed.data;
  const isImporter = v.manufacturerType === "IMPORTER";

  try {
    const doc = await getOwnedDocumentOrThrow(documentId, session.user.id, { id: true, lastStep: true });
    const advance = mode === "continue" && getStepIndex(doc.lastStep) < getStepIndex("CATEGORY_RISK");

    await prisma.$transaction(async (tx) => {
      // Ownership and soft-delete are re-checked in the write itself, closing the check-then-write race.
      const { count } = await tx.ifuDocument.updateMany({
        where: { id: doc.id, ownerId: session.user.id, deletedAt: null },
        data: {
          deviceName: v.deviceName,
          brandName: v.brandName,
          modelNumber: v.modelNumber,
          description: v.description,
          manufacturerType: v.manufacturerType,
          manufacturerName: v.manufacturerName,
          manufacturerAddress: v.manufacturerAddress,
          manufacturerState: isImporter ? "" : v.manufacturerState,
          manufacturerPin: isImporter ? "" : v.manufacturerPin,
          manufacturerCountry: isImporter ? v.manufacturerCountry : "India",
          // FR-S1-06 is enforced here too, not only in the form (MD-15 for importers).
          licenceType: isImporter ? "IMPORT" : v.licenceType === "IMPORT" ? "MANUFACTURING" : v.licenceType,
          licenceNumber: v.licenceNumber,
          importerName: isImporter ? v.importerName : "",
          importerAddress: isImporter ? v.importerAddress : "",
          importerState: isImporter ? v.importerState : "",
          importerPin: isImporter ? v.importerPin : "",
          customerCarePhone: v.customerCarePhone ? normalisePhone(v.customerCarePhone) : "",
          customerCareEmail: v.customerCareEmail,
          version: v.version || "v1.0",
          issueDate: v.issueDate,
          ...(advance ? { lastStep: "CATEGORY_RISK" as const } : {}),
        },
      });
      if (count === 0) throw new DocumentNotFoundError();
      await markComplianceStale(doc.id, tx);
      // Autosave fires every few seconds while typing; auditing it would drown real events.
      if (mode !== "autosave") {
        await recordAuditEvent(
          { userId: session.user.id, action: "UPDATED", documentId: doc.id, meta: { step: "BASIC_INFO", mode } },
          tx,
        );
      }
    });
  } catch (error) {
    if (error instanceof DocumentNotFoundError) return fail("NOT_FOUND", "Document not found.");
    console.error("saveBasicInfoAction failed", { userId: session.user.id, documentId, error });
    return fail("INTERNAL", "Couldn't save your changes. Please try again.");
  }

  if (mode !== "autosave") revalidatePath("/dashboard");
  return ok({ savedAt: new Date().toISOString() });
};

export interface SaveCategoryRiskData {
  savedAt: string;
  /** WF-02: sections that no longer apply but still hold content (kept, not deleted). */
  hiddenSections: SectionKey[];
}

/** Step 2 save: `draft` keeps partial answers; `continue` needs every required answer (FR-S2-08). */
export const saveCategoryRiskAction = async (input: unknown): Promise<ActionResult<SaveCategoryRiskData>> => {
  const session = await getSession();
  if (!session) return fail("UNAUTHENTICATED", "Please sign in again.");

  const envelope = saveCategoryRiskSchema.safeParse(input);
  if (!envelope.success) return fromZodError(envelope.error);
  const { documentId, mode } = envelope.data;

  const parsed = (mode === "continue" ? categoryRiskSchema : categoryRiskDraftSchema).safeParse(envelope.data.values);
  if (!parsed.success) return fromZodError(parsed.error);
  const v = parsed.data;
  const isSamd = v.category === "SAMD";

  // FR-S2-03: SaMD only asks the lay-user question, so the other conditionals are cleared server-side too.
  const profile: DeviceProfile = {
    ...v,
    isActive: isSamd ? null : v.isActive,
    hasMeasuringFn: isSamd ? null : v.hasMeasuringFn,
  };

  try {
    const doc = await getOwnedDocumentOrThrow(documentId, session.user.id, { id: true, lastStep: true });
    const advance = mode === "continue" && getStepIndex(doc.lastStep) < getStepIndex("SECTIONS");
    let hiddenSections: SectionKey[] = [];

    await prisma.$transaction(async (tx) => {
      const { count } = await tx.ifuDocument.updateMany({
        where: { id: doc.id, ownerId: session.user.id, deletedAt: null },
        data: { ...profile, ...(advance ? { lastStep: "SECTIONS" as const } : {}) },
      });
      if (count === 0) throw new DocumentNotFoundError();

      // WF-02: nothing is deleted; content in now-inapplicable sections is only hidden and reported.
      const applicable = new Set(getApplicableSections(profile));
      const written = await tx.ifuSection.findMany({
        where: { documentId: doc.id },
        select: { key: true, fields: true, isComplete: true },
      });
      hiddenSections = written
        .filter((row) => !applicable.has(row.key) && (row.isComplete || hasWrittenContent(row.fields)))
        .map((row) => row.key);

      await markComplianceStale(doc.id, tx);
      await recordAuditEvent(
        { userId: session.user.id, action: "UPDATED", documentId: doc.id, meta: { step: "CATEGORY_RISK", mode } },
        tx,
      );
    });

    revalidatePath("/dashboard");
    return ok({ savedAt: new Date().toISOString(), hiddenSections });
  } catch (error) {
    if (error instanceof DocumentNotFoundError) return fail("NOT_FOUND", "Document not found.");
    console.error("saveCategoryRiskAction failed", { userId: session.user.id, documentId, error });
    return fail("INTERNAL", "Couldn't save your changes. Please try again.");
  }
};
