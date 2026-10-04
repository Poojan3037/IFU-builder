import { z } from "zod";

import { MAX_FIELD_CHARS, STERILISATION_METHODS } from "./constants";
import type { SectionFieldDef } from "./types";

const methodValues = STERILISATION_METHODS.map((m) => m.value) as [string, ...string[]];

export const structuredValuesSchema = z
  .object({
    tempMin: z.number().min(-80).max(60).nullable(),
    tempMax: z.number().min(-80).max(60).nullable(),
    humidity: z.number().min(0).max(100).nullable(),
    lightSensitive: z.boolean(),
    sterilisationMethod: z.enum(methodValues).nullable(),
    shelfLifeMonths: z.number().int().min(1).max(240).nullable(),
  })
  .refine((v) => v.tempMin === null || v.tempMax === null || v.tempMin <= v.tempMax, {
    message: "Minimum temperature must be below the maximum",
    path: ["tempMax"],
  });

export type StructuredValues = z.infer<typeof structuredValuesSchema>;

/** Builds the "Mark Complete" schema for a section from its catalogue field definitions (FR-S3-06). */
export const buildSectionContentSchema = (fields: SectionFieldDef[]) =>
  z.object(
    Object.fromEntries(
      fields.map((field) => [
        field.key,
        z
          .string()
          .trim()
          .min(1, `${field.label} can't be empty`)
          .min(field.minLength, `${field.label} needs at least ${field.minLength} characters`)
          .max(MAX_FIELD_CHARS, `${field.label} is limited to ${MAX_FIELD_CHARS.toLocaleString("en-IN")} characters`),
      ]),
    ),
  );
