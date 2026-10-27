import { promises as fs } from "fs";
import path from "path";

export const DATA_DIR = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(process.cwd(), "data");
export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

const locks = new Map<string, Promise<unknown>>();

/** Runs read-modify-write cycles on one file one after another, so concurrent requests cannot overwrite each other. */
export function withLock<T>(name: string, fn: () => Promise<T>): Promise<T> {
  const next = (locks.get(name) ?? Promise.resolve()).then(fn, fn);
  locks.set(name, next.catch(() => {}));
  return next;
}

export async function readJson<T>(name: string): Promise<T | undefined> {
  try {
    return JSON.parse(await fs.readFile(path.join(DATA_DIR, name), "utf8")) as T;
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return undefined;
    throw e;
  }
}

export async function writeJson(name: string, data: unknown) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const file = path.join(DATA_DIR, name);
  const tmp = `${file}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, file);
}
