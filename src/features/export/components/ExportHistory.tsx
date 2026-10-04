"use client";

import { AnimatePresence, motion } from "motion/react";
import { Download, History } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatDate, formatTime } from "@/lib/dates";
import { cn } from "@/lib/utils";

import type { ExportRecord } from "../types";

interface ExportHistoryProps {
  history: ExportRecord[];
  onDownload: (fileName: string) => void;
}

const OptionChip = ({ active, label }: { active: boolean; label: string }) =>
  active ? (
    <span className={cn("rounded-md px-1.5 py-0.5 text-[11px] font-medium", label === "Watermark" ? "bg-danger-soft text-danger-soft-foreground" : "bg-secondary text-secondary-foreground")}>
      {label}
    </span>
  ) : null;

export const ExportHistory = ({ history, onDownload }: ExportHistoryProps) => (
  <section aria-labelledby="export-history-title" className="rounded-2xl border bg-card p-5 sm:p-6">
    <div className="mb-4 flex items-center gap-2">
      <History aria-hidden className="size-4 text-muted-foreground" />
      <h2 id="export-history-title" className="font-semibold">Export history</h2>
      <span className="text-xs text-muted-foreground">Last 10 exports</span>
    </div>
    <ul className="flex flex-col divide-y">
      <AnimatePresence initial={false}>
        {history.map((record) => (
          <motion.li
            key={record.id}
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3">
              <span className="rounded-md bg-accent px-2 py-0.5 font-mono text-xs font-medium text-accent-foreground">{record.version}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-mono text-xs">{record.fileName}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(record.createdAt)} · {formatTime(record.createdAt)} IST · {(record.durationMs / 1000).toFixed(1)}s
                </p>
              </div>
              <div className="flex flex-wrap gap-1">
                <OptionChip active={record.options.coverPage} label="Cover" />
                <OptionChip active={record.options.symbolGlossary} label="Glossary" />
                <OptionChip active={record.options.watermark} label="Watermark" />
              </div>
              <Button variant="ghost" size="sm" onClick={() => onDownload(record.fileName)} aria-label={`Download ${record.fileName}`}>
                <Download /> <span className="max-sm:sr-only">Re-download</span>
              </Button>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  </section>
);
