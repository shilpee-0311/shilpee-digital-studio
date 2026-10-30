import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession, unauthorizedJson } from "@/lib/auth";
import { addEnquiryNoteSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession(request);
  if (!session) {
    return unauthorizedJson();
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const parseResult = addEnquiryNoteSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: "Note must be between 2 and 1500 characters." },
        { status: 400 }
      );
    }

    // Verify enquiry exists
    const enquiry = await prisma.enquiry.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!enquiry) {
      return NextResponse.json(
        { success: false, error: "Enquiry not found" },
        { status: 404 }
      );
    }

    const note = await prisma.enquiryNote.create({
      data: {
        enquiryId: id,
        content: parseResult.data.content,
        author: session.username || "Admin",
      },
    });

    return NextResponse.json(
      {
        success: true,
        note,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Add note error:", error instanceof Error ? error.message : "Unknown");
    return NextResponse.json(
      { success: false, error: "Failed to add internal note" },
      { status: 500 }
    );
  }
}
