import { z } from "zod";

export const runCheckSchema = z.object({
  documentId: z.string().min(1).max(64),
});

export type RunCheckInput = z.infer<typeof runCheckSchema>;
