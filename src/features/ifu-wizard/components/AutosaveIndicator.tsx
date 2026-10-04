"use client";

import { AnimatePresence, motion } from "motion/react";
import { CloudCheck, Loader2 } from "lucide-react";

interface AutosaveIndicatorProps {
  state?: "saving" | "saved";
  label?: string;
}

/** Visual-only autosave status (FR-S1-05). Announced politely to screen readers. */
export const AutosaveIndicator = ({ state = "saved", label = "Saved · just now" }: AutosaveIndicatorProps) => (
  <div aria-live="polite" className="flex items-center gap-1.5 text-xs text-muted-foreground">
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={state}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        className="inline-flex items-center gap-1.5"
      >
        {state === "saving" ? (
          <>
            <Loader2 aria-hidden className="size-3.5 animate-spin" /> Saving…
          </>
        ) : (
          <>
            <CloudCheck aria-hidden className="size-3.5 text-success" /> {label}
          </>
        )}
      </motion.span>
    </AnimatePresence>
  </div>
);
