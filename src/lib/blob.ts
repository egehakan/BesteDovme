import { put, del } from "@vercel/blob";
import { writeFile, unlink, mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";

export async function uploadImage(file: File): Promise<string> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(file.name, file, { access: "public" });
    return blob.url;
  }

  const ext = file.name.split(".").pop() || "png";
  const filename = `${randomUUID()}.${ext}`;
  const uploadsDir = join(process.cwd(), "public", "uploads");

  await mkdir(uploadsDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(join(uploadsDir, filename), buffer);

  return `/uploads/${filename}`;
}

export async function deleteImage(url: string): Promise<void> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await del(url);
    return;
  }

  const filePath = join(process.cwd(), "public", url);
  try {
    await unlink(filePath);
  } catch {
    // File may not exist locally, ignore
  }
}
