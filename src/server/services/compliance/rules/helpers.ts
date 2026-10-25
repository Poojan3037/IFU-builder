import { SECTION_CATALOGUE } from "@/features/sections/catalogue";
import type { SectionKey } from "@/features/ifu-wizard/types";

import type { IfuDocumentSnapshot } from "../types";

export const fieldText = (doc: IfuDocumentSnapshot, section: SectionKey, field: string): string =>
  doc.sections[section]?.fields[field]?.trim() ?? "";

/** All of a section's field text, for phrase and readability checks. */
export const sectionText = (doc: IfuDocumentSnapshot, section: SectionKey): string =>
  SECTION_CATALOGUE[section].fields.map((field) => fieldText(doc, section, field.key)).join("\n");

export const isApplicable = (doc: IfuDocumentSnapshot, section: SectionKey): boolean => doc.applicable.includes(section);

export const isSterile = (doc: IfuDocumentSnapshot) => doc.profile.isSterile === true;
export const isReusable = (doc: IfuDocumentSnapshot) => doc.profile.isReusable === true;
/** Mirrors the "single-use" warning rule in the applicability catalogue (REQUIREMENTS §7). */
export const isSingleUse = (doc: IfuDocumentSnapshot) => doc.profile.isReusable === false && doc.profile.category !== "SAMD";

export const REFERENCE_LABELLING = "MDR 2017, Chapter VI (Rules 44–46) [verify]";
