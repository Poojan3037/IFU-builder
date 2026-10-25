"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { SectionKey } from "@/features/ifu-wizard/types";

import { SECTION_CATALOGUE } from "../catalogue";
import type { LicencePreviewInfo } from "../types";
import { useSectionAutosave } from "./SectionAutosave.hooks";
import { useFocusField, useSectionCompletion, useSectionNeighbours } from "./SectionEditor.hooks";
import { SectionEditorPresentation } from "./SectionEditor.presentation";
import { useSectionsStore } from "./SectionsStore.context";

interface SectionEditorContainerProps {
  documentId: string;
  sectionKey: SectionKey;
  applicable: SectionKey[];
  licence: LicencePreviewInfo;
  /** Field to focus when arriving from a compliance deep link. */
  focusField?: string;
}

export const SectionEditorContainer = ({ documentId, sectionKey, applicable, licence, focusField }: SectionEditorContainerProps) => {
  const router = useRouter();
  const { fields, complete, structured, setField, setComplete, setStructured } = useSectionsStore();
  const [isNavigating, setIsNavigating] = useState(false);
  const definition = SECTION_CATALOGUE[sectionKey];
  const values = fields[sectionKey] ?? {};

  const autosave = useSectionAutosave({ documentId, sectionKey, fields: values, structured });
  const { previousHref, nextHref, isLastStop } = useSectionNeighbours(documentId, sectionKey, applicable);
  const completion = useSectionCompletion({ documentId, sectionKey, nextHref, onSaved: autosave.markSaved });
  useFocusField(focusField);

  const handleFieldChange = (fieldKey: string, value: string) => {
    setField(sectionKey, fieldKey, value);
    completion.clearFieldError(fieldKey);
    autosave.schedule();
    // FR-S3-09: a completed section stays complete unless emptied.
    if (complete[sectionKey] && value.trim() === "") setComplete(sectionKey, false);
  };

  // FR-S3-07: content saves on every navigation, so wait for the pending save before leaving.
  const handleNavigate = async (href: string) => {
    setIsNavigating(true);
    await autosave.flush();
    router.push(href);
  };

  return (
    <SectionEditorPresentation
      documentId={documentId}
      definition={definition}
      licence={licence}
      values={values}
      structured={structured}
      isComplete={complete[sectionKey] === true}
      saveState={autosave.state}
      fieldErrors={completion.fieldErrors}
      structuredErrors={completion.structuredErrors}
      isBursting={completion.isBursting}
      isBusy={completion.isSaving || isNavigating}
      previousHref={previousHref}
      exitHref="/dashboard"
      completeLabel={isLastStop ? "Mark Complete & Check" : "Mark Complete & Continue"}
      onFieldChange={handleFieldChange}
      onFieldBlur={() => void autosave.flush()}
      onStructuredChange={(patch) => {
        setStructured(patch);
        autosave.schedule();
      }}
      onNavigate={handleNavigate}
      onComplete={completion.complete}
    />
  );
};
