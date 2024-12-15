import { auth } from "@/app/auth";
import { NextResponse } from "next/server";

export default auth((request) => {
  const { nextUrl } = request;
  const isLoggedIn = !!request.auth?.user;
  const isAuthRoute = nextUrl.pathname.startsWith("/auth");
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
    return NextResponse.next();
  } else {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/auth/login", nextUrl));
    }
    return NextResponse.next();
  }
});
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
