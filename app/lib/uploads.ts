import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { UPLOAD_DIR } from "./store";

export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

export const UPLOAD_URL = /^\/uploads\/([a-f0-9-]{36}\.(?:jpg|png|webp))$/;

export function detectImage(buf: Buffer): "jpg" | "png" | "webp" | null {
  if (buf.length > 12 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
  if (buf.length > 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (buf.length > 12 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") return "webp";
  return null;
}

/** Stores an uploaded image and returns its public URL, or an error message in Danish (admin UI). */
export async function saveUpload(file: File): Promise<{ url: string } | { error: string }> {
  if (file.size > MAX_IMAGE_BYTES) return { error: `${file.name || "Billedet"} er for stort (maks. 10 MB).` };
  const buf = Buffer.from(await file.arrayBuffer());
  const ext = detectImage(buf);
  if (!ext) return { error: `${file.name || "Filen"} skal være JPG, PNG eller WebP.` };
  const name = `${randomUUID()}.${ext}`;
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, name), buf);
  return { url: `/uploads/${name}` };
}

/** Deletes an uploaded image; bundled images under /cars are left alone. */
export async function removeUpload(url: string) {
  const m = UPLOAD_URL.exec(url);
  if (m) await fs.rm(path.join(UPLOAD_DIR, m[1]), { force: true });
}
