"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Clock,
  Calendar,
  ArrowRight,
  Sparkles,
  BookOpen,
  Filter,
} from "lucide-react";
import { BLOG_CATEGORIES } from "@/content/blog-categories";

export interface PublicBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string | null;
  coverImageAlt: string | null;
  category: string;
  categorySlug: string;
  tags: string | null;
  author: string;
  isFeatured: boolean;
  readingTime: number;
  publishedAt: string | null;
}

export function BlogListClient({
  posts,
  initialCategory = "all",
}: {
  posts: PublicBlogPost[];
  initialCategory?: string;
}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Category filter
      if (selectedCategory !== "all" && post.categorySlug !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase().trim();
        const inTitle = post.title.toLowerCase().includes(query);
        const inExcerpt = post.excerpt.toLowerCase().includes(query);
        const inCategory = post.category.toLowerCase().includes(query);
        const inTags = post.tags ? post.tags.toLowerCase().includes(query) : false;
        return inTitle || inExcerpt || inCategory || inTags;
      }
      return true;
    });
  }, [posts, selectedCategory, searchQuery]);

  return (
    <div className="space-y-12">
      {/* Search and Category Filter Toolbar */}
      <div className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-navy-900/60 p-5 backdrop-blur-md">
        {/* Search Input */}
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
            size={18}
            aria-hidden
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, keywords or technical concepts..."
            className="w-full rounded-xl border border-white/10 bg-navy-950/80 pl-11 pr-4 py-3 text-sm text-white placeholder-white/40 focus:border-purple-400 focus:outline-none transition-colors"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-white/40 hover:text-white"
            >
              Clear
            </button>
          ) : null}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
              selectedCategory === "all"
                ? "bg-purple-600 text-white shadow-md shadow-purple-900/40"
                : "border border-white/10 bg-white/5 text-lavender-200/80 hover:border-purple-400/40 hover:text-white"
            }`}
          >
            All Articles ({posts.length})
          </button>

          {BLOG_CATEGORIES.map((cat) => {
            const count = posts.filter((p) => p.categorySlug === cat.slug).length;
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-purple-600 text-white shadow-md shadow-purple-900/40"
                    : "border border-white/10 bg-white/5 text-lavender-200/70 hover:border-purple-400/40 hover:text-white"
                }`}
              >
                {cat.title} {count > 0 ? `(${count})` : ""}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count & Grid */}
      <div>
        <div className="mb-6 flex items-center justify-between text-xs text-lavender-200/70 font-mono">
          <span>Showing {filteredPosts.length} of {posts.length} published insights</span>
          {selectedCategory !== "all" || searchQuery ? (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="text-purple-400 hover:text-purple-300 underline"
            >
              Reset filters
            </button>
          ) : null}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-navy-900/40 py-16 text-center">
            <BookOpen className="mx-auto mb-3 text-purple-400" size={32} />
            <h3 className="font-display text-lg font-bold text-white">No articles found</h3>
            <p className="mt-1 text-xs text-lavender-200/70">
              Try adjusting your search query or selecting a different practice category.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-navy-900/40 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-500/50 hover:bg-navy-900/70 hover:shadow-[0_20px_40px_rgba(7,11,22,0.8)]"
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full border border-purple-500/30 bg-purple-950/60 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-purple-300">
                      {post.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-lavender-200/60">
                      <Clock size={12} />
                      <span>{post.readingTime} min read</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display mt-4 text-xl font-bold tracking-tight text-white group-hover:text-lavender-100 transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" aria-hidden />
                      {post.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="mt-2.5 text-xs leading-relaxed text-lavender-200/75 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer metadata */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-lavender-200/60">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "Recent"}
                  </span>

                  <span className="inline-flex items-center gap-1 font-semibold text-purple-400 group-hover:text-purple-300 group-hover:translate-x-1 transition-all">
                    <span>Read Article</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
