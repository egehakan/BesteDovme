import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body;

  if (password === process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ valid: true });
  }

  return NextResponse.json({ valid: false }, { status: 401 });
}
