import "server-only";

import type { AuditAction, Prisma, PrismaClient } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

interface AuditInput {
  userId: string;
  action: AuditAction;
  documentId?: string;
  meta?: Prisma.InputJsonObject;
}

/** Pass a transaction client as `db` so the audit row commits with the mutation. */
export const recordAuditEvent = async (
  { userId, action, documentId, meta = {} }: AuditInput,
  db: PrismaClient | Prisma.TransactionClient = prisma,
) => {
  await db.auditEvent.create({ data: { userId, action, documentId, meta } });
};
