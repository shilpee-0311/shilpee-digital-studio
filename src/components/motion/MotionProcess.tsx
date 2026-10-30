"use client";

import { Sparkles, Compass, Palette, Film, Clapperboard, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";

interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  icon: typeof Compass;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery & Storyboarding",
    subtitle: "Narrative architecture & pacing animatics",
    description:
      "We dissect your creative brief, audience psychology, and brand guidelines to establish clear visual narrative arcs, keyframe sketches, and timing animatics before pixel development.",
    highlights: ["Script & Narrative Outline", "Vector Storyboard Frames", "Timing & Motion Animatics", "Creative Alignment Pass"],
    icon: Compass,
  },
  {
    step: "02",
    title: "Style Frames & Look Dev",
    subtitle: "Photoreal lighting & visual hierarchy",
    description:
      "Our artists develop static high-fidelity style frames establishing exact lighting, chromatic palettes, material shaders, and typographic choreography for final aesthetic sign-off.",
    highlights: ["3D Shaders & Materials", "Kinetic Typographic Palettes", "Color Grading & Lighting Passes", "Client Style Approval"],
    icon: Palette,
  },
  {
    step: "03",
    title: "Keyframing & Physics",
    subtitle: "Precision easing curves & kinetic choreography",
    description:
      "We build custom animation curves, character rigs, and particle physics. Every bounce, acceleration, and camera sweep is tuned to 60 FPS silky fluidity.",
    highlights: ["Custom Bezier Easing Curves", "Rigging & Morph Targets", "Particle & Cloth Simulations", "Multi-Layer Compositing"],
    icon: Film,
  },
  {
    step: "04",
    title: "Sound Sync & Multi-Format Master",
    subtitle: "Acoustic integration & omnichannel delivery",
    description:
      "Final motion is synchronized with custom sound design and mastered across all required resolutions and formats for broadcast, web, and mobile platforms.",
    highlights: ["Audio Stem Synchronization", "4K 60FPS ProRes & WebM", "Lottie / Vector JSON", "9:16 & 1:1 Social Cutdowns"],
    icon: Clapperboard,
  },
];

export function MotionProcess() {
  return (
    <section className="relative bg-[#070B16] py-24 sm:py-32 text-white border-t border-white/5">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute right-1/4 bottom-10 h-[450px] w-[450px] rounded-full bg-purple-700/15 blur-[130px]"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-lavender-200 backdrop-blur-md">
            <Sparkles size={14} className="text-purple-400" aria-hidden />
            <span>Studio Production Pipeline</span>
          </div>

          <h2 className="font-display mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
            From Script to Screen: Our{" "}
            <span className="bg-gradient-to-r from-purple-400 via-lavender-200 to-white bg-clip-text text-transparent">
              Motion Process.
            </span>
          </h2>

          <p className="mt-4 text-base leading-7 text-lavender-200/80 sm:text-lg">
            A battle-tested production pipeline combining cinematic craftsmanship with structured client milestones, ensuring zero surprises and frame-perfect results.
          </p>
        </div>

        {/* 4 Process Steps */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="relative flex flex-col justify-between rounded-2xl border border-white/10 bg-navy-900/40 p-6 backdrop-blur-md transition-all duration-300 hover:border-purple-500/50 hover:bg-navy-900/70 hover:shadow-[0_20px_40px_rgba(7,11,22,0.8)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-purple-400">
                      {step.step}
                    </span>
                    <div className="rounded-xl border border-purple-500/20 bg-purple-950/60 p-2.5 text-lavender-200">
                      <Icon size={20} aria-hidden />
                    </div>
                  </div>

                  <h3 className="font-display mt-5 text-xl font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-1 text-xs font-mono uppercase tracking-wider text-purple-300">
                    {step.subtitle}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-lavender-200/75">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
                  {step.highlights.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-lavender-200/90">
                      <CheckCircle2 size={13} className="text-purple-400 shrink-0" />
                      <span>{item}</span>
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
