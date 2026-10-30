"use client";

import Link from "next/link";
import {
  Briefcase,
  Store,
  Rocket,
  Code2,
  Megaphone,
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

interface AudienceCard {
  id: string;
  title: string;
  persona: string;
  description: string;
  solutions: string[];
  icon: typeof Briefcase;
}

const AUDIENCES: AudienceCard[] = [
  {
    id: "ceos",
    title: "CEOs & Business Leaders",
    persona: "Executive Leadership",
    description:
      "Strategic digital infrastructure, automated executive reporting dashboards, and high-conversion flagship platforms that scale revenue and enhance investor confidence.",
    solutions: ["Power BI Executive Cockpits", "Corporate Flagship Websites", "Structured Data Governance"],
    icon: Briefcase,
  },
  {
    id: "small-business",
    title: "Small Business Owners",
    persona: "Local & Regional Enterprises",
    description:
      "Streamlined web presences and automated operational workflows that eliminate manual spreadsheet chaos, attract local customers, and streamline daily bookings.",
    solutions: ["High-Speed Local Web Presences", "Automated Client Enquiries", "Google Business Visibility"],
    icon: Store,
  },
  {
    id: "startups",
    title: "Startups & Entrepreneurs",
    persona: "Venture & Early Stage",
    description:
      "Rapid MVP development, product launch landing pages, investor pitch deck motion, and full-stack applications engineered to test market traction quickly.",
    solutions: ["MVP Full-Stack Architecture", "Pitch Deck Visual Graphics", "Conversion Landing Funnels"],
    icon: Rocket,
  },
  {
    id: "engineers",
    title: "Software Engineers & Tech Teams",
    persona: "Engineering Departments",
    description:
      "Modern, maintainable TypeScript codebases, clean component libraries, REST API endpoints, and reproducible Python data pipelines ready for immediate handoff.",
    solutions: ["TypeScript & Next.js Components", "Python Data Scripts (Pandas)", "Comprehensive Handover Docs"],
    icon: Code2,
  },
  {
    id: "marketers",
    title: "Marketing Professionals",
    persona: "Growth & Brand Directors",
    description:
      "Retention-engineered vertical video reels, kinetic typography assets, multi-channel Canva template systems, and technical SEO that boosts organic discoverability.",
    solutions: ["9:16 Kinetic Video Reels", "Editable Canva Corporate Kits", "Core Web Vitals Optimization"],
    icon: Megaphone,
  },
  {
    id: "education",
    title: "Educational Institutions",
    persona: "Academies & Knowledge Platforms",
    description:
      "Intuitive student portals, structured course schedules, event microsites, and animated explainer videos that break down complex academic subjects into digestible modules.",
    solutions: ["Event & Conference Microsites", "Animated Explainer Videos", "Responsive Learning Layouts"],
    icon: GraduationCap,
  },
];

export function WhoWeHelpSection() {
  return (
    <section className="relative bg-[#070B16] py-24 sm:py-32 text-white border-t border-white/5">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/3 top-10 h-[500px] w-[500px] rounded-full bg-purple-900/15 blur-[150px]"
        aria-hidden="true"
      />

      <Container className="relative">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-lavender-200 backdrop-blur-md">
            <Sparkles size={14} className="text-purple-400" aria-hidden />
            <span>Audience &amp; Industry Alignment</span>
          </div>

          <h2 className="font-display mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
            Tailored Solutions for{" "}
            <span className="bg-gradient-to-r from-purple-400 via-lavender-200 to-white bg-clip-text text-transparent">
              Every Stage of Growth.
            </span>
          </h2>

          <p className="mt-4 text-base leading-7 text-lavender-200/80 sm:text-lg">
            Whether you are an executive streamlining operations, a founder launching an MVP, or a marketer seeking high-retention video motion, we adapt our engineering to your exact goals.
          </p>
        </div>

        {/* 6 Audience Cards Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {AUDIENCES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-navy-900/40 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-500/50 hover:bg-navy-900/70 hover:shadow-[0_20px_40px_rgba(7,11,22,0.8)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-lavender-200 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <Icon size={20} aria-hidden />
                    </div>
                    <span className="text-[10px] font-mono text-purple-300 bg-purple-950/60 px-2.5 py-1 rounded-full border border-purple-800/40">
                      {item.persona}
                    </span>
                  </div>

                  <h3 className="font-display mt-5 text-xl font-bold text-white group-hover:text-lavender-100 transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-xs leading-relaxed text-lavender-200/75">
                    {item.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-white/5 space-y-1.5">
                    {item.solutions.map((sol) => (
                      <div key={sol} className="flex items-center gap-2 text-xs text-lavender-200/85">
                        <CheckCircle2 size={12} className="text-purple-400 shrink-0" />
                        <span>{sol}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <Link
                    href={`/contact?audience=${item.id}`}
                    className="inline-flex w-full items-center justify-between text-xs font-semibold text-purple-400 group-hover:text-purple-300 transition-colors"
                  >
                    <span>Discuss Solutions for {item.title}</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
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
