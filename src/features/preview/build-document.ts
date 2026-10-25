import { LICENCE_TYPE_META } from "@/features/ifu-wizard/constants";
import type { LicenceType, ManufacturerType, SectionKey } from "@/features/ifu-wizard/types";
import { SECTION_CATALOGUE } from "@/features/sections/catalogue";
import type { StructuredValues } from "@/features/sections/schema";
import { renderStructuredText } from "@/features/sections/structured";
import type { SectionContentMap } from "@/features/sections/stored";
import { htmlToPlainText, isHtmlEmpty, textToHtml } from "@/features/sections/text";
import { formatDate } from "@/lib/dates";

import { BLOCK_WEIGHT, HEADING_WEIGHT, PAGE_CAPACITY } from "./constants";
import type { PreviewBlock, PreviewMeta, PreviewPage, PreviewSection } from "./types";

/** Everything the document template needs. The PDF template (Phase 2) consumes the same shape. */
export interface DocumentSource {
  deviceName: string;
  modelNumber: string;
  version: string;
  issueDate: string | Date;
  manufacturerType: ManufacturerType;
  manufacturerName: string;
  manufacturerAddress: string;
  manufacturerState: string;
  manufacturerPin: string;
  manufacturerCountry: string;
  licenceType: LicenceType;
  licenceNumber: string;
  importerName: string;
  importerAddress: string;
  importerState: string;
  importerPin: string;
  customerCarePhone: string;
  customerCareEmail: string;
  applicable: SectionKey[];
  content: SectionContentMap;
  structured: StructuredValues;
}

const joinAddress = (...parts: string[]) => parts.filter(Boolean).join(", ");

const manufacturerBlocks = (doc: DocumentSource): PreviewBlock[] => {
  const state = [doc.manufacturerState, doc.manufacturerPin].filter(Boolean).join(" ");
  const blocks: PreviewBlock[] = [
    { label: "Manufacturer", text: `${doc.manufacturerName}\n${joinAddress(doc.manufacturerAddress, state, doc.manufacturerCountry)}` },
    { label: LICENCE_TYPE_META[doc.licenceType].numberLabel, text: doc.licenceNumber || "—" },
    { label: "Customer care", text: [doc.customerCarePhone, doc.customerCareEmail].filter(Boolean).join(" · ") },
  ].map(({ label, text }) => ({ label, html: textToHtml(text) }));

  if (doc.manufacturerType === "IMPORTER") {
    const importerState = [doc.importerState, doc.importerPin].filter(Boolean).join(" ");
    blocks.splice(1, 0, {
      label: "Importer",
      html: textToHtml(`${doc.importerName}\n${joinAddress(doc.importerAddress, importerState, "India")}`),
    });
  }
  return blocks;
};

const sectionBlocks = (doc: DocumentSource, key: SectionKey): PreviewBlock[] => {
  if (key === "manufacturer_licence") return manufacturerBlocks(doc);
  const definition = SECTION_CATALOGUE[key];
  const structured = renderStructuredText(definition.structured, doc.structured).map(({ label, text }) => ({
    label,
    html: textToHtml(text),
  }));
  const written = definition.fields
    .map((field) => ({ label: field.label, html: doc.content[key]?.fields[field.key] ?? "" }))
    .filter((block) => !isHtmlEmpty(block.html));
  return [...structured, ...written];
};

/** Same section order and numbering the PDF template uses (FR-PRV-01). */
export const buildPreviewSections = (doc: DocumentSource): PreviewSection[] =>
  doc.applicable.map((key, index) => ({
    number: index + 1,
    key,
    title: SECTION_CATALOGUE[key].title,
    blocks: sectionBlocks(doc, key),
  }));

/** Sanitised content only has top-level paragraphs and lists, so those are the natural split points. */
const TOP_LEVEL_ELEMENTS = /<(p|ul|ol)>[\s\S]*?<\/\1>/g;

const splitBlock = (block: PreviewBlock, maxWeight: number): PreviewBlock[] => {
  if (htmlToPlainText(block.html).length <= maxWeight) return [block];
  const elements = block.html.match(TOP_LEVEL_ELEMENTS) ?? [block.html];
  const chunks: string[] = [];
  let current = "";
  for (const element of elements) {
    if (current !== "" && htmlToPlainText(current + element).length > maxWeight) {
      chunks.push(current);
      current = "";
    }
    current += element;
  }
  if (current !== "") chunks.push(current);
  return chunks.map((html, index) => ({ label: index === 0 ? block.label : "", html }));
};

/**
 * Deterministic pagination by content weight. Blocks (and oversized blocks, by paragraph or list) flow onto the
 * next page when the current one is full, so long sections continue instead of being clipped in Print Layout.
 */
export const paginate = (sections: PreviewSection[]): PreviewPage[] => {
  const pages: PreviewPage[] = [{ index: 0, hasTitle: true, sections: [] }];
  let used = 0;
  const capacityOf = (page: PreviewPage) => (page.hasTitle ? PAGE_CAPACITY.first : PAGE_CAPACITY.rest);
  const current = () => pages[pages.length - 1];
  const startPage = () => {
    pages.push({ index: pages.length, hasTitle: false, sections: [] });
    used = 0;
  };

  for (const section of sections) {
    let fragment: PreviewSection | null = null;
    let hasPlacedBlock = false;
    const place = (block: PreviewBlock) => {
      const weight = htmlToPlainText(block.html).length + BLOCK_WEIGHT;
      const headingCost = fragment ? 0 : HEADING_WEIGHT;
      if (used > 0 && used + weight + headingCost > capacityOf(current())) {
        startPage();
        fragment = null;
      }
      if (!fragment) {
        fragment = { ...section, blocks: [], continued: hasPlacedBlock || undefined };
        current().sections.push(fragment);
        used += HEADING_WEIGHT;
      }
      fragment.blocks.push(block);
      hasPlacedBlock = true;
      used += weight;
    };

    if (section.blocks.length === 0) {
      // A heading alone still takes space and must land somewhere.
      if (used + HEADING_WEIGHT > capacityOf(current())) startPage();
      current().sections.push({ ...section });
      used += HEADING_WEIGHT;
      continue;
    }
    for (const block of section.blocks.flatMap((b) => splitBlock(b, PAGE_CAPACITY.rest - HEADING_WEIGHT - BLOCK_WEIGHT))) place(block);
  }
  return pages;
};

export const buildPreviewMeta = (doc: DocumentSource): PreviewMeta => ({
  deviceName: doc.deviceName,
  modelNumber: doc.modelNumber,
  manufacturerName: doc.manufacturerName,
  version: doc.version,
  issueDate: formatDate(doc.issueDate),
});
