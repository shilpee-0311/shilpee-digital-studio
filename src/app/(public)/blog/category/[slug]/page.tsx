import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Sparkles, ChevronRight, BookOpen } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { BlogListClient, PublicBlogPost } from "@/components/blog/BlogListClient";
import { BLOG_CATEGORIES, getCategoryBySlug } from "@/content/blog-categories";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: "Category Not Found | Shilpee Digital Studio" };
  }

  return {
    title: `${category.title} Articles & Insights | Shilpee Digital Studio`,
    description: category.description,
    alternates: {
      canonical: `/blog/category/${category.slug}`,
    },
    openGraph: {
      title: `${category.title} Articles | Shilpee Digital Studio`,
      description: category.description,
      url: `/blog/category/${category.slug}`,
      siteName: site.name,
      locale: "en_IN",
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const posts = await prisma.blogPost.findMany({
    where: {
      status: "PUBLISHED",
      categorySlug: category.slug,
    },
    orderBy: [{ isFeatured: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }],
  });

  const serializedPosts: PublicBlogPost[] = posts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    coverImage: p.coverImage,
    coverImageAlt: p.coverImageAlt,
    category: p.category,
    categorySlug: p.categorySlug,
    tags: p.tags,
    author: p.author,
    isFeatured: p.isFeatured,
    readingTime: p.readingTime,
    publishedAt: p.publishedAt ? p.publishedAt.toISOString() : null,
  }));

  return (
    <div className="bg-[#070B16] text-white min-h-screen py-16 sm:py-24">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.18),transparent_70%)]"
        aria-hidden="true"
      />

      <Container className="relative">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 text-xs font-mono text-lavender-200/60">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight size={13} />
          <Link href="/blog" className="hover:text-white transition-colors">
            Blog
          </Link>
          <ChevronRight size={13} />
          <span className="text-purple-300">{category.title}</span>
        </nav>

        {/* Category Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-lavender-200 backdrop-blur-md">
            <Sparkles size={14} className="text-purple-400" aria-hidden />
            <span>Practice Area Category</span>
          </div>

          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            {category.title}
          </h1>

          <p className="text-base leading-7 text-lavender-200/80 sm:text-lg">
            {category.description}
          </p>
        </div>

        {/* Filtered Articles Grid */}
        <div className="mt-14">
          <BlogListClient posts={serializedPosts} initialCategory={category.slug} />
        </div>
      </Container>
    </div>
  );
}
