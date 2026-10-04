import type { PreviewMeta } from "../types";

interface PageHeaderProps {
  meta: PreviewMeta;
}

/** Running page header (FR-PRV-03). Logo upload is a later phase, so v1 shows a placeholder. */
export const PageHeader = ({ meta }: PageHeaderProps) => (
  <div className="flex items-center justify-between border-b border-[oklch(0.9_0.01_250)] pb-[0.8em] font-sans text-[0.72em] text-[oklch(0.5_0.02_250)]">
    <span className="grid h-[2.4em] w-[6.5em] place-items-center rounded-[0.3em] border border-dashed border-[oklch(0.8_0.02_250)] text-[0.85em] font-medium uppercase tracking-widest text-[oklch(0.65_0.02_250)]">
      Logo
    </span>
    <span>
      Document {meta.version} · Issued {meta.issueDate}
    </span>
  </div>
);

interface PageFooterProps {
  meta: PreviewMeta;
  pageNumber: number;
  pageCount: number;
}

export const PageFooter = ({ meta, pageNumber, pageCount }: PageFooterProps) => (
  <div className="flex items-center justify-between border-t border-[oklch(0.9_0.01_250)] pt-[0.8em] font-sans text-[0.72em] text-[oklch(0.5_0.02_250)]">
    <span className="truncate pr-[1em]">
      {meta.deviceName} · {meta.version}
    </span>
    <span className="shrink-0 tabular-nums">
      Page {pageNumber} of {pageCount}
    </span>
  </div>
);
