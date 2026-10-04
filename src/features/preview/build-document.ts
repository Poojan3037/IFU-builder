import { LICENCE_TYPE_META } from "@/features/ifu-wizard/constants";
import { getApplicableSections } from "@/features/ifu-wizard/rules/applicability";
import type { IfuDocument, SectionKey } from "@/features/ifu-wizard/types";
import { SECTION_CATALOGUE } from "@/features/sections/catalogue";
import { MOCK_SECTION_CONTENT, MOCK_STRUCTURED } from "@/features/sections/mock-data";
import { formatDate } from "@/lib/dates";

import { PREVIEW_FALLBACK_CONTENT, STERILISATION_METHOD_LABELS } from "./mock-data";
import type { PreviewBlock, PreviewMeta, PreviewPage, PreviewSection } from "./types";

const fieldText = (key: SectionKey, fieldKey: string): string =>
  MOCK_SECTION_CONTENT[key]?.fields[fieldKey]?.trim() || PREVIEW_FALLBACK_CONTENT[key]?.[fieldKey] || "";

const manufacturerBlocks = (doc: IfuDocument): PreviewBlock[] => {
  const address = [doc.manufacturerAddress, doc.manufacturerState, doc.manufacturerPin, doc.manufacturerCountry]
    .filter(Boolean)
    .join(", ");
  const blocks: PreviewBlock[] = [
    { label: "Manufacturer", text: `${doc.manufacturerName}\n${address}` },
    { label: LICENCE_TYPE_META[doc.licenceType].numberLabel, text: doc.licenceNumber || "—" },
    { label: "Customer care", text: [doc.customerCarePhone, doc.customerCareEmail].filter(Boolean).join(" · ") },
  ];
  if (doc.manufacturerType === "IMPORTER") {
    blocks.splice(1, 0, { label: "Importer", text: `${doc.importerName}\n${doc.importerAddress}` });
  }
  return blocks;
};

/** Structured values (FR-S3-05) render into the IFU text automatically. */
const structuredBlocks = (key: SectionKey): PreviewBlock[] => {
  if (key === "sterilisation") {
    const method = STERILISATION_METHOD_LABELS[MOCK_STRUCTURED.sterilisationMethod] ?? "a validated method";
    return [{ label: "Sterilisation method", text: `Sterilised using ${method}.` }];
  }
  if (key === "storage") {
    const { tempMin, tempMax, humidity, lightSensitive } = MOCK_STRUCTURED.storage;
    return [
      {
        label: "Storage conditions",
        text: `Store between ${tempMin} °C and ${tempMax} °C. Relative humidity not exceeding ${humidity}%.${lightSensitive ? " Protect from light." : ""}`,
      },
      { label: "Shelf life", text: `${MOCK_STRUCTURED.shelfLifeMonths} months from the date of manufacture. Do not use after the use-by date.` },
    ];
  }
  return [];
};

const sectionBlocks = (doc: IfuDocument, key: SectionKey): PreviewBlock[] => {
  if (key === "manufacturer_licence") return manufacturerBlocks(doc);
  const written = SECTION_CATALOGUE[key].fields
    .map((field) => ({ label: field.label, text: fieldText(key, field.key) }))
    .filter((block) => block.text.length > 0);
  return [...structuredBlocks(key), ...written];
};

/** Same section order and numbering the PDF template uses (FR-PRV-01). */
export const buildPreviewSections = (doc: IfuDocument): PreviewSection[] =>
  getApplicableSections(doc.profile).map((key, index) => ({
    number: index + 1,
    key,
    title: SECTION_CATALOGUE[key].title,
    blocks: sectionBlocks(doc, key),
  }));

const FIRST_PAGE_SECTIONS = 2;
const SECTIONS_PER_PAGE = 3;

/** Deterministic pagination: the title page holds fewer sections than the rest. */
export const paginate = (sections: PreviewSection[]): PreviewPage[] => {
  const pages: PreviewPage[] = [{ index: 0, hasTitle: true, sections: sections.slice(0, FIRST_PAGE_SECTIONS) }];
  for (let start = FIRST_PAGE_SECTIONS; start < sections.length; start += SECTIONS_PER_PAGE) {
    pages.push({ index: pages.length, hasTitle: false, sections: sections.slice(start, start + SECTIONS_PER_PAGE) });
  }
  return pages;
};

export const buildPreviewMeta = (doc: IfuDocument): PreviewMeta => ({
  deviceName: doc.deviceName,
  modelNumber: doc.modelNumber,
  manufacturerName: doc.manufacturerName,
  version: doc.version,
  issueDate: formatDate(doc.issueDate),
});
