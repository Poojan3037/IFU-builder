"use client";

import { motion } from "motion/react";

import { EASE_OUT_EXPO } from "@/lib/motion";

import type { PreviewMeta, PreviewPage } from "../types";
import { PageHeader } from "./PageChrome";
import { PageContent } from "./PageContent";

interface DocumentRendererProps {
  pages: PreviewPage[];
  meta: PreviewMeta;
  zoom: number;
}

const BASE_FONT_PX = 15;

/** Continuous-scroll Document View. Page chunks keep their boundaries so the page indicator still works. */
export const DocumentRenderer = ({ pages, meta, zoom }: DocumentRendererProps) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
    style={{ fontSize: BASE_FONT_PX * zoom }}
    className="mx-auto w-full max-w-[52em] rounded-xl bg-paper font-serif text-paper-foreground shadow-[0_1px_2px_oklch(0_0_0/0.06),0_16px_48px_-16px_oklch(0.3_0.05_240/0.35)] ring-1 ring-black/5"
  >
    <div className="px-[1.5em] py-[1.75em] sm:px-[3em] sm:py-[2.75em]">
      <PageHeader meta={meta} />
      {pages.map((page) => (
        <div key={page.index} data-preview-page={page.index} className="pt-[1.8em]">
          {page.index > 0 && (
            <div aria-hidden className="-mx-[1.5em] mb-[2em] flex items-center gap-[0.75em] sm:-mx-[3em]">
              <span className="h-px flex-1 border-t border-dashed border-[oklch(0.85_0.01_250)]" />
              <span className="font-sans text-[0.65em] uppercase tracking-[0.2em] text-[oklch(0.6_0.02_250)]">
                Page {page.index + 1}
              </span>
              <span className="h-px flex-1 border-t border-dashed border-[oklch(0.85_0.01_250)]" />
            </div>
          )}
          <PageContent page={page} meta={meta} />
        </div>
      ))}
    </div>
  </motion.article>
);
