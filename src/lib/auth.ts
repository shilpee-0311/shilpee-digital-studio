import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE_NAME,
  SESSION_DURATION_SECONDS,
  createSessionToken,
  verifySessionToken,
  type AdminSessionPayload,
} from "@/lib/session";

export type { AdminSessionPayload };
export { SESSION_COOKIE_NAME, createSessionToken, verifySessionToken };

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  };
}

export async function setAdminSessionCookie(
  payload: AdminSessionPayload,
  response?: NextResponse
): Promise<string> {
  const token = await createSessionToken(payload);
  if (response) {
    response.cookies.set(SESSION_COOKIE_NAME, token, sessionCookieOptions());
    return token;
  }
  try {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, sessionCookieOptions());
  } catch {
    // Fallback if invoked outside AsyncLocalStorage request store
  }
  return token;
}

export async function clearAdminSessionCookie(response?: NextResponse): Promise<void> {
  if (response) {
    response.cookies.set(SESSION_COOKIE_NAME, "", {
      ...sessionCookieOptions(),
      maxAge: 0,
    });
    return;
  }
  try {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, "", {
      ...sessionCookieOptions(),
      maxAge: 0,
    });
  } catch {
    // Fallback
  }
}

export async function getAdminSession(
  request?: NextRequest
): Promise<AdminSessionPayload | null> {
  if (request) {
    const cookieValue = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (cookieValue) {
      return verifySessionToken(cookieValue);
    }
  }

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;
    return verifySessionToken(token);
  } catch {
    return null;
  }
}

export async function requireAdminSession(
  request?: NextRequest
): Promise<AdminSessionPayload> {
  const session = await getAdminSession(request);
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}

export function unauthorizedJson() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
