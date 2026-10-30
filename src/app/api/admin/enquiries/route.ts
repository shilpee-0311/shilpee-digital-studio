import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession, unauthorizedJson } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const session = await getAdminSession(request);
  if (!session) {
    return unauthorizedJson();
  }

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim().toLowerCase() || "";
    const status = searchParams.get("status") || "ALL";
    const service = searchParams.get("service") || "ALL";
    const starredOnly = searchParams.get("starred") === "true";
    const showArchived = searchParams.get("archived") === "true";

    // Build filter query
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (showArchived) {
      where.OR = [{ isArchived: true }, { status: "ARCHIVED" }];
    } else {
      where.isArchived = false;
      where.status = { not: "ARCHIVED" };
    }

    if (status !== "ALL" && !showArchived) {
      where.status = status;
    }

    if (service !== "ALL") {
      where.serviceType = service;
    }

    if (starredOnly) {
      where.isStarred = true;
    }

    if (search) {
      where.AND = [
        ...(where.AND || []),
        {
          OR: [
            { name: { contains: search } },
            { email: { contains: search } },
            { message: { contains: search } },
          ],
        },
      ];
    }

    const [enquiries, allEnquiries] = await Promise.all([
      prisma.enquiry.findMany({
        where,
        orderBy: [{ isStarred: "desc" }, { createdAt: "desc" }],
        include: {
          notes: {
            orderBy: { createdAt: "desc" },
          },
        },
      }),
      prisma.enquiry.findMany({
        select: {
          status: true,
          isStarred: true,
          isArchived: true,
        },
      }),
    ]);

    // Compute high-level dashboard statistics
    const stats = {
      total: allEnquiries.filter((e) => !e.isArchived && e.status !== "ARCHIVED").length,
      newCount: allEnquiries.filter((e) => e.status === "NEW" && !e.isArchived).length,
      reviewingCount: allEnquiries.filter((e) => e.status === "REVIEWING" && !e.isArchived).length,
      quotedCount: allEnquiries.filter((e) => e.status === "QUOTED" && !e.isArchived).length,
      inProgressCount: allEnquiries.filter((e) => e.status === "IN_PROGRESS" && !e.isArchived).length,
      completedCount: allEnquiries.filter((e) => e.status === "COMPLETED" && !e.isArchived).length,
      archivedCount: allEnquiries.filter((e) => e.isArchived || e.status === "ARCHIVED").length,
      starredCount: allEnquiries.filter((e) => e.isStarred && !e.isArchived).length,
    };

    return NextResponse.json({
      success: true,
      enquiries,
      stats,
    });
  } catch (error) {
    console.error("Admin enquiries fetch error:", error instanceof Error ? error.message : "Unknown");
    return NextResponse.json(
      { success: false, error: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}
