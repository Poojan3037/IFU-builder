"use client";

import { AnimatePresence, motion } from "motion/react";

import { CategoryIcon } from "@/components/shared/CategoryIcon";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { MOCK_NOW } from "@/features/ifu-wizard/mock-data";
import type { IfuDocumentSummary } from "@/features/ifu-wizard/types";
import { formatRelative } from "@/lib/dates";
import { EASE_OUT_EXPO } from "@/lib/motion";

import { DocumentRowActions } from "./DocumentRowActions";

interface DocumentsCardListProps {
  documents: IfuDocumentSummary[];
  onDuplicate: (doc: IfuDocumentSummary) => void;
  onDelete: (doc: IfuDocumentSummary) => void;
}

/** Mobile (< md) alternative to the table. */
export const DocumentsCardList = ({ documents, onDuplicate, onDelete }: DocumentsCardListProps) => (
  <ul className="divide-y md:hidden">
    <AnimatePresence initial={true}>
      {documents.map((doc, index) => (
        <motion.li
          key={doc.id}
          layout="position"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT_EXPO, delay: Math.min(index * 0.04, 0.4) } }}
          exit={{ opacity: 0, x: -16, transition: { duration: 0.2 } }}
          className="space-y-3 p-4"
        >
          <div className="flex items-start gap-3">
            <CategoryIcon category={doc.category} />
            <div className="min-w-0 flex-1">
              <p className="font-medium leading-snug">{doc.deviceName}</p>
              <p className="font-mono text-xs text-muted-foreground">Model {doc.modelNumber}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={doc.status} />
            <RiskBadge riskClass={doc.riskClass} />
            <time dateTime={doc.updatedAt} className="ml-auto text-xs text-muted-foreground">
              {formatRelative(doc.updatedAt, MOCK_NOW)}
            </time>
          </div>
          <DocumentRowActions doc={doc} onDuplicate={onDuplicate} onDelete={onDelete} />
        </motion.li>
      ))}
    </AnimatePresence>
  </ul>
);
