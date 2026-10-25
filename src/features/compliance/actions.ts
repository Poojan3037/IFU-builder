"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";

import type { DocumentStatus } from "@/features/ifu-wizard/types";
import { type ActionResult, fail, fromZodError, ok } from "@/lib/action-result";
import { prisma } from "@/lib/prisma";
import { recordAuditEvent } from "@/server/services/audit";
import { runCompliance } from "@/server/services/compliance/engine";
import { loadComplianceSnapshot } from "@/server/services/compliance/snapshot";
import { DocumentNotFoundError } from "@/server/services/documents/get-owned-document";
import { getSession } from "@/server/services/session";

import { runCheckSchema } from "./schema";
import type { ComplianceIssue, LooksGoodItem } from "./types";

export interface RunCheckData {
  runId: string;
  status: DocumentStatus;
  blockingCount: number;
  advisoryCount: number;
  issues: ComplianceIssue[];
  looksGood: LooksGoodItem[];
}

/** FR-CMP-01: runs the rule engine server-side, stores the run and its issues, and sets READY when nothing blocks. */
export const runCheckAction = async (input: unknown): Promise<ActionResult<RunCheckData>> => {
  const session = await getSession();
  if (!session) return fail("UNAUTHENTICATED", "Please sign in again.");

  const parsed = runCheckSchema.safeParse(input);
  if (!parsed.success) return fromZodError(parsed.error);

  try {
    const { documentId, status, snapshot } = await loadComplianceSnapshot(parsed.data.documentId, session.user.id);
    if (snapshot.profile.category === null || snapshot.profile.riskClass === null) {
      return fail("VALIDATION", "Complete Step 2 (Category & Risk) before running the compliance check.");
    }

    const { findings, looksGood } = runCompliance(snapshot);
    const blockingCount = findings.filter((finding) => finding.severity === "BLOCKING").length;
    const advisoryCount = findings.length - blockingCount;
    const issues: ComplianceIssue[] = findings.map((finding) => ({ id: randomUUID(), ...finding }));
    // COMPLETED documents keep their status; the lifecycle only moves between DRAFT and READY here.
    const nextStatus: DocumentStatus = status === "COMPLETED" ? status : blockingCount === 0 ? "READY" : "DRAFT";

    const runId = await prisma.$transaction(async (tx) => {
      // Ownership and soft-delete are re-checked in the write itself, closing the check-then-write race.
      const { count } = await tx.ifuDocument.updateMany({
        where: { id: documentId, ownerId: session.user.id, deletedAt: null },
        data: { status: nextStatus },
      });
      if (count === 0) throw new DocumentNotFoundError();

      await tx.complianceRun.updateMany({ where: { documentId, isStale: false }, data: { isStale: true } });
      const run = await tx.complianceRun.create({
        data: {
          documentId,
          blockingCount,
          advisoryCount,
          issues: {
            create: issues.map(({ id, ruleId, severity, sectionKey, fieldKey, title, message }) => ({
              id,
              ruleId,
              severity,
              sectionKey,
              fieldKey,
              title,
              message,
            })),
          },
        },
        select: { id: true },
      });
      await recordAuditEvent(
        { userId: session.user.id, action: "CHECK_RUN", documentId, meta: { runId: run.id, blockingCount, advisoryCount } },
        tx,
      );
      return run.id;
    });

    revalidatePath("/dashboard");
    return ok({ runId, status: nextStatus, blockingCount, advisoryCount, issues, looksGood });
  } catch (error) {
    if (error instanceof DocumentNotFoundError) return fail("NOT_FOUND", "Document not found.");
    console.error("runCheckAction failed", { userId: session.user.id, documentId: parsed.data.documentId, error });
    return fail("INTERNAL", "Couldn't run the compliance check. Please try again.");
  }
};
