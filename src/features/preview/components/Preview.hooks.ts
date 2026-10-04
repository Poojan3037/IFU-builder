"use client";

import { useEffect, useRef, useState } from "react";

import type { PreviewViewMode } from "../types";

/** Tracks which `[data-preview-page]` element crosses the middle of the viewport (FR-PRV-05). */
export const useActivePage = (viewMode: PreviewViewMode, zoom: number) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);

  // IntersectionObserver subscription; re-attached when the rendered pages change.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const nodes = container.querySelectorAll<HTMLElement>("[data-preview-page]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActivePage(Number((visible.target as HTMLElement).dataset.previewPage));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [viewMode, zoom]);

  return { containerRef, activePage };
};

export const ZOOM_LEVELS = [0.75, 0.9, 1, 1.1, 1.25] as const;

export const useZoom = () => {
  const [index, setIndex] = useState(2);
  return {
    zoom: ZOOM_LEVELS[index],
    canZoomIn: index < ZOOM_LEVELS.length - 1,
    canZoomOut: index > 0,
    zoomIn: () => setIndex((i) => Math.min(i + 1, ZOOM_LEVELS.length - 1)),
    zoomOut: () => setIndex((i) => Math.max(i - 1, 0)),
    resetZoom: () => setIndex(2),
  };
};
