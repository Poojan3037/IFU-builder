import { STERILISATION_METHODS } from "./constants";
import type { StructuredValues } from "./schema";
import type { SectionStructuredKind } from "./types";

export const EMPTY_STRUCTURED: StructuredValues = {
  tempMin: null,
  tempMax: null,
  humidity: null,
  lightSensitive: false,
  sterilisationMethod: null,
  shelfLifeMonths: null,
};

const KEYS_BY_KIND: Record<SectionStructuredKind, (keyof StructuredValues)[]> = {
  storage: ["tempMin", "tempMax", "humidity", "lightSensitive"],
  shelfLife: ["shelfLifeMonths"],
  sterilisation: ["sterilisationMethod"],
};

/** Structured keys a section owns, so one section's save can never overwrite another's values. */
export const getStructuredKeys = (kinds: SectionStructuredKind[] = []): (keyof StructuredValues)[] =>
  kinds.flatMap((kind) => KEYS_BY_KIND[kind]);

export const pickStructured = (values: StructuredValues, kinds: SectionStructuredKind[] = []): Partial<StructuredValues> =>
  Object.fromEntries(getStructuredKeys(kinds).map((key) => [key, values[key]]));

const METHOD_PHRASES: Record<string, string> = {
  EO: "ethylene oxide",
  GAMMA: "gamma irradiation",
  STEAM: "moist heat (steam)",
  E_BEAM: "electron beam irradiation",
};

export const getSterilisationMethodLabel = (method: string): string =>
  STERILISATION_METHODS.find((m) => m.value === method)?.label ?? method;

export interface StructuredText {
  label: string;
  text: string;
}

/** Structured values render into the IFU text automatically (FR-S3-05). */
export const renderStructuredText = (kinds: SectionStructuredKind[] = [], values: StructuredValues): StructuredText[] => {
  const blocks: StructuredText[] = [];

  if (kinds.includes("sterilisation") && values.sterilisationMethod) {
    const phrase = METHOD_PHRASES[values.sterilisationMethod];
    blocks.push({ label: "Sterilisation method", text: phrase ? `Sterilised using ${phrase}.` : "Sterilised using a validated method." });
  }

  if (kinds.includes("storage")) {
    const parts: string[] = [];
    if (values.tempMin !== null && values.tempMax !== null) parts.push(`Store between ${values.tempMin} °C and ${values.tempMax} °C.`);
    else if (values.tempMax !== null) parts.push(`Store at or below ${values.tempMax} °C.`);
    else if (values.tempMin !== null) parts.push(`Store at or above ${values.tempMin} °C.`);
    if (values.humidity !== null) parts.push(`Relative humidity not exceeding ${values.humidity}%.`);
    if (values.lightSensitive) parts.push("Protect from light.");
    if (parts.length > 0) blocks.push({ label: "Storage conditions", text: parts.join(" ") });
  }

  if (kinds.includes("shelfLife") && values.shelfLifeMonths !== null) {
    blocks.push({
      label: "Shelf life",
      text: `${values.shelfLifeMonths} months from the date of manufacture. Do not use after the use-by date.`,
    });
  }

  return blocks;
};

export type StructuredErrors = Partial<Record<keyof StructuredValues, string>>;

/** "Mark Complete" rules for structured inputs, shared by the form and the Server Action (FR-S3-06). */
export const validateStructured = (kinds: SectionStructuredKind[] = [], values: StructuredValues): StructuredErrors => {
  const errors: StructuredErrors = {};
  if (kinds.includes("storage")) {
    if (values.tempMin === null) errors.tempMin = "Enter a minimum temperature";
    if (values.tempMax === null) errors.tempMax = "Enter a maximum temperature";
    if (values.tempMin !== null && values.tempMax !== null && values.tempMin > values.tempMax) errors.tempMax = "Must be at least the minimum";
  }
  if (kinds.includes("shelfLife") && values.shelfLifeMonths === null) errors.shelfLifeMonths = "Enter the shelf life";
  if (kinds.includes("sterilisation") && !values.sterilisationMethod) errors.sterilisationMethod = "Choose a sterilisation method";
  return errors;
};
