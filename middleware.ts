import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  return NextResponse.redirect(
    new URL("/admin/index.html#/~/adminPortal/", request.url)
  );
}

export const config = {
  matcher: "/admin",
};
