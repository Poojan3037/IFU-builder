import { z } from "zod";

export const deleteDocumentSchema = z.object({ id: z.string().min(1).max(64) });

/** URL search params, parsed leniently: bad values fall back to defaults instead of erroring. */
export const filtersSchema = z.object({
  q: z.string().trim().max(120).catch(""),
  status: z.enum(["ALL", "DRAFT", "READY", "COMPLETED"]).catch("ALL"),
  risk: z.enum(["ALL", "A", "B", "C", "D"]).catch("ALL"),
  page: z.coerce.number().int().min(1).catch(1),
});
