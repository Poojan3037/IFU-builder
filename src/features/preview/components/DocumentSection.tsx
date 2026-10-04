import type { PreviewSection } from "../types";

interface DocumentSectionProps {
  section: PreviewSection;
}

export const DocumentSection = ({ section }: DocumentSectionProps) => (
  <section aria-labelledby={`preview-${section.key}`} className="mb-[1.8em] break-inside-avoid">
    <h2 id={`preview-${section.key}`} className="mb-[0.7em] flex items-baseline gap-[0.5em] text-[1.3em] font-semibold leading-tight">
      <span className="font-sans text-[0.8em] tabular-nums text-[oklch(0.5_0.1_210)]">{section.number}.</span>
      {section.title}
    </h2>
    <div className="flex flex-col gap-[0.85em]">
      {section.blocks.map((block) => (
        <div key={block.label}>
          <h3 className="font-sans text-[0.72em] font-semibold uppercase tracking-[0.1em] text-[oklch(0.45_0.02_250)]">
            {block.label}
          </h3>
          <p className="mt-[0.25em] whitespace-pre-line leading-[1.55]">{block.text}</p>
        </div>
      ))}
    </div>
  </section>
);
