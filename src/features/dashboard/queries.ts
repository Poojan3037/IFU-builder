import "server-only";

import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

import { PAGE_SIZE } from "./constants";
import type { DashboardDocument, DashboardStats, DocumentFilters, DocumentPage } from "./types";

const buildWhere = (ownerId: string, { q, status, risk }: DocumentFilters): Prisma.IfuDocumentWhereInput => ({
  ownerId,
  deletedAt: null,
  ...(status !== "ALL" ? { status } : {}),
  ...(risk !== "ALL" ? { riskClass: risk } : {}),
  ...(q
    ? {
        OR: [
          { deviceName: { contains: q, mode: "insensitive" } },
          { modelNumber: { contains: q, mode: "insensitive" } },
          { manufacturerName: { contains: q, mode: "insensitive" } },
        ],
      }
    : {}),
});

/** FR-DASH-02: counts over the user's own, non-deleted documents. */
export const getDashboardStats = async (ownerId: string): Promise<DashboardStats> => {
  const groups = await prisma.ifuDocument.groupBy({
    by: ["status"],
    where: { ownerId, deletedAt: null },
    _count: { _all: true },
  });
  const count = (status: string) => groups.find((g) => g.status === status)?._count._all ?? 0;
  const draft = count("DRAFT");
  const ready = count("READY");
  const completed = count("COMPLETED");
  return { total: draft + ready + completed, inProgress: draft + ready, completed };
};

/** FR-DASH-03/04/05/08: filtered, newest-first, server-side pagination. */
export const listDocuments = async (ownerId: string, filters: DocumentFilters): Promise<DocumentPage> => {
  const where = buildWhere(ownerId, filters);
  const totalCount = await prisma.ifuDocument.count({ where });
  const pageCount = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const page = Math.min(filters.page, pageCount);

  const rows = await prisma.ifuDocument.findMany({
    where,
    orderBy: { updatedAt: "desc" },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    select: {
      id: true,
      deviceName: true,
      modelNumber: true,
      category: true,
      riskClass: true,
      status: true,
      lastStep: true,
      updatedAt: true,
    },
  });

  const documents: DashboardDocument[] = rows.map((row) => ({ ...row, updatedAt: row.updatedAt.toISOString() }));
  return { documents, totalCount, page, pageCount };
};
