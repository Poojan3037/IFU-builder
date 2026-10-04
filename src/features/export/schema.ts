import { z } from "zod";

export const exportOptionsSchema = z.object({
  fileName: z
    .string()
    .trim()
    .min(5, "Enter a file name")
    .max(100, "File name must be 100 characters or fewer")
    .regex(/^[A-Za-z0-9._-]+$/, "Use letters, numbers, dots, dashes and underscores only")
    .refine((value) => value.toLowerCase().endsWith(".pdf"), "File name must end in .pdf"),
  language: z.literal("en"),
  coverPage: z.boolean(),
  symbolGlossary: z.boolean(),
  watermark: z.boolean(),
});

export type ExportOptionsInput = z.infer<typeof exportOptionsSchema>;
