"use client";

import { RISK_CLASS_META } from "@/features/ifu-wizard/constants";
import { DEMO_DOCUMENT } from "@/features/ifu-wizard/mock-data";
import { getApplicableSections } from "@/features/ifu-wizard/rules/applicability";

import { CATEGORY_CONTEXT } from "../constants";
import { MOCK_LOOKS_GOOD, MOCK_LOOKS_GOOD_PASSED } from "../mock-data";
import { useAdvisoryDismissals, useComplianceRun } from "./ComplianceCheck.hooks";
import { ComplianceCheckPresentation } from "./ComplianceCheck.presentation";

interface ComplianceCheckContainerProps {
  documentId: string;
  /** Demo switch (?state=passed) to show the "All checks passed" variant. */
  passed: boolean;
}

export const ComplianceCheckContainer = ({ documentId, passed }: ComplianceCheckContainerProps) => {
  const { isScanning, rerun, issues } = useComplianceRun(passed);
  const dismissals = useAdvisoryDismissals(issues);
  const doc = DEMO_DOCUMENT;
  const subtitle = `We reviewed your document against MDR 2017 labelling requirements for ${RISK_CLASS_META[doc.riskClass].label} ${CATEGORY_CONTEXT[doc.category]} devices.`;
  const firstIssue = dismissals.blocking[0] ?? dismissals.advisory[0];

  return (
    <ComplianceCheckPresentation
      documentId={documentId}
      subtitle={subtitle}
      isScanning={isScanning}
      blocking={dismissals.blocking}
      advisory={dismissals.advisory}
      looksGood={passed ? MOCK_LOOKS_GOOD_PASSED : MOCK_LOOKS_GOOD}
      totalSections={getApplicableSections(doc.profile).length}
      backHref={`/ifu/${documentId}/sections/${firstIssue?.sectionKey ?? "device_description"}`}
      pendingIssue={dismissals.pendingIssue}
      onRerun={rerun}
      onRequestDismiss={dismissals.requestDismiss}
      onCancelDismiss={dismissals.cancelDismiss}
      onConfirmDismiss={dismissals.confirmDismiss}
    />
  );
};
