import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

const AUTH_PAGES = ["/login", "/signup"];

/** Optimistic, cookie-only gate. Real authorization lives in `requireSession`. */
export const proxy = (request: NextRequest) => {
  const { pathname, search } = request.nextUrl;
  const hasSession = Boolean(getSessionCookie(request));

  if (hasSession && AUTH_PAGES.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (!hasSession && !AUTH_PAGES.includes(pathname)) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", pathname + search);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
};

export const config = { matcher: ["/dashboard/:path*", "/profile/:path*", "/ifu/:path*", "/login", "/signup"] };
