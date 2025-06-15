import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Load public paths from config
import { publicPaths } from "@/constants/auth";
import { pathNames } from "./constants/pathname.const";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  // Handle root path
  if (pathname === "/") {
    if (token) {
      return NextResponse.redirect(new URL(pathNames.dashboard, request.url));
    } else {
      return NextResponse.redirect(new URL(pathNames.login, request.url));
    }
  }

  // Only redirect to dashboard from login page if token exists
  if (
    token &&
    (pathname === pathNames.login || pathname === pathNames.register)
  ) {
    return NextResponse.redirect(new URL(pathNames.dashboard, request.url));
  }

  // If the path is protected and user doesn't have token, redirect to login
  if (!publicPaths.includes(pathname) && !token) {
    const loginUrl = new URL(pathNames.login, request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ["/", "/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
