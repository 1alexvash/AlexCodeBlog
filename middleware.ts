import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

let pageInitialized = false;
// let pageInitializedClient = false;

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  if (pageInitialized) {
    return NextResponse.next();
  }
  pageInitialized = true;
  return NextResponse.redirect(
    new URL("/api/preview/enter?slug=/admin", request.url)
  );
  //   if (url === "/admin" && !pageInitialized) {
  //     pageInitialized = true;

  //     return NextResponse.redirect(
  //       new URL("/api/preview/enter?slug=/admin", request.url)
  //     );
  //   }

  //   if (url === "/admin" && pageInitialized) {
  //     pageInitializedClient = false;

  //     return NextResponse.next();
  //   }

  //   if (url === "/" && !pageInitializedClient) {
  //     pageInitializedClient = true;

  //     return NextResponse.redirect(
  //       new URL("/api/preview/exit?slug=/", request.url)
  //     );
  //   }

  //   if (url === "/" && pageInitializedClient) {
  //     pageInitialized = false;

  //     return NextResponse.next();
  //   }
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/admin", "/"],
// };
export const config = {
  matcher: "/admin",
};
