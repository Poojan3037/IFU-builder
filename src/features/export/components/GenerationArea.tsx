"use client";

import { AnimatePresence, motion } from "motion/react";
import { FileDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/shared/motion";

import type { GenerationState } from "../types";
import { GenerateProgress } from "./GenerateProgress";
import { ReadyPanel } from "./ReadyPanel";

interface GenerationAreaProps {
  state: GenerationState;
  onDownload: (fileName: string) => void;
  onGenerateAgain: () => void;
}

const swap = {
  initial: { opacity: 0, y: 12, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -12, filter: "blur(4px)" },
  transition: { duration: 0.3 },
};

/** Idle → generating → ready. The idle button submits the surrounding form. */
export const GenerationArea = ({ state, onDownload, onGenerateAgain }: GenerationAreaProps) => (
  <AnimatePresence mode="wait" initial={false}>
    {state.status === "idle" && (
      <motion.div key="idle" {...swap} className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
        <p className="text-xs text-muted-foreground">A4 · embedded fonts · selectable text · page numbers on every page</p>
        <Magnetic strength={0.15}>
          <Button type="submit" size="lg" className="h-11 px-6 text-sm shadow-lg shadow-primary/25">
            <FileDown /> Generate PDF
          </Button>
        </Magnetic>
      </motion.div>
    )}
    {state.status === "generating" && (
      <motion.div key="generating" {...swap}>
        <GenerateProgress stepIndex={state.stepIndex} progress={state.progress} />
      </motion.div>
    )}
    {state.status === "ready" && (
      <motion.div key="ready" {...swap}>
        <ReadyPanel
          fileName={state.fileName}
          durationMs={state.durationMs}
          onDownload={() => onDownload(state.fileName)}
          onGenerateAgain={onGenerateAgain}
        />
      </motion.div>
    )}
  </AnimatePresence>
);
