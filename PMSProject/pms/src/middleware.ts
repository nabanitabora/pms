import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("session")?.value;

  const verifyToken =
    token && (await verifySession(token).catch((err) => console.log(err)));

  if (!verifyToken && request.nextUrl.pathname.startsWith("/login")) {
    return;
  }

  if (verifyToken && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/settings", request.url));
  }

  if (!verifyToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/((?!api|static|.*\\..*|_next).*)",
  ],
};
