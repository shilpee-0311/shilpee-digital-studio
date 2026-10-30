import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession, unauthorizedJson } from "@/lib/auth";
import { updateEnquiryStatusSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

export async function PATCH(
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
    const parseResult = updateEnquiryStatusSchema.partial().safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: "Invalid status update payload" },
        { status: 400 }
      );
    }

    const { status, isStarred, isArchived } = parseResult.data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {};
    if (status !== undefined) updateData.status = status;
    if (isStarred !== undefined) updateData.isStarred = isStarred;
    if (isArchived !== undefined) updateData.isArchived = isArchived;

    const updated = await prisma.enquiry.update({
      where: { id },
      data: updateData,
      include: {
        notes: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    return NextResponse.json({
      success: true,
      enquiry: updated,
    });
  } catch (error) {
    console.error("Update enquiry error:", error instanceof Error ? error.message : "Unknown");
    return NextResponse.json(
      { success: false, error: "Failed to update enquiry" },
      { status: 500 }
    );
  }
}
