"use client";

import { useParams } from "next/navigation";

import type { SectionKey } from "@/features/ifu-wizard/types";

import { SECTION_CATALOGUE } from "../catalogue";
import type { SectionProgressState } from "../types";
import { useSectionsStore } from "./SectionsStore.context";

export interface SectionNavItem {
  key: SectionKey;
  number: number;
  title: string;
  state: SectionProgressState;
  isComplete: boolean;
  /** Every applicable section is required in v1 (REQUIREMENTS §7). */
  isRequired: boolean;
}

/** Nav items + progress for the left section list (FR-S3-01). */
export const useSectionProgress = (applicable: SectionKey[]) => {
  const params = useParams<{ id: string; sectionKey?: string }>();
  const { complete } = useSectionsStore();
  const currentKey = params.sectionKey as SectionKey | undefined;

  const items: SectionNavItem[] = applicable.map((key, index) => {
    const isComplete = complete[key] === true;
    return {
      key,
      number: index + 1,
      title: SECTION_CATALOGUE[key].title,
      isComplete,
      isRequired: true,
      state: key === currentKey ? "current" : isComplete ? "complete" : "not_started",
    };
  });

  const completedCount = items.filter((item) => item.isComplete).length;

  return {
    documentId: params.id,
    currentKey,
    items,
    completedCount,
    totalCount: items.length,
    allRequiredComplete: items.every((item) => !item.isRequired || item.isComplete),
  };
};
