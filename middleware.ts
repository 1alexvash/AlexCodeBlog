import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const config = {
  matcher: "/admin",
};

export default function middleware(req: NextApiRequest, res: NextApiResponse) {
  //   console.log("widdleware");
  //   return NextResponse.rewrite(new URL("/api/preview/enter", req.url));
}
