"use client";

import type { ReactNode } from "react";

import { DEMO_DOCUMENT } from "@/features/ifu-wizard/mock-data";

import { useSectionProgress } from "./SectionsWorkspace.hooks";
import { SectionsWorkspacePresentation } from "./SectionsWorkspace.presentation";

interface SectionsWorkspaceContainerProps {
  children: ReactNode;
}

export const SectionsWorkspaceContainer = ({ children }: SectionsWorkspaceContainerProps) => {
  const { documentId, items, completedCount, totalCount, allRequiredComplete } = useSectionProgress();

  return (
    <SectionsWorkspacePresentation
      documentId={documentId}
      deviceName={DEMO_DOCUMENT.deviceName}
      items={items}
      completedCount={completedCount}
      totalCount={totalCount}
      canCheck={allRequiredComplete}
    >
      {children}
    </SectionsWorkspacePresentation>
  );
};
