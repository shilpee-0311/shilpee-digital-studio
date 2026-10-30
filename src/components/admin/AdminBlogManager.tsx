"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowLeft,
  RefreshCw,
  LogOut,
  ShieldCheck,
  AlertCircle,
  Tag,
  Save,
  X,
} from "lucide-react";
import { BLOG_CATEGORIES, slugify } from "@/content/blog-categories";
import { MarkdownContent } from "@/components/blog/MarkdownContent";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  coverImageAlt: string | null;
  category: string;
  categorySlug: string;
  tags: string | null;
  author: string;
  status: "DRAFT" | "PUBLISHED";
  isFeatured: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  readingTime: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export function AdminBlogManager({ username }: { username: string }) {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorTab, setEditorTab] = useState<"edit" | "preview">("edit");
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch posts
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedStatus !== "ALL") params.set("status", selectedStatus);
      if (selectedCategory !== "ALL") params.set("category", selectedCategory);
      if (search.trim()) params.set("search", search.trim());

      const res = await fetch(`/api/admin/blog?${params.toString()}`);
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts);
      }
    } catch (err) {
      console.error("Failed to load blog posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [selectedStatus, selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPosts();
  };

  const openNewPostEditor = () => {
    setEditingPost({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImage: "/demo/luxestay.svg",
      coverImageAlt: "",
      category: BLOG_CATEGORIES[0].title,
      categorySlug: BLOG_CATEGORIES[0].slug,
      tags: "Web Development, Next.js, Architecture",
      author: "Shilpee Srivastava",
      status: "DRAFT",
      isFeatured: false,
      seoTitle: "",
      seoDescription: "",
      readingTime: 5,
    });
    setErrorMessage(null);
    setSuccessMessage(null);
    setEditorTab("edit");
    setIsEditorOpen(true);
  };

  const openEditPost = (post: BlogPost) => {
    setEditingPost({ ...post });
    setErrorMessage(null);
    setSuccessMessage(null);
    setEditorTab("edit");
    setIsEditorOpen(true);
  };

  const handleTitleChange = (newTitle: string) => {
    if (!editingPost) return;
    const isNew = !editingPost.id;
    setEditingPost((prev) => ({
      ...prev,
      title: newTitle,
      slug: isNew ? slugify(newTitle) : prev?.slug || slugify(newTitle),
    }));
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    setSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const isNew = !editingPost.id;
      const url = isNew ? "/api/admin/blog" : `/api/admin/blog/${editingPost.id}`;
      const method = isNew ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPost),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Failed to save blog post");
        return;
      }

      setSuccessMessage(isNew ? "Blog post created successfully!" : "Blog post updated successfully!");
      setIsEditorOpen(false);
      setEditingPost(null);
      fetchPosts();
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this blog post?")) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert(data.error || "Could not delete post");
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleStatus = async (post: BlogPost) => {
    const nextStatus = post.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    try {
      const res = await fetch(`/api/admin/blog/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...post, status: nextStatus }),
      });
      const data = await res.json();
      if (data.success) {
        fetchPosts();
      }
    } catch (err) {
      console.error("Status toggle error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 text-lavender-100">
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-navy-900/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 text-white shadow-md shadow-purple-600/30">
              <ShieldCheck size={18} aria-hidden />
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight text-white">Shilpee Digital Studio</p>
              <p className="text-[10px] uppercase tracking-widest text-purple-400">
                SEO Blog &amp; Content Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {/* Link back to Enquiries Dashboard */}
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-lavender-200 hover:border-purple-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Enquiries Dashboard</span>
            </Link>

            <a
              href="/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-lavender-200 transition-colors hover:text-white"
            >
              <span>View Public Blog</span>
              <ExternalLink size={13} aria-hidden />
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header & Action Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Blog Articles &amp; Insights
            </h1>
            <p className="text-xs text-lavender-200/70 mt-1">
              Create, edit, optimize, and publish SEO-targeted editorial content to drive organic traffic.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchPosts}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs font-semibold text-lavender-200 hover:bg-white/10 hover:text-white transition-colors"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              <span>Refresh</span>
            </button>

            <button
              type="button"
              onClick={openNewPostEditor}
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-purple-900/40 hover:bg-purple-500 transition-all"
            >
              <Plus size={16} />
              <span>Create New Article</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-navy-900/60 p-4 sm:flex-row sm:items-center sm:justify-between">
          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" size={15} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, keywords or tags..."
              className="w-full rounded-xl border border-white/10 bg-navy-950/80 pl-10 pr-4 py-2 text-xs text-white placeholder-white/40 focus:border-purple-400 focus:outline-none"
            />
          </form>

          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-xl border border-white/10 bg-navy-950/80 px-3 py-2 text-xs text-lavender-200 focus:border-purple-400 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-xl border border-white/10 bg-navy-950/80 px-3 py-2 text-xs text-lavender-200 focus:border-purple-400 focus:outline-none"
            >
              <option value="ALL">All Categories</option>
              {BLOG_CATEGORIES.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Articles List Table */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-navy-900/50 shadow-xl backdrop-blur-sm">
          {loading ? (
            <div className="py-20 text-center text-xs text-lavender-200/60">
              <RefreshCw className="mx-auto mb-2 animate-spin text-purple-400" size={24} />
              <span>Loading articles...</span>
            </div>
          ) : posts.length === 0 ? (
            <div className="py-20 text-center text-xs text-lavender-200/60">
              <FileText className="mx-auto mb-2 text-white/20" size={32} />
              <p className="text-sm font-semibold text-white">No articles found</p>
              <p className="mt-1">Adjust filters or create your first blog article.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/10 bg-navy-950/60 text-[11px] font-mono uppercase tracking-wider text-purple-300">
                  <tr>
                    <th className="px-5 py-3.5">Title &amp; Slug</th>
                    <th className="px-4 py-3.5">Category</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5">Published Date</th>
                    <th className="px-4 py-3.5">Reading Time</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4 max-w-md">
                        <div className="flex items-center gap-2">
                          {post.isFeatured ? (
                            <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[9px] font-mono text-amber-300 border border-amber-500/30">
                              Featured
                            </span>
                          ) : null}
                          <span className="font-semibold text-white">{post.title}</span>
                        </div>
                        <p className="font-mono text-[11px] text-purple-400 mt-0.5 truncate">
                          /blog/{post.slug}
                        </p>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-lavender-200">
                        <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px]">
                          {post.category}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(post)}
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider transition-all ${
                            post.status === "PUBLISHED"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30"
                              : "bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30"
                          }`}
                          title="Click to toggle status"
                        >
                          {post.status}
                        </button>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-lavender-200/70 text-[11px] font-mono">
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "Unpublished Draft"}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-lavender-200/70 text-[11px] font-mono">
                        {post.readingTime} min read
                      </td>
                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          {post.status === "PUBLISHED" ? (
                            <a
                              href={`/blog/${post.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-lavender-200 hover:border-purple-400 hover:text-white transition-colors"
                              title="View Live Article"
                            >
                              <ExternalLink size={14} />
                            </a>
                          ) : null}

                          <button
                            type="button"
                            onClick={() => openEditPost(post)}
                            className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-lavender-200 hover:border-purple-400 hover:text-white transition-colors"
                            title="Edit Article"
                          >
                            <Edit size={14} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeletePost(post.id)}
                            disabled={deletingId === post.id}
                            className="rounded-lg border border-red-500/20 bg-red-500/10 p-1.5 text-red-300 hover:bg-red-500/20 transition-colors"
                            title="Delete Article"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Editor Modal with Markdown live preview */}
      {isEditorOpen && editingPost ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-5xl rounded-3xl border border-white/15 bg-navy-900 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-navy-950 px-6 py-4">
              <div>
                <h2 className="font-display text-lg font-bold text-white">
                  {editingPost.id ? "Edit Article" : "Create New Article"}
                </h2>
                <p className="text-[11px] font-mono text-purple-400">
                  {editingPost.slug ? `/blog/${editingPost.slug}` : "Draft Slug"}
                </p>
              </div>

              {/* Edit / Preview Toggle */}
              <div className="flex items-center gap-2">
                <div className="flex rounded-xl border border-white/10 bg-white/5 p-1">
                  <button
                    type="button"
                    onClick={() => setEditorTab("edit")}
                    className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                      editorTab === "edit" ? "bg-purple-600 text-white" : "text-white/60 hover:text-white"
                    }`}
                  >
                    Edit Form
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorTab("preview")}
                    className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                      editorTab === "preview" ? "bg-purple-600 text-white" : "text-white/60 hover:text-white"
                    }`}
                  >
                    Live Preview
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/5 p-2 text-lavender-200 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Error Message if any */}
            {errorMessage ? (
              <div className="mx-6 mt-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-200">
                <AlertCircle size={16} className="text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            ) : null}

            {/* Editor Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {editorTab === "edit" ? (
                <form id="blog-editor-form" onSubmit={handleSavePost} className="space-y-6">
                  {/* Title & Slug */}
                  <div className="grid gap-4 sm:grid-cols-12">
                    <div className="sm:col-span-8">
                      <label className="block text-xs font-mono uppercase tracking-wider text-purple-300 mb-1.5">
                        Article Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingPost.title || ""}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="e.g. Why Modern Businesses are Moving to Next.js"
                        className="w-full rounded-xl border border-white/10 bg-navy-950 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-purple-400 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <label className="block text-xs font-mono uppercase tracking-wider text-purple-300 mb-1.5">
                        URL Slug *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingPost.slug || ""}
                        onChange={(e) =>
                          setEditingPost((p) => ({ ...p, slug: slugify(e.target.value) }))
                        }
                        placeholder="unique-article-slug"
                        className="w-full rounded-xl border border-white/10 bg-navy-950 px-4 py-2.5 text-sm font-mono text-purple-200 focus:border-purple-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-purple-300 mb-1.5">
                      Short Excerpt / Summary * (10 - 600 characters)
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={editingPost.excerpt || ""}
                      onChange={(e) =>
                        setEditingPost((p) => ({ ...p, excerpt: e.target.value }))
                      }
                      placeholder="Concise overview displayed on article cards and search results..."
                      className="w-full rounded-xl border border-white/10 bg-navy-950 px-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-purple-400 focus:outline-none"
                    />
                  </div>

                  {/* Category, Status, Reading Time, IsFeatured */}
                  <div className="grid gap-4 sm:grid-cols-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-purple-300 mb-1.5">
                        Category *
                      </label>
                      <select
                        value={editingPost.categorySlug || BLOG_CATEGORIES[0].slug}
                        onChange={(e) => {
                          const cat = BLOG_CATEGORIES.find((c) => c.slug === e.target.value);
                          if (cat) {
                            setEditingPost((p) => ({
                              ...p,
                              category: cat.title,
                              categorySlug: cat.slug,
                            }));
                          }
                        }}
                        className="w-full rounded-xl border border-white/10 bg-navy-950 px-3 py-2 text-xs text-white focus:border-purple-400 focus:outline-none"
                      >
                        {BLOG_CATEGORIES.map((cat) => (
                          <option key={cat.slug} value={cat.slug}>
                            {cat.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-purple-300 mb-1.5">
                        Publication Status *
                      </label>
                      <select
                        value={editingPost.status || "DRAFT"}
                        onChange={(e) =>
                          setEditingPost((p) => ({
                            ...p,
                            status: e.target.value as "DRAFT" | "PUBLISHED",
                          }))
                        }
                        className="w-full rounded-xl border border-white/10 bg-navy-950 px-3 py-2 text-xs text-white focus:border-purple-400 focus:outline-none"
                      >
                        <option value="DRAFT">Save as Draft</option>
                        <option value="PUBLISHED">Published</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-purple-300 mb-1.5">
                        Reading Time (min)
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={60}
                        value={editingPost.readingTime || 5}
                        onChange={(e) =>
                          setEditingPost((p) => ({
                            ...p,
                            readingTime: parseInt(e.target.value) || 5,
                          }))
                        }
                        className="w-full rounded-xl border border-white/10 bg-navy-950 px-3 py-2 text-xs text-white focus:border-purple-400 focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-col justify-end">
                      <label className="flex items-center gap-2 cursor-pointer pb-2">
                        <input
                          type="checkbox"
                          checked={editingPost.isFeatured || false}
                          onChange={(e) =>
                            setEditingPost((p) => ({
                              ...p,
                              isFeatured: e.target.checked,
                            }))
                          }
                          className="h-4 w-4 rounded border-white/20 bg-navy-950 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-xs font-medium text-white">Mark as Featured</span>
                      </label>
                    </div>
                  </div>

                  {/* Markdown Content Editor */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-mono uppercase tracking-wider text-purple-300">
                        Article Content (Markdown Supported) *
                      </label>
                      <span className="text-[11px] text-lavender-200/50">
                        Use #, ##, ### for headings, ``` for code, - for lists, **bold**, *italic*
                      </span>
                    </div>
                    <textarea
                      required
                      rows={12}
                      value={editingPost.content || ""}
                      onChange={(e) =>
                        setEditingPost((p) => ({ ...p, content: e.target.value }))
                      }
                      placeholder="Write your article content using standard Markdown..."
                      className="w-full rounded-2xl border border-white/10 bg-navy-950 p-4 font-mono text-xs text-lavender-100 placeholder-white/30 focus:border-purple-400 focus:outline-none leading-relaxed"
                    />
                  </div>

                  {/* SEO & Image Metadata Accordion/Fields */}
                  <div className="rounded-2xl border border-white/10 bg-navy-950/60 p-4 space-y-4">
                    <p className="text-xs font-mono uppercase tracking-wider text-purple-300">
                      SEO &amp; Media Configuration
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-[11px] font-mono text-lavender-200 mb-1">
                          Cover Image URL
                        </label>
                        <input
                          type="text"
                          value={editingPost.coverImage || ""}
                          onChange={(e) =>
                            setEditingPost((p) => ({ ...p, coverImage: e.target.value }))
                          }
                          placeholder="/demo/luxestay.svg or https://..."
                          className="w-full rounded-xl border border-white/10 bg-navy-950 px-3 py-2 text-xs text-white focus:border-purple-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-lavender-200 mb-1">
                          Cover Image Alt Text
                        </label>
                        <input
                          type="text"
                          value={editingPost.coverImageAlt || ""}
                          onChange={(e) =>
                            setEditingPost((p) => ({
                              ...p,
                              coverImageAlt: e.target.value,
                            }))
                          }
                          placeholder="Descriptive alt text for accessibility & SEO..."
                          className="w-full rounded-xl border border-white/10 bg-navy-950 px-3 py-2 text-xs text-white focus:border-purple-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-[11px] font-mono text-lavender-200 mb-1">
                          SEO Meta Title (Defaults to Article Title if blank)
                        </label>
                        <input
                          type="text"
                          value={editingPost.seoTitle || ""}
                          onChange={(e) =>
                            setEditingPost((p) => ({ ...p, seoTitle: e.target.value }))
                          }
                          placeholder="Search engine title tag..."
                          className="w-full rounded-xl border border-white/10 bg-navy-950 px-3 py-2 text-xs text-white focus:border-purple-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-lavender-200 mb-1">
                          Tags &amp; Keywords (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={editingPost.tags || ""}
                          onChange={(e) =>
                            setEditingPost((p) => ({ ...p, tags: e.target.value }))
                          }
                          placeholder="Next.js, Web Development, SEO"
                          className="w-full rounded-xl border border-white/10 bg-navy-950 px-3 py-2 text-xs text-white focus:border-purple-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-lavender-200 mb-1">
                        SEO Meta Description (Defaults to Excerpt if blank)
                      </label>
                      <input
                        type="text"
                        value={editingPost.seoDescription || ""}
                        onChange={(e) =>
                          setEditingPost((p) => ({
                            ...p,
                            seoDescription: e.target.value,
                          }))
                        }
                        placeholder="Snippet displayed under search engine link..."
                        className="w-full rounded-xl border border-white/10 bg-navy-950 px-3 py-2 text-xs text-white focus:border-purple-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </form>
              ) : (
                /* Live Preview Tab */
                <div className="space-y-6">
                  <div className="rounded-2xl border border-white/10 bg-navy-950 p-6 sm:p-8">
                    <span className="rounded-full border border-purple-500/30 bg-purple-950/60 px-3 py-1 text-xs font-mono text-purple-300">
                      {editingPost.category || "General"}
                    </span>
                    <h1 className="font-display mt-4 text-3xl font-extrabold text-white sm:text-4xl">
                      {editingPost.title || "Untitled Article"}
                    </h1>
                    <p className="mt-2 text-xs text-lavender-200/70 font-mono">
                      By {editingPost.author || "Shilpee Srivastava"} • {editingPost.readingTime || 5} min read • Preview Mode
                    </p>
                    <p className="mt-4 text-base italic text-lavender-200 border-l-2 border-purple-400 pl-4">
                      {editingPost.excerpt || "No excerpt provided yet."}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-navy-950 p-6 sm:p-8">
                    <MarkdownContent content={editingPost.content || "*(No content written yet)*"} />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-white/10 bg-navy-950 px-6 py-4">
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-lavender-200 hover:text-white transition-colors"
              >
                Cancel
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  form="blog-editor-form"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-purple-900/40 hover:bg-purple-500 disabled:opacity-50 transition-all"
                >
                  <Save size={15} />
                  <span>{saving ? "Saving..." : "Save Blog Post"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
