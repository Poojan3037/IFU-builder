"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { MOCK_ISSUES } from "../mock-data";
import { SCAN_DURATION_MS } from "../constants";
import type { ComplianceIssue } from "../types";

/** Simulated server-side compliance run (FR-CMP-01): scans on entry and on re-run. */
export const useComplianceRun = (passed: boolean) => {
  const [runId, setRunId] = useState(0);
  const [isScanning, setIsScanning] = useState(true);

  // Finish the fake scan after a short delay; restarts whenever a re-run bumps runId.
  useEffect(() => {
    const timer = setTimeout(() => setIsScanning(false), SCAN_DURATION_MS);
    return () => clearTimeout(timer);
  }, [runId]);

  const rerun = () => {
    setIsScanning(true);
    setRunId((id) => id + 1);
  };

  return { isScanning, rerun, issues: passed ? [] : MOCK_ISSUES };
};

/** Dismissal of advisory issues with an optional reason (FR-CMP-07). */
export const useAdvisoryDismissals = (issues: ComplianceIssue[]) => {
  const [dismissed, setDismissed] = useState<Record<string, string>>({});
  const [pendingId, setPendingId] = useState<string | null>(null);

  const confirmDismiss = (reason: string) => {
    if (!pendingId) return;
    setDismissed((prev) => ({ ...prev, [pendingId]: reason }));
    setPendingId(null);
    toast.success("Advisory dismissed", { description: "Recorded in this version's audit trail." });
  };

  const visible = issues.filter((issue) => !(issue.id in dismissed));
  const blocking = visible.filter((issue) => issue.severity === "BLOCKING");
  const advisory = visible.filter((issue) => issue.severity === "ADVISORY");

  return {
    blocking,
    advisory,
    dismissedCount: Object.keys(dismissed).length,
    pendingIssue: issues.find((issue) => issue.id === pendingId) ?? null,
    requestDismiss: setPendingId,
    cancelDismiss: () => setPendingId(null),
    confirmDismiss,
  };
};
