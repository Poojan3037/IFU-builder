import "server-only";

import type { Prisma, PrismaClient } from "@/generated/prisma/client";

/**
 * WF-03: any edit after a compliance run invalidates it, so Preview and Export require a re-run.
 * The status lifecycle follows: a READY document goes back to DRAFT on any edit (COMPLETED is untouched).
 */
export const markComplianceStale = async (documentId: string, db: PrismaClient | Prisma.TransactionClient) => {
  await db.complianceRun.updateMany({ where: { documentId, isStale: false }, data: { isStale: true } });
  await db.ifuDocument.updateMany({ where: { id: documentId, status: "READY" }, data: { status: "DRAFT" } });
};
