"use server";

import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { type ActionResult, fail, fromZodError, ok } from "@/lib/action-result";
import { auth } from "@/lib/auth";
import { t } from "@/lib/i18n";

import { safeNext } from "./redirect";
import { loginSchema, signupSchema } from "./schema";

const LOGIN_ERROR = t("auth.loginFailed");

export const signInEmailAction = async (input: unknown): Promise<ActionResult> => {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) return fail("UNAUTHENTICATED", LOGIN_ERROR);

  try {
    await auth.api.signInEmail({
      body: { email: parsed.data.email, password: parsed.data.password, rememberMe: parsed.data.rememberMe },
      headers: await headers(),
    });
    return ok(null);
  } catch (error) {
    if (error instanceof APIError) return fail("UNAUTHENTICATED", LOGIN_ERROR);
    return fail("INTERNAL", t("errors.generic"));
  }
};

export const signUpEmailAction = async (input: unknown): Promise<ActionResult> => {
  const parsed = signupSchema.safeParse(input);
  if (!parsed.success) return fromZodError(parsed.error, parsed.error.issues[0]?.message);

  try {
    await auth.api.signUpEmail({
      body: {
        name: parsed.data.fullName,
        email: parsed.data.email,
        password: parsed.data.password,
        companyName: parsed.data.companyName || undefined,
      },
      headers: await headers(),
    });
    return ok(null);
  } catch (error) {
    if (error instanceof APIError) {
      return fail("VALIDATION", t("auth.signupFailed"));
    }
    return fail("INTERNAL", t("errors.generic"));
  }
};

export const signInGoogleAction = async (next?: string): Promise<ActionResult> => {
  let url: string | undefined;
  try {
    const response = await auth.api.signInSocial({
      body: { provider: "google", callbackURL: safeNext(next) },
      headers: await headers(),
    });
    url = response.url;
  } catch {
    return fail("INTERNAL", "Google sign-in is unavailable right now.");
  }
  if (!url) return fail("INTERNAL", "Google sign-in is unavailable right now.");
  redirect(url);
};

export const signOutAction = async () => {
  await auth.api.signOut({ headers: await headers() });
  redirect("/login");
};
