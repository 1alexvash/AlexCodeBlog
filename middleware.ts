import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;

  const isDraftMode = request.cookies.has("__prerender_bypass");
  const isAdminRoot = url === "/admin";
  //   const isRoot =
  //     url === "/" && request.headers.get("Sec-Fetch-Dest") !== "iframe";

  if (isAdminRoot && !isDraftMode) {
    return NextResponse.redirect(new URL("/api/preview/enter", request.url));
  }

  //   if (isRoot && isDraftMode) {
  //     return NextResponse.redirect(new URL("/api/preview/exit", request.url));
  //   }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin"],
};
