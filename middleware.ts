import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth";

export default async function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const session = await getSession();
  const isLoggedIn = !!session;
  const isAuthRoute = nextUrl.pathname.startsWith("/auth");
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
  runtime: "nodejs",
};
