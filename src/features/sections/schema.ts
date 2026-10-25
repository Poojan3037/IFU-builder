import { z } from "zod";

import type { SectionKey } from "@/features/ifu-wizard/types";

import { SECTION_ORDER } from "./catalogue";
import { MAX_FIELD_CHARS, STERILISATION_METHODS } from "./constants";
import { htmlToPlainText } from "./text";
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

const overLimitMessage = (label: string) => `${label} is limited to ${MAX_FIELD_CHARS.toLocaleString("en-IN")} characters`;

/** Limits are on visible characters, not markup (FR-S3-11). */
const buildDraftFieldSchema = (field: SectionFieldDef) =>
  z.string().superRefine((html, ctx) => {
    if (htmlToPlainText(html).length > MAX_FIELD_CHARS) ctx.addIssue({ code: "custom", message: overLimitMessage(field.label) });
  });

/** Builds the "Mark Complete" schema for a section from its catalogue field definitions (FR-S3-06). */
export const buildSectionContentSchema = (fields: SectionFieldDef[]) =>
  z.object(
    Object.fromEntries(
      fields.map((field) => [
        field.key,
        z.string().superRefine((html, ctx) => {
          const length = htmlToPlainText(html).length;
          if (length === 0) ctx.addIssue({ code: "custom", message: `${field.label} can't be empty` });
          else if (length < field.minLength)
            ctx.addIssue({ code: "custom", message: `${field.label} needs at least ${field.minLength} characters` });
          else if (length > MAX_FIELD_CHARS) ctx.addIssue({ code: "custom", message: overLimitMessage(field.label) });
        }),
      ]),
    ),
  );

/** Draft saves (autosave, navigation) only enforce the character limit. */
export const buildSectionDraftSchema = (fields: SectionFieldDef[]) =>
  z.object(Object.fromEntries(fields.map((field) => [field.key, buildDraftFieldSchema(field)])));

const sectionKeySchema = z.enum(SECTION_ORDER as [SectionKey, ...SectionKey[]]);

/** Envelope shared by `saveSection` and `markSectionComplete`; per-field rules are applied from the catalogue. */
export const sectionPayloadSchema = z.object({
  documentId: z.string().min(1).max(64),
  sectionKey: sectionKeySchema,
  // Generous raw cap guards the sanitiser; the real 10,000-character limit is on visible text.
  fields: z.record(z.string().max(64), z.string().max(MAX_FIELD_CHARS * 8)),
  structured: structuredValuesSchema,
  /** Debounced autosaves are not audited; explicit saves and completions are. */
  autosave: z.boolean().optional(),
});

export type SectionPayload = z.infer<typeof sectionPayloadSchema>;
