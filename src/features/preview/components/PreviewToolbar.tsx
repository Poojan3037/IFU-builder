"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Download, Minus, Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import type { PreviewMode, PreviewViewMode } from "../types";
import { ViewModeToggle } from "./ViewModeToggle";

interface PreviewToolbarProps {
  documentId: string;
  mode: PreviewMode;
  viewMode: PreviewViewMode;
  onViewModeChange: (value: PreviewViewMode) => void;
  activePage: number;
  pageCount: number;
  zoom: number;
  canZoomIn: boolean;
  canZoomOut: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

export const PreviewToolbar = ({
  documentId,
  mode,
  viewMode,
  onViewModeChange,
  activePage,
  pageCount,
  zoom,
  canZoomIn,
  canZoomOut,
  onZoomIn,
  onZoomOut,
  onResetZoom,
}: PreviewToolbarProps) => (
  <div className="glass sticky top-14 z-30 border-x-0 border-t-0">
    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="sm" className="-ml-2 text-muted-foreground">
          {mode === "view" ? (
            <Link href="/dashboard">
              <ArrowLeft /> <span className="max-sm:sr-only">Back to Dashboard</span>
            </Link>
          ) : (
            <Link href={`/ifu/${documentId}/compliance`}>
              <ArrowLeft /> <span className="max-sm:sr-only">Back to Compliance Check</span>
            </Link>
          )}
        </Button>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <ViewModeToggle value={viewMode} onChange={onViewModeChange} />
        <div className="hidden items-center rounded-full border bg-background/60 sm:flex">
          <Button variant="ghost" size="icon-sm" className="rounded-full" aria-label="Zoom out" disabled={!canZoomOut} onClick={onZoomOut}>
            <Minus />
          </Button>
          <button type="button" onClick={onResetZoom} aria-label="Reset zoom" className="w-12 text-center text-xs font-medium tabular-nums text-muted-foreground hover:text-foreground">
            {Math.round(zoom * 100)}%
          </button>
          <Button variant="ghost" size="icon-sm" className="rounded-full" aria-label="Zoom in" disabled={!canZoomIn} onClick={onZoomIn}>
            <Plus />
          </Button>
        </div>
        <p aria-live="polite" className="hidden min-w-[6.5rem] text-center text-xs font-medium text-muted-foreground md:block">
          Page{" "}
          <span className="relative inline-grid h-4 w-3 overflow-hidden align-bottom tabular-nums text-foreground">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span key={activePage} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} transition={{ duration: 0.2 }}>
                {activePage + 1}
              </motion.span>
            </AnimatePresence>
          </span>{" "}
          of {pageCount}
        </p>
      </div>

      <Button asChild size="sm" className="h-8 px-3.5 shadow-md shadow-primary/20">
        <Link href={`/ifu/${documentId}/export`}>
          <Download /> {mode === "view" ? "Export" : "Export as PDF"}
        </Link>
      </Button>
    </div>
  </div>
);
