import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { tattoos } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import { deleteImage } from "@/lib/blob";
import { requireAdmin } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");

  let query = db.select().from(tattoos).orderBy(desc(tattoos.created_at));

  if (category) {
    query = query.where(eq(tattoos.category, category)) as typeof query;
  }

  if (featured === "true") {
    query = query.where(eq(tattoos.featured, 1)) as typeof query;
  }

  const results = await query;
  return NextResponse.json(results);
}

export async function POST(request: Request) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  const body = await request.json();
  const { title, category, image_url, description, featured } = body;

  if (!title || !category || !image_url) {
    return NextResponse.json(
      { error: "title, category, and image_url are required" },
      { status: 400 }
    );
  }

  const [created] = await db
    .insert(tattoos)
    .values({
      title,
      description: description || null,
      category,
      image_url,
      featured: featured ? 1 : 0,
    })
    .returning();

  return NextResponse.json(created, { status: 201 });
}

export async function PUT(request: Request) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  const body = await request.json();
  const { id, ...fields } = body;

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const existing = await db
    .select()
    .from(tattoos)
    .where(eq(tattoos.id, id))
    .get();

  if (!existing) {
    return NextResponse.json({ error: "Tattoo not found" }, { status: 404 });
  }

  const updateData: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };
  if (fields.title !== undefined) updateData.title = fields.title;
  if (fields.description !== undefined)
    updateData.description = fields.description;
  if (fields.category !== undefined) updateData.category = fields.category;
  if (fields.image_url !== undefined) updateData.image_url = fields.image_url;
  if (fields.featured !== undefined)
    updateData.featured = fields.featured ? 1 : 0;

  const [updated] = await db
    .update(tattoos)
    .set(updateData)
    .where(eq(tattoos.id, id))
    .returning();

  return NextResponse.json(updated);
}

export async function DELETE(request: Request) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  const body = await request.json();
  const { id, image_url } = body;

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const existing = await db
    .select()
    .from(tattoos)
    .where(eq(tattoos.id, id))
    .get();

  if (!existing) {
    return NextResponse.json({ error: "Tattoo not found" }, { status: 404 });
  }

  if (image_url) {
    await deleteImage(image_url);
  }

  await db.delete(tattoos).where(eq(tattoos.id, id));

  return NextResponse.json({ success: true });
}
