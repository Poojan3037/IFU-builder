"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

import type { SectionKey } from "@/features/ifu-wizard/types";

import { markSectionCompleteAction } from "../actions";
import { SECTION_CATALOGUE } from "../catalogue";
import { buildSectionContentSchema } from "../schema";
import { validateStructured, type StructuredErrors } from "../structured";
import { useSectionsStore } from "./SectionsStore.context";

/** Previous section and the next destination after "Mark Complete" (FR-S3-06). */
export const useSectionNeighbours = (documentId: string, sectionKey: SectionKey, applicable: SectionKey[]) => {
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

/** Arriving from a compliance deep link focuses the field (rich-text or structured) it points at (FR-CMP-04). */
export const useFocusField = (focusField?: string) => {
  // Runs once on arrival; the editors mount in the same commit, so the element exists by now.
  useEffect(() => {
    if (!focusField) return;
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(`field-${focusField}`) ?? document.getElementById(`structured-${focusField}`);
      target?.focus();
      target?.scrollIntoView({ block: "center", behavior: "smooth" });
    });
    return () => cancelAnimationFrame(frame);
  }, [focusField]);
};

interface UseSectionCompletionOptions {
  documentId: string;
  sectionKey: SectionKey;
  nextHref: string;
  onSaved: () => void;
}

/** Validates minimum content, saves + marks the section complete on the server, then moves on. */
export const useSectionCompletion = ({ documentId, sectionKey, nextHref, onSaved }: UseSectionCompletionOptions) => {
  const router = useRouter();
  const { fields, structured, setComplete } = useSectionsStore();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [structuredErrors, setStructuredErrors] = useState<StructuredErrors>({});
  const [isBursting, setIsBursting] = useState(false);
  const [isPending, startTransition] = useTransition();

  const showErrors = (nextFieldErrors: Record<string, string>, nextStructuredErrors: StructuredErrors) => {
    setFieldErrors(nextFieldErrors);
    setStructuredErrors(nextStructuredErrors);
    toast.error("A few fields need more detail before this section is complete.");
    const firstInvalid = Object.keys(nextFieldErrors)[0];
    if (firstInvalid) document.getElementById(`field-${firstInvalid}`)?.focus();
  };

  const complete = () => {
    const def = SECTION_CATALOGUE[sectionKey];
    const values = Object.fromEntries(def.fields.map((f) => [f.key, fields[sectionKey]?.[f.key] ?? ""]));
    const result = buildSectionContentSchema(def.fields).safeParse(values);
    const nextFieldErrors: Record<string, string> = {};
    if (!result.success) {
      for (const issue of result.error.issues) nextFieldErrors[String(issue.path[0])] ??= issue.message;
    }
    const nextStructuredErrors = validateStructured(def.structured, structured);

    if (Object.keys(nextFieldErrors).length > 0 || Object.keys(nextStructuredErrors).length > 0) {
      showErrors(nextFieldErrors, nextStructuredErrors);
      return;
    }
    setFieldErrors({});
    setStructuredErrors({});

    startTransition(async () => {
      const response = await markSectionCompleteAction({ documentId, sectionKey, fields: fields[sectionKey] ?? {}, structured }).catch(
        () => null,
      );
      if (!response?.success) {
        // The server re-validates; surface its per-field messages the same way as the client's.
        const serverErrors = response?.error.fieldErrors ?? {};
        const serverFieldErrors: Record<string, string> = {};
        const serverStructured: StructuredErrors = {};
        for (const [key, messages] of Object.entries(serverErrors)) {
          if (def.fields.some((f) => f.key === key)) serverFieldErrors[key] = messages[0];
          else serverStructured[key as keyof StructuredErrors] = messages[0];
        }
        if (Object.keys(serverErrors).length > 0) showErrors(serverFieldErrors, serverStructured);
        else toast.error(response?.error.message ?? "Couldn't save this section. Please try again.");
        return;
      }

      setComplete(sectionKey, true);
      onSaved();
      setIsBursting(true);
      toast.success(`${def.title} marked complete`);
      setTimeout(() => router.push(nextHref), 650);
    });
  };

  const clearFieldError = (key: string) =>
    setFieldErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });

  return { fieldErrors, structuredErrors, isBursting, isSaving: isPending, complete, clearFieldError };
};
