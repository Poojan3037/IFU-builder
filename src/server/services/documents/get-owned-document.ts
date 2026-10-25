import "server-only";

import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export class DocumentNotFoundError extends Error {
  constructor() {
    super("Document not found");
    this.name = "DocumentNotFoundError";
  }
}

/** Missing, soft-deleted and foreign documents are indistinguishable: all throw not-found. */
export const getOwnedDocumentOrThrow = async <S extends Prisma.IfuDocumentSelect | undefined = undefined>(
  documentId: string,
  userId: string,
  select?: S,
) => {
  const document = await prisma.ifuDocument.findFirst({
    where: { id: documentId, ownerId: userId, deletedAt: null },
    ...(select ? { select } : {}),
  });
  if (!document) throw new DocumentNotFoundError();
  return document as S extends Prisma.IfuDocumentSelect
    ? Prisma.IfuDocumentGetPayload<{ select: S }>
    : Prisma.IfuDocumentGetPayload<object>;
};
