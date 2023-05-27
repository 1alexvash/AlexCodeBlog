import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

let previousValue: string;
let initializedPage: { [key: string]: boolean } = {
  admin: false,
  client: false,
};

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;

  if (url === "/admin") {
    if (!initializedPage.admin) {
      initializedPage.admin = true;
      return NextResponse.redirect(
        new URL("/api/preview/enter?next=/admin", request.url)
      );
    }
    previousValue = "admin";
    initializedPage.client = false;
    return NextResponse.next();
  }

  if (url === "/") {
    if (!initializedPage.client && previousValue === "client") {
      initializedPage.client = true;
      return NextResponse.redirect(
        new URL("/api/preview/exit?next=/", request.url)
      );
    }
    previousValue = "client";
    initializedPage.admin = false;
    return NextResponse.next();
  }
}
