"use client";

import { AnimatePresence, motion } from "motion/react";

import { SPRING } from "@/lib/motion";

import type { DeviceSymbol, ExportToggles } from "../types";
import { MiniPage, type MiniPageKind } from "./MiniPage";

interface LiveThumbnailProps {
  toggles: ExportToggles;
  contentPageCount: number;
  symbols: DeviceSymbol[];
}

interface ThumbPage {
  id: string;
  kind: MiniPageKind;
}

const buildPages = (toggles: ExportToggles, contentPageCount: number): ThumbPage[] => [
  ...(toggles.coverPage ? [{ id: "cover", kind: "cover" as const }] : []),
  ...Array.from({ length: Math.min(contentPageCount, 2) }, (_, index) => ({ id: `content-${index}`, kind: "content" as const })),
  ...(toggles.symbolGlossary ? [{ id: "glossary", kind: "glossary" as const }] : []),
];

/** Mini A4 stack that reacts live to the export toggles. */
export const LiveThumbnail = ({ toggles, contentPageCount, symbols }: LiveThumbnailProps) => {
  const pages = buildPages(toggles, contentPageCount);
  const totalPages = contentPageCount + (toggles.coverPage ? 1 : 0) + (toggles.symbolGlossary ? 1 : 0);

  return (
    <figure className="flex flex-col gap-4">
      <div
        aria-hidden
        className="relative grid min-h-52 place-items-center overflow-hidden rounded-xl bg-[radial-gradient(ellipse_at_center,var(--accent),transparent_70%)] bg-muted/50 px-4 py-6"
      >
        <motion.div layout className="flex items-center justify-center">
          <AnimatePresence mode="popLayout" initial={false}>
            {pages.map((page, index) => (
              <motion.div
                key={page.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: (index - (pages.length - 1) / 2) * 3 }}
                exit={{ opacity: 0, y: -16, scale: 0.85 }}
                transition={SPRING.soft}
                style={{ zIndex: pages.length - index }}
                className="relative -mx-2 w-[5.5rem] first:ml-0 last:mr-0"
              >
                <MiniPage kind={page.kind} pageLabel={page.kind === "glossary" ? "Symbols" : page.kind === "cover" ? "Cover" : `p.${index + 1}`} symbols={symbols} />
                <AnimatePresence>
                  {toggles.watermark && (
                    <motion.span
                      initial={{ opacity: 0, scale: 1.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.35 }}
                      className="pointer-events-none absolute inset-0 grid place-items-center"
                    >
                      <span className="-rotate-[35deg] font-sans text-[15px] font-black tracking-widest text-[oklch(0.58_0.22_25)]/35">DRAFT</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <figcaption className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
        <span className="font-medium text-foreground tabular-nums">{totalPages} pages</span>
        <span aria-hidden>·</span> A4 <span aria-hidden>·</span> English
        {toggles.watermark && (
          <>
            <span aria-hidden>·</span>
            <span className="text-danger-soft-foreground">Watermarked</span>
          </>
        )}
      </figcaption>
    </figure>
  );
};
