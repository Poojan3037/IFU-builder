"use client";

import type { ReactNode } from "react";

import { useAutosaveStatus } from "./AutosaveStatus.context";
import { useSavedLabel, useWizardStep } from "./WizardShell.hooks";
import { WizardShellPresentation } from "./WizardShell.presentation";

interface WizardShellContainerProps {
  documentId: string;
  deviceName: string;
  maxReachableIndex: number;
  children: ReactNode;
}

export const WizardShellContainer = ({ documentId, deviceName, maxReachableIndex, children }: WizardShellContainerProps) => {
  const { stepIndex, direction } = useWizardStep();
  const { status } = useAutosaveStatus();
  const savedLabel = useSavedLabel(status.savedAt);

  return (
    <WizardShellPresentation
      documentId={documentId}
      deviceName={deviceName}
      stepIndex={stepIndex}
      direction={direction}
      maxReachableIndex={Math.max(maxReachableIndex, stepIndex)}
      autosave={{ state: status.state, label: savedLabel }}
    >
      {children}
    </WizardShellPresentation>
  );
};
