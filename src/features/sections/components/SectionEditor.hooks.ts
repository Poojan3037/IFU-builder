"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import type { SectionKey } from "@/features/ifu-wizard/types";

import { SECTION_CATALOGUE } from "../catalogue";
import { buildSectionContentSchema, type StructuredValues } from "../schema";
import type { StructuredErrors } from "./StructuredFields";
import { useSectionsStore } from "./SectionsStore.context";
import { useApplicableSections } from "./SectionsWorkspace.hooks";

/** Fake debounced autosave (FR-S3-08): flips to "saving" on edit, then "saved". */
export const useAutosaveStatus = () => {
  const [state, setState] = useState<"saving" | "saved">("saved");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear a pending fake save when the editor unmounts.
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const markDirty = () => {
    setState("saving");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("saved"), 900);
  };

  return { state, markDirty };
};

/** Previous section and the next destination after "Mark Complete" (FR-S3-06). */
export const useSectionNeighbours = (documentId: string, sectionKey: SectionKey) => {
  const applicable = useApplicableSections();
  const { complete } = useSectionsStore();
  const index = applicable.indexOf(sectionKey);
  const previous = index > 0 ? applicable[index - 1] : null;
  const ordered = [...applicable.slice(index + 1), ...applicable.slice(0, index)];
  const nextIncomplete = ordered.find((key) => !complete[key]) ?? null;

  return {
    previousHref: previous ? `/ifu/${documentId}/sections/${previous}` : null,
    nextHref: nextIncomplete ? `/ifu/${documentId}/sections/${nextIncomplete}` : `/ifu/${documentId}/compliance`,
    isLastStop: nextIncomplete === null,
  };
};

const validateStructured = (sectionKey: SectionKey, values: StructuredValues): StructuredErrors => {
  const errors: StructuredErrors = {};
  const kinds = SECTION_CATALOGUE[sectionKey].structured ?? [];
  if (kinds.includes("storage")) {
    if (values.tempMin === null) errors.tempMin = "Enter a minimum temperature";
    if (values.tempMax === null) errors.tempMax = "Enter a maximum temperature";
    if (values.tempMin !== null && values.tempMax !== null && values.tempMin > values.tempMax)
      errors.tempMax = "Must be at least the minimum";
  }
  if (kinds.includes("shelfLife") && values.shelfLifeMonths === null) errors.shelfLifeMonths = "Enter the shelf life";
  if (kinds.includes("sterilisation") && !values.sterilisationMethod) errors.sterilisationMethod = "Choose a sterilisation method";
  return errors;
};

/** Validates minimum content, marks the section complete and moves on. */
export const useSectionCompletion = (sectionKey: SectionKey, nextHref: string) => {
  const router = useRouter();
  const { fields, structured, setComplete } = useSectionsStore();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [structuredErrors, setStructuredErrors] = useState<StructuredErrors>({});
  const [isBursting, setIsBursting] = useState(false);

  const complete = () => {
    const def = SECTION_CATALOGUE[sectionKey];
    const values = Object.fromEntries(def.fields.map((f) => [f.key, fields[sectionKey]?.[f.key] ?? ""]));
    const result = buildSectionContentSchema(def.fields).safeParse(values);
    const nextFieldErrors: Record<string, string> = {};
    if (!result.success) {
      for (const issue of result.error.issues) {
        const key = String(issue.path[0]);
        nextFieldErrors[key] ??= issue.message;
      }
    }
    const nextStructuredErrors = validateStructured(sectionKey, structured);
    setFieldErrors(nextFieldErrors);
    setStructuredErrors(nextStructuredErrors);

    const firstInvalid = Object.keys(nextFieldErrors)[0];
    if (firstInvalid || Object.keys(nextStructuredErrors).length > 0) {
      toast.error("A few fields need more detail before this section is complete.");
      if (firstInvalid) document.getElementById(`field-${firstInvalid}`)?.focus();
      return;
    }

    setComplete(sectionKey, true);
    setIsBursting(true);
    toast.success(`${def.title} marked complete`);
    setTimeout(() => router.push(nextHref), 650);
  };

  const clearFieldError = (key: string) =>
    setFieldErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });

  return { fieldErrors, structuredErrors, isBursting, complete, clearFieldError };
};
