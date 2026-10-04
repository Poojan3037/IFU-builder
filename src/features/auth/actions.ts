"use server";

import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import { safeNext } from "./redirect";
import { loginSchema, signupSchema } from "./schema";
import type { ActionResult } from "./types";

const LOGIN_ERROR = "Email or password is incorrect.";

export const signInEmailAction = async (input: unknown): Promise<ActionResult> => {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: LOGIN_ERROR };

  try {
    await auth.api.signInEmail({
      body: { email: parsed.data.email, password: parsed.data.password, rememberMe: parsed.data.rememberMe },
      headers: await headers(),
    });
    return { success: true, data: null };
  } catch (error) {
    if (error instanceof APIError) return { success: false, error: LOGIN_ERROR };
    return { success: false, error: "Something went wrong. Please try again." };
  }
};

export const signUpEmailAction = async (input: unknown): Promise<ActionResult> => {
  const parsed = signupSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };

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
    return { success: true, data: null };
  } catch (error) {
    if (error instanceof APIError) {
      return { success: false, error: "We couldn't create that account. Try logging in instead." };
    }
    return { success: false, error: "Something went wrong. Please try again." };
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
    return { success: false, error: "Google sign-in is unavailable right now." };
  }
  if (!url) return { success: false, error: "Google sign-in is unavailable right now." };
  redirect(url);
};

export const signOutAction = async () => {
  await auth.api.signOut({ headers: await headers() });
  redirect("/login");
};
