"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Pause,
  Play,
  Globe,
  Code2,
  Database,
  Palette,
  Mail,
  Film,
  Zap,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

interface CarouselItem {
  id: string;
  category: string;
  badgeType: "Demo Project" | "Concept Showcase";
  title: string;
  summary: string;
  techStack: string;
  href: string;
  visualMockup: React.ReactNode;
}

const CAROUSEL_ITEMS: CarouselItem[] = [
  {
    id: "web-designs",
    category: "Website Designs",
    badgeType: "Demo Project",
    title: "LuxeStay Boutique Retreat",
    summary:
      "A high-conversion boutique hospitality marketing website featuring immersive room showcases, automated booking enquiry flow, and mobile-first responsive architecture.",
    techStack: "Next.js, TypeScript, Tailwind CSS, Semantic HTML",
    href: "/portfolio/luxestay-boutique-hotel",
    visualMockup: (
      <div className="relative flex h-full w-full items-center justify-center p-6 bg-navy-950">
        <div className="w-full max-w-md rounded-2xl border border-white/20 bg-navy-900/90 shadow-2xl p-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-[10px] font-mono text-purple-300">luxestay.example.com</span>
          </div>
          <div className="mt-4 space-y-3">
            <div className="h-24 w-full rounded-xl bg-gradient-to-r from-purple-900/40 via-purple-600/30 to-lavender-300/20 flex flex-col justify-end p-3 border border-purple-500/20">
              <span className="text-xs font-bold text-white">LuxeStay Alpine Chalets</span>
              <span className="text-[10px] text-lavender-200/70">Reserve your alpine escape</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-10 rounded-lg bg-white/5 border border-white/10 p-1.5 text-[9px] text-white/70">Deluxe Suites</div>
              <div className="h-10 rounded-lg bg-white/5 border border-white/10 p-1.5 text-[9px] text-white/70">Infinity Pool</div>
              <div className="h-10 rounded-lg bg-white/5 border border-white/10 p-1.5 text-[9px] text-white/70">Fine Dining</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "software-dashboards",
    category: "Software & Dashboard Concepts",
    badgeType: "Demo Project",
    title: "NexusTrack Operations Dashboard",
    summary:
      "Enterprise management application organizing complex operational workflows: real-time KPI metrics, searchable transaction tables, role-aware navigation, and CSV exports.",
    techStack: "React, TypeScript, Prisma, Tailwind CSS, SQLite",
    href: "/portfolio/nexustrack-ops-dashboard",
    visualMockup: (
      <div className="relative flex h-full w-full items-center justify-center p-6 bg-navy-950">
        <div className="w-full max-w-md rounded-2xl border border-white/20 bg-navy-900/90 shadow-2xl p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs font-bold text-white font-mono">NEXUSTRACK OPS</span>
            <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-300">SYSTEM ONLINE</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
              <span className="text-[10px] font-mono text-lavender-200/60">ACTIVE TASKS</span>
              <p className="text-lg font-bold text-purple-400">1,248</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
              <span className="text-[10px] font-mono text-lavender-200/60">UPTIME</span>
              <p className="text-lg font-bold text-emerald-400">99.98%</p>
            </div>
          </div>
          <div className="space-y-1.5 pt-1">
            <div className="h-4 rounded bg-purple-600/30 w-full" />
            <div className="h-4 rounded bg-white/10 w-5/6" />
            <div className="h-4 rounded bg-white/10 w-3/4" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "data-analytics",
    category: "Data Analytics Visuals",
    badgeType: "Demo Project",
    title: "RetailPulse Sales Intelligence",
    summary:
      "A complete commercial intelligence workflow: automated Python data cleaning, relational MySQL schema modeling, and interactive Power BI executive reporting dashboards.",
    techStack: "Python, Pandas, NumPy, MySQL, Power BI, Excel",
    href: "/portfolio/retailpulse-sales-intelligence",
    visualMockup: (
      <div className="relative flex h-full w-full items-center justify-center p-6 bg-navy-950">
        <div className="w-full max-w-md rounded-2xl border border-white/20 bg-navy-900/90 shadow-2xl p-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs font-mono font-bold text-lavender-100">RETAILPULSE BI</span>
            <span className="text-[10px] font-mono text-purple-400">Q3 EXEC SUMMARY</span>
          </div>
          <div className="mt-3 flex items-end gap-2 h-24 pt-4 border-b border-white/5 pb-2">
            <div className="h-[35%] w-1/6 rounded-t bg-purple-600/50" />
            <div className="h-[60%] w-1/6 rounded-t bg-purple-500" />
            <div className="h-[45%] w-1/6 rounded-t bg-lavender-300" />
            <div className="h-[80%] w-1/6 rounded-t bg-purple-400" />
            <div className="h-[100%] w-1/6 rounded-t bg-purple-600" />
            <div className="h-[75%] w-1/6 rounded-t bg-lavender-200" />
          </div>
          <div className="mt-2 flex justify-between text-[10px] font-mono text-lavender-200/60">
            <span>MAY</span>
            <span>JUN</span>
            <span>JUL</span>
            <span>AUG</span>
            <span>SEP</span>
            <span>OCT</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "graphic-design",
    category: "Graphic Design",
    badgeType: "Concept Showcase",
    title: "Aura Botanicals Brand Suite",
    summary:
      "A cohesive visual identity system spanning organic social post frames, promotional print brochures, menu cards, business stationery, and editable Canva corporate kits.",
    techStack: "Canva, Figma, Print-ready PDF, Brand Tokens",
    href: "/portfolio/aura-botanicals-brand-suite",
    visualMockup: (
      <div className="relative flex h-full w-full items-center justify-center p-6 bg-navy-950">
        <div className="flex gap-3 items-center">
          <div className="h-36 w-24 rounded-xl border border-purple-500/40 bg-gradient-to-b from-purple-900/30 to-navy-900 p-2 shadow-xl flex flex-col justify-between -rotate-6">
            <span className="text-[8px] font-mono text-purple-300">AURA SOCIAL</span>
            <div className="h-10 w-10 rounded-full bg-purple-500/40 mx-auto" />
            <span className="text-[8px] text-center text-white/80">PURE BOTANIC</span>
          </div>
          <div className="h-40 w-28 rounded-xl border border-lavender-300/40 bg-navy-900 p-2.5 shadow-2xl flex flex-col justify-between z-10">
            <span className="text-[8px] font-mono text-lavender-200">BRAND KIT</span>
            <div className="space-y-1 text-center">
              <span className="font-display text-xs font-bold text-white">AURA</span>
              <p className="text-[8px] text-lavender-200/70">Organic Essence</p>
            </div>
            <div className="flex gap-1 justify-center">
              <span className="h-2 w-2 rounded-full bg-purple-400" />
              <span className="h-2 w-2 rounded-full bg-lavender-300" />
              <span className="h-2 w-2 rounded-full bg-white" />
            </div>
          </div>
          <div className="h-36 w-24 rounded-xl border border-white/20 bg-navy-900 p-2 shadow-xl flex flex-col justify-between rotate-6">
            <span className="text-[8px] font-mono text-purple-300">STATIONERY</span>
            <div className="h-1 w-full bg-purple-500/30" />
            <span className="text-[8px] text-white/60">COLLATERAL</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "digital-invitations",
    category: "Digital Invitations",
    badgeType: "Demo Project",
    title: "Ananya & Kabir Royal Wedding",
    summary:
      "A personalized wedding celebration microsite engineered with schedule timelines, interactive venue map directions, responsive reading flows, and instant RSVP submission.",
    techStack: "Next.js, Tailwind CSS, Mobile-First RSVP",
    href: "/portfolio/ananya-kabir-royal-wedding",
    visualMockup: (
      <div className="relative flex h-full w-full items-center justify-center p-6 bg-navy-950">
        <div className="relative h-44 w-32 rounded-2xl border-2 border-purple-400/60 bg-navy-900 p-3 shadow-2xl flex flex-col justify-between text-center">
          <span className="text-[8px] font-mono tracking-widest text-lavender-200">YOU ARE INVITED</span>
          <div className="space-y-0.5">
            <p className="font-display text-xs font-extrabold text-white">Ananya &amp; Kabir</p>
            <p className="text-[8px] text-purple-300">December 2026</p>
          </div>
          <div className="rounded-lg bg-purple-600/30 border border-purple-400/40 py-1 text-[8px] font-bold text-white">
            CONFIRM RSVP
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "motion-animation",
    category: "Motion Animation & VFX",
    badgeType: "Concept Showcase",
    title: "Cinematic In-Engine VFX & Motion Suite",
    summary:
      "Ten specialized practices spanning kinetic typography, 3D exploded assemblies, anamorphic light streaks, neon plasma glows, and 60 FPS hardware-accelerated animations.",
    techStack: "CSS 3D Preserve, Keyframes, SVG Choreography, WebM",
    href: "/motion-animation",
    visualMockup: (
      <div className="relative flex h-full w-full items-center justify-center p-6 bg-navy-950 perspective-1000">
        <div className="relative h-20 w-20 preserve-3d animate-rotate-3d-slow">
          <div className="absolute inset-0 rounded-xl border border-purple-400 bg-purple-600/30 backdrop-blur-sm [transform:translateZ(40px)] flex items-center justify-center">
            <Film size={20} className="text-white" />
          </div>
          <div className="absolute inset-0 rounded-xl border border-lavender-300 bg-purple-800/30 backdrop-blur-sm [transform:rotateY(90deg)_translateZ(40px)] flex items-center justify-center">
            <Sparkles size={20} className="text-lavender-200" />
          </div>
          <div className="absolute inset-0 rounded-xl border border-purple-500 bg-purple-900/40 backdrop-blur-sm [transform:rotateX(90deg)_translateZ(40px)] flex items-center justify-center">
            <Zap size={20} className="text-purple-300" />
          </div>
        </div>
        <div className="absolute bottom-4 text-[10px] font-mono text-purple-400">
          60 FPS HARDWARE ACCELERATED
        </div>
      </div>
    ),
  },
];

export function CreativePortfolioCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = CAROUSEL_ITEMS.length;
  const activeItem = CAROUSEL_ITEMS[currentIndex];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(media.matches);
    }
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused || reducedMotion) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused, reducedMotion, nextSlide]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
    touchStartX.current = null;
    setIsPaused(false);
  };

  return (
    <section className="relative bg-[#070B16] py-24 sm:py-32 text-white border-t border-white/5">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute right-1/4 top-10 h-[450px] w-[450px] rounded-full bg-purple-900/15 blur-[140px]"
        aria-hidden="true"
      />

      <Container className="relative">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-lavender-200 backdrop-blur-md">
            <Sparkles size={14} className="text-purple-400" aria-hidden />
            <span>Interactive Portfolio Gallery</span>
          </div>

          <h2 className="font-display mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
            Creativity in{" "}
            <span className="bg-gradient-to-r from-purple-400 via-lavender-200 to-white bg-clip-text text-transparent">
              Every Pixel.
            </span>
          </h2>

          <p className="mt-4 text-base leading-7 text-lavender-200/80 sm:text-lg">
            Explore original work samples across our six practice areas. Every showcase item represents functional code, documented pipelines, or production-grade visual design.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-roledescription="carousel"
          aria-label="Creative portfolio showcase carousel"
          className="relative mt-14 outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-3xl"
        >
          <div className="overflow-hidden rounded-3xl border border-white/15 bg-navy-900/50 backdrop-blur-xl shadow-[0_20px_60px_rgba(7,11,22,0.9)]">
            <div className="grid gap-0 lg:grid-cols-12 min-h-[440px]">
              {/* Left Column: Interactive Visual Canvas */}
              <div className="relative lg:col-span-7 flex items-center justify-center bg-navy-950 border-b lg:border-b-0 lg:border-r border-white/10 min-h-[300px]">
                {activeItem.visualMockup}

                {/* Badges Overlay */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="rounded-full border border-purple-500/40 bg-purple-950/80 px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-purple-300">
                    {activeItem.badgeType}
                  </span>
                  <span className="rounded-full border border-white/10 bg-navy-900/80 px-2.5 py-1 text-[11px] font-mono text-white/70">
                    {activeItem.category}
                  </span>
                </div>
              </div>

              {/* Right Column: Information & Controls */}
              <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-10 bg-navy-900/40">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest text-purple-400">
                      Category 0{currentIndex + 1}
                    </span>
                    <span className="font-mono text-sm font-bold text-lavender-200">
                      0{currentIndex + 1} / 0{total}
                    </span>
                  </div>

                  <h3 className="font-display mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {activeItem.title}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-lavender-200/80">
                    {activeItem.summary}
                  </p>

                  <div className="mt-6 pt-5 border-t border-white/10">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-white/50 mb-2">
                      Demonstrated Stack
                    </p>
                    <p className="text-xs font-mono text-lavender-200">
                      {activeItem.techStack}
                    </p>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <Link
                    href={activeItem.href}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 px-5 py-2.5 text-xs font-semibold text-white shadow-[0_0_15px_rgba(124,58,237,0.4)] hover:bg-purple-500 transition-all"
                  >
                    <span>Inspect Project Blueprint</span>
                    <ArrowRight size={14} />
                  </Link>

                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsPaused((p) => !p)}
                      className="rounded-full border border-white/15 bg-white/5 p-2 text-lavender-200 hover:border-purple-400 hover:text-white transition-colors"
                      title={isPaused ? "Resume autoplay" : "Pause autoplay"}
                      aria-label={isPaused ? "Resume autoplay" : "Pause autoplay"}
                    >
                      {isPaused ? <Play size={14} /> : <Pause size={14} />}
                    </button>

                    <button
                      type="button"
                      onClick={prevSlide}
                      className="rounded-full border border-white/15 bg-white/5 p-2 text-lavender-200 hover:border-purple-400 hover:text-white transition-colors"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={nextSlide}
                      className="rounded-full border border-white/15 bg-white/5 p-2 text-lavender-200 hover:border-purple-400 hover:text-white transition-colors"
                      aria-label="Next slide"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Indicators */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {CAROUSEL_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 transition-all rounded-full ${
                  currentIndex === idx
                    ? "w-8 bg-purple-500 shadow-[0_0_10px_#7c3aed]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Jump to slide ${idx + 1}: ${item.title}`}
                aria-current={currentIndex === idx ? "true" : undefined}
              />
            ))}
          </div>

          <p className="mt-3 text-center text-xs text-lavender-200/50">
            Swipe or use arrow keys to navigate • Labelled as Demo Project or Concept Showcase
          </p>
        </div>
      </Container>
    </section>
  );
}
