"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Code2,
  Database,
  Film,
  Zap,
  Globe,
  Layers,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

export function CinematicHero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    if (typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#070B16] py-20 sm:py-28 lg:py-32 text-white">
      {/* Background glowing radial lights */}
      <div
        className="pointer-events-none absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[130px]"
        aria-hidden="true"
        style={{
          transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
          transition: "transform 0.4s ease-out",
        }}
      />
      <div
        className="pointer-events-none absolute -right-20 top-1/4 h-[550px] w-[550px] rounded-full bg-lavender-200/15 blur-[150px]"
        aria-hidden="true"
        style={{
          transform: `translate(${-mousePos.x * 20}px, ${-mousePos.y * 20}px)`,
          transition: "transform 0.4s ease-out",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-purple-800/15 blur-[120px]"
        aria-hidden="true"
      />

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(124,58,237,0.12)_1px,transparent_1px)] [background-size:32px_32px] opacity-40"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Headline, Copy, Dual CTAs */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-lavender-200 backdrop-blur-md">
              <Sparkles size={14} className="text-purple-400 animate-pulse" aria-hidden />
              <span>Full-Stack Digital Studio &amp; Creative Practice</span>
            </div>

            <h1 className="font-display mt-6 text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-6xl sm:leading-[1.1]">
              Turning Ideas into{" "}
              <span className="bg-gradient-to-r from-purple-400 via-lavender-200 to-white bg-clip-text text-transparent">
                Powerful Digital Experiences.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-lavender-200/85 sm:text-lg">
              We build modern websites, intelligent software, data-driven solutions and creative digital experiences that help businesses move forward. From enterprise Next.js applications and Python analytics pipelines to cinema-grade motion graphics.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 px-6 py-3.5 text-sm font-semibold tracking-wide text-white shadow-[0_10px_35px_rgba(124,58,237,0.4)] transition-all hover:bg-purple-500 hover:shadow-[0_15px_45px_rgba(124,58,237,0.6)]"
              >
                <span>Explore Our Services</span>
                <ArrowRight size={15} aria-hidden />
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold tracking-wide text-white backdrop-blur transition-all hover:border-purple-400 hover:bg-white/10 hover:text-lavender-100"
              >
                <span>Start a Project</span>
              </Link>
            </div>

            {/* Grounded & Verifiable Practice Row */}
            <div className="mt-12 border-t border-white/10 pt-6">
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                <div>
                  <p className="font-display text-2xl font-bold text-white">7</p>
                  <p className="text-xs text-lavender-200/70">Practice Areas</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-purple-400">Full-Stack</p>
                  <p className="text-xs text-lavender-200/70">Next.js &amp; React</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-white">Python &amp; SQL</p>
                  <p className="text-xs text-lavender-200/70">Data &amp; AI Pipelines</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-lavender-200">End-to-End</p>
                  <p className="text-xs text-lavender-200/70">Concept to Delivery</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D-Inspired Studio Installation Visual */}
          <div className="relative flex items-center justify-center lg:col-span-5">
            <div
              className="relative flex h-[380px] w-full max-w-[420px] items-center justify-center perspective-1000"
              style={{
                transform: `rotateY(${mousePos.x * 8}deg) rotateX(${-mousePos.y * 8}deg)`,
                transition: "transform 0.25s ease-out",
              }}
            >
              {/* Outer Glowing Wireframe Rings */}
              <div className="absolute h-80 w-80 rounded-full border border-purple-500/30 animate-spin [animation-duration:24s]" />
              <div className="absolute h-64 w-64 rounded-full border border-dashed border-lavender-300/40 animate-spin [animation-duration:18s] [animation-direction:reverse]" />

              {/* Central 3D Cube Polyhedron */}
              <div className="relative h-28 w-28 preserve-3d animate-rotate-3d-slow">
                <div className="absolute inset-0 rounded-2xl border-2 border-purple-400 bg-purple-600/30 backdrop-blur-md [transform:translateZ(56px)] flex items-center justify-center">
                  <Code2 size={28} className="text-white" />
                </div>
                <div className="absolute inset-0 rounded-2xl border-2 border-lavender-300 bg-purple-800/30 backdrop-blur-md [transform:rotateY(90deg)_translateZ(56px)] flex items-center justify-center">
                  <Database size={28} className="text-lavender-200" />
                </div>
                <div className="absolute inset-0 rounded-2xl border-2 border-purple-500 bg-purple-900/40 backdrop-blur-md [transform:rotateX(90deg)_translateZ(56px)] flex items-center justify-center">
                  <Film size={28} className="text-purple-300" />
                </div>
                <div className="absolute inset-0 rounded-2xl border-2 border-white/40 bg-navy-950/70 backdrop-blur-md [transform:rotateY(180deg)_translateZ(56px)] flex items-center justify-center">
                  <Globe size={28} className="text-white" />
                </div>
              </div>

              {/* Floating Orbiting Satellite Nodes */}
              <div className="absolute -top-4 right-4 rounded-xl border border-white/20 bg-navy-900/90 p-3 shadow-xl backdrop-blur-md animate-float-slow">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[11px] font-mono font-bold text-white">Next.js 16 + React 19</span>
                </div>
                <p className="text-[10px] text-lavender-200/70 mt-0.5">Turbopack Optimized</p>
              </div>

              <div className="absolute -bottom-4 left-4 rounded-xl border border-white/20 bg-navy-900/90 p-3 shadow-xl backdrop-blur-md animate-float-reverse">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
                  <span className="text-[11px] font-mono font-bold text-white">Python + Power BI</span>
                </div>
                <p className="text-[10px] text-lavender-200/70 mt-0.5">Automated Intelligence</p>
              </div>

              <div className="absolute -bottom-6 right-8 rounded-full border border-purple-400/40 bg-purple-950/80 px-3 py-1 text-[10px] font-mono text-purple-300 shadow-md">
                Hardware Accelerated
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
