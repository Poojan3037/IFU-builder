"use client";

import { DEMO_DOCUMENT } from "@/features/ifu-wizard/mock-data";
import type { SectionKey } from "@/features/ifu-wizard/types";

import { SECTION_CATALOGUE } from "../catalogue";
import { useAutosaveStatus, useSectionCompletion, useSectionNeighbours } from "./SectionEditor.hooks";
import { SectionEditorPresentation } from "./SectionEditor.presentation";
import { useSectionsStore } from "./SectionsStore.context";

interface SectionEditorContainerProps {
  documentId: string;
  sectionKey: SectionKey;
  /** Field to focus when arriving from a compliance deep link. */
  focusField?: string;
}

export const SectionEditorContainer = ({ documentId, sectionKey, focusField }: SectionEditorContainerProps) => {
  const { fields, complete, structured, setField, setComplete, setStructured } = useSectionsStore();
  const autosave = useAutosaveStatus();
  const { previousHref, nextHref, isLastStop } = useSectionNeighbours(documentId, sectionKey);
  const completion = useSectionCompletion(sectionKey, nextHref);
  const definition = SECTION_CATALOGUE[sectionKey];

  const handleFieldChange = (fieldKey: string, value: string) => {
    setField(sectionKey, fieldKey, value);
    completion.clearFieldError(fieldKey);
    autosave.markDirty();
    // FR-S3-09: a completed section stays complete unless emptied.
    if (complete[sectionKey] && value.trim() === "") setComplete(sectionKey, false);
  };

  return (
    <SectionEditorPresentation
      definition={definition}
      document={DEMO_DOCUMENT}
      values={fields[sectionKey] ?? {}}
      structured={structured}
      isComplete={complete[sectionKey] === true}
      focusField={focusField}
      saveState={autosave.state}
      fieldErrors={completion.fieldErrors}
      structuredErrors={completion.structuredErrors}
      isBursting={completion.isBursting}
      previousHref={previousHref}
      exitHref="/dashboard"
      completeLabel={isLastStop ? "Mark Complete & Check" : "Mark Complete & Continue"}
      onFieldChange={handleFieldChange}
      onStructuredChange={(patch) => {
        setStructured(patch);
        autosave.markDirty();
      }}
      onComplete={completion.complete}
    />
  );
};
