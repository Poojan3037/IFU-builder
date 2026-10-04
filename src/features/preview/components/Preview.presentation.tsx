"use client";

import { AnimatePresence, motion } from "motion/react";
import { Eye } from "lucide-react";
import type { RefObject } from "react";

import { DisclaimerFooter } from "@/components/shared/DisclaimerFooter";

import type { PreviewMeta, PreviewMode, PreviewPage, PreviewViewMode } from "../types";
import { DocumentRenderer } from "./DocumentRenderer";
import { PreviewToolbar } from "./PreviewToolbar";
import { PrintLayout } from "./PrintLayout";

interface PreviewPresentationProps {
  documentId: string;
  mode: PreviewMode;
  meta: PreviewMeta;
  pages: PreviewPage[];
  viewMode: PreviewViewMode;
  onViewModeChange: (value: PreviewViewMode) => void;
  containerRef: RefObject<HTMLDivElement | null>;
  activePage: number;
  zoom: number;
  canZoomIn: boolean;
  canZoomOut: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

export const PreviewPresentation = ({ documentId, mode, meta, pages, viewMode, onViewModeChange, containerRef, activePage, zoom, ...zoomControls }: PreviewPresentationProps) => (
  <div className="flex flex-1 flex-col">
    <PreviewToolbar
      documentId={documentId}
      mode={mode}
      viewMode={viewMode}
      onViewModeChange={onViewModeChange}
      activePage={activePage}
      pageCount={pages.length}
      zoom={zoom}
      {...zoomControls}
    />

    <div className="relative flex-1 bg-[radial-gradient(ellipse_at_top,var(--accent),transparent_60%)] bg-muted/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col items-center gap-2 text-center">
          {mode === "view" && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-3 py-1 text-xs font-medium text-success-soft-foreground ring-1 ring-inset ring-success/30">
              <Eye aria-hidden className="size-3.5" />
              Viewing exported version {meta.version}
            </span>
          )}
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Live Preview</h1>
          <p className="max-w-xl text-sm text-muted-foreground">
            {mode === "view"
              ? "This is the last exported version of your document. It is read-only."
              : "Exactly what your exported PDF will look like: same order, numbering and typography."}
          </p>
        </div>

        <div ref={containerRef}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={viewMode} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.25 }}>
              {viewMode === "print" ? (
                <PrintLayout pages={pages} meta={meta} zoom={zoom} />
              ) : (
                <DocumentRenderer pages={pages} meta={meta} zoom={zoom} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <DisclaimerFooter className="mx-auto w-full max-w-3xl" />
      </div>
    </div>
  </div>
);
