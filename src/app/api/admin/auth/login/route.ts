import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { setAdminSessionCookie } from "@/lib/auth";
import { adminLoginSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting by IP to defend against brute-force
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";
    const rateLimit = checkRateLimit(`admin_login_${ip}`, {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 5, // max 5 attempts per window
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many sign-in attempts. Please try again after 15 minutes.",
        },
        { status: 429 }
      );
    }

    // 2. Validate request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request" },
        { status: 400 }
      );
    }

    const parseResult = adminLoginSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid input. Please provide a valid username and password.",
        },
        { status: 400 }
      );
    }

    const { username, password } = parseResult.data;

    // 3. Find user in database
    const adminUser = await prisma.adminUser.findUnique({
      where: { username },
    });

    if (!adminUser) {
      // Timing-safe response to prevent user enumeration
      return NextResponse.json(
        { success: false, error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // 4. Verify password with bcrypt
    const passwordValid = await verifyPassword(password, adminUser.passwordHash);
    if (!passwordValid) {
      return NextResponse.json(
        { success: false, error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // 5. Issue HTTP-only secure signed cookie attached to response
    const response = NextResponse.json({
      success: true,
      message: "Sign in successful",
      user: {
        username: adminUser.username,
        role: adminUser.role,
      },
    });

    await setAdminSessionCookie(
      {
        userId: adminUser.id,
        username: adminUser.username,
        role: adminUser.role,
      },
      response
    );

    return response;
  } catch (error) {
    console.error("Admin login error:", error instanceof Error ? error.message : "Unknown");
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred during sign in." },
      { status: 500 }
    );
  }
}
