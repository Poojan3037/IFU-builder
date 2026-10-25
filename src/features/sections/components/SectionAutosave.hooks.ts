"use client";

import { useEffect, useRef, useState } from "react";

import type { AutosaveState } from "@/features/ifu-wizard/components/AutosaveStatus.context";
import type { SectionKey } from "@/features/ifu-wizard/types";

import { saveSectionAction } from "../actions";
import type { StructuredValues } from "../schema";

export const SECTION_AUTOSAVE_DELAY_MS = 2000;

interface UseSectionAutosaveOptions {
  documentId: string;
  sectionKey: SectionKey;
  fields: Record<string, string>;
  structured: StructuredValues;
}

/**
 * FR-S3-08: saves 2 s after the last edit and on demand (blur, navigation, unmount).
 * Saves are chained so they never overlap, and each one sends the latest values rather than a stale snapshot.
 */
export const useSectionAutosave = ({ documentId, sectionKey, fields, structured }: UseSectionAutosaveOptions) => {
  const [state, setState] = useState<AutosaveState>("idle");
  const latest = useRef({ documentId, sectionKey, fields, structured });
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const dirty = useRef(false);
  const chain = useRef<Promise<void>>(Promise.resolve());

  useEffect(() => {
    latest.current = { documentId, sectionKey, fields, structured };
  });

  const flush = (): Promise<void> => {
    clearTimeout(timer.current);
    chain.current = chain.current.then(async () => {
      if (!dirty.current) return;
      dirty.current = false;
      setState("saving");
      const result = await saveSectionAction({ ...latest.current, autosave: true }).catch(() => null);
      if (result?.success) {
        setState("saved");
        return;
      }
      setState("error");
      // Validation failures won't fix themselves on retry; transient errors get another attempt.
      if (result?.success === false && result.error.code === "VALIDATION") return;
      dirty.current = true;
      timer.current = setTimeout(() => void flush(), SECTION_AUTOSAVE_DELAY_MS * 2);
    });
    return chain.current;
  };

  const schedule = () => {
    dirty.current = true;
    setState("saving");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => void flush(), SECTION_AUTOSAVE_DELAY_MS);
  };

  /** Called after an explicit save (Mark Complete) already persisted everything. */
  const markSaved = () => {
    clearTimeout(timer.current);
    dirty.current = false;
    setState("saved");
  };

  // Leaving the section (route change, unmount) must not lose the last couple of seconds of typing.
  useEffect(
    () => () => {
      if (dirty.current) void flush();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- flush only reads refs, so the unmount closure is safe
    [],
  );

  return { state, schedule, flush, markSaved };
};
