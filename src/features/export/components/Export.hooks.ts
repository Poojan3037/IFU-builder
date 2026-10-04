"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";

import { GENERATION_STEPS } from "../mock-data";
import type { ExportRecord, ExportToggles, GenerationState } from "../types";

const STEP_MS = 700;
const STEP_PROGRESS = [38, 76, 100];
const FAKE_DURATION_MS = 2100;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Simulated server-side PDF generation (FR-EXP-06). A run token lets "Generate again" cancel a stale run. */
export const useFakeGeneration = (onComplete: (record: ExportRecord) => void) => {
  const [state, setState] = useState<GenerationState>({ status: "idle" });
  const runRef = useRef(0);

  const generate = async (fileName: string, version: string, options: ExportToggles) => {
    const run = ++runRef.current;
    setState({ status: "generating", stepIndex: 0, progress: 6 });
    for (let index = 0; index < GENERATION_STEPS.length; index += 1) {
      await sleep(STEP_MS);
      if (runRef.current !== run) return;
      setState({ status: "generating", stepIndex: Math.min(index + 1, GENERATION_STEPS.length - 1), progress: STEP_PROGRESS[index] });
    }
    await sleep(250);
    if (runRef.current !== run) return;
    setState({ status: "ready", fileName, durationMs: FAKE_DURATION_MS });
    onComplete({ id: `exp-${Date.now()}`, version, fileName, createdAt: new Date().toISOString(), durationMs: FAKE_DURATION_MS, options });
  };

  const reset = () => {
    runRef.current += 1;
    setState({ status: "idle" });
  };

  return { state, generate, reset };
};

/** Static build: downloads are a no-op with feedback (FR-EXP-07 streams via an ownership-checked route later). */
export const notifyDownload = (fileName: string) =>
  toast.success("Download started", { description: fileName });

export const useExportHistory = (initial: ExportRecord[]) => {
  const [history, setHistory] = useState(initial);
  // Keep the last 10 exports (FR-EXP-09).
  const add = (record: ExportRecord) => setHistory((current) => [record, ...current].slice(0, 10));
  return { history, add };
};
