import { NextResponse, type NextRequest } from "next/server";

// Danish is served from the root, English from /en. Both are rewritten onto app/[lang].
const PASS = ["/admin", "/uploads", "/cars", "/_next", "/api"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PASS.some((p) => pathname === p || pathname.startsWith(`${p}/`)) || /\.[a-z0-9]+$/i.test(pathname)) {
    return NextResponse.next();
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) return NextResponse.next();

  // /da is the same as the root, so send it there to keep one URL per page.
  if (pathname === "/da" || pathname.startsWith("/da/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/da${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = { matcher: ["/((?!_next/).*)"] };
