"use client";

import { useEffect, useRef } from "react";
import type { UseFormReturn } from "react-hook-form";

import type { BasicInfoInput } from "../schema";
import { basicInfoDraftSchema } from "../schema";
import { useAutosaveStatus } from "./AutosaveStatus.context";

export const AUTOSAVE_DELAY_MS = 2000;

interface UseAutosaveOptions {
  form: UseFormReturn<BasicInfoInput>;
  save: (values: BasicInfoInput) => Promise<boolean>;
  /** Pauses autosave while an explicit save/continue is running. */
  paused: boolean;
}

/**
 * FR-S1-05: debounced (2 s) save of dirty values. Saves never overlap: edits made while a
 * request is in flight are picked up by the next debounce tick, and format-invalid values are skipped.
 */
export const useAutosave = ({ form, save, paused }: UseAutosaveOptions) => {
  const { setStatus } = useAutosaveStatus();
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const inFlight = useRef(false);
  const latest = useRef({ save, paused });

  useEffect(() => {
    latest.current = { save, paused };
  });

  useEffect(() => {
    const run = async () => {
      const values = form.getValues();
      if (latest.current.paused || !form.formState.isDirty) return;
      if (inFlight.current) {
        timer.current = setTimeout(run, AUTOSAVE_DELAY_MS);
        return;
      }
      if (!basicInfoDraftSchema.safeParse(values).success) return;

      inFlight.current = true;
      setStatus({ state: "saving", savedAt: null });
      const saved = await latest.current.save(values);
      inFlight.current = false;
      setStatus(saved ? { state: "saved", savedAt: new Date().toISOString() } : { state: "error", savedAt: null });
    };

    const subscription = form.subscribe({
      formState: { values: true },
      callback: () => {
        clearTimeout(timer.current);
        timer.current = setTimeout(run, AUTOSAVE_DELAY_MS);
      },
    });
    return () => {
      subscription();
      clearTimeout(timer.current);
    };
  }, [form, setStatus]);
};
