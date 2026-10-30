import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Code2, Database, Palette, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Github } from "@/components/ui/GithubIcon";
import { services } from "@/content/services";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Me & The Studio",
  description: `About ${site.name} — a professional freelance digital studio offering full-stack web development, applications, data analytics, graphic design, and social media management.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Me & The Studio"
        title="Turning Ideas into Powerful Digital Experiences"
        description="An independent freelance digital practice built on engineering discipline, visual elegance, transparent collaboration, and verifiable quality."
      />

      {/* Founder & Studio Overview */}
      <Section className="bg-white">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="space-y-6 text-base leading-7 text-muted lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-600/20 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
              <ShieldCheck size={14} aria-hidden />
              <span>Independent Digital Solutions Craft</span>
            </div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">
              Precision engineering meets purposeful creative design.
            </h2>
            <p>
              Welcome to <strong className="font-semibold text-navy-900">{site.name}</strong>. I am Shilpee, an independent developer, analyst, and designer helping businesses, professionals, couples, and brands build high-impact online presences and streamlined workflows.
            </p>
            <p>
              Modern digital projects often suffer from fragmented communication — developers who don’t understand visual hierarchy, or designers who hand off unmaintainable mockups that cannot scale. My practice bridges this divide by delivering clean, production-ready code alongside thoughtful, cohesive aesthetic design.
            </p>
            <p>
              I believe in absolute transparency. In an industry crowded with inflated case studies and fabricated metrics, every sample project presented across this studio is built as an original, fully functional demonstration prototype, strictly labelled as a <strong className="font-semibold text-purple-700">Demo Project</strong> or <strong className="font-semibold text-purple-700">Concept Showcase</strong>.
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-cream p-8 shadow-sm lg:col-span-5">
            <h3 className="font-display text-xl font-semibold text-navy-900">
              Studio Working Principles
            </h3>
            <ul className="mt-6 space-y-4 text-sm text-navy-800">
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-purple-600" aria-hidden />
                <span><strong>Clear, Written Scopes:</strong> Every milestone, deliverable, and timeline is documented upfront with zero hidden costs.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-purple-600" aria-hidden />
                <span><strong>Direct Founder Collaboration:</strong> You communicate directly with the builder throughout the entire project lifecycle.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-purple-600" aria-hidden />
                <span><strong>Clean & Maintainable Standards:</strong> Modern TypeScript, accessible semantic markup, responsive layouts, and organized assets.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-purple-600" aria-hidden />
                <span><strong>Verifiable Deliverables:</strong> Transparent code handoff with complete ownership, documentation, and editable design templates.</span>
              </li>
            </ul>
          </div>
        </Container>
      </Section>

      {/* GitHub "Explore My Code" Section */}
      <Section className="relative overflow-hidden bg-navy-900 text-white">
        <div
          className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-lavender-200">
              <Github size={14} aria-hidden />
              <span>Public Repositories & Open Source</span>
            </div>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Explore My Code
            </h2>
            <p className="mt-4 text-base leading-7 text-lavender-200">
              Clean code speaks louder than words. As an engineer, I maintain public repositories where you can inspect architectural choices, code readability, modern component structure, and technical discipline firsthand.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-navy-800/80 p-6 backdrop-blur transition-all hover:border-purple-500/50">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/20 text-purple-400">
                <Code2 size={20} aria-hidden />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">Full-Stack & Web Architectures</h3>
              <p className="mt-2 text-sm leading-6 text-lavender-200/80">
                Modern Next.js, React, and TypeScript builds structured with semantic markup, mobile-first Tailwind styling, and secure session patterns.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-navy-800/80 p-6 backdrop-blur transition-all hover:border-purple-500/50">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/20 text-purple-400">
                <Database size={20} aria-hidden />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">Data Scripts & Pipelines</h3>
              <p className="mt-2 text-sm leading-6 text-lavender-200/80">
                Python scripts (Pandas, NumPy) and MySQL schemas designed for automated data cleaning, transformation, and business intelligence reporting.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-navy-800/80 p-6 backdrop-blur transition-all hover:border-purple-500/50">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/20 text-purple-400">
                <Palette size={20} aria-hidden />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">Modular UI Design Systems</h3>
              <p className="mt-2 text-sm leading-6 text-lavender-200/80">
                Reusable component libraries, responsive navigation patterns, accessible modals, and cohesive brand design tokens.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-900/30 transition-all hover:bg-purple-500 hover:shadow-purple-700/50"
            >
              <Github size={18} aria-hidden />
              <span>Visit GitHub Profile (@shilpee-0311)</span>
              <ExternalLink size={14} className="opacity-80" aria-hidden />
            </a>
            <Button href="/portfolio" variant="ghost">
              Browse Demo Projects
            </Button>
          </div>
        </Container>
      </Section>

      {/* Six Core Services Overview */}
      <Section className="bg-cream">
        <Container>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-600">
                Capabilities
              </p>
              <h2 className="font-display mt-2 text-3xl font-semibold text-navy-900">
                Six Dedicated Practice Areas
              </h2>
            </div>
            <Button href="/services" variant="secondary">
              View All Services
            </Button>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`}>
                <Card className="h-full transition-all hover:-translate-y-1 hover:border-purple-500/30">
                  <h3 className="text-lg font-semibold text-navy-900">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {service.summary}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-purple-700">
                    Explore Details <ArrowRight size={13} aria-hidden />
                  </p>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-line bg-white p-8 text-center sm:p-10">
            <h3 className="font-display text-2xl font-semibold text-navy-900">
              Have a project or unique concept in mind?
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted">
              Whether you need a full-scale web application, a marketing site, a custom data pipeline, or brand creatives, let’s define your scope together.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button href="/contact">Get in Touch</Button>
              <Button href="/pricing" variant="secondary">View Pricing & Packages</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
