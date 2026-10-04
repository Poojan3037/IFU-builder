"use client";

import { AnimatePresence, motion } from "motion/react";

import { CategoryIcon } from "@/components/shared/CategoryIcon";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CATEGORY_META } from "@/features/ifu-wizard/constants";
import { MOCK_NOW } from "@/features/ifu-wizard/mock-data";
import type { IfuDocumentSummary } from "@/features/ifu-wizard/types";
import { formatDate, formatRelative } from "@/lib/dates";
import { EASE_OUT_EXPO } from "@/lib/motion";

import { DocumentRowActions } from "./DocumentRowActions";

const MotionRow = motion.create(TableRow);

interface DocumentsTableProps {
  documents: IfuDocumentSummary[];
  onDuplicate: (doc: IfuDocumentSummary) => void;
  onDelete: (doc: IfuDocumentSummary) => void;
}

export const DocumentsTable = ({ documents, onDuplicate, onDelete }: DocumentsTableProps) => (
  <div className="hidden md:block">
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/40 hover:bg-muted/40">
          <TableHead className="pl-4">Device</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Risk Class</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last edited</TableHead>
          <TableHead className="pr-4 text-right">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <AnimatePresence initial={true}>
          {documents.map((doc, index) => (
            <MotionRow
              key={doc.id}
              layout="position"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT_EXPO, delay: Math.min(index * 0.04, 0.4) } }}
              exit={{ opacity: 0, x: -16, transition: { duration: 0.2 } }}
              className="group"
            >
              <TableCell className="pl-4">
                <div className="flex items-center gap-3">
                  <CategoryIcon category={doc.category} className="transition-transform duration-300 group-hover:scale-110" />
                  <div className="min-w-0">
                    <p className="truncate font-medium">{doc.deviceName}</p>
                    <p className="font-mono text-xs text-muted-foreground">Model {doc.modelNumber}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{CATEGORY_META[doc.category].short}</TableCell>
              <TableCell>
                <RiskBadge riskClass={doc.riskClass} />
              </TableCell>
              <TableCell>
                <StatusBadge status={doc.status} />
              </TableCell>
              <TableCell className="text-muted-foreground">
                <time dateTime={doc.updatedAt} title={formatDate(doc.updatedAt)}>
                  {formatRelative(doc.updatedAt, MOCK_NOW)}
                </time>
              </TableCell>
              <TableCell className="pr-4">
                <DocumentRowActions doc={doc} onDuplicate={onDuplicate} onDelete={onDelete} />
              </TableCell>
            </MotionRow>
          ))}
        </AnimatePresence>
      </TableBody>
    </Table>
  </div>
);
