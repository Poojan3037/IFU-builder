import type { ZodError } from "zod";

export type ErrorCode = "UNAUTHENTICATED" | "NOT_FOUND" | "VALIDATION" | "RATE_LIMITED" | "INTERNAL";

export interface ActionError {
  code: ErrorCode;
  message: string;
  fieldErrors?: Record<string, string[]>;
}

export type ActionResult<T = null> = { success: true; data: T } | { success: false; error: ActionError };

export const ok = <T>(data: T): ActionResult<T> => ({ success: true, data });

export const fail = (code: ErrorCode, message: string, fieldErrors?: Record<string, string[]>): ActionResult<never> => ({
  success: false,
  error: { code, message, ...(fieldErrors ? { fieldErrors } : {}) },
});

export const fromZodError = (error: ZodError, message = "Please check the highlighted fields."): ActionResult<never> => {
  const fieldErrors: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "_";
    (fieldErrors[key] ??= []).push(issue.message);
  }
  return fail("VALIDATION", message, fieldErrors);
};
