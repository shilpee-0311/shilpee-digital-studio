import type { Metadata } from "next";
import Link from "next/link";
import {
  ExternalLink,
  Code2,
  Database,
  Palette,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Github } from "@/components/ui/GithubIcon";
import { Linkedin } from "@/components/ui/LinkedinIcon";
import { services } from "@/content/services";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { site } from "@/lib/site";
import { TechnicalSkills } from "@/components/about/TechnicalSkills";
import { FeaturedProjectCard } from "@/components/about/FeaturedProjectCard";

export const metadata: Metadata = {
  title: "About Founder & Technical Practice | Shilpee Digital Studio",
  description: `About Shilpee Srivastava, Founder & Digital Solutions Developer at ${site.name} — practical digital solutions, web applications, data analytics, and creative visual design based in Lucknow, India.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Founder & Studio Practice"
        title="Engineering Practical Solutions & Clear Digital Craft"
        description="An independent digital practice founded by Shilpee Srivastava, combining software development, data analytics, and visual creativity with transparent scopes and honest communication."
      />

      {/* 1. Founder Profile & Overview */}
      <Section className="bg-white">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="space-y-6 text-base leading-7 text-muted lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-600/20 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
                <ShieldCheck size={14} aria-hidden />
                <span>Founder &amp; Digital Solutions Developer</span>
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-cream px-3 py-1 text-xs font-medium text-navy-800">
                <MapPin size={13} className="text-purple-600" aria-hidden />
                <span>Lucknow, India</span>
              </span>
            </div>

            <h2 className="font-display text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">
              Shilpee Srivastava
            </h2>

            <p className="text-lg font-medium text-navy-900 leading-relaxed">
              Shilpee Srivastava is the founder of Shilpee Digital Studio, with a background in computer applications, programming, data analytics and digital technology.
            </p>

            <p>
              Her work and learning experience span Python, SQL, business intelligence, data analysis and AI-assisted application development. She is passionate about creating practical digital solutions that help businesses and professionals build their online presence and use technology effectively.
            </p>

            <p>
              I believe in absolute transparency. In an industry crowded with inflated case studies and fabricated metrics, every sample project presented across this studio is built as an original, fully functional demonstration prototype, strictly labelled as a <strong className="font-semibold text-purple-700">Demo Project</strong>, <strong className="font-semibold text-purple-700">Concept Showcase</strong>, or <strong className="font-semibold text-purple-700">Personal Project</strong>.
            </p>

            {/* Professional Links */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {site.linkedin ? (
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-purple-600/30 bg-purple-50 px-5 py-2.5 text-xs font-semibold text-purple-700 transition-all hover:bg-purple-600 hover:text-white"
                >
                  <Linkedin size={15} aria-hidden />
                  <span>Connect on LinkedIn</span>
                  <ExternalLink size={12} className="opacity-70" aria-hidden />
                </a>
              ) : null}

              {site.github ? (
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-navy-800"
                >
                  <Github size={15} aria-hidden />
                  <span>Follow on GitHub (@shilpee-0311)</span>
                  <ExternalLink size={12} className="opacity-70" aria-hidden />
                </a>
              ) : null}
            </div>
          </div>

          {/* Working Principles Card */}
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
                <span><strong>Direct Founder Collaboration:</strong> You communicate directly with the developer and analyst throughout the entire project lifecycle.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-purple-600" aria-hidden />
                <span><strong>Clean &amp; Maintainable Standards:</strong> Python and TypeScript codebases structured with readable logic, tests, and documentation.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-purple-600" aria-hidden />
                <span><strong>Verifiable Deliverables:</strong> Transparent handoff with complete code ownership, data queries, and editable templates.</span>
              </li>
            </ul>
          </div>
        </Container>
      </Section>

      {/* 2. Technical Skills Section */}
      <Section className="bg-cream border-t border-line">
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-600/20 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
              <Code2 size={14} aria-hidden />
              <span>Demonstrated Capabilities</span>
            </div>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">
              Technical Skills &amp; Practice Stack
            </h2>
            <p className="mt-3 text-base text-muted">
              Organized into five core disciplines: programming, databases, business analytics, applied machine learning/NLP concepts, development workflows, and visual design.
            </p>
          </div>

          <div className="mt-10">
            <TechnicalSkills />
          </div>
        </Container>
      </Section>

      {/* 3. Featured Project Section */}
      <Section className="bg-white border-t border-line">
        <Container>
          <div className="mb-8 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-600/20 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
              <Sparkles size={14} aria-hidden />
              <span>Independent Technical Highlight</span>
            </div>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">
              Featured Technical Project
            </h2>
            <p className="mt-2 text-sm text-muted">
              A personal open-source project demonstrating natural language processing, vector similarity calculations, and Streamlit application deployment.
            </p>
          </div>

          <FeaturedProjectCard />
        </Container>
      </Section>

      {/* 4. GitHub "Explore My Code" Section */}
      <Section className="relative overflow-hidden bg-navy-900 text-white">
        <div
          className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-lavender-200">
              <Github size={14} aria-hidden />
              <span>Public Repositories &amp; Open Source</span>
            </div>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Explore My Code on GitHub
            </h2>
            <p className="mt-4 text-base leading-7 text-lavender-200">
              Clean code speaks louder than words. As a developer and data practitioner, I maintain public repositories where you can inspect architectural choices, code readability, modern component structure, and technical discipline firsthand.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-navy-800/80 p-6 backdrop-blur transition-all hover:border-purple-500/50">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/20 text-purple-400">
                <Code2 size={20} aria-hidden />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">Full-Stack &amp; Web Architectures</h3>
              <p className="mt-2 text-sm leading-6 text-lavender-200/80">
                Modern Next.js, React, and TypeScript builds structured with semantic markup, mobile-first Tailwind styling, and secure session patterns.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-navy-800/80 p-6 backdrop-blur transition-all hover:border-purple-500/50">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/20 text-purple-400">
                <Database size={20} aria-hidden />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">Data Scripts &amp; Pipelines</h3>
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

      {/* 5. Seven Core Services Overview */}
      <Section className="bg-cream">
        <Container>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-600">
                Capabilities
              </p>
              <h2 className="font-display mt-2 text-3xl font-semibold text-navy-900">
                Seven Dedicated Practice Areas
              </h2>
            </div>
            <Button href="/services" variant="secondary">
              View All Services
            </Button>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link key={service.slug} href={service.customHref || `/services/${service.slug}`}>
                <Card className="h-full transition-all hover:-translate-y-1 hover:border-purple-500/30">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-navy-900">
                      {service.title}
                    </h3>
                    {service.slug === "motion-animation" ? (
                      <Sparkles size={16} className="text-purple-600" aria-hidden />
                    ) : null}
                  </div>
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
              Whether you need a web application, a data pipeline, an interactive dashboard, or creative motion visuals, let’s define your scope together.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button href="/contact">Get in Touch</Button>
              <Button href="/pricing" variant="secondary">View Pricing &amp; Packages</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
