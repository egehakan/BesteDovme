import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/blob";
import { requireAdmin } from "@/lib/auth";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: Request) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "File must be an image" },
      { status: 400 }
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "File size exceeds 10MB limit" },
      { status: 413 }
    );
  }

  const url = await uploadImage(file);

  return NextResponse.json({ url });
}
