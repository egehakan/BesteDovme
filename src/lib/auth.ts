import { NextResponse } from "next/server";

export function verifyAdmin(request: Request): boolean {
  const password = request.headers.get("x-admin-password");
  return password === process.env.ADMIN_PASSWORD;
}

export function requireAdmin(request: Request): NextResponse | null {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
