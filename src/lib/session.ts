import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE_NAME = "shilpee_admin_session";
export const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

export interface AdminSessionPayload {
  userId: string;
  username: string;
  role: string;
}

export function getSessionSecretKey(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();

  if (!secret || secret.length < 32) {
    throw new Error(
      "ADMIN_SESSION_SECRET must be set to a random string of at least 32 characters."
    );
  }

  return new TextEncoder().encode(secret);
}

export async function createSessionToken(
  payload: AdminSessionPayload
): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSessionSecretKey());
}

export async function verifySessionToken(
  token: string
): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSessionSecretKey());
    if (
      typeof payload.userId !== "string" ||
      typeof payload.username !== "string"
    ) {
      return null;
    }
    return {
      userId: payload.userId,
      username: payload.username,
      role: typeof payload.role === "string" ? payload.role : "admin",
    };
  } catch {
    return null;
  }
}
