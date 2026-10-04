"use client";

import { motion } from "motion/react";
import { Check, Loader2 } from "lucide-react";

import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { GENERATION_STEPS } from "../mock-data";

interface GenerateProgressProps {
  stepIndex: number;
  progress: number;
}

export const GenerateProgress = ({ stepIndex, progress }: GenerateProgressProps) => (
  <div className="flex flex-col gap-4" role="status" aria-live="polite">
    <div className="flex items-center justify-between text-sm">
      <span className="font-medium">Generating your PDF…</span>
      <span className="tabular-nums text-muted-foreground">{progress}%</span>
    </div>
    <div className="relative h-2 overflow-hidden rounded-full bg-muted">
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-info to-primary bg-[length:200%_100%] animate-shimmer"
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
      />
    </div>
    <ol className="flex flex-col gap-2">
      {GENERATION_STEPS.map((label, index) => {
        const done = index < stepIndex || progress === 100;
        const active = index === stepIndex && !done;
        return (
          <li key={label} className={cn("flex items-center gap-2 text-sm transition-colors", done || active ? "text-foreground" : "text-muted-foreground/60")}>
            <span className={cn("grid size-5 place-items-center rounded-full", done ? "bg-success text-success-foreground" : "bg-muted")}>
              {done ? <Check aria-hidden className="size-3" strokeWidth={3} /> : active ? <Loader2 aria-hidden className="size-3 animate-spin text-primary" /> : null}
            </span>
            {label}
          </li>
        );
      })}
    </ol>
  </div>
);
