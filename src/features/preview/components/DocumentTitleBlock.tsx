import type { PreviewMeta } from "../types";

interface DocumentTitleBlockProps {
  meta: PreviewMeta;
}

/** Title block (FR-PRV-04). Sized in `em` so it scales with the page it is rendered on. */
export const DocumentTitleBlock = ({ meta }: DocumentTitleBlockProps) => (
  <header className="mb-[2.2em] border-b-[0.15em] border-[oklch(0.56_0.11_210)] pb-[1.4em]">
    <p className="font-sans text-[0.75em] font-semibold uppercase tracking-[0.18em] text-[oklch(0.5_0.1_210)]">
      {meta.manufacturerName}
    </p>
    <h1 className="mt-[0.4em] text-[2.3em] font-semibold leading-[1.1] tracking-tight">Instructions for Use</h1>
    <p className="mt-[0.5em] text-[1.25em] leading-snug text-[oklch(0.35_0.02_250)]">
      {meta.deviceName} — Model {meta.modelNumber}
    </p>
    <p className="mt-[0.9em] font-sans text-[0.75em] text-[oklch(0.5_0.02_250)]">
      Read all instructions, warnings and precautions carefully before use.
    </p>
  </header>
);
