"use client";

import Link from "next/link";
import {
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Brain,
  FileText,
  Sliders,
  Sparkles,
  GitBranch,
} from "lucide-react";
import { Github } from "@/components/ui/GithubIcon";

export function FeaturedProjectCard() {
  const features = [
    "PDF resume parsing and raw text extraction",
    "Text preprocessing, stop-word filtering & tokenization",
    "TF-IDF vectorization for weighted vocabulary representation",
    "Resume and job-description similarity calculation via cosine metrics",
    "Automated skill-gap identification and keyword overlap review",
    "Interactive Streamlit web interface with real-time score display",
  ];

  const techStack = [
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
    <div className="relative overflow-hidden rounded-3xl border border-purple-500/30 bg-navy-950 p-6 sm:p-10 text-white shadow-2xl">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-lavender-300/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
        {/* Left Column: Context, Title, Description, Features */}
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-purple-400/40 bg-purple-600/30 px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-purple-200">
              Personal Technical Project
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono text-lavender-200/70">
              Open-Source Prototype
            </span>
          </div>

          <h3 className="font-display mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            AI Resume Intelligence Platform
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-lavender-200 sm:text-base">
            An NLP-based resume analysis application that extracts resume text from PDF documents, applies text preprocessing and TF-IDF feature extraction, and compares candidate profiles with job descriptions using cosine similarity.
          </p>

          {/* Core Features */}
          <div className="mt-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-purple-300 mb-3">
              Demonstrated Technical Features
            </h4>
            <div className="grid gap-2 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-2 text-xs text-lavender-100">
                  <CheckCircle2 size={14} className="text-purple-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Badges */}
          <div className="mt-6 pt-5 border-t border-white/10">
            <p className="text-[11px] font-mono uppercase tracking-wider text-lavender-200/60 mb-2.5">
              Technologies &amp; Libraries
            </p>
            <div className="flex flex-wrap gap-1.5">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-purple-500/30 bg-purple-950/60 px-2.5 py-1 text-xs font-mono text-lavender-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/shilpee-0311/AI-Powered-Resume-Intelligence-Platform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-purple-900/40 hover:bg-purple-500 transition-all"
            >
              <Github size={16} aria-hidden />
              <span>Inspect Code on GitHub</span>
              <ExternalLink size={13} className="opacity-70" aria-hidden />
            </a>

            <Link
              href="/portfolio/ai-resume-intelligence-platform"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-semibold text-lavender-100 hover:border-purple-400 hover:bg-white/10 transition-all"
            >
              <span>View Portfolio Study</span>
              <ArrowRight size={14} aria-hidden />
            </Link>
          </div>
        </div>

        {/* Right Column: Visual NLP Pipeline Architecture Blueprint */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-white/15 bg-navy-900/80 p-5 shadow-inner backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Brain size={16} className="text-purple-400" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  NLP Pipeline Flow
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                Functional
              </span>
            </div>

            {/* Pipeline Step Nodes */}
            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600/30 text-purple-300 font-mono text-xs">
                    01
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white">PDF Text Ingestion</p>
                    <p className="text-[10px] text-lavender-200/70">PyPDF extraction &amp; cleansing</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-purple-400">Raw Text</span>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600/30 text-purple-300 font-mono text-xs">
                    02
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white">Preprocessing &amp; Tokenization</p>
                    <p className="text-[10px] text-lavender-200/70">Regex, lowercasing, stop-words</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-purple-400">Clean Tokens</span>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600/30 text-purple-300 font-mono text-xs">
                    03
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white">TF-IDF Vector Space</p>
                    <p className="text-[10px] text-lavender-200/70">Scikit-learn sparse matrix weights</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-purple-400">Vectors</span>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600/30 text-purple-300 font-mono text-xs">
                    04
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white">Cosine Similarity &amp; Scoring</p>
                    <p className="text-[10px] text-lavender-200/70">Profile match index &amp; gaps</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">Match %</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 text-center">
              <span className="text-[11px] font-mono text-lavender-200/70">
                Interactive UI rendered in Streamlit (Local &amp; Cloud deployable)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
