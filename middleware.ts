import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type PreviousValueType = "admin" | "client";
type InitializedPageType = { [key: string]: boolean };

let previousValue: PreviousValueType = "admin";
let initializedPage: InitializedPageType = {
  admin: false,
  client: false,
};
let isAdmin = false;

export function middleware(request: NextRequest) {
  const url = request.url;

  if (url.includes("/admin")) {
    isAdmin = true;

    if (!initializedPage.admin) {
      initializedPage.admin = true;
      return NextResponse.redirect(new URL("/api/preview/enter", request.url));
    }
    previousValue = "admin";
    initializedPage.client = false;
    isAdmin = false;

    return NextResponse.next();
  }

  if (!isAdmin) {
    if (!initializedPage.client && previousValue === "client") {
      initializedPage.client = true;
      return NextResponse.redirect(new URL("/api/preview/exit", request.url));
    }
    previousValue = "client";
    initializedPage.admin = false;
    return NextResponse.next();
  }
}
