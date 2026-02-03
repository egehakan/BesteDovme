import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { siteContent } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const rows = await db.select().from(siteContent);

  const content: Record<string, string> = {};
  for (const row of rows) {
    content[row.key] = row.value;
  }

  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  const body = await request.json();
  const { key, value } = body;

  if (!key || value === undefined) {
    return NextResponse.json(
      { error: "key and value are required" },
      { status: 400 }
    );
  }

  const [updated] = await db
    .insert(siteContent)
    .values({ key, value, updated_at: new Date().toISOString() })
    .onConflictDoUpdate({
      target: siteContent.key,
      set: { value, updated_at: new Date().toISOString() },
    })
    .returning();

  return NextResponse.json(updated);
}
