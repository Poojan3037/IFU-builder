"use client";

import { AnimatePresence, motion } from "motion/react";
import { EyeOff, TriangleAlert } from "lucide-react";

import { SECTION_CATALOGUE } from "@/features/sections/catalogue";
import { EASE_OUT_EXPO } from "@/lib/motion";

import type { SectionKey } from "../types";

export interface ConsistencyWarning {
  id: string;
  message: string;
}

interface ConsistencyWarningsProps {
  warnings: ConsistencyWarning[];
  hiddenSections: SectionKey[];
}

const banner = {
  initial: { opacity: 0, height: 0, y: -6 },
  animate: { opacity: 1, height: "auto", y: 0, transition: { duration: 0.35, ease: EASE_OUT_EXPO } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
};

/** FR-S2-07 amber consistency warnings and the WF-02 "hidden, not deleted" notice. */
export const ConsistencyWarnings = ({ warnings, hiddenSections }: ConsistencyWarningsProps) => (
  <div aria-live="polite" className="space-y-2">
    <AnimatePresence initial={false}>
      {warnings.map((warning) => (
        <motion.div key={warning.id} {...banner} className="overflow-hidden">
          <p className="flex items-start gap-2.5 rounded-xl border border-warning/30 bg-warning-soft px-4 py-3 text-sm text-warning-soft-foreground">
            <TriangleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
            {warning.message}
          </p>
        </motion.div>
      ))}
      {hiddenSections.length > 0 && (
        <motion.div key="hidden-sections" {...banner} className="overflow-hidden">
          <div className="flex items-start gap-2.5 rounded-xl border border-info/30 bg-info-soft px-4 py-3 text-sm text-info-soft-foreground">
            <EyeOff aria-hidden className="mt-0.5 size-4 shrink-0" />
            <div>
              <p className="font-medium">These sections will be hidden, but your content is kept:</p>
              <p>{hiddenSections.map((key) => SECTION_CATALOGUE[key].title).join(", ")}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
