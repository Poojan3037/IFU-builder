"use client";

import { motion } from "motion/react";
import { ClipboardCheck } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { EASE_OUT_EXPO } from "@/lib/motion";

interface SectionsTopBarProps {
  documentId: string;
  deviceName: string;
  completedCount: number;
  totalCount: number;
  canCheck: boolean;
  /** Slot for the mobile section drawer trigger. */
  navTrigger?: ReactNode;
}

export const SectionsTopBar = ({ documentId, deviceName, completedCount, totalCount, canCheck, navTrigger }: SectionsTopBarProps) => {
  const percent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
  const checkButton = (
    <Button size="lg" disabled={!canCheck} asChild={canCheck} className="h-9 px-3.5">
      {canCheck ? (
        <Link href={`/ifu/${documentId}/compliance`}>
          <ClipboardCheck /> Go to Compliance Check
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1.5">
          <ClipboardCheck /> Go to Compliance Check
        </span>
      )}
    </Button>
  );

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        {navTrigger}
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-semibold tracking-tight sm:text-xl">
            {deviceName} <span className="font-normal text-muted-foreground">— Document Sections</span>
          </h1>
          <div className="mt-2 flex items-center gap-3">
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={totalCount}
              aria-valuenow={completedCount}
              aria-label="Sections complete"
              className="relative h-1.5 w-full max-w-64 overflow-hidden rounded-full bg-muted"
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-info to-success"
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
              />
            </div>
            <span aria-live="polite" className="shrink-0 text-xs font-medium text-muted-foreground">
              {completedCount} of {totalCount} sections complete
            </span>
          </div>
        </div>
      </div>
      {canCheck ? (
        checkButton
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <span tabIndex={0} className="inline-flex rounded-lg">
              {checkButton}
            </span>
          </TooltipTrigger>
          <TooltipContent>Mark every required section complete first</TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};
