"use client";

import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, ListChecks, Plus, ShieldAlert } from "lucide-react";

import { SECTION_CATALOGUE } from "@/features/sections/catalogue";
import { EASE_OUT_EXPO } from "@/lib/motion";

import type { ExtraWarning } from "../rules/applicability";
import type { SectionKey } from "../types";

interface IncludesPanelProps {
  coreSections: SectionKey[];
  addedSections: SectionKey[];
  extraWarnings: ExtraWarning[];
}

const item = {
  initial: { opacity: 0, x: -12, height: 0 },
  animate: { opacity: 1, x: 0, height: "auto", transition: { duration: 0.4, ease: EASE_OUT_EXPO } },
  exit: { opacity: 0, x: 12, height: 0, transition: { duration: 0.2 } },
};

/** FR-S2-06: live "we'll include" panel, recomputed on the client from the shared applicability rules. */
export const IncludesPanel = ({ coreSections, addedSections, extraWarnings }: IncludesPanelProps) => (
  <motion.aside
    aria-labelledby="includes-heading"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.2 }}
    className="sticky top-24 overflow-hidden rounded-2xl border border-success/25 bg-gradient-to-b from-success-soft to-card shadow-sm"
  >
    <div className="flex items-center gap-2 border-b border-success/15 px-5 py-4">
      <ListChecks aria-hidden className="size-4.5 text-success" />
      <h2 id="includes-heading" className="text-sm font-semibold text-success-soft-foreground">
        Based on your answers, we&apos;ll include:
      </h2>
    </div>
    <div aria-live="polite" className="space-y-5 p-5">
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Added for your device</p>
        <ul className="space-y-1">
          <AnimatePresence initial={false}>
            {addedSections.map((key) => (
              <motion.li key={key} {...item} className="overflow-hidden">
                <div className="flex items-start gap-2 py-1">
                  <Plus aria-hidden className="mt-0.5 size-4 shrink-0 text-success" />
                  <div>
                    <p className="text-sm font-medium">{SECTION_CATALOGUE[key].title}</p>
                    <p className="text-xs text-muted-foreground">{SECTION_CATALOGUE[key].includeReason}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        {addedSections.length === 0 && <p className="text-sm text-muted-foreground">No extra sections yet. Answer the questions to see what applies.</p>}
      </div>
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Extra warnings</p>
        <ul className="space-y-1">
          <AnimatePresence initial={false}>
            {extraWarnings.map((warning) => (
              <motion.li key={warning.id} {...item} className="overflow-hidden">
                <div className="flex items-start gap-2 py-1 text-sm">
                  <ShieldAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-warning" />
                  <span>{warning.text}</span>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        {extraWarnings.length === 0 && <p className="text-sm text-muted-foreground">None for these answers.</p>}
      </div>
      <details className="group rounded-xl border bg-background/60 px-3 py-2 text-sm">
        <summary className="flex cursor-pointer list-none items-center gap-2 font-medium [&::-webkit-details-marker]:hidden">
          <CheckCircle2 aria-hidden className="size-4 text-success" />
          {coreSections.length} core sections, always included
        </summary>
        <ul className="mt-2 space-y-1 pl-6 text-xs text-muted-foreground">
          {coreSections.map((key) => (
            <li key={key} className="list-disc">
              {SECTION_CATALOGUE[key].title}
            </li>
          ))}
        </ul>
      </details>
    </div>
  </motion.aside>
);
