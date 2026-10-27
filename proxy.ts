import { NextResponse, type NextRequest } from "next/server";

/** `/en/...` serves the English version of the same page; everything else is Danish. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname !== "/en" && !pathname.startsWith("/en/")) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = pathname.slice(3) || "/";
  const headers = new Headers(request.headers);
  headers.set("x-lang", "en");
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  matcher: ["/en", "/en/:path*"],
};
