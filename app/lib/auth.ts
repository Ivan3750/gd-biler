import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHash, createHmac, timingSafeEqual } from "crypto";

const COOKIE = "admin_session";
const MAX_AGE = 60 * 60 * 24 * 7;

const password = () => process.env.ADMIN_PASSWORD ?? "";

export const adminConfigured = () => password().length >= 8;

const sha = (s: string) => createHash("sha256").update(s).digest();

const safeEqual = (a: string, b: string) => timingSafeEqual(sha(a), sha(b));

// Derived from the password, so changing ADMIN_PASSWORD logs everyone out.
const token = () => createHmac("sha256", password()).update("gd-biler-admin").digest("hex");

export function checkPassword(input: string) {
  return adminConfigured() && safeEqual(input, password());
}

export async function createSession() {
  (await cookies()).set(COOKIE, token(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin() {
  if (!adminConfigured()) return false;
  const value = (await cookies()).get(COOKIE)?.value;
  return !!value && safeEqual(value, token());
}

/** Call at the top of every admin page and server action. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
