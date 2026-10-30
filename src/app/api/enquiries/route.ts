import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { enquirySchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting by client IP
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";
    const rateLimit = checkRateLimit(`enquiry_${ip}`, {
      windowMs: 10 * 60 * 1000, // 10 minutes
      maxRequests: 5, // max 5 submissions per window
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please wait a few minutes before submitting another enquiry.",
        },
        { status: 429 }
      );
    }

    // 2. Parse & Validate JSON payload
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    // 3. Honeypot Bot Spam Trap
    // If the hidden field is filled, silently return 200 and discard without touching the database.
    if (
      body &&
      typeof body === "object" &&
      typeof body.website_url_check === "string" &&
      body.website_url_check.trim().length > 0
    ) {
      return NextResponse.json(
        {
          success: true,
          message: "Thank you for contacting Shilpee Digital Studio.",
        },
        { status: 200 }
      );
    }

    const parseResult = enquirySchema.safeParse(body);
    if (!parseResult.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parseResult.error.issues) {
        const fieldName = issue.path[0]?.toString() || "form";
        fieldErrors[fieldName] = issue.message;
      }
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please verify the submitted details.",
          fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // 4. Save enquiry securely to SQLite database
    const newEnquiry = await prisma.enquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone?.trim() ? data.phone.trim() : null,
        serviceType: data.serviceType,
        budgetRange: data.budgetRange?.trim() ? data.budgetRange.trim() : null,
        timeline: data.timeline?.trim() ? data.timeline.trim() : null,
        message: data.message,
        status: "NEW",
        source: "WEBSITE_FORM",
      },
      select: {
        id: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! Your project enquiry has been securely received. We will review your brief and reply within 24 to 48 hours.",
        enquiryId: newEnquiry.id,
      },
      { status: 201 }
    );
  } catch (error) {
    // Log privately without exposing internal database errors to client
    console.error("Enquiry submission error:", error instanceof Error ? error.message : "Unknown");
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your enquiry. Please try again or reach out directly via email.",
      },
      { status: 500 }
    );
  }
}
