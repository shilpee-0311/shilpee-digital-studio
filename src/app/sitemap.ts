import type { MetadataRoute } from "next";
import { demoProjects } from "@/content/demo-projects";
import { services } from "@/content/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/pricing",
    "/faq",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const servicePaths = services.map((service) => `/services/${service.slug}`);
  const projectPaths = demoProjects.map(
    (project) => `/portfolio/${project.slug}`
  );

  return [...staticPaths, ...servicePaths, ...projectPaths].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
