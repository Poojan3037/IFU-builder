const DEFAULT_REDIRECT = "/dashboard";

/** Only allow same-origin relative paths to prevent open redirects. */
export const safeNext = (next: string | null | undefined) =>
  next && next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/\\") ? next : DEFAULT_REDIRECT;
