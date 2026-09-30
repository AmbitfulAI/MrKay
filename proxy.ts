import { NextRequest, NextResponse } from "next/server";

function matches(pathname: string, base: string) {
  return pathname === base || pathname.startsWith(base + "/");
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("admin_session")?.value;
  const valid = session === process.env.ADMIN_SECRET;

  if (matches(pathname, "/api/admin") && !matches(pathname, "/api/admin/auth")) {
    if (!valid) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    return NextResponse.next();
  }

  if (matches(pathname, "/admin") && !matches(pathname, "/admin/login")) {
    if (!valid) return NextResponse.redirect(new URL("/admin/login", request.url));
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
