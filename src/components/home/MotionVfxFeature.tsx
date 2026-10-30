"use client";

import Link from "next/link";
import { Sparkles, Film, ArrowRight, Zap, Eye, Box, Layers } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function MotionVfxFeature() {
  return (
    <section className="relative overflow-hidden bg-[#070B16] py-24 sm:py-32 text-white border-t border-white/5">
      {/* Background ambient neon lighting */}
      <div
        className="pointer-events-none absolute -left-20 top-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-10 h-[500px] w-[500px] rounded-full bg-lavender-300/15 blur-[150px]"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Context, Title, Feature Points, CTA */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-lavender-200 backdrop-blur-md">
              <Film size={14} className="text-purple-400" aria-hidden />
              <span>Studio Motion &amp; Visual Effects</span>
            </div>

            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl sm:leading-[1.15]">
              Where Creativity{" "}
              <span className="bg-gradient-to-r from-purple-400 via-lavender-200 to-white bg-clip-text text-transparent">
                Meets Motion.
              </span>
            </h2>

            <p className="text-base leading-relaxed text-lavender-200/80">
              Motion breathes life into modern digital products. We develop in-engine kinetic typography, 3D product assemblies, anamorphic light streaks, and particle physics that command attention in the first three seconds.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-purple-300 font-mono text-xs font-bold">
                  <Zap size={14} />
                  <span>Kinetic Typography</span>
                </div>
                <p className="mt-1 text-[11px] text-lavender-200/70">
                  Audio-synchronized variable font animations &amp; reveals.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-purple-300 font-mono text-xs font-bold">
                  <Box size={14} />
                  <span>3D Spatial Geometry</span>
                </div>
                <p className="mt-1 text-[11px] text-lavender-200/70">
                  Exploded hardware assemblies &amp; 360° orbital sweeps.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-purple-300 font-mono text-xs font-bold">
                  <Sparkles size={14} />
                  <span>Neon Glow &amp; Light Leaks</span>
                </div>
                <p className="mt-1 text-[11px] text-lavender-200/70">
                  High-voltage filament arcs &amp; cinematic flares.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-purple-300 font-mono text-xs font-bold">
                  <Layers size={14} />
                  <span>Liquid Mesh Gradients</span>
                </div>
                <p className="mt-1 text-[11px] text-lavender-200/70">
                  Non-Newtonian fluid morphs &amp; continuous phase shifts.
                </p>
              </div>
            </div>

            {/* CTA Link */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/motion-animation"
                className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-6 py-3.5 text-xs font-semibold text-white shadow-[0_10px_35px_rgba(124,58,237,0.4)] hover:bg-purple-500 hover:shadow-[0_15px_45px_rgba(124,58,237,0.6)] transition-all"
              >
                <span>Explore Motion Animation Studio</span>
                <ArrowRight size={14} />
              </Link>

              <span className="text-[11px] font-mono text-lavender-200/50">
                10 practices • 8 live visual demos
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Visual Showcase Stage */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl border border-purple-500/30 bg-navy-950 p-6 sm:p-10 shadow-[0_20px_60px_rgba(7,11,22,0.9)]">
              {/* Sweeping light streak across stage */}
              <div className="pointer-events-none absolute h-0.5 w-full animate-light-streak bg-gradient-to-r from-transparent via-lavender-200 to-transparent shadow-[0_0_15px_#DDD6FE]" />

              <div className="relative flex flex-col items-center justify-center min-h-[320px] text-center">
                {/* 3D Isometric Spinning Polyhedron */}
                <div className="relative h-28 w-28 perspective-1000 mb-6">
                  <div className="relative h-full w-full preserve-3d animate-rotate-3d-slow">
                    <div className="absolute inset-0 rounded-2xl border-2 border-purple-400 bg-purple-600/30 backdrop-blur-md [transform:translateZ(48px)] flex items-center justify-center">
                      <span className="font-display text-2xl font-black text-white">S</span>
                    </div>
                    <div className="absolute inset-0 rounded-2xl border-2 border-lavender-300 bg-purple-800/30 backdrop-blur-md [transform:rotateY(90deg)_translateZ(48px)] flex items-center justify-center">
                      <Film size={28} className="text-lavender-200" />
                    </div>
                    <div className="absolute inset-0 rounded-2xl border-2 border-purple-500 bg-purple-950/70 backdrop-blur-md [transform:rotateX(90deg)_translateZ(48px)] flex items-center justify-center">
                      <Sparkles size={28} className="text-purple-300" />
                    </div>
                  </div>
                </div>

                {/* Animated Typography */}
                <p className="font-display text-2xl sm:text-3xl font-extrabold tracking-wider text-white [text-shadow:0_0_20px_rgba(124,58,237,0.8)]">
                  SHILPEE MOTION LAB
                </p>
                <p className="mt-1 font-mono text-xs text-purple-400 tracking-[0.25em]">
                  IN-ENGINE 60 FPS CHOREOGRAPHY
                </p>

                {/* Concept label badge */}
                <div className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-950/80 px-3 py-1 text-[10px] font-mono text-lavender-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Studio Concept Demonstration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
