"use client";

import { motion } from "motion/react";

import { EASE_OUT_EXPO } from "@/lib/motion";

import type { PreviewMeta, PreviewPage } from "../types";
import { PageFooter, PageHeader } from "./PageChrome";
import { PageContent } from "./PageContent";

interface A4PageProps {
  page: PreviewPage;
  pageCount: number;
  meta: PreviewMeta;
  zoom: number;
}

/** Base A4 width at 96 dpi; the page scales with its container via `cqw` font sizing. */
const A4_WIDTH_PX = 794;

export const A4Page = ({ page, pageCount, meta, zoom }: A4PageProps) => (
  <motion.article
    data-preview-page={page.index}
    aria-label={`Page ${page.index + 1} of ${pageCount}`}
    initial={{ opacity: 0, y: 32, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
    style={{ maxWidth: A4_WIDTH_PX * zoom }}
    className="@container mx-auto w-full"
  >
    <div className="relative aspect-[210/297] overflow-hidden rounded-[0.35rem] bg-paper font-serif text-paper-foreground shadow-[0_1px_2px_oklch(0_0_0/0.06),0_12px_40px_-12px_oklch(0.3_0.05_240/0.35)] ring-1 ring-black/5">
      <div className="absolute inset-0 flex flex-col px-[3.6em] py-[2.8em] text-[1.4cqw]">
        <PageHeader meta={meta} />
        <div className="flex-1 overflow-hidden pt-[1.8em]">
          <PageContent page={page} meta={meta} />
        </div>
        <PageFooter meta={meta} pageNumber={page.index + 1} pageCount={pageCount} />
      </div>
    </div>
  </motion.article>
);
