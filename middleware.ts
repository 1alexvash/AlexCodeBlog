import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: "/admin",
};

export const middleware = (request: NextRequest) => {
  const url = request.nextUrl.clone();
  url.pathname = "/api/preview/enter";

  return NextResponse.redirect(url);
};
