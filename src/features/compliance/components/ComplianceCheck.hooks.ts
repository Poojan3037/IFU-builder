"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { runCheckAction, type RunCheckData } from "../actions";
import { MIN_SCAN_DISPLAY_MS } from "../constants";
import type { ComplianceIssue } from "../types";

type RunState = { status: "scanning" } | { status: "done"; data: RunCheckData } | { status: "error"; message: string };

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** FR-CMP-01: runs the server-side check on entry and again on every re-run. */
export const useComplianceRun = (documentId: string) => {
  const [runKey, setRunKey] = useState(0);
  const [state, setState] = useState<RunState>({ status: "scanning" });

  // Re-runs whenever `runKey` changes; a stale response from an earlier run is ignored.
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      const [result] = await Promise.all([runCheckAction({ documentId }).catch(() => null), wait(MIN_SCAN_DISPLAY_MS)]);
      if (cancelled) return;
      if (result?.success) {
        setState({ status: "done", data: result.data });
        return;
      }
      const message = result?.error.message ?? "Couldn't reach the server. Check your connection and try again.";
      setState({ status: "error", message });
      toast.error(message);
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [documentId, runKey]);

  const rerun = () => {
    setState({ status: "scanning" });
    setRunKey((key) => key + 1);
  };

  return {
    isScanning: state.status === "scanning",
    error: state.status === "error" ? state.message : null,
    data: state.status === "done" ? state.data : null,
    rerun,
  };
};

/** Dismissal of advisory issues with an optional reason (FR-CMP-07). Persisting dismissals is task 7.10 (Phase 2). */
export const useAdvisoryDismissals = (issues: ComplianceIssue[]) => {
  const [dismissed, setDismissed] = useState<Record<string, string>>({});
  const [pendingId, setPendingId] = useState<string | null>(null);

  const confirmDismiss = (reason: string) => {
    if (!pendingId) return;
    setDismissed((prev) => ({ ...prev, [pendingId]: reason }));
    setPendingId(null);
    toast.success("Advisory dismissed", { description: "It won't block export. Dismissals reset when you re-run the check." });
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
