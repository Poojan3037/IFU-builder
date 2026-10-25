import type { SectionKey } from "@/features/ifu-wizard/types";

import { SECTION_CATALOGUE } from "./catalogue";
import type { StructuredValues } from "./schema";
import { EMPTY_STRUCTURED } from "./structured";
import { textToHtml } from "./text";

/** `IfuSection.fields` holds `{ [fieldKey]: html, _structured: {...} }`. */
export const STRUCTURED_FIELD_KEY = "_structured";

export interface SectionContent {
  fields: Record<string, string>;
  isComplete: boolean;
}

export type SectionContentMap = Partial<Record<SectionKey, SectionContent>>;

export interface StoredSectionRow {
  key: SectionKey;
  fields: unknown;
  isComplete: boolean;
}

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);

const numberOrNull = (value: unknown): number | null | undefined =>
  value === null ? null : typeof value === "number" && Number.isFinite(value) ? value : undefined;

/** Defensive parse: stored JSON is untrusted-by-shape, so bad values fall back to "unset". */
const parseStructured = (raw: unknown): Partial<StructuredValues> => {
  if (!isRecord(raw)) return {};
  const parsed: Partial<StructuredValues> = {};
  const tempMin = numberOrNull(raw.tempMin);
  const tempMax = numberOrNull(raw.tempMax);
  const humidity = numberOrNull(raw.humidity);
  const shelfLifeMonths = numberOrNull(raw.shelfLifeMonths);
  if (tempMin !== undefined) parsed.tempMin = tempMin;
  if (tempMax !== undefined) parsed.tempMax = tempMax;
  if (humidity !== undefined) parsed.humidity = humidity;
  if (shelfLifeMonths !== undefined) parsed.shelfLifeMonths = shelfLifeMonths;
  if (typeof raw.lightSensitive === "boolean") parsed.lightSensitive = raw.lightSensitive;
  if (raw.sterilisationMethod === null || typeof raw.sterilisationMethod === "string") parsed.sterilisationMethod = raw.sterilisationMethod;
  return parsed;
};

/**
 * Turns stored rows into section content plus the document-wide structured values.
 * Device description is pre-filled from Step 1 until the user has saved that field (FR S1 "Brief description").
 */
export const readSections = (rows: StoredSectionRow[], briefDescription: string) => {
  const content: SectionContentMap = {};
  let structured: StructuredValues = { ...EMPTY_STRUCTURED };

  for (const row of rows) {
    const raw = isRecord(row.fields) ? row.fields : {};
    const fields: Record<string, string> = {};
    for (const field of SECTION_CATALOGUE[row.key].fields) {
      const value = raw[field.key];
      if (typeof value === "string") fields[field.key] = value;
    }
    content[row.key] = { fields, isComplete: row.isComplete };
    structured = { ...structured, ...parseStructured(raw[STRUCTURED_FIELD_KEY]) };
  }

  const description = content.device_description;
  if (briefDescription.trim() !== "" && description?.fields.description === undefined) {
    content.device_description = {
      fields: { ...description?.fields, description: textToHtml(briefDescription) },
      isComplete: description?.isComplete ?? false,
    };
  }

  return { content, structured };
};
