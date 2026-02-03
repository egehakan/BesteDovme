import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const results = await db
    .select()
    .from(testimonials)
    .orderBy(desc(testimonials.created_at));

  return NextResponse.json(results);
}

export async function POST(request: Request) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  const body = await request.json();
  const { name, text } = body;

  if (!name || !text) {
    return NextResponse.json(
      { error: "name and text are required" },
      { status: 400 }
    );
  }

  const [created] = await db
    .insert(testimonials)
    .values({ name, text })
    .returning();

  return NextResponse.json(created, { status: 201 });
}

export async function DELETE(request: Request) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  const body = await request.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const existing = await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.id, id))
    .get();

  if (!existing) {
    return NextResponse.json(
      { error: "Testimonial not found" },
      { status: 404 }
    );
  }

  await db.delete(testimonials).where(eq(testimonials.id, id));

  return NextResponse.json({ success: true });
}
