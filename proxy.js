import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/jwt";

export async function proxy(request) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const userId = await verifySession(token);

  if (userId) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/account/:path*", "/admin/:path*"],
};
