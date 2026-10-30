"use client";

import { useState } from "react";
import { Sparkles, Eye, Zap, Play, RotateCw, Layers, Compass, Sliders } from "lucide-react";
import { Container } from "@/components/ui/Container";

interface ShowcaseItem {
  id: string;
  badge: "Motion Concept" | "Demo";
  title: string;
  technique: string;
  description: string;
  renderComponent: () => React.ReactNode;
}

export function MotionVfxShowcase() {
  const [activeNeonColor, setActiveNeonColor] = useState<"purple" | "cyan">("purple");
  const [textRevealKey, setTextRevealKey] = useState(0);

  const showcases: ShowcaseItem[] = [
    {
      id: "neon-glow",
      badge: "Motion Concept",
      title: "Neon Glow & Plasma Arc",
      technique: "Multi-layered drop-shadow filters & filament pulse",
      description:
        "Sub-pixel luminous intensity simulation mimicking gas-discharge high-voltage neon tubes with chromatic edge falloff.",
      renderComponent: () => (
        <div className="relative flex h-56 w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-navy-950 border border-purple-500/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.18),transparent_70%)]" />

          {/* Color Switcher */}
          <div className="absolute top-3 left-3 z-10 flex gap-1.5">
            <button
              type="button"
              onClick={() => setActiveNeonColor("purple")}
              className={`rounded px-2 py-0.5 text-[10px] font-mono transition-all ${
                activeNeonColor === "purple"
                  ? "bg-purple-600 text-white shadow-[0_0_10px_rgba(124,58,237,0.8)]"
                  : "bg-white/5 text-white/50 hover:text-white"
              }`}
            >
              Purple
            </button>
            <button
              type="button"
              onClick={() => setActiveNeonColor("cyan")}
              className={`rounded px-2 py-0.5 text-[10px] font-mono transition-all ${
                activeNeonColor === "cyan"
                  ? "bg-cyan-500 text-black font-semibold shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                  : "bg-white/5 text-white/50 hover:text-white"
              }`}
            >
              Cyan
            </button>
          </div>

          <div className="relative flex flex-col items-center">
            <span
              className={`font-display text-4xl sm:text-5xl font-extrabold tracking-wider transition-all duration-500 ${
                activeNeonColor === "purple"
                  ? "text-lavender-100 [text-shadow:0_0_10px_#a855f7,0_0_20px_#7c3aed,0_0_40px_#7c3aed,0_0_80px_#6b21a8]"
                  : "text-cyan-100 [text-shadow:0_0_10px_#22d3ee,0_0_20px_#06b6d4,0_0_40px_#0891b2,0_0_80px_#0e7490]"
              }`}
            >
              SHILPEE
            </span>
            <div
              className={`mt-2 h-0.5 w-44 rounded-full transition-all duration-500 ${
                activeNeonColor === "purple"
                  ? "bg-purple-400 shadow-[0_0_15px_#7c3aed]"
                  : "bg-cyan-400 shadow-[0_0_15px_#06b6d4]"
              }`}
            />
            <span className="mt-2 text-[10px] font-mono uppercase tracking-[0.3em] text-white/60">
              LIGHT ENGINE
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "particle-constellation",
      badge: "Demo",
      title: "Particle Field & Constellation",
      technique: "CSS floating orbits & connecting vector matrix",
      description:
        "Kinetic micro-particle system with dynamic node anchoring and ambient gravitational drift for high-tech SaaS interfaces.",
      renderComponent: () => (
        <div className="relative flex h-56 w-full items-center justify-center overflow-hidden rounded-xl bg-navy-950 border border-purple-500/20">
          <svg className="absolute inset-0 h-full w-full" aria-hidden>
            <line x1="25%" y1="35%" x2="50%" y2="50%" stroke="rgba(124,58,237,0.3)" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="50%" y1="50%" x2="75%" y2="40%" stroke="rgba(124,58,237,0.3)" strokeWidth="1" />
            <line x1="50%" y1="50%" x2="45%" y2="75%" stroke="rgba(221,214,254,0.25)" strokeWidth="1" strokeDasharray="4 2" />
            <line x1="25%" y1="35%" x2="45%" y2="75%" stroke="rgba(124,58,237,0.2)" strokeWidth="1" />
          </svg>

          {/* Drifting nodes */}
          <div className="absolute top-[35%] left-[25%] -translate-x-1/2 -translate-y-1/2">
            <div className="h-3 w-3 rounded-full bg-purple-400 animate-ping opacity-40" />
            <div className="absolute inset-0 h-3 w-3 rounded-full bg-purple-300 shadow-[0_0_8px_#c084fc]" />
          </div>

          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
            <div className="h-5 w-5 rounded-full bg-lavender-200 shadow-[0_0_15px_#DDD6FE] flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-purple-700" />
            </div>
          </div>

          <div className="absolute top-[40%] left-[75%] -translate-x-1/2 -translate-y-1/2">
            <div className="h-2.5 w-2.5 rounded-full bg-purple-400 shadow-[0_0_8px_#7c3aed]" />
          </div>

          <div className="absolute top-[75%] left-[45%] -translate-x-1/2 -translate-y-1/2">
            <div className="h-3 w-3 rounded-full bg-lavender-300 shadow-[0_0_10px_#a855f7]" />
          </div>

          {/* Ambient micro dust */}
          <div className="absolute top-1/4 left-1/3 h-1 w-1 rounded-full bg-white/70 animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 h-1.5 w-1.5 rounded-full bg-purple-300/60 animate-pulse [animation-delay:1s]" />
          <div className="absolute bottom-1/4 left-1/5 h-1 w-1 rounded-full bg-lavender-200/50 animate-pulse [animation-delay:2s]" />

          <div className="absolute bottom-3 text-center">
            <span className="text-[10px] font-mono text-lavender-200/60 uppercase tracking-widest">
              Live Coordinate Matrix
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "3d-rotating-geometry",
      badge: "Motion Concept",
      title: "3D Spatial Polyhedron",
      technique: "CSS transform-style: preserve-3d hardware render",
      description:
        "True 3-axis spatial rotation with intersecting wireframe facets, depth illumination, and ambient backface culling.",
      renderComponent: () => (
        <div className="relative flex h-56 w-full items-center justify-center overflow-hidden rounded-xl bg-navy-950 border border-purple-500/20 perspective-1000">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.12),transparent_60%)]" />

          {/* 3D spinning container */}
          <div className="relative h-24 w-24 preserve-3d animate-rotate-3d-slow">
            {/* Front */}
            <div className="absolute inset-0 rounded-xl border border-purple-400 bg-purple-600/20 backdrop-blur-sm [transform:translateZ(48px)] flex items-center justify-center">
              <span className="text-xs font-mono text-white/90">X</span>
            </div>
            {/* Back */}
            <div className="absolute inset-0 rounded-xl border border-purple-400 bg-purple-900/30 backdrop-blur-sm [transform:rotateY(180deg)_translateZ(48px)] flex items-center justify-center">
              <span className="text-xs font-mono text-white/90">-X</span>
            </div>
            {/* Right */}
            <div className="absolute inset-0 rounded-xl border border-lavender-300 bg-purple-700/25 backdrop-blur-sm [transform:rotateY(90deg)_translateZ(48px)] flex items-center justify-center">
              <span className="text-xs font-mono text-white/90">Y</span>
            </div>
            {/* Left */}
            <div className="absolute inset-0 rounded-xl border border-lavender-300 bg-purple-800/25 backdrop-blur-sm [transform:rotateY(-90deg)_translateZ(48px)] flex items-center justify-center">
              <span className="text-xs font-mono text-white/90">-Y</span>
            </div>
            {/* Top */}
            <div className="absolute inset-0 rounded-xl border border-white/60 bg-purple-500/30 backdrop-blur-sm [transform:rotateX(90deg)_translateZ(48px)] flex items-center justify-center">
              <span className="text-xs font-mono text-white/90">Z</span>
            </div>
            {/* Bottom */}
            <div className="absolute inset-0 rounded-xl border border-white/40 bg-purple-950/40 backdrop-blur-sm [transform:rotateX(-90deg)_translateZ(48px)] flex items-center justify-center">
              <span className="text-xs font-mono text-white/90">-Z</span>
            </div>
          </div>

          <div className="absolute bottom-3 text-center">
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">
              360° Real-Time Inertia
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "animated-text-reveals",
      badge: "Demo",
      title: "Kinetic Typographic Reveal",
      technique: "Clip-path masks, tracking expansion & cursor tick",
      description:
        "Broadcast-grade title card reveal utilizing synchronized character delays, dynamic tracking acceleration, and underline wipe.",
      renderComponent: () => (
        <div className="relative flex h-56 w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-navy-950 border border-purple-500/20">
          {/* Replay Button */}
          <button
            type="button"
            onClick={() => setTextRevealKey((k) => k + 1)}
            className="absolute top-3 right-3 flex items-center gap-1 rounded bg-white/5 px-2 py-1 text-[10px] font-mono text-lavender-200 hover:bg-purple-600 hover:text-white transition-all"
            title="Replay reveal"
          >
            <RotateCw size={11} />
            <span>Replay</span>
          </button>

          <div key={textRevealKey} className="text-center px-4">
            <p className="overflow-hidden font-display text-2xl sm:text-3xl font-bold tracking-tight text-white animate-pulse">
              FUTURE MOTION
            </p>
            <p className="mt-1 font-mono text-xs text-purple-400 tracking-[0.2em]">
              PRECISION KEYFRAMED
            </p>
            <div className="mt-3 mx-auto h-0.5 w-32 bg-gradient-to-r from-transparent via-lavender-200 to-transparent shadow-[0_0_10px_#c084fc]" />
          </div>
        </div>
      ),
    },
    {
      id: "smooth-morphing",
      badge: "Motion Concept",
      title: "Liquid Organic Blob Morph",
      technique: "CSS border-radius perturbation & fluid physics",
      description:
        "Viscous organic shape deformation modeling liquid tension and non-Newtonian fluid aesthetics for brand hero banners.",
      renderComponent: () => (
        <div className="relative flex h-56 w-full items-center justify-center overflow-hidden rounded-xl bg-navy-950 border border-purple-500/20">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent" />

          {/* Morphing Blob */}
          <div className="relative h-28 w-28 animate-morph-blob bg-gradient-to-br from-purple-500 via-purple-700 to-lavender-300 p-1 shadow-[0_0_35px_rgba(124,58,237,0.5)]">
            <div className="h-full w-full rounded-inherit bg-navy-950/70 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="text-lavender-200 animate-pulse" size={24} />
            </div>
          </div>

          <div className="absolute bottom-3 text-center">
            <span className="text-[10px] font-mono text-lavender-200/60 uppercase tracking-widest">
              Fluid Elasticity Loop
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "light-streak-flare",
      badge: "Demo",
      title: "Anamorphic Light Streak",
      technique: "Horizontal gradient pass & specular lens bloom",
      description:
        "High-velocity cinematic flare designed for movie stingers, game trailers, and high-impact logo reveal transitions.",
      renderComponent: () => (
        <div className="relative flex h-56 w-full items-center justify-center overflow-hidden rounded-xl bg-navy-950 border border-purple-500/20">
          {/* Background dark grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />

          {/* Central emblem */}
          <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-xl bg-purple-950 border border-purple-400 shadow-lg">
            <Zap className="text-lavender-200" size={24} />
          </div>

          {/* Sweeping light streak */}
          <div className="pointer-events-none absolute h-1 w-full animate-light-streak bg-gradient-to-r from-transparent via-lavender-100 to-transparent shadow-[0_0_20px_#DDD6FE]" />
          <div className="pointer-events-none absolute h-8 w-24 -translate-y-1/2 animate-light-streak rounded-full bg-purple-500/30 blur-lg" />

          <div className="absolute bottom-3 text-center">
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">
              High-Velocity Sweep
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "liquid-gradient",
      badge: "Motion Concept",
      title: "Chromatic Mesh Gradient",
      technique: "Multi-radial color blends with phase shifting",
      description:
        "Rich, shifting color topography with continuous chromatic blending and subtle luminance breathing.",
      renderComponent: () => (
        <div className="relative flex h-56 w-full items-center justify-center overflow-hidden rounded-xl bg-navy-950 border border-purple-500/20">
          <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-purple-600/40 blur-2xl animate-float-slow" />
          <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-lavender-300/30 blur-2xl animate-float-reverse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-32 rounded-full bg-purple-400/30 blur-3xl animate-pulse" />

          <div className="relative z-10 rounded-xl border border-white/20 bg-navy-950/60 px-5 py-3 backdrop-blur-md text-center">
            <span className="font-display text-sm font-semibold text-white">Dynamic Chromatic Field</span>
            <p className="text-[10px] font-mono text-lavender-200/70 mt-0.5">Continuous Phase Shift</p>
          </div>
        </div>
      ),
    },
    {
      id: "parallax-composition",
      badge: "Demo",
      title: "Parallax Multi-Plane Depth",
      technique: "Three-tier Z-index plane offset with responsive drift",
      description:
        "Cinematic spatial depth stacking background celestial grid, midground floating glass plates, and foreground active HUD.",
      renderComponent: () => (
        <div className="relative flex h-56 w-full items-center justify-center overflow-hidden rounded-xl bg-navy-950 border border-purple-500/20">
          {/* Layer 1: Background distant stars/grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#7c3aed_1px,transparent_1px)] [background-size:20px_20px] opacity-25" />

          {/* Layer 2: Midground floating glass plates */}
          <div className="absolute h-20 w-36 -rotate-6 rounded-lg border border-purple-500/30 bg-purple-900/20 backdrop-blur-sm -translate-x-8 -translate-y-2 animate-float-slow" />
          <div className="absolute h-20 w-36 rotate-6 rounded-lg border border-lavender-300/30 bg-purple-700/20 backdrop-blur-sm translate-x-8 translate-y-3 animate-float-reverse" />

          {/* Layer 3: Foreground focused HUD */}
          <div className="relative z-10 rounded-lg border border-white/40 bg-navy-900/90 px-4 py-2 shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono font-bold text-white">Z-PLANE 0.00</span>
            </div>
          </div>

          <div className="absolute bottom-3 text-center">
            <span className="text-[10px] font-mono text-lavender-200/60 uppercase tracking-widest">
              Layered Parallax Stack
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="relative bg-[#070B16] py-24 sm:py-32 text-white border-t border-white/5">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-purple-900/15 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-0 bottom-10 h-[450px] w-[450px] rounded-full bg-lavender-300/10 blur-[120px]"
        aria-hidden="true"
      />

      <Container className="relative">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-lavender-200 backdrop-blur-md">
            <Eye size={14} className="text-purple-400" aria-hidden />
            <span>Interactive Visual Lab</span>
          </div>

          <h2 className="font-display mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
            Explore the World of{" "}
            <span className="bg-gradient-to-r from-purple-400 via-lavender-200 to-white bg-clip-text text-transparent">
              Motion.
            </span>
          </h2>

          <p className="mt-4 text-base leading-7 text-lavender-200/80 sm:text-lg">
            Experience our in-house motion physics and creative visual demonstrations. Each demonstration represents live mathematical, CSS, and SVG choreography crafted to elevate modern digital interfaces.
          </p>

          {/* Explicit Concept Disclaimer */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-purple-500/20 bg-purple-950/30 px-4 py-2 text-xs text-lavender-200/90">
            <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
            <span>
              <strong>Note:</strong> All visual demonstrations below are in-engine motion concepts and real-time technical demos developed by Shilpee Digital Studio.
            </span>
          </div>
        </div>

        {/* 8 Showcases Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {showcases.map((item) => (
            <div
              key={item.id}
              className="flex flex-col rounded-2xl border border-white/10 bg-navy-900/40 p-4 backdrop-blur-md transition-all duration-300 hover:border-purple-500/40 hover:bg-navy-900/70 hover:shadow-[0_15px_30px_rgba(7,11,22,0.8)]"
            >
              {/* Demonstration Display */}
              <div className="relative">{item.renderComponent()}</div>

              {/* Information */}
              <div className="mt-4 flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-purple-500/20 px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-purple-300 border border-purple-500/30">
                      {item.badge}
                    </span>
                    <span className="text-[10px] font-mono text-white/50">60 FPS</span>
                  </div>

                  <h3 className="font-display mt-2 text-base font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs text-lavender-200/70 line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-white/5">
                  <p className="text-[10px] font-mono text-purple-400 truncate">
                    {item.technique}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
