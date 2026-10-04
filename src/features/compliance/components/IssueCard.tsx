"use client";

import { motion } from "motion/react";
import { ArrowRight, BookOpen, EyeOff } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SECTION_CATALOGUE } from "@/features/sections/catalogue";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

import type { ComplianceIssue } from "../types";

interface IssueCardProps {
  issue: ComplianceIssue;
  documentId: string;
  index: number;
  onDismiss?: (id: string) => void;
}

export const IssueCard = ({ issue, documentId, index, onDismiss }: IssueCardProps) => {
  const isBlocking = issue.severity === "BLOCKING";
  const href = `/ifu/${documentId}/sections/${issue.sectionKey}${issue.fieldKey ? `?field=${issue.fieldKey}` : ""}`;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0, transition: { delay: index * 0.07, duration: 0.5, ease: EASE_OUT_EXPO } }}
      exit={{ opacity: 0, x: 40, scale: 0.97, transition: { duration: 0.25 } }}
      className={cn(
        "group relative flex gap-4 overflow-hidden rounded-2xl border bg-card p-4 shadow-xs transition-shadow hover:shadow-md sm:p-5",
        isBlocking ? "border-danger/25" : "border-warning/30",
      )}
    >
      <span aria-hidden className={cn("absolute inset-y-0 left-0 w-1", isBlocking ? "bg-danger" : "bg-warning")} />
      <span
        aria-hidden
        className={cn(
          "grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold",
          isBlocking ? "bg-danger-soft text-danger-soft-foreground" : "bg-warning-soft text-warning-soft-foreground",
        )}
      >
        !
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
              isBlocking ? "bg-danger-soft text-danger-soft-foreground" : "bg-warning-soft text-warning-soft-foreground",
            )}
          >
            {isBlocking ? "Blocking" : "Advisory"}
          </span>
          <span className="font-mono text-[11px] text-muted-foreground">{issue.ruleId}</span>
        </div>
        <h3 className="mt-1.5 font-semibold">{issue.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{issue.message}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <Button asChild variant="link" className="h-auto p-0">
            <Link href={href}>
              Go to this section <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              <span className="sr-only">: {SECTION_CATALOGUE[issue.sectionKey].title}</span>
            </Link>
          </Button>
          {issue.reference && (
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <BookOpen aria-hidden className="size-3.5" /> {issue.reference}
            </span>
          )}
          {!isBlocking && onDismiss && (
            <Button variant="ghost" size="sm" className="ml-auto text-muted-foreground" onClick={() => onDismiss(issue.id)}>
              <EyeOff /> Dismiss
            </Button>
          )}
        </div>
      </div>
    </motion.li>
  );
};
