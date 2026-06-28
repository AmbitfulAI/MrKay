import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("admin_session")?.value;
  const valid = session === process.env.ADMIN_SECRET;

  if (pathname.startsWith("/api/admin/") && !pathname.startsWith("/api/admin/auth")) {
    if (!valid) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin/") && !pathname.startsWith("/admin/login")) {
    if (!valid) return NextResponse.redirect(new URL("/admin/login", request.url));
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
