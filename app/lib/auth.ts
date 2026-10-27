import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { createHash, createHmac, timingSafeEqual } from "crypto";

const COOKIE = "admin_session";
const MAX_AGE = 60 * 60 * 24 * 7;

// TEMP: test fallbacks so the server works without env vars. Set ADMIN_USER and ADMIN_PASSWORD in production.
const username = () => process.env.ADMIN_USER || "admin";
const password = () => process.env.ADMIN_PASSWORD || "12345678";

export const adminConfigured = () => password().length >= 8;

const sha = (s: string) => createHash("sha256").update(s).digest();

const safeEqual = (a: string, b: string) => timingSafeEqual(sha(a), sha(b));

// Derived from the password, so changing ADMIN_PASSWORD logs everyone out.
const token = () => createHmac("sha256", password()).update(`gd-biler-admin:${username()}`).digest("hex");

export function checkLogin(user: string, pass: string) {
  // Both comparisons always run so timing does not reveal which one was wrong.
  const userOk = safeEqual(user.trim().toLowerCase(), username().toLowerCase());
  const passOk = safeEqual(pass, password());
  return adminConfigured() && userOk && passOk;
}

export async function createSession() {
  // Only mark the cookie Secure when the request really came over HTTPS,
  // otherwise browsers drop it on plain-http servers and login silently fails.
  const secure = (await headers()).get("x-forwarded-proto") === "https";
  (await cookies()).set(COOKIE, token(), {
    httpOnly: true,
    sameSite: "lax",
    secure,
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
