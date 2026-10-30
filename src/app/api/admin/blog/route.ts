import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession, unauthorizedJson } from "@/lib/auth";
import { blogPostSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const session = await getAdminSession(request);
  if (!session) return unauthorizedJson();

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  const where: any = {};
  if (status && status !== "ALL") {
    where.status = status;
  }
  if (category && category !== "ALL") {
    where.categorySlug = category;
  }
  if (search && search.trim().length > 0) {
    where.OR = [
      { title: { contains: search.trim() } },
      { excerpt: { contains: search.trim() } },
      { tags: { contains: search.trim() } },
    ];
  }

  const posts = await prisma.blogPost.findMany({
    where,
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });

  return NextResponse.json({ success: true, posts });
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession(request);
  if (!session) return unauthorizedJson();

  try {
    const json = await request.json();
    const result = blogPostSchema.safeParse(json);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const fieldName = issue.path[0]?.toString() || "general";
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      }
      return NextResponse.json(
        { success: false, error: "Validation failed", fieldErrors },
        { status: 400 }
      );
    }

    const data = result.data;

    // Check slug uniqueness
    const existing = await prisma.blogPost.findUnique({
      where: { slug: data.slug },
    });
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: "A post with this URL slug already exists. Please choose a unique slug.",
          fieldErrors: { slug: "Slug already in use" },
        },
        { status: 409 }
      );
    }

    const publishedAt =
      data.status === "PUBLISHED" ? new Date() : null;

    const post = await prisma.blogPost.create({
      data: {
        ...data,
        publishedAt,
      },
    });

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create blog post:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
