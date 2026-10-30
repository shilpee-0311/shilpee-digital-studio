"use client";

import Link from "next/link";
import {
  Brain,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  FileText,
  Sliders,
  Sparkles,
} from "lucide-react";
import { Github } from "@/components/ui/GithubIcon";
import { Container } from "@/components/ui/Container";

export function HomeFeaturedProject() {
  const highlights = [
    "PDF resume parsing and raw text extraction",
    "NLP text preprocessing, stop-word removal & tokenization",
    "TF-IDF vectorization for domain-specific word weighting",
    "Candidate profile & job description matching via Cosine Similarity",
    "Automated skill-gap identification and keyword overlap review",
    "Interactive Streamlit web application with real-time scoring GUI",
  ];

  const technologies = [
    "Python",
    "Pandas",
    "Scikit-learn",
    "NLP",
    "TF-IDF",
    "Cosine Similarity",
    "Streamlit",
    "Git",
  ];

  return (
    <section className="relative bg-[#070B16] py-24 sm:py-32 text-white border-t border-white/5">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute right-1/3 top-10 h-[450px] w-[450px] rounded-full bg-purple-900/15 blur-[140px]"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-lavender-200 backdrop-blur-md">
            <Sparkles size={14} className="text-purple-400" aria-hidden />
            <span>Open-Source Technical Spotlight</span>
          </div>

          <h2 className="font-display mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
            Featured Technical{" "}
            <span className="bg-gradient-to-r from-purple-400 via-lavender-200 to-white bg-clip-text text-transparent">
              Project.
            </span>
          </h2>

          <p className="mt-4 text-base leading-7 text-lavender-200/80 sm:text-lg">
            An applied personal project demonstrating natural language processing, vector similarity scoring, and rapid Streamlit application deployment developed by our studio founder.
          </p>
        </div>

        {/* Project Card */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-purple-500/30 bg-navy-900/60 p-6 sm:p-10 shadow-[0_20px_60px_rgba(7,11,22,0.9)] backdrop-blur-xl">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Details */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-purple-400/40 bg-purple-600/30 px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-purple-200">
                  Personal Technical Project
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono text-lavender-200/70">
                  Open-Source Prototype
                </span>
              </div>

              <h3 className="font-display mt-4 text-2xl font-bold tracking-tight text-white sm:text-4xl">
                AI Resume Intelligence Platform
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-lavender-200/85 sm:text-base">
                An NLP-based resume analysis application that extracts resume text from PDF documents, applies text preprocessing and TF-IDF feature extraction, and compares candidate profiles with job descriptions using cosine similarity.
              </p>

              {/* Highlights */}
              <div className="mt-6 space-y-2.5">
                <p className="text-xs font-mono uppercase tracking-wider text-purple-300">
                  Demonstrated Capabilities
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {highlights.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-xs text-lavender-100">
                      <CheckCircle2 size={13} className="text-purple-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <p className="text-[11px] font-mono uppercase tracking-wider text-white/50 mb-2">
                  Technologies Used
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-purple-500/20 bg-purple-950/40 px-2.5 py-1 text-xs font-mono text-lavender-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="https://github.com/shilpee-0311/AI-Powered-Resume-Intelligence-Platform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-purple-900/40 hover:bg-purple-500 transition-all"
                >
                  <Github size={15} aria-hidden />
                  <span>View on GitHub</span>
                  <ExternalLink size={12} className="opacity-70" aria-hidden />
                </a>

                <Link
                  href="/portfolio/ai-resume-intelligence-platform"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-semibold text-lavender-100 hover:border-purple-400 hover:bg-white/10 transition-all"
                >
                  <span>Inspect Architecture Blueprint</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Pipeline Schematic */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/15 bg-navy-950/90 p-5 shadow-inner">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Brain size={16} className="text-purple-400" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      NLP Architecture Flow
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                    Functional Prototype
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {[
                    { step: "01", label: "PDF Parsing", sub: "PyPDF Unicode extraction" },
                    { step: "02", label: "Text Preprocessing", sub: "Regex & stop-word cleanup" },
                    { step: "03", label: "TF-IDF Vector Space", sub: "Scikit-learn sparse matrix" },
                    { step: "04", label: "Cosine Similarity", sub: "Match score % & skill gaps" },
                  ].map((node) => (
                    <div
                      key={node.step}
                      className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600/30 text-purple-300 font-mono text-xs">
                          {node.step}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-white">{node.label}</p>
                          <p className="text-[10px] text-lavender-200/70">{node.sub}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-purple-400">Validated</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 text-center">
                  <span className="text-[11px] font-mono text-lavender-200/60">
                    Built with Streamlit for intuitive interactive testing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
