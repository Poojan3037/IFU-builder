"use client";

import { RefreshCw, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

interface DashboardErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/** FR-GLB-04: server errors are shown in plain language, with a way to retry. */
const DashboardError = ({ error, reset }: DashboardErrorProps) => {
  useEffect(() => {
    console.error("Dashboard route error", { digest: error.digest });
  }, [error]);

  return (
    <div role="alert" className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-4 px-4 py-20 text-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-danger-soft text-danger-soft-foreground">
        <TriangleAlert aria-hidden className="size-7" />
      </span>
      <h1 className="text-xl font-semibold tracking-tight">Something went wrong</h1>
      <p className="text-sm text-muted-foreground">
        We couldn&apos;t load this page. Your saved work is safe. Try again, or head back to your documents.
      </p>
      {error.digest && <p className="font-mono text-xs text-muted-foreground">Reference: {error.digest}</p>}
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button onClick={reset}>
          <RefreshCw /> Try again
        </Button>
        <Button asChild variant="outline">
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default DashboardError;
