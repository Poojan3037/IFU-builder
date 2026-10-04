"use client";

import { motion } from "motion/react";
import { ScanSearch } from "lucide-react";

import { SCAN_DURATION_MS } from "../constants";

const STEPS = ["Checking required sections", "Matching mandatory statements", "Verifying licence details"];

export const ScanningState = () => (
  <motion.div
    key="scanning"
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
    role="status"
    aria-live="polite"
    className="flex flex-col items-center gap-6 rounded-2xl border bg-card px-6 py-14 text-center shadow-sm"
  >
    <div className="relative grid size-16 place-items-center rounded-2xl bg-accent text-primary">
      <ScanSearch aria-hidden className="size-7" />
      <motion.span
        aria-hidden
        className="absolute inset-x-2 h-0.5 rounded-full bg-primary/70 shadow-[0_0_12px] shadow-primary"
        initial={{ top: "15%" }}
        animate={{ top: ["15%", "85%", "15%"] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
    <div>
      <p className="text-base font-semibold">Running compliance check…</p>
      <p className="mt-1 text-sm text-muted-foreground">Reviewing your document against MDR 2017 labelling rules.</p>
    </div>
    <div className="h-1.5 w-full max-w-sm overflow-hidden rounded-full bg-muted">
      <motion.div
        className="h-full rounded-full bg-[linear-gradient(90deg,var(--primary),var(--info),var(--primary))] bg-[length:200%_100%] animate-shimmer"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: SCAN_DURATION_MS / 1000, ease: "easeInOut" }}
      />
    </div>
    <ul className="flex flex-col gap-1.5 text-xs text-muted-foreground">
      {STEPS.map((step, index) => (
        <motion.li
          key={step}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + index * 0.35 }}
        >
          {step}
        </motion.li>
      ))}
    </ul>
  </motion.div>
);
