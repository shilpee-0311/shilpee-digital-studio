"use client";

import Link from "next/link";
import {
  MapPin,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Database,
  Sparkles,
} from "lucide-react";
import { Linkedin } from "@/components/ui/LinkedinIcon";
import { Github } from "@/components/ui/GithubIcon";
import { Container } from "@/components/ui/Container";

export function FounderIntroSection() {
  const technicalInterests = [
    "Python",
    "SQL",
    "Data Analytics",
    "Power BI",
    "Machine Learning",
    "NLP",
    "Web Development",
  ];

  return (
    <section className="relative bg-[#070B16] py-24 sm:py-32 text-white border-t border-white/5">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/4 bottom-10 h-[450px] w-[450px] rounded-full bg-purple-700/15 blur-[140px]"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-navy-900/40 p-6 sm:p-12 shadow-[0_20px_60px_rgba(7,11,22,0.8)] backdrop-blur-md">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Avatar & Persona Seal */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative">
                <div className="h-32 w-32 rounded-3xl bg-gradient-to-tr from-purple-600 via-purple-500 to-lavender-200 p-0.5 shadow-2xl">
                  <div className="flex h-full w-full items-center justify-center rounded-3xl bg-navy-950">
                    <span className="font-display text-4xl font-extrabold text-white">SS</span>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 rounded-full border border-purple-400/40 bg-purple-950 p-1.5 text-purple-300 shadow-md">
                  <ShieldCheck size={16} />
                </div>
              </div>

              <h3 className="font-display mt-5 text-2xl font-bold text-white">
                Shilpee Srivastava
              </h3>

              <p className="mt-1 text-xs font-mono text-purple-300">
                Founder &amp; Digital Solutions Developer
              </p>

              <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-lavender-200/70">
                <MapPin size={13} className="text-purple-400" />
                <span>Lucknow, India</span>
              </div>

              {/* Direct Links */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
                <a
                  href="https://linkedin.com/in/shilpee-srivastava0311"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-950/60 px-4 py-2 text-xs font-semibold text-lavender-100 hover:border-purple-400 hover:text-white transition-colors"
                >
                  <Linkedin size={13} />
                  <span>LinkedIn</span>
                  <ExternalLink size={11} className="opacity-70" />
                </a>

                <a
                  href="https://github.com/shilpee-0311"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:border-purple-400 hover:bg-white/10 transition-colors"
                >
                  <Github size={13} />
                  <span>GitHub</span>
                  <ExternalLink size={11} className="opacity-70" />
                </a>
              </div>
            </div>

            {/* Right Column: Founder Narrative & Technical Interests */}
            <div className="lg:col-span-8 space-y-5 lg:border-l lg:border-white/10 lg:pl-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-semibold text-lavender-200">
                <Sparkles size={13} className="text-purple-400" />
                <span>Founder Statement</span>
              </div>

              <p className="text-base sm:text-lg leading-relaxed text-lavender-100 font-medium">
                &ldquo;Shilpee Srivastava is the founder of Shilpee Digital Studio, with a background in computer applications, programming, data analytics and digital technology. She is passionate about building practical digital solutions that combine technology, creativity and business needs.&rdquo;
              </p>

              <p className="text-sm leading-relaxed text-lavender-200/80">
                In an industry crowded with inflated marketing claims and fabricated metrics, Shilpee Digital Studio operates on engineering discipline, transparent milestones, and verified code handoffs. Every solution is purpose-built to solve tangible operational challenges.
              </p>

              {/* Technical Interests Badges */}
              <div className="pt-2">
                <p className="text-xs font-mono uppercase tracking-wider text-purple-300 mb-2.5">
                  Core Technical Interests &amp; Focus
                </p>
                <div className="flex flex-wrap gap-2">
                  {technicalInterests.map((interest) => (
                    <span
                      key={interest}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-lavender-200"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <span>Read Full About Story &amp; Working Principles</span>
                  <ExternalLink size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
