import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

import { auth } from "@/lib/auth";

export const getSession = cache(async () => auth.api.getSession({ headers: await headers() }));

export const requireSession = async (next?: string) => {
  const session = await getSession();
  if (!session) redirect(next ? `/login?next=${encodeURIComponent(next)}` : "/login");
  return session;
};
