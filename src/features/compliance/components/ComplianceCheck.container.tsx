"use client";

import { useAdvisoryDismissals, useComplianceRun } from "./ComplianceCheck.hooks";
import { ComplianceCheckPresentation } from "./ComplianceCheck.presentation";

interface ComplianceCheckContainerProps {
  documentId: string;
  /** FR-CMP-02, built on the server from the document's real category and class. */
  subtitle: string;
  totalSections: number;
}

export const ComplianceCheckContainer = ({ documentId, subtitle, totalSections }: ComplianceCheckContainerProps) => {
  const { isScanning, error, data, rerun } = useComplianceRun(documentId);
  const dismissals = useAdvisoryDismissals(data?.issues ?? []);
  const firstIssue = dismissals.blocking[0] ?? dismissals.advisory[0];

  return (
    <ComplianceCheckPresentation
      documentId={documentId}
      subtitle={subtitle}
      isScanning={isScanning}
      error={error}
      blocking={dismissals.blocking}
      advisory={dismissals.advisory}
      looksGood={data?.looksGood ?? []}
      totalSections={totalSections}
      backHref={`/ifu/${documentId}/sections/${firstIssue?.sectionKey ?? "device_description"}`}
      pendingIssue={dismissals.pendingIssue}
      onRerun={rerun}
      onRequestDismiss={dismissals.requestDismiss}
      onCancelDismiss={dismissals.cancelDismiss}
      onConfirmDismiss={dismissals.confirmDismiss}
    />
  );
};
