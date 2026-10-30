import type { Metadata } from "next";
import { HomeContent } from "@/components/home/HomeContent";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — Turning Ideas into Powerful Digital Experiences`,
  description:
    "Independent digital studio crafting full-stack web applications, business software, data analytics pipelines, kinetic motion design, and brand assets with transparent, honest scopes.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${site.name} — Turning Ideas into Powerful Digital Experiences`,
    description:
      "Modern websites, intelligent software, data-driven solutions and creative digital experiences that help businesses move forward.",
    url: site.url,
    siteName: site.name,
    locale: "en_IN",
    type: "website",
  },
};

export default function HomePage() {
  return <HomeContent />;
}
