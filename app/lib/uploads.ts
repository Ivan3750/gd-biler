import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { UPLOAD_DIR } from "./cars";

export const MAX_IMAGE = 10 * 1024 * 1024;

/** Recognises the image type from the file's first bytes, not from its name. */
function detectImage(buf: Buffer): "jpg" | "png" | "webp" | null {
  if (buf.length > 12 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
  if (buf.length > 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (buf.length > 12 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") return "webp";
  return null;
}

/** Stores one uploaded image and returns its public path, or an error message. */
export async function storeImage(file: File): Promise<{ path: string } | { error: string }> {
  if (file.size > MAX_IMAGE) return { error: "Billedet er for stort (maks. 10 MB)." };
  const buf = Buffer.from(await file.arrayBuffer());
  const ext = detectImage(buf);
  if (!ext) return { error: "Billedet skal være JPG, PNG eller WebP." };
  const name = `${randomUUID()}.${ext}`;
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, name), buf);
  return { path: `/uploads/${name}` };
}
