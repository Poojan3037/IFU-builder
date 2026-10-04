"use client";

import type { ReactNode } from "react";

import { useWizardStep } from "./WizardShell.hooks";
import { WizardShellPresentation } from "./WizardShell.presentation";

interface WizardShellContainerProps {
  documentId: string;
  deviceName: string;
  maxReachableIndex: number;
  children: ReactNode;
}

export const WizardShellContainer = ({ documentId, deviceName, maxReachableIndex, children }: WizardShellContainerProps) => {
  const { stepIndex, direction } = useWizardStep();

  return (
    <WizardShellPresentation
      documentId={documentId}
      deviceName={deviceName}
      stepIndex={stepIndex}
      direction={direction}
      maxReachableIndex={Math.max(maxReachableIndex, stepIndex)}
    >
      {children}
    </WizardShellPresentation>
  );
};
