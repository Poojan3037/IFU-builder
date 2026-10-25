"use client";

import type { ReactNode } from "react";

import type { SectionKey } from "@/features/ifu-wizard/types";

import { useSectionProgress } from "./SectionsWorkspace.hooks";
import { SectionsWorkspacePresentation } from "./SectionsWorkspace.presentation";

interface SectionsWorkspaceContainerProps {
  documentId: string;
  deviceName: string;
  applicable: SectionKey[];
  children: ReactNode;
}

export const SectionsWorkspaceContainer = ({ documentId, deviceName, applicable, children }: SectionsWorkspaceContainerProps) => {
  const { items, completedCount, totalCount, allRequiredComplete } = useSectionProgress(applicable);

  return (
    <SectionsWorkspacePresentation
      documentId={documentId}
      deviceName={deviceName}
      items={items}
      completedCount={completedCount}
      totalCount={totalCount}
      canCheck={allRequiredComplete}
    >
      {children}
    </SectionsWorkspacePresentation>
  );
};
