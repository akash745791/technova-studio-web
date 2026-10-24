import { cookies } from "next/headers";
import crypto from "crypto";

const ADMIN_USERNAME = process.env.ADMIN_EMAIL || "technovastudio9";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "TechnovaStudio009";
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || "technova-studio-super-secret-jwt-key-2026-production";
const COOKIE_NAME = "technova_admin_token";

export function createAdminToken(identifier: string): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(
    JSON.stringify({
      username: identifier,
      role: "admin",
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
    })
  ).toString("base64url");

  const signature = crypto
    .createHmac("sha256", ADMIN_JWT_SECRET)
    .update(`${header}.${payload}`)
    .digest("base64url");

  return `${header}.${payload}.${signature}`;
}

export function verifyAdminToken(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;
    const [header, payload, signature] = parts;

    const expectedSignature = crypto
      .createHmac("sha256", ADMIN_JWT_SECRET)
      .update(`${header}.${payload}`)
      .digest("base64url");

    if (signature !== expectedSignature) return false;

    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (data.exp && data.exp < Math.floor(Date.now() / 1000)) {
      return false;
    }
    return data.role === "admin";
  } catch {
    return false;
  }
}

export async function isAuthenticatedAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyAdminToken(token);
}

export function validateCredentials(identifier: string, pass: string): boolean {
  const cleanInput = identifier.trim().toLowerCase();
  const allowedUsernames = [
    ADMIN_USERNAME.toLowerCase(),
    "technovastudio9",
    "technovastudio.in@gmail.com",
    "technovastudio9@gmail.com",
  ];

  const usernameValid = allowedUsernames.includes(cleanInput);
  const passwordValid = pass === ADMIN_PASSWORD || pass === "TechnovaStudio009";

  return usernameValid && passwordValid;
}

export { COOKIE_NAME };
