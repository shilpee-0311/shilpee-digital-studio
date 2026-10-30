import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession, unauthorizedJson } from "@/lib/auth";
import { blogPostSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

type Params = { id: string };

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const session = await getAdminSession(request);
  if (!session) return unauthorizedJson();

  const { id } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!post) {
    return NextResponse.json(
      { success: false, error: "Blog post not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, post });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const session = await getAdminSession(request);
  if (!session) return unauthorizedJson();

  const { id } = await params;
  const existingPost = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!existingPost) {
    return NextResponse.json(
      { success: false, error: "Blog post not found" },
      { status: 404 }
    );
  }

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

    // If slug changed, ensure new slug is unique
    if (data.slug !== existingPost.slug) {
      const slugClash = await prisma.blogPost.findUnique({
        where: { slug: data.slug },
      });
      if (slugClash && slugClash.id !== id) {
        return NextResponse.json(
          {
            success: false,
            error: "A post with this URL slug already exists",
            fieldErrors: { slug: "Slug already in use" },
          },
          { status: 409 }
        );
      }
    }

    let publishedAt = existingPost.publishedAt;
    if (data.status === "PUBLISHED" && !publishedAt) {
      publishedAt = new Date();
    } else if (data.status === "DRAFT") {
      // Keep publishedAt or reset depending on policy; keeping preserves original publication date
    }

    const updated = await prisma.blogPost.update({
      where: { id },
      data: {
        ...data,
        publishedAt,
      },
    });

    return NextResponse.json({ success: true, post: updated });
  } catch (error: any) {
    console.error("Failed to update blog post:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const session = await getAdminSession(request);
  if (!session) return unauthorizedJson();

  const { id } = await params;
  const existingPost = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!existingPost) {
    return NextResponse.json(
      { success: false, error: "Blog post not found" },
      { status: 404 }
    );
  }

  await prisma.blogPost.delete({
    where: { id },
  });

  return NextResponse.json({ success: true, message: "Blog post deleted" });
}
