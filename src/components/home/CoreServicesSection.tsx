"use client";

import Link from "next/link";
import {
  Globe,
  Code2,
  Database,
  Palette,
  Mail,
  Share2,
  Film,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

interface ServiceCardData {
  slug: string;
  title: string;
  description: string;
  offerings: string[];
  href: string;
  icon: typeof Globe;
  badge?: string;
  visualPreview: React.ReactNode;
}

const SERVICES_DATA: ServiceCardData[] = [
  {
    slug: "website-development",
    title: "Website Development",
    description:
      "Bespoke, high-performance web applications and corporate websites built on Next.js, React, and TypeScript. Optimized for sub-second page loads and high search visibility.",
    offerings: ["Next.js Full-Stack", "Mobile-First UI", "Technical SEO", "Fast Core Web Vitals"],
    href: "/services/website-development",
    icon: Globe,
    visualPreview: (
      <div className="relative h-28 w-full rounded-xl bg-navy-950 border border-white/10 p-3 flex flex-col justify-between">
        <div className="flex items-center gap-1.5 border-b border-white/10 pb-1.5">
          <div className="h-2 w-2 rounded-full bg-red-400" />
          <div className="h-2 w-2 rounded-full bg-amber-400" />
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
          <div className="h-2 w-20 rounded bg-white/10 ml-2" />
        </div>
        <div className="space-y-1">
          <div className="h-2.5 w-3/4 rounded bg-purple-500/80" />
          <div className="h-2 w-1/2 rounded bg-lavender-300/60" />
        </div>
      </div>
    ),
  },
  {
    slug: "software-apps",
    title: "Software & Web Applications",
    description:
      "Custom business software, internal dashboards, and management workflows that replace fragile spreadsheets with structured, secure, and role-aware workspaces.",
    offerings: ["Custom Web Apps", "Role-Aware Access", "Prisma Database", "Operational Views"],
    href: "/services/software-apps",
    icon: Code2,
    visualPreview: (
      <div className="relative h-28 w-full rounded-xl bg-navy-950 border border-white/10 p-3 flex items-center justify-center">
        <div className="w-full space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-mono text-purple-300">
            <span>APP SHELL</span>
            <span className="text-emerald-400">READY</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <div className="h-8 rounded bg-white/5 border border-white/10" />
            <div className="h-8 rounded bg-purple-600/30 border border-purple-500/30" />
            <div className="h-8 rounded bg-white/5 border border-white/10" />
          </div>
        </div>
      </div>
    ),
  },
  {
    slug: "data-analytics",
    title: "Data Analytics & Automation",
    description:
      "Transforming raw spreadsheets and transactional logs into automated Python cleaning pipelines, SQL queries, and interactive executive Power BI reporting dashboards.",
    offerings: ["Python (Pandas/NumPy)", "MySQL Relational Schemas", "Power BI Dashboards", "EDA & Metrics"],
    href: "/services/data-analytics",
    icon: Database,
    visualPreview: (
      <div className="relative h-28 w-full rounded-xl bg-navy-950 border border-white/10 p-3 flex items-end gap-1.5 justify-around">
        <div className="h-8 w-4 rounded-t bg-purple-600/60" />
        <div className="h-14 w-4 rounded-t bg-purple-500" />
        <div className="h-10 w-4 rounded-t bg-lavender-300" />
        <div className="h-18 w-4 rounded-t bg-purple-400" />
        <div className="h-12 w-4 rounded-t bg-purple-700" />
      </div>
    ),
  },
  {
    slug: "graphic-design",
    title: "Graphic Design & Canva",
    description:
      "Cohesive brand identity systems, social media creative packs, presentations, and reusable corporate Canva templates that keep your brand consistent across channels.",
    offerings: ["Brand Identity Systems", "Social Media Kits", "Slide Pitch Decks", "Canva Templates"],
    href: "/services/graphic-design",
    icon: Palette,
    visualPreview: (
      <div className="relative h-28 w-full rounded-xl bg-navy-950 border border-white/10 p-3 flex items-center justify-center">
        <div className="flex gap-2 items-center">
          <div className="h-14 w-10 rounded-lg bg-purple-600/40 border border-purple-400 -rotate-12" />
          <div className="h-16 w-12 rounded-lg bg-purple-500 border border-lavender-200 z-10 shadow-lg flex items-center justify-center">
            <span className="text-[10px] font-bold text-white">LOGO</span>
          </div>
          <div className="h-14 w-10 rounded-lg bg-purple-800/40 border border-purple-400 rotate-12" />
        </div>
      </div>
    ),
  },
  {
    slug: "digital-invitations",
    title: "Digital Invitations & Personalized Websites",
    description:
      "Bespoke digital invitation websites for luxury weddings and milestone celebrations. Features interactive schedules, venue directions, and seamless online RSVP management.",
    offerings: ["Wedding Invitation Sites", "Schedule Timelines", "Google Maps Venue Direct", "Instant RSVP Handling"],
    href: "/services/digital-invitations",
    icon: Mail,
    visualPreview: (
      <div className="relative h-28 w-full rounded-xl bg-navy-950 border border-white/10 p-3 flex items-center justify-center">
        <div className="text-center space-y-1">
          <span className="text-[9px] font-mono tracking-widest text-lavender-200 uppercase">CELEBRATION</span>
          <p className="font-display text-sm font-bold text-white">Save The Date</p>
          <div className="h-0.5 w-16 mx-auto bg-purple-400 rounded-full" />
        </div>
      </div>
    ),
  },
  {
    slug: "social-media",
    title: "Social Media Management & Digital Presence",
    description:
      "Strategic ninety-day content systems, caption frameworks, post templates, and analytics reporting designed to build organic brand authority and audience engagement.",
    offerings: ["90-Day Content Calendars", "Pillar Strategy", "Template Systems", "Engagement Reporting"],
    href: "/services/social-media",
    icon: Share2,
    visualPreview: (
      <div className="relative h-28 w-full rounded-xl bg-navy-950 border border-white/10 p-3 flex items-center justify-center">
        <div className="space-y-1.5 w-full max-w-[140px]">
          <div className="flex justify-between text-[9px] font-mono text-purple-300">
            <span>PILLAR POST</span>
            <span>+24%</span>
          </div>
          <div className="h-2 rounded bg-purple-500 w-full" />
          <div className="h-2 rounded bg-lavender-300 w-4/5" />
          <div className="h-2 rounded bg-white/20 w-3/5" />
        </div>
      </div>
    ),
  },
  {
    slug: "motion-animation",
    title: "Motion Animation & VFX",
    description:
      "Dedicated motion design practice: kinetic typography, 3D product exploding assemblies, broadcast stingers, and viral 9:16 social video motion that captivates audiences.",
    offerings: ["Kinetic Typography", "3D Product Assemblies", "Logo Stingers", "9:16 Video Reels"],
    href: "/motion-animation",
    icon: Film,
    badge: "Dedicated Studio Experience",
    visualPreview: (
      <div className="relative h-28 w-full rounded-xl bg-navy-950 border border-purple-500/30 p-3 flex items-center justify-center overflow-hidden">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-purple-500 to-lavender-200 rotate-12 shadow-[0_0_20px_rgba(124,58,237,0.6)] flex items-center justify-center">
          <Sparkles className="text-white animate-pulse" size={20} />
        </div>
        <div className="absolute top-2 right-2 text-[9px] font-mono text-purple-300 uppercase">
          60 FPS
        </div>
      </div>
    ),
  },
];

export function CoreServicesSection() {
  return (
    <section id="services" className="relative scroll-mt-20 bg-[#070B16] py-24 sm:py-32 text-white border-t border-white/5">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-full -translate-x-1/2 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.12),transparent_70%)]"
        aria-hidden="true"
      />

      <Container className="relative">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-lavender-200 backdrop-blur-md">
            <Sparkles size={14} className="text-purple-400" aria-hidden />
            <span>Seven Dedicated Practice Areas</span>
          </div>

          <h2 className="font-display mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
            Digital Solutions Designed Around{" "}
            <span className="bg-gradient-to-r from-purple-400 via-lavender-200 to-white bg-clip-text text-transparent">
              Your Needs.
            </span>
          </h2>

          <p className="mt-4 text-base leading-7 text-lavender-200/80 sm:text-lg">
            Engineering discipline meets visual elegance. Every project is scoped with transparent milestones, verifiable quality, and complete code or asset ownership.
          </p>
        </div>

        {/* 7 Services Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES_DATA.map((service) => {
            const Icon = service.icon;
            const isMotion = service.slug === "motion-animation";
            return (
              <div
                key={service.slug}
                className={`group relative flex flex-col justify-between rounded-2xl border p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 ${
                  isMotion
                    ? "border-purple-500/50 bg-navy-900/70 shadow-[0_10px_35px_rgba(124,58,237,0.2)] hover:border-purple-400 hover:shadow-[0_20px_50px_rgba(124,58,237,0.35)]"
                    : "border-white/10 bg-navy-900/40 hover:border-purple-500/40 hover:bg-navy-900/70 hover:shadow-[0_20px_40px_rgba(7,11,22,0.8)]"
                }`}
              >
                <div>
                  {/* Visual Preview Box */}
                  <div className="mb-5">{service.visualPreview}</div>

                  <div className="flex items-center justify-between">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-2 text-lavender-200 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <Icon size={20} aria-hidden />
                    </div>

                    {service.badge ? (
                      <span className="rounded-full border border-purple-400/40 bg-purple-950/80 px-2.5 py-0.5 text-[10px] font-mono text-purple-300">
                        {service.badge}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="font-display mt-4 text-xl font-bold text-white group-hover:text-lavender-100 transition-colors">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-lavender-200/75">
                    {service.description}
                  </p>

                  {/* Offerings Pills */}
                  <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5">
                    {service.offerings.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-[11px] text-lavender-200/85">
                        <CheckCircle2 size={12} className="text-purple-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learn More Link */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <Link
                    href={service.href}
                    className="inline-flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-lavender-100 transition-all hover:border-purple-400 hover:bg-purple-600 hover:text-white"
                  >
                    <span>{isMotion ? "Open Motion Studio" : "Explore Service Details"}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
