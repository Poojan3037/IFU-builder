"use client";

import { AnimatePresence, motion } from "motion/react";

import { DisclaimerFooter } from "@/components/shared/DisclaimerFooter";

import type { ComplianceIssue, LooksGoodItem } from "../types";
import { ComplianceActions } from "./ComplianceActions";
import { DismissAdvisoryDialog } from "./DismissAdvisoryDialog";
import { IssueCard } from "./IssueCard";
import { LooksGoodList } from "./LooksGoodList";
import { ScanningState } from "./ScanningState";
import { SummaryBanner } from "./SummaryBanner";

interface ComplianceCheckPresentationProps {
  documentId: string;
  subtitle: string;
  isScanning: boolean;
  blocking: ComplianceIssue[];
  advisory: ComplianceIssue[];
  looksGood: LooksGoodItem[];
  totalSections: number;
  backHref: string;
  pendingIssue: ComplianceIssue | null;
  onRerun: () => void;
  onRequestDismiss: (id: string) => void;
  onCancelDismiss: () => void;
  onConfirmDismiss: (reason: string) => void;
}

export const ComplianceCheckPresentation = ({
  documentId,
  subtitle,
  isScanning,
  blocking,
  advisory,
  looksGood,
  totalSections,
  backHref,
  pendingIssue,
  onRerun,
  onRequestDismiss,
  onCancelDismiss,
  onConfirmDismiss,
}: ComplianceCheckPresentationProps) => {
  const issues = [...blocking, ...advisory];

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Compliance Check</h1>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </header>

      <AnimatePresence mode="wait">
        {isScanning ? (
          <ScanningState key="scanning" />
        ) : (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
            <SummaryBanner
              issueCount={issues.length}
              blockingCount={blocking.length}
              goodCount={looksGood.length}
              totalSections={totalSections}
            />
            {issues.length > 0 && (
              <section aria-labelledby="issues-title">
                <h2 id="issues-title" className="sr-only">
                  Issues
                </h2>
                <motion.ul layout className="flex flex-col gap-3">
                  <AnimatePresence mode="popLayout">
                    {issues.map((issue, index) => (
                      <IssueCard
                        key={issue.id}
                        issue={issue}
                        index={index}
                        documentId={documentId}
                        onDismiss={issue.severity === "ADVISORY" ? onRequestDismiss : undefined}
                      />
                    ))}
                  </AnimatePresence>
                </motion.ul>
              </section>
            )}
            <LooksGoodList items={looksGood} />
          </motion.div>
        )}
      </AnimatePresence>

      <ComplianceActions
        backHref={backHref}
        previewHref={`/ifu/${documentId}/preview`}
        canContinue={!isScanning && blocking.length === 0}
        isScanning={isScanning}
        onRerun={onRerun}
      />
      <DisclaimerFooter />
      <DismissAdvisoryDialog issue={pendingIssue} onCancel={onCancelDismiss} onConfirm={onConfirmDismiss} />
    </div>
  );
};
