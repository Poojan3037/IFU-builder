"use client";

import { useState } from "react";

import type { PreviewMeta, PreviewMode, PreviewPage, PreviewViewMode } from "../types";
import { useActivePage, useZoom } from "./Preview.hooks";
import { PreviewPresentation } from "./Preview.presentation";

interface PreviewContainerProps {
  documentId: string;
  mode: PreviewMode;
  meta: PreviewMeta;
  pages: PreviewPage[];
}

export const PreviewContainer = ({ documentId, mode, meta, pages }: PreviewContainerProps) => {
  // Document View reads comfortably on every screen size, so it is the default.
  const [viewMode, setViewMode] = useState<PreviewViewMode>("document");
  const { zoom, canZoomIn, canZoomOut, zoomIn, zoomOut, resetZoom } = useZoom();
  const { containerRef, activePage } = useActivePage(viewMode, zoom);

  return (
    <PreviewPresentation
      documentId={documentId}
      mode={mode}
      meta={meta}
      pages={pages}
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      containerRef={containerRef}
      activePage={activePage}
      zoom={zoom}
      canZoomIn={canZoomIn}
      canZoomOut={canZoomOut}
      onZoomIn={zoomIn}
      onZoomOut={zoomOut}
      onResetZoom={resetZoom}
    />
  );
};
