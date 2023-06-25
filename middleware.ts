import { NextResponse } from "next/server";

export async function middleware() {
  return NextResponse.redirect("/admin/index.html#/~/adminPortal/");
}

export const config = {
  matcher: "/admin",
};
