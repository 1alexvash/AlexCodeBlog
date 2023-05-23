import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

let pageInitializedAdmin = false;
let pageInitializedClient = false;

let previousValue: string;

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;

  if (url === "/admin" && !pageInitializedAdmin) {
    pageInitializedAdmin = true;

    return NextResponse.redirect(
      new URL("/api/preview/enter?slug=/admin", request.url)
    );
  }

  if (url === "/" && !pageInitializedClient && previousValue === "client") {
    pageInitializedClient = true;

    return NextResponse.redirect(
      new URL("/api/preview/exit?slug=/", request.url)
    );
  }

  if (url === "/admin") {
    previousValue = "admin";
  } else {
    previousValue = "client";
  }

  if (url === "/admin" && pageInitializedAdmin) {
    pageInitializedClient = false;

    return NextResponse.next();
  }

  if (url === "/" && pageInitializedClient) {
    pageInitializedAdmin = false;

    return NextResponse.next();
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin", "/"],
};
