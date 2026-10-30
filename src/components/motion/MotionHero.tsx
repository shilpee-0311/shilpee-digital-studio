"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Play, Film, Layers, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function MotionHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 sm:py-32 text-white">
      {/* Background radial glow accents */}
      <div
        className="pointer-events-none absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 top-1/4 h-[550px] w-[550px] rounded-full bg-lavender-200/15 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-purple-700/15 blur-[100px]"
        aria-hidden="true"
      />

      {/* Grid texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(124,58,237,0.15)_1px,transparent_1px)] [background-size:28px_28px] opacity-40"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Headline, Copy, CTAs */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-lavender-200 backdrop-blur-md">
              <Sparkles size={14} className="text-purple-400 animate-pulse" aria-hidden />
              <span>Visual Effects & Motion Graphics Practice</span>
            </div>

            <h1 className="font-display mt-6 text-4xl font-semibold leading-[1.12] tracking-tight sm:text-6xl sm:leading-[1.1]">
              Bring Your Ideas to Life{" "}
              <span className="bg-gradient-to-r from-purple-400 via-lavender-200 to-white bg-clip-text text-transparent">
                Through Motion.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-lavender-200 sm:text-lg">
              Creative motion graphics, animation and visual effects that make brands, products and digital experiences stand out. From kinetic typography and UI micro-animations to 3D product exploding assemblies and cinematic commercial stingers.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#service-categories"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_10px_35px_rgba(124,58,237,0.35)] transition-all hover:bg-purple-500 hover:shadow-[0_15px_45px_rgba(124,58,237,0.5)]"
              >
                <Film size={16} aria-hidden />
                <span>Explore Our Motion Services</span>
                <ArrowRight size={14} aria-hidden />
              </a>

              <Link
                href="/contact?service=motion-animation"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold tracking-wide text-white backdrop-blur transition-all hover:border-purple-400 hover:bg-white/10 hover:text-lavender-100"
              >
                <span>Start a Project</span>
              </Link>
            </div>

            {/* Motion Metrics / Features Row */}
            <div className="mt-14 border-t border-white/10 pt-6">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <p className="font-display text-2xl font-bold text-white">10</p>
                  <p className="text-xs text-lavender-200/70">Motion Specializations</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-purple-400">Smooth</p>
                  <p className="text-xs text-lavender-200/70">Fluid Motion Target</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-white">Bespoke</p>
                  <p className="text-xs text-lavender-200/70">Keyframed Curves</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-lavender-200">Multi</p>
                  <p className="text-xs text-lavender-200/70">MP4, WebM, Lottie</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D-Inspired Motion Art Installation */}
          <div className="relative flex items-center justify-center lg:col-span-5">
            <div className="relative aspect-square w-full max-w-[420px] rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 shadow-2xl backdrop-blur-xl">
              {/* Outer decorative neon rings */}
              <div
                className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-600/30 to-lavender-200/20 blur-xl opacity-60 animate-pulse-glow"
                aria-hidden="true"
              />

              {/* 3D Isometric Rotating Geometry Simulator */}
              <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-navy-950/80 p-6 perspective-1000">
                {/* Ambient particle star dots */}
                <div className="absolute inset-0 opacity-40">
                  <span className="absolute left-[15%] top-[20%] h-1.5 w-1.5 rounded-full bg-purple-400 animate-ping" />
                  <span className="absolute right-[20%] top-[30%] h-1 w-1 rounded-full bg-lavender-200" />
                  <span className="absolute bottom-[25%] left-[25%] h-1 w-1 rounded-full bg-purple-300" />
                  <span className="absolute bottom-[15%] right-[15%] h-2 w-2 rounded-full bg-purple-500/70 animate-pulse" />
                </div>

                {/* Central 3D Cube Polyhedron Simulation */}
                <div className="relative h-36 w-36 preserve-3d animate-rotate-3d">
                  {/* Front Face */}
                  <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-purple-400/50 bg-gradient-to-br from-purple-600/30 to-purple-900/40 backdrop-blur [transform:translateZ(45px)]">
                    <Film size={36} className="text-purple-300 drop-shadow-[0_0_12px_rgba(124,58,237,0.8)]" />
                  </div>
                  {/* Back Face */}
                  <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-lavender-200/40 bg-gradient-to-br from-lavender-200/20 to-navy-900/60 backdrop-blur [transform:rotateY(180deg)_translateZ(45px)]">
                    <Layers size={36} className="text-lavender-200 drop-shadow-[0_0_12px_rgba(221,214,254,0.8)]" />
                  </div>
                  {/* Right Face */}
                  <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-purple-500/40 bg-gradient-to-br from-purple-700/30 to-purple-950/50 backdrop-blur [transform:rotateY(90deg)_translateZ(45px)]">
                    <Zap size={36} className="text-purple-400 drop-shadow-[0_0_12px_rgba(124,58,237,0.8)]" />
                  </div>
                  {/* Left Face */}
                  <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-purple-300/40 bg-gradient-to-br from-purple-500/20 to-navy-950/70 backdrop-blur [transform:rotateY(-90deg)_translateZ(45px)]">
                    <Play size={36} className="text-purple-200 drop-shadow-[0_0_12px_rgba(221,214,254,0.8)]" />
                  </div>
                </div>

                {/* Orbital Neon Ring */}
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  viewBox="0 0 300 300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle
                    cx="150"
                    cy="150"
                    r="115"
                    stroke="rgba(124, 58, 237, 0.25)"
                    strokeWidth="1.5"
                    strokeDasharray="4 6"
                  />
                  <ellipse
                    cx="150"
                    cy="150"
                    rx="125"
                    ry="65"
                    stroke="url(#orbit-grad)"
                    strokeWidth="2"
                    className="origin-center rotate-[32deg] animate-pulse-glow"
                  />
                  <defs>
                    <linearGradient id="orbit-grad" x1="0" y1="0" x2="300" y2="300" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#7C3AED" />
                      <stop offset="0.5" stopColor="#DDD6FE" />
                      <stop offset="1" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Badge caption */}
                <div className="relative mt-8 text-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-navy-900/90 px-3 py-1 text-[11px] font-semibold text-lavender-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Real-time CSS 3D Engine • 60 FPS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
