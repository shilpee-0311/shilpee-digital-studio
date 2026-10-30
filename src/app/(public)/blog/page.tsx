import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ArrowRight, BookOpen, Clock, Calendar } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { BlogListClient, PublicBlogPost } from "@/components/blog/BlogListClient";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog & Technical Insights | Shilpee Digital Studio",
  description:
    "Explore technical articles, data analytics blueprints, AI concepts, and full-stack web architecture insights by Shilpee Srivastava, Founder of Shilpee Digital Studio.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog & Technical Insights | Shilpee Digital Studio",
    description:
      "Explore technical articles, data analytics blueprints, AI concepts, and full-stack web architecture insights.",
    url: "/blog",
    siteName: site.name,
    locale: "en_IN",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

export default async function BlogHomePage() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
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

  const featuredPost = serializedPosts.find((p) => p.isFeatured) || serializedPosts[0];

  return (
    <div className="bg-[#070B16] text-white min-h-screen py-16 sm:py-24">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.18),transparent_70%)]"
        aria-hidden="true"
      />

      <Container className="relative">
        {/* Hero Section */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-lavender-200 backdrop-blur-md">
            <Sparkles size={14} className="text-purple-400" aria-hidden />
            <span>Editorial &amp; Practice Insights</span>
          </div>

          <h1 className="font-display mt-5 text-4xl font-extrabold tracking-tight sm:text-6xl">
            Insights, Ideas &amp;{" "}
            <span className="bg-gradient-to-r from-purple-400 via-lavender-200 to-white bg-clip-text text-transparent">
              Digital Innovation.
            </span>
          </h1>

          <p className="mt-4 text-base leading-7 text-lavender-200/80 sm:text-lg">
            Practical articles, technical blueprints, and engineering perspectives on full-stack web architectures, applied AI, data analytics, and kinetic motion design by Shilpee Srivastava.
          </p>
        </div>

        {/* Featured Article Hero Spotlight */}
        {featuredPost ? (
          <div className="mt-14 overflow-hidden rounded-3xl border border-white/15 bg-navy-900/60 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-purple-600 px-3 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-white shadow-md">
                    Featured Insight
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-mono text-lavender-200">
                    {featuredPost.category}
                  </span>
                </div>

                <h2 className="font-display mt-4 text-2xl font-bold tracking-tight text-white sm:text-4xl leading-tight">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="hover:text-purple-300 transition-colors"
                  >
                    {featuredPost.title}
                  </Link>
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-lavender-200/80 sm:text-base">
                  {featuredPost.excerpt}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono text-lavender-200/60">
                  <span>By {featuredPost.author}</span>
                  <span>•</span>
                  <span>{featuredPost.readingTime} min read</span>
                  {featuredPost.publishedAt ? (
                    <>
                      <span>•</span>
                      <span>
                        {new Date(featuredPost.publishedAt).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </>
                  ) : null}
                </div>

                <div className="mt-8">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-xs font-semibold text-white shadow-lg shadow-purple-900/40 hover:bg-purple-500 transition-all"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Graphical Card Visual */}
              <div className="lg:col-span-4 flex items-center justify-center p-6 rounded-2xl border border-white/10 bg-navy-950/80">
                <div className="text-center space-y-3">
                  <BookOpen size={48} className="mx-auto text-purple-400 animate-pulse" />
                  <span className="block font-mono text-xs uppercase tracking-widest text-lavender-200">
                    Technical Architecture
                  </span>
                  <p className="text-[11px] text-lavender-200/60">
                    In-depth editorial covering performance, code discipline, and production best practices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* All Articles with Interactive Filter & Search */}
        <div className="mt-16">
          <BlogListClient posts={serializedPosts} />
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-20 rounded-3xl border border-purple-500/30 bg-navy-900/60 p-8 sm:p-12 text-center backdrop-blur-xl">
          <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Have a Technical Challenge or Project Idea?
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-lavender-200/80">
            From Next.js web applications and custom data pipelines to kinetic motion graphics and brand systems, let&apos;s build a practical digital solution together.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-purple-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-purple-900/40 hover:bg-purple-500 transition-all"
            >
              Start a Project
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-xs font-semibold text-white hover:border-purple-400 hover:bg-white/10 transition-all"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
