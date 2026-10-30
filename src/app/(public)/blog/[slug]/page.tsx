import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Clock,
  Calendar,
  ArrowLeft,
  ArrowRight,
  User,
  Tag,
  Sparkles,
  BookOpen,
  ChevronRight,
  ListTree,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { MarkdownContent } from "@/components/blog/MarkdownContent";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post || post.status !== "PUBLISHED") {
    return {
      title: "Article Not Found | Shilpee Digital Studio",
      robots: { index: false, follow: false },
    };
  }

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const url = `${site.url}/blog/${post.slug}`;

  return {
    title: `${title} | Shilpee Digital Studio`,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "en_IN",
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      authors: [post.author || "Shilpee Srivastava"],
      tags: post.tags ? post.tags.split(",").map((t) => t.trim()) : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function extractTableOfContents(content: string) {
  const lines = content.split("\n");
  const toc: { id: string; text: string; level: number }[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("### ")) {
      const text = trimmed.slice(4).trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      toc.push({ id, text, level: 3 });
    } else if (trimmed.startsWith("## ")) {
      const text = trimmed.slice(3).trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      toc.push({ id, text, level: 2 });
    }
  }
  return toc;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post || post.status !== "PUBLISHED") {
    notFound();
  }

  // Fetch adjacent previous and next articles
  const [prevPost, nextPost, relatedPosts] = await Promise.all([
    prisma.blogPost.findFirst({
      where: {
        status: "PUBLISHED",
        createdAt: { lt: post.createdAt },
      },
      orderBy: { createdAt: "desc" },
      select: { title: true, slug: true },
    }),
    prisma.blogPost.findFirst({
      where: {
        status: "PUBLISHED",
        createdAt: { gt: post.createdAt },
      },
      orderBy: { createdAt: "asc" },
      select: { title: true, slug: true },
    }),
    prisma.blogPost.findMany({
      where: {
        status: "PUBLISHED",
        id: { not: post.id },
        categorySlug: post.categorySlug,
      },
      take: 2,
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        category: true,
        readingTime: true,
      },
    }),
  ]);

  const toc = extractTableOfContents(post.content);
  const tagsList = post.tags ? post.tags.split(",").map((t) => t.trim()) : [];

  // JSON-LD Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    url: `${site.url}/blog/${post.slug}`,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt?.toISOString(),
    author: {
      "@type": "Person",
      name: post.author || "Shilpee Srivastava",
      url: `${site.url}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.url}/blog/${post.slug}`,
    },
  };

  // JSON-LD Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: site.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${site.url}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.category,
        item: `${site.url}/blog/category/${post.categorySlug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: post.title,
        item: `${site.url}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <article className="bg-[#070B16] text-white min-h-screen py-14 sm:py-20">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.15),transparent_70%)]"
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
          <Link
            href={`/blog/category/${post.categorySlug}`}
            className="hover:text-purple-300 transition-colors"
          >
            {post.category}
          </Link>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl space-y-5 border-b border-white/10 pb-10">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/blog/category/${post.categorySlug}`}
              className="rounded-full border border-purple-500/30 bg-purple-950/80 px-3.5 py-1 text-xs font-mono uppercase tracking-wider text-purple-300 hover:border-purple-400 hover:text-white transition-colors"
            >
              {post.category}
            </Link>

            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-lavender-200/70">
              <Clock size={12} />
              <span>{post.readingTime} min read</span>
            </span>
          </div>

          <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl sm:leading-[1.15]">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg leading-relaxed text-lavender-200/80 italic border-l-2 border-purple-400 pl-4">
            {post.excerpt}
          </p>

          {/* Author & Publication Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs font-mono text-lavender-200/70">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white font-bold">
                S
              </div>
              <div>
                <p className="font-semibold text-white">{post.author}</p>
                <p className="text-[10px] text-purple-300">Founder &amp; Digital Solutions Developer</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {post.publishedAt ? (
                <span>
                  Published:{" "}
                  {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              ) : null}

              <ShareButtons
                title={post.title}
                url={`${site.url}/blog/${post.slug}`}
              />
            </div>
          </div>
        </header>

        {/* Content Layout with Table of Contents Sidebar */}
        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Main Article Body */}
          <div className="lg:col-span-8 space-y-8">
            <div className="rounded-3xl border border-white/10 bg-navy-900/40 p-6 sm:p-10 backdrop-blur-md">
              <MarkdownContent content={post.content} />
            </div>

            {/* Tags Pills */}
            {tagsList.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2 pt-4">
                <span className="text-xs font-mono text-lavender-200/60 flex items-center gap-1">
                  <Tag size={13} />
                  <span>Tags:</span>
                </span>
                {tagsList.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono text-lavender-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            ) : null}

            {/* Share Bottom Bar */}
            <div className="rounded-2xl border border-white/10 bg-navy-900/60 p-5 flex flex-wrap items-center justify-between gap-4">
              <span className="text-sm font-semibold text-white">Enjoyed this technical insight?</span>
              <ShareButtons
                title={post.title}
                url={`${site.url}/blog/${post.slug}`}
              />
            </div>

            {/* Previous and Next Navigation */}
            <div className="grid gap-4 sm:grid-cols-2 pt-6 border-t border-white/10">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="group flex flex-col justify-between rounded-xl border border-white/10 bg-white/5 p-4 hover:border-purple-400 hover:bg-white/10 transition-all"
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 flex items-center gap-1">
                    <ArrowLeft size={11} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Previous Article</span>
                  </span>
                  <p className="font-display mt-2 text-sm font-bold text-white group-hover:text-lavender-100 line-clamp-2">
                    {prevPost.title}
                  </p>
                </Link>
              ) : <div />}

              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group flex flex-col justify-between items-end text-right rounded-xl border border-white/10 bg-white/5 p-4 hover:border-purple-400 hover:bg-white/10 transition-all"
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 flex items-center gap-1">
                    <span>Next Article</span>
                    <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <p className="font-display mt-2 text-sm font-bold text-white group-hover:text-lavender-100 line-clamp-2">
                    {nextPost.title}
                  </p>
                </Link>
              ) : <div />}
            </div>
          </div>

          {/* Sticky Sidebar: Table of Contents & Studio CTA */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Table of Contents */}
            {toc.length > 0 ? (
              <div className="rounded-2xl border border-white/10 bg-navy-900/60 p-5 backdrop-blur-md">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3 text-xs font-mono uppercase tracking-wider text-purple-300">
                  <ListTree size={14} />
                  <span>Table of Contents</span>
                </div>
                <nav className="mt-4 space-y-2 text-xs">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block transition-colors hover:text-white ${
                        item.level === 3
                          ? "pl-3 text-lavender-200/60 hover:text-purple-300"
                          : "text-lavender-200/90 font-medium"
                      }`}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            ) : null}

            {/* Studio Consultation Callout */}
            <div className="rounded-2xl border border-purple-500/30 bg-purple-950/40 p-6 backdrop-blur-md text-white">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-400/30 bg-purple-500/20 px-3 py-1 text-[11px] font-mono text-purple-300">
                <Sparkles size={12} />
                <span>Bespoke Engineering</span>
              </div>
              <h3 className="font-display mt-3 text-lg font-bold">
                Need to implement this for your business?
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-lavender-200/80">
                Shilpee Digital Studio crafts custom web applications, automated data pipelines, and creative motion graphics tailored to your exact scope.
              </p>
              <div className="mt-5">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-purple-900/40 hover:bg-purple-500 transition-all"
                >
                  <span>Discuss Your Project</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Related Articles in Same Category */}
            {relatedPosts.length > 0 ? (
              <div className="rounded-2xl border border-white/10 bg-navy-900/40 p-5 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-lavender-200/60 block">
                  More in {post.category}
                </span>
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/blog/${rel.slug}`}
                    className="block group p-2.5 rounded-xl border border-white/5 bg-white/5 hover:border-purple-500/40 hover:bg-white/10 transition-all"
                  >
                    <p className="font-display text-xs font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                      {rel.title}
                    </p>
                    <span className="text-[10px] font-mono text-lavender-200/50 mt-1 block">
                      {rel.readingTime} min read
                    </span>
                  </Link>
                ))}
              </div>
            ) : null}
          </aside>
        </div>
      </Container>
    </article>
  );
}
