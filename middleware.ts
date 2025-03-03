import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;

  const isAuthRoute = ["/login", "/register"].includes(req.nextUrl.pathname);
  const isPrivateRoute = req.nextUrl.pathname.startsWith("/dashboard");

  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (isPrivateRoute && !accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
