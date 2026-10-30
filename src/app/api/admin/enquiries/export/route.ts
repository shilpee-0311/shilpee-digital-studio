import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession, unauthorizedJson } from "@/lib/auth";
import { SERVICE_NAMES } from "@/lib/validations";

export const dynamic = "force-dynamic";

function sanitizeCsvCell(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '""';
  let str = String(value);

  // Guard against CSV formula injection (cells starting with =, +, -, @, \t, \r)
  if (/^[=+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }

  // Escape quotes
  const escaped = str.replace(/"/g, '""');
  return `"${escaped}"`;
}

export async function GET(request: NextRequest) {
  const session = await getAdminSession(request);
  if (!session) {
    return unauthorizedJson();
  }

  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        notes: true,
      },
    });

    const headers = [
      "Enquiry ID",
      "Date (UTC)",
      "Name",
      "Email",
      "Phone",
      "Service Category",
      "Budget Range",
      "Target Timeline",
      "Status",
      "Starred",
      "Archived",
      "Client Message",
      "Internal Notes Count",
    ];

    const rows = enquiries.map((item) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const friendlyService = (SERVICE_NAMES as any)[item.serviceType] || item.serviceType;
      return [
        sanitizeCsvCell(item.id),
        sanitizeCsvCell(item.createdAt.toISOString()),
        sanitizeCsvCell(item.name),
        sanitizeCsvCell(item.email),
        sanitizeCsvCell(item.phone || "N/A"),
        sanitizeCsvCell(friendlyService),
        sanitizeCsvCell(item.budgetRange || "N/A"),
        sanitizeCsvCell(item.timeline || "N/A"),
        sanitizeCsvCell(item.status),
        sanitizeCsvCell(item.isStarred ? "Yes" : "No"),
        sanitizeCsvCell(item.isArchived ? "Yes" : "No"),
        sanitizeCsvCell(item.message),
        sanitizeCsvCell(item.notes.length),
      ].join(",");
    });

    const csvContent = [headers.join(","), ...rows].join("\r\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="shilpee-studio-enquiries-${new Date().toISOString().slice(0, 10)}.csv"`,
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("CSV Export error:", error instanceof Error ? error.message : "Unknown");
    return NextResponse.json(
      { success: false, error: "Failed to export CSV" },
      { status: 500 }
    );
  }
}
