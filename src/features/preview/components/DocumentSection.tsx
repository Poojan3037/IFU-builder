import type { PreviewSection } from "../types";

interface DocumentSectionProps {
  section: PreviewSection;
}

/** Sanitised rich-text, styled here because Tailwind's reset removes list markers and spacing. */
const RICH_TEXT_CLASSES =
  "mt-[0.25em] leading-[1.55] [&_p+p]:mt-[0.6em] [&_ul]:list-disc [&_ul]:pl-[1.4em] [&_ol]:list-decimal [&_ol]:pl-[1.4em] [&_li]:mt-[0.2em] [&_u]:underline";

export const DocumentSection = ({ section }: DocumentSectionProps) => (
  <section aria-labelledby={`preview-${section.key}-${section.continued ? "cont" : "start"}`} className="mb-[1.8em] break-inside-avoid">
    <h2
      id={`preview-${section.key}-${section.continued ? "cont" : "start"}`}
      className="mb-[0.7em] flex items-baseline gap-[0.5em] text-[1.3em] font-semibold leading-tight"
    >
      <span className="font-sans text-[0.8em] tabular-nums text-[oklch(0.5_0.1_210)]">{section.number}.</span>
      {section.title}
      {section.continued && <span className="font-sans text-[0.55em] font-normal text-[oklch(0.55_0.02_250)]">(continued)</span>}
    </h2>
    <div className="flex flex-col gap-[0.85em]">
      {section.blocks.map((block, index) => (
        <div key={`${block.label}-${index}`}>
          {block.label && (
            <h3 className="font-sans text-[0.72em] font-semibold uppercase tracking-[0.1em] text-[oklch(0.45_0.02_250)]">{block.label}</h3>
          )}
          {/* Content is allow-list sanitised on the server before storage (NFR-SEC-02). */}
          <div className={RICH_TEXT_CLASSES} dangerouslySetInnerHTML={{ __html: block.html }} />
        </div>
      ))}
    </div>
  </section>
);
