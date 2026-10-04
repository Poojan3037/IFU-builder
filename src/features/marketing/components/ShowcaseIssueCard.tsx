"use client";

import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, CheckCircle2, CircleAlert } from "lucide-react";

import { cn } from "@/lib/utils";

import type { ShowcaseIssue } from "../constants";

interface ShowcaseIssueCardProps {
  issue: ShowcaseIssue;
  resolved: boolean;
}

export const ShowcaseIssueCard = ({ issue, resolved }: ShowcaseIssueCardProps) => {
  const isBlocking = issue.severity === "BLOCKING";
  const Icon = resolved ? CheckCircle2 : isBlocking ? CircleAlert : AlertTriangle;

  return (
    <motion.li
      layout
      animate={{ scale: resolved ? 0.98 : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className={cn(
        "flex items-start gap-3 rounded-2xl border p-4 transition-colors duration-500",
        resolved && "border-success/30 bg-success-soft text-success-soft-foreground",
        !resolved && isBlocking && "border-danger/30 bg-danger-soft text-danger-soft-foreground",
        !resolved && !isBlocking && "border-warning/40 bg-warning-soft text-warning-soft-foreground",
      )}
    >
      <motion.span key={String(resolved)} initial={{ scale: 0.4, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 400, damping: 18 }}>
        <Icon aria-hidden className="mt-0.5 size-5 shrink-0" />
      </motion.span>
      <div className="min-w-0 flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={String(resolved)}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="font-medium"
          >
            {resolved ? issue.fix : issue.title}
          </motion.p>
        </AnimatePresence>
        <p className="mt-0.5 text-xs opacity-75">
          <span className="font-mono">{issue.rule}</span> · {resolved ? "Resolved" : isBlocking ? "Blocking: stops export" : "Advisory: suggestion"}
        </p>
      </div>
    </motion.li>
  );
};
