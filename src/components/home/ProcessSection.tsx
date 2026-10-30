"use client";

import { Compass, FileText, Code2, Rocket, Sparkles, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";

interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  icon: typeof Compass;
}

const STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    subtitle: "Understand business goals & constraints",
    description:
      "We dissect your existing digital processes, target audience expectations, and technical requirements to define clear measurable milestones before writing code.",
    deliverables: ["Requirement Breakdown", "Technical Feasibility Pass", "Target Architecture Sketch"],
    icon: Compass,
  },
  {
    step: "02",
    title: "Plan",
    subtitle: "Define scope, timelines & solution",
    description:
      "Every deliverable, data schema, UI wireframe, and milestone is documented upfront in a transparent written scope with zero hidden fees.",
    deliverables: ["Transparent Milestone Scope", "Database Schema Design", "Visual Direction & Moodboard"],
    icon: FileText,
  },
  {
    step: "03",
    title: "Create",
    subtitle: "Design & production development",
    description:
      "We build with modern TypeScript, accessible semantic markup, performant Python scripts, and clean keyframed animations adhering to production standards.",
    deliverables: ["Next.js & React Front-End", "Python Cleaning Workflows", "Responsive Multi-Screen UI"],
    icon: Code2,
  },
  {
    step: "04",
    title: "Deliver",
    subtitle: "Test, launch & verified support",
    description:
      "Rigorous cross-device testing, Core Web Vitals audit, and smooth production deployment with comprehensive code and template handover.",
    deliverables: ["Comprehensive QA Verification", "Production Edge Deployment", "Full Ownership Handover"],
    icon: Rocket,
  },
];

export function ProcessSection() {
  return (
    <section className="relative bg-[#070B16] py-24 sm:py-32 text-white border-t border-white/5">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-10 h-[500px] w-full max-w-4xl -translate-x-1/2 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.12),transparent_70%)]"
        aria-hidden="true"
      />

      <Container className="relative">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-lavender-200 backdrop-blur-md">
            <Sparkles size={14} className="text-purple-400" aria-hidden />
            <span>Structured Delivery Methodology</span>
          </div>

          <h2 className="font-display mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
            From Idea to{" "}
            <span className="bg-gradient-to-r from-purple-400 via-lavender-200 to-white bg-clip-text text-transparent">
              Digital Experience.
            </span>
          </h2>

          <p className="mt-4 text-base leading-7 text-lavender-200/80 sm:text-lg">
            A transparent four-phase execution pipeline engineered for clear communication, measurable progress, and frame-perfect results.
          </p>
        </div>

        {/* 4 Process Steps Timeline */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-navy-900/40 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-500/50 hover:bg-navy-900/70 hover:shadow-[0_20px_40px_rgba(7,11,22,0.8)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-purple-400">
                      {s.step}
                    </span>
                    <div className="rounded-xl border border-purple-500/20 bg-purple-950/60 p-2.5 text-lavender-200 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <Icon size={20} aria-hidden />
                    </div>
                  </div>

                  <h3 className="font-display mt-5 text-xl font-bold text-white group-hover:text-lavender-100 transition-colors">
                    {s.title}
                  </h3>

                  <p className="mt-1 text-xs font-mono uppercase tracking-wider text-purple-300">
                    {s.subtitle}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-lavender-200/75">
                    {s.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 space-y-1.5">
                  {s.deliverables.map((d) => (
                    <div key={d} className="flex items-center gap-2 text-[11px] text-lavender-200/85">
                      <CheckCircle2 size={12} className="text-purple-400 shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
