"use client";

import { motion } from "motion/react";
import { AlertTriangle, PartyPopper } from "lucide-react";

import { cn } from "@/lib/utils";

interface SummaryBannerProps {
  issueCount: number;
  blockingCount: number;
  goodCount: number;
  totalSections: number;
}

/** FR-CMP-03 summary — issues variant or "All checks passed". */
export const SummaryBanner = ({ issueCount, blockingCount, goodCount, totalSections }: SummaryBannerProps) => {
  const passed = issueCount === 0;
  const Icon = passed ? PartyPopper : AlertTriangle;

  return (
    <motion.div
      layout
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative flex items-center gap-4 overflow-hidden rounded-2xl border p-5",
        passed ? "border-success/30 bg-success-soft" : blockingCount > 0 ? "border-danger/25 bg-danger-soft" : "border-warning/30 bg-warning-soft",
      )}
    >
      <span
        className={cn(
          "grid size-11 shrink-0 place-items-center rounded-xl",
          passed ? "bg-success text-success-foreground" : blockingCount > 0 ? "bg-danger text-danger-foreground" : "bg-warning text-warning-foreground",
        )}
      >
        <Icon aria-hidden className="size-5" />
      </span>
      <div className="min-w-0">
        <p className={cn("text-base font-semibold", passed ? "text-success-soft-foreground" : "text-foreground")}>
          {passed ? "All checks passed" : `${issueCount} ${issueCount === 1 ? "issue needs" : "issues need"} your attention`}
        </p>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {passed
            ? "Your document is ready to preview and export."
            : `${goodCount} of ${totalSections} sections are complete and look good`}
          {!passed && blockingCount > 0 && ` · ${blockingCount} blocking export`}
        </p>
      </div>
    </motion.div>
  );
};
