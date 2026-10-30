import type { MetadataRoute } from "next";
import { demoProjects } from "@/content/demo-projects";
import { services } from "@/content/services";
import { BLOG_CATEGORIES } from "@/content/blog-categories";
import { prisma } from "@/lib/prisma";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    "",
    "/about",
    "/services",
    "/motion-animation",
    "/portfolio",
    "/blog",
    "/pricing",
    "/faq",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const servicePaths = services.map((service) => `/services/${service.slug}`);
  const projectPaths = demoProjects.map((project) => `/portfolio/${project.slug}`);
  const categoryPaths = BLOG_CATEGORIES.map((c) => `/blog/category/${c.slug}`);

  let blogPostEntries: { url: string; lastModified?: Date }[] = [];
  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true },
    });
    blogPostEntries = posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: p.updatedAt,
    }));
  } catch {
    // Graceful fallback
  }

  const mainEntries = [
    ...staticPaths,
    ...servicePaths,
    ...projectPaths,
    ...categoryPaths,
  ].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "weekly" as const,
    priority:
      path === ""
        ? 1
        : path === "/motion-animation" || path === "/blog"
        ? 0.9
        : 0.7,
  }));

  const blogEntries = blogPostEntries.map((item) => ({
    url: item.url,
    lastModified: item.lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...mainEntries, ...blogEntries];
}
