"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Box,
  Smartphone,
  Film,
  ArrowRight,
  Pause,
  Play,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

interface CarouselSlide {
  id: string;
  badge: "Motion Concept" | "Demo";
  title: string;
  category: string;
  duration: string;
  aspectRatio: string;
  specs: string[];
  description: string;
  visualTheme: "neon" | "isometric" | "kinetic" | "minimal";
  visualElement: React.ReactNode;
}

interface CarouselCollection {
  id: string;
  title: string;
  icon: typeof Film;
  description: string;
  slides: CarouselSlide[];
}

const COLLECTIONS: CarouselCollection[] = [
  {
    id: "motion-design",
    title: "Motion Design Showcase",
    icon: Film,
    description: "Cinematic title sequences, abstract choreography, and dimensional vector motion systems.",
    slides: [
      {
        id: "md-1",
        badge: "Motion Concept",
        title: "Apex FinTech Brand Stinger",
        category: "Kinetic Identity",
        duration: "4.5s Loop",
        aspectRatio: "16:9 4K",
        specs: ["60 FPS ProRes", "Alpha Transparent", "Audio Stem Sync"],
        description:
          "High-contrast geometric transformation combining brushed metallic edges with electric violet energy pulses for a next-gen finance platform.",
        visualTheme: "neon",
        visualElement: (
          <div className="relative flex h-full w-full items-center justify-center bg-navy-950">
            <div className="absolute h-40 w-40 rounded-full bg-purple-600/30 blur-2xl animate-pulse" />
            <div className="relative h-28 w-28 rounded-2xl border-2 border-purple-400 bg-purple-950/60 flex items-center justify-center rotate-12 transition-transform duration-700 hover:rotate-45">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-tr from-purple-500 to-lavender-200 shadow-[0_0_25px_#7c3aed]" />
            </div>
            <div className="absolute bottom-4 left-4 text-[11px] font-mono text-lavender-200/60">
              FRAME 0144 / 60FPS
            </div>
          </div>
        ),
      },
      {
        id: "md-2",
        badge: "Demo",
        title: "Quantum SaaS UI Micro-Choreography",
        category: "UI Motion System",
        duration: "6.0s Sequence",
        aspectRatio: "16:9",
        specs: ["Lottie JSON", "Vector SVG", "React Component"],
        description:
          "Physics-based spring animation showing real-time dashboard state transitions, fluid data graphs, and multi-tier modal morphs.",
        visualTheme: "kinetic",
        visualElement: (
          <div className="relative flex h-full w-full items-center justify-center bg-navy-950 p-6">
            <div className="w-64 rounded-xl border border-purple-500/30 bg-navy-900/90 p-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[11px] font-mono text-lavender-200">ANALYTICS ENGINE</span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="mt-3 flex items-end gap-2 h-16 pt-2">
                <div className="h-40% w-1/5 rounded-t bg-purple-600/60 animate-pulse" />
                <div className="h-75% w-1/5 rounded-t bg-purple-500 animate-pulse [animation-delay:0.2s]" />
                <div className="h-50% w-1/5 rounded-t bg-lavender-300 animate-pulse [animation-delay:0.4s]" />
                <div className="h-95% w-1/5 rounded-t bg-purple-400 animate-pulse [animation-delay:0.6s]" />
                <div className="h-65% w-1/5 rounded-t bg-purple-700 animate-pulse [animation-delay:0.8s]" />
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "md-3",
        badge: "Motion Concept",
        title: "Aura Editorial Title Sequence",
        category: "Cinematic Titles",
        duration: "8.0s Cut",
        aspectRatio: "21:9 CinemaScope",
        specs: ["4K HDR Master", "Film Grain Pass", "Variable Type"],
        description:
          "Slow-burn editorial reveal featuring heavy optical diffusion, floating macro dust, and custom variable font weight interpolation.",
        visualTheme: "minimal",
        visualElement: (
          <div className="relative flex h-full w-full items-center justify-center bg-navy-950">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.2),transparent_70%)]" />
            <div className="text-center">
              <p className="font-display text-3xl font-extralight tracking-[0.4em] text-white">
                CHRONOS
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-purple-400">
                A VISUAL ESSAY
              </p>
            </div>
          </div>
        ),
      },
      {
        id: "md-4",
        badge: "Demo",
        title: "Nebula Generative Audio Spectrum",
        category: "Audio-Reactive Motion",
        duration: "Loop 120BPM",
        aspectRatio: "16:9",
        specs: ["FFT Frequency Sync", "Parametric EQ", "WebM 60FPS"],
        description:
          "Harmonic wave motion synchronizing rhythmic kick transients with multi-band glowing ribbon displacement.",
        visualTheme: "neon",
        visualElement: (
          <div className="relative flex h-full w-full items-center justify-center bg-navy-950">
            <div className="flex items-center gap-1.5">
              {[40, 70, 25, 90, 60, 100, 45, 80, 30, 85].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="w-2.5 rounded-full bg-gradient-to-t from-purple-700 via-purple-500 to-lavender-200 shadow-[0_0_8px_#7c3aed] transition-all duration-300"
                />
              ))}
            </div>
            <div className="absolute bottom-4 text-[10px] font-mono text-purple-300">
              128 BPM MASTER BUS
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: "logo-animation",
    title: "Logo Animation Concepts",
    icon: Sparkles,
    description: "Memorable 3-5 second brand idents, stingers, YouTube openers, and mobile app splashes.",
    slides: [
      {
        id: "la-1",
        badge: "Motion Concept",
        title: "Verve Monogram Unfold",
        category: "Origami & Geometry",
        duration: "3.2s Stinger",
        aspectRatio: "1:1 / 16:9",
        specs: ["Custom Sound Sync", "SVG Morph", "Dark & Light Stems"],
        description:
          "Precision geometric unfolding where three angled vector facets snap together with tactile deceleration and subtle neon shadow cast.",
        visualTheme: "isometric",
        visualElement: (
          <div className="relative flex h-full w-full items-center justify-center bg-navy-950">
            <div className="relative h-24 w-24 rounded-3xl bg-gradient-to-tr from-purple-600 via-purple-500 to-lavender-200 p-0.5 shadow-[0_0_30px_rgba(124,58,237,0.5)]">
              <div className="flex h-full w-full items-center justify-center rounded-3xl bg-navy-950">
                <span className="font-display text-4xl font-black bg-gradient-to-r from-white to-lavender-200 bg-clip-text text-transparent">
                  V
                </span>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "la-2",
        badge: "Demo",
        title: "Echo Sonic Waveform Ident",
        category: "Audio Brand Mark",
        duration: "2.8s Stinger",
        aspectRatio: "16:9",
        specs: ["Spatial Audio Pass", "Sub-bass Resonance", "4K 60FPS"],
        description:
          "A single concentric acoustic pulse that ripples through circular boundary lines before resolving into a minimalist audio brand seal.",
        visualTheme: "neon",
        visualElement: (
          <div className="relative flex h-full w-full items-center justify-center bg-navy-950">
            <div className="absolute h-32 w-32 rounded-full border border-purple-500/40 animate-ping opacity-30" />
            <div className="absolute h-20 w-20 rounded-full border border-lavender-300/60 animate-ping opacity-50 [animation-delay:0.3s]" />
            <div className="h-10 w-10 rounded-full bg-purple-500 shadow-[0_0_20px_#a855f7] flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-white" />
            </div>
          </div>
        ),
      },
      {
        id: "la-3",
        badge: "Motion Concept",
        title: "Loom Kinetic Ribbon Weave",
        category: "Fluid Line Motion",
        duration: "4.0s Reveal",
        aspectRatio: "16:9",
        specs: ["Lottie JSON", "Vector Trim Paths", "Transparent BG"],
        description:
          "Continuous bezier path stroke drawing that loops through 3-dimensional space before condensing into a luxury brand emblem.",
        visualTheme: "minimal",
        visualElement: (
          <div className="relative flex h-full w-full items-center justify-center bg-navy-950">
            <svg className="h-32 w-32" viewBox="0 0 100 100" fill="none">
              <circle
                cx="50"
                cy="50"
                r="35"
                stroke="url(#gradient-loom)"
                strokeWidth="4"
                strokeDasharray="220"
                strokeDashoffset="60"
                className="animate-spin [animation-duration:8s]"
              />
              <defs>
                <linearGradient id="gradient-loom" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute font-display font-semibold text-white tracking-widest text-xs">
              LOOM
            </span>
          </div>
        ),
      },
      {
        id: "la-4",
        badge: "Demo",
        title: "Prism Holographic Glitch",
        category: "Cybernetic Reveal",
        duration: "3.5s Stinger",
        aspectRatio: "16:9",
        specs: ["RGB Color Split", "Scanline Shader", "Heavy Punch"],
        description:
          "Digital noise consolidation where drifting pixels and RGB color splits snap sharply into a crisp tech studio identity.",
        visualTheme: "neon",
        visualElement: (
          <div className="relative flex h-full w-full items-center justify-center bg-navy-950">
            <div className="relative text-center">
              <span className="font-mono text-3xl font-extrabold text-purple-400 [text-shadow:2px_0_#ec4899,-2px_0_#06b6d4]">
                PRISM::X
              </span>
              <p className="mt-1 font-mono text-[10px] text-white/50 tracking-widest">[SYSTEM RECONNECTED]</p>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: "social-media",
    title: "Social Media Motion Creatives",
    icon: Smartphone,
    description: "High-retention 9:16 vertical motion templates, kinetic hook cards, and viral story transitions.",
    slides: [
      {
        id: "sm-1",
        badge: "Motion Concept",
        title: "3-Second Hook Retention Frame",
        category: "9:16 Vertical Reel",
        duration: "15s Reel Master",
        aspectRatio: "9:16 Mobile",
        specs: ["Optimized for IG / TikTok", "Safe-Zone Compliant", "Burned Subtitles"],
        description:
          "High-contrast opening flash designed to capture instant thumb-stop engagement, paired with animated bold typography and kinetic sound effects.",
        visualTheme: "neon",
        visualElement: (
          <div className="relative flex h-full w-full items-center justify-center bg-navy-950 p-4">
            <div className="relative h-44 w-28 rounded-2xl border-2 border-purple-400/80 bg-navy-900 p-2 shadow-2xl flex flex-col justify-between">
              <div className="flex justify-between items-center text-[8px] font-mono text-purple-300">
                <span>9:16 REEL</span>
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              </div>
              <div className="space-y-1 text-center">
                <span className="rounded bg-purple-600 px-1 py-0.5 text-[8px] font-bold text-white">
                  STOP SCROLLING
                </span>
                <p className="text-[10px] font-bold text-white leading-tight">
                  The #1 Motion Secret
                </p>
              </div>
              <div className="h-1 w-full rounded-full bg-purple-500/40" />
            </div>
          </div>
        ),
      },
      {
        id: "sm-2",
        badge: "Demo",
        title: "E-Commerce Flash Drop Loop",
        category: "Product Promotion",
        duration: "8s Seamless Loop",
        aspectRatio: "9:16 Stories",
        specs: ["Swipe-Up Motion Cue", "Price Callout", "Colorways Cycle"],
        description:
          "Dynamic product reveal cycling through seasonal colorways with synchronized background lighting shifts and countdown pulse.",
        visualTheme: "kinetic",
        visualElement: (
          <div className="relative flex h-full w-full items-center justify-center bg-navy-950 p-4">
            <div className="relative h-44 w-28 rounded-2xl border border-white/20 bg-navy-900 p-2 shadow-xl flex flex-col items-center justify-between">
              <span className="text-[9px] font-mono text-lavender-200">DROP 04 / EXCLUSIVE</span>
              <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-purple-600 to-lavender-200 shadow-md animate-bounce" />
              <div className="text-center">
                <span className="text-[9px] font-bold text-white">LIMITED RELEASE</span>
                <p className="text-[8px] text-purple-400">TAP TO SHOP</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "sm-3",
        badge: "Motion Concept",
        title: "Carousel Infographic Slider Kit",
        category: "Multi-Slide Carousels",
        duration: "5-Slide Motion Pack",
        aspectRatio: "4:5 Portrait",
        specs: ["Continuous Edge Pan", "Lottie Icons", "Editable AfterEffects"],
        description:
          "Seamless continuous background gradient and graphics that flow smoothly as the user swipes across multi-slide Instagram posts.",
        visualTheme: "minimal",
        visualElement: (
          <div className="relative flex h-full w-full items-center justify-center bg-navy-950 p-4">
            <div className="flex gap-2">
              <div className="h-32 w-20 rounded-lg border border-purple-500/40 bg-purple-900/20 p-2 text-[9px] text-white">
                SLIDE 1
              </div>
              <div className="h-32 w-20 rounded-lg border border-lavender-300/40 bg-purple-800/30 p-2 text-[9px] text-white -translate-y-2">
                SLIDE 2
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "sm-4",
        badge: "Demo",
        title: "Event Teaser Kinetic Countdown",
        category: "Ticket Launch Motion",
        duration: "10s Promo Cut",
        aspectRatio: "9:16 & 1:1",
        specs: ["Countdown Timer", "Artist Lineup Sweep", "Ticket URL Overlay"],
        description:
          "Staggered typography reveal presenting headline artists and keynote speakers backed by high-octane bass drops and strobe flickers.",
        visualTheme: "neon",
        visualElement: (
          <div className="relative flex h-full w-full items-center justify-center bg-navy-950">
            <div className="text-center">
              <div className="font-mono text-2xl font-black text-purple-400">03 : 14 : 22</div>
              <p className="mt-1 text-[10px] font-mono text-white/70 uppercase tracking-widest">
                LAUNCH IMMINENT
              </p>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: "product-animation",
    title: "Product Animation Concepts",
    icon: Box,
    description: "Exploded assemblies, 360 orbital camera sweeps, macro textures, and tactile hardware visualization.",
    slides: [
      {
        id: "pa-1",
        badge: "Motion Concept",
        title: "Precision Watch Exploded Assembly",
        category: "Mechanical 3D",
        duration: "10s Sequence",
        aspectRatio: "16:9 4K",
        specs: ["Sub-millimeter Gear Meshing", "Titanium Shader", "Raytraced Depth of Field"],
        description:
          "48 individual mechanical gears, balance wheels, and sapphire crystal layers separating outward in slow motion along the central axle.",
        visualTheme: "isometric",
        visualElement: (
          <div className="relative flex h-full w-full items-center justify-center bg-navy-950">
            <div className="relative flex flex-col items-center gap-1.5">
              <div className="h-2 w-24 rounded-full bg-purple-300/80 shadow-md animate-float-slow" />
              <div className="h-3 w-16 rounded bg-purple-500 shadow-md" />
              <div className="h-10 w-28 rounded-xl border border-lavender-200/40 bg-purple-700/30 backdrop-blur-sm flex items-center justify-center">
                <span className="font-mono text-[10px] text-white">CORE 4.0</span>
              </div>
              <div className="h-3 w-16 rounded bg-purple-500 shadow-md" />
              <div className="h-2 w-24 rounded-full bg-purple-300/80 shadow-md animate-float-reverse" />
            </div>
            <div className="absolute bottom-3 text-[10px] font-mono text-purple-400">
              EXPLODED DISPLACEMENT
            </div>
          </div>
        ),
      },
      {
        id: "pa-2",
        badge: "Demo",
        title: "AeroPulse Ergonomic Headphone Tour",
        category: "Consumer Electronics",
        duration: "12s Showcase",
        aspectRatio: "16:9",
        specs: ["Memory Foam Texture", "Anodized Aluminum", "Internal Acoustic Chamber"],
        description:
          "Orbital 360-degree sweep showing acoustic chamber design, active noise cancellation mics, and soft memory foam compression.",
        visualTheme: "neon",
        visualElement: (
          <div className="relative flex h-full w-full items-center justify-center bg-navy-950">
            <div className="relative flex items-center justify-center">
              <div className="h-28 w-28 rounded-full border-4 border-purple-500/60 border-t-lavender-200 animate-spin [animation-duration:10s]" />
              <div className="absolute flex gap-6">
                <div className="h-10 w-5 rounded-lg bg-purple-600 shadow-lg" />
                <div className="h-10 w-5 rounded-lg bg-purple-600 shadow-lg" />
              </div>
            </div>
            <div className="absolute bottom-3 text-[10px] font-mono text-lavender-200/70">
              ORBITAL CAMERA RIG
            </div>
          </div>
        ),
      },
      {
        id: "pa-3",
        badge: "Motion Concept",
        title: "BioMatrix Smart Device Packaging",
        category: "Packaging Unbox",
        duration: "7s Unboxing",
        aspectRatio: "16:9",
        specs: ["Matte Paper Rigidity", "Magnetic Clasp Snap", "Gold Foil Specular"],
        description:
          "Tactile unboxing motion showing magnetic box opening, smooth tray slide-out, and glowing device boot sequence upon lid release.",
        visualTheme: "minimal",
        visualElement: (
          <div className="relative flex h-full w-full items-center justify-center bg-navy-950">
            <div className="h-24 w-36 rounded-xl border border-white/20 bg-navy-900/90 p-3 shadow-2xl flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-white/70">UNBOXING PASS</span>
                <span className="text-[10px] font-mono text-purple-400">90° ROTATION</span>
              </div>
              <div className="h-8 w-full rounded bg-purple-600/30 border border-purple-400 flex items-center justify-center">
                <span className="text-xs font-mono text-white font-bold">SLIDE TRAY</span>
              </div>
              <div className="h-1 w-1/2 bg-lavender-200/40 rounded" />
            </div>
          </div>
        ),
      },
      {
        id: "pa-4",
        badge: "Demo",
        title: "VaporBottle Thermal Flow Simulation",
        category: "Fluid & Thermal 3D",
        duration: "8s Loop",
        aspectRatio: "1:1 / 16:9",
        specs: ["Thermal Heatmap Shader", "Vacuum Wall Cutaway", "Ice Condensation"],
        description:
          "Cutaway diagram revealing double-wall vacuum insulation physics with simulated thermal gradient flow and condensation particle physics.",
        visualTheme: "neon",
        visualElement: (
          <div className="relative flex h-full w-full items-center justify-center bg-navy-950">
            <div className="h-32 w-16 rounded-2xl border-2 border-purple-400 bg-gradient-to-t from-purple-900/60 via-purple-700/40 to-cyan-500/30 p-2 flex flex-col justify-between items-center shadow-lg">
              <div className="h-3 w-8 rounded-full bg-lavender-200" />
              <div className="h-16 w-1 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
              <span className="text-[8px] font-mono text-white">-18°C INSULATED</span>
            </div>
          </div>
        ),
      },
    ],
  },
];

export function MotionCarousels() {
  const [activeTab, setActiveTab] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const currentCollection = COLLECTIONS[activeTab];
  const totalSlides = currentCollection.slides.length;
  const activeSlide = currentCollection.slides[currentSlideIndex];

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(media.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }
  }, []);

  // Slide navigation
  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Reset slide index when switching tabs
  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setCurrentSlideIndex(0);
  };

  // Autoplay gentle timer (7s)
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion, nextSlide]);

  // Touch / Swipe handler
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
    setIsPaused(false);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    }
  };

  return (
    <section className="relative bg-[#070B16] py-24 sm:py-32 text-white border-t border-white/5">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/3 top-10 h-[500px] w-[500px] rounded-full bg-purple-900/20 blur-[150px]"
        aria-hidden="true"
      />

      <Container className="relative">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-lavender-200 backdrop-blur-md">
            <Sparkles size={14} className="text-purple-400" aria-hidden />
            <span>Interactive Motion Collections</span>
          </div>

          <h2 className="font-display mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
            Curated Motion Concepts &{" "}
            <span className="bg-gradient-to-r from-purple-400 via-lavender-200 to-white bg-clip-text text-transparent">
              Creative Showcases.
            </span>
          </h2>

          <p className="mt-4 text-base leading-7 text-lavender-200/80 sm:text-lg">
            Explore 16 in-engine motion studies spanning brand idents, kinetic product assemblies, and retention-engineered social creatives.
          </p>

          {/* Collection Tab Switcher */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {COLLECTIONS.map((col, idx) => {
              const Icon = col.icon;
              const isSelected = activeTab === idx;
              return (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => handleTabChange(idx)}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.5)]"
                      : "border border-white/10 bg-white/5 text-lavender-200/70 hover:border-purple-400/40 hover:text-white"
                  }`}
                  aria-pressed={isSelected}
                >
                  <Icon size={14} aria-hidden />
                  <span>{col.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel Viewport Container */}
        <div
          ref={containerRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-roledescription="carousel"
          aria-label={`${currentCollection.title} carousel`}
          className="relative mt-14 outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-3xl"
        >
          {/* Main Slide Card */}
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-navy-900/50 backdrop-blur-xl shadow-[0_20px_60px_rgba(7,11,22,0.9)]">
            <div className="grid gap-0 lg:grid-cols-12 min-h-[460px]">
              {/* Left Column: Interactive Visual Canvas */}
              <div className="relative lg:col-span-7 flex items-center justify-center p-6 sm:p-10 bg-navy-950/90 border-b lg:border-b-0 lg:border-r border-white/10 min-h-[300px]">
                {/* Visual Demonstration Canvas */}
                <div className="relative h-full w-full flex items-center justify-center">
                  {activeSlide.visualElement}
                </div>

                {/* Concept badge overlay */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="rounded-full border border-purple-500/40 bg-purple-950/80 px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-purple-300 shadow-md">
                    {activeSlide.badge}
                  </span>
                  <span className="rounded-full border border-white/10 bg-navy-900/80 px-2.5 py-1 text-[11px] font-mono text-white/70">
                    {activeSlide.aspectRatio}
                  </span>
                </div>

                {/* Duration indicator */}
                <div className="absolute top-4 right-4 z-10 rounded-full border border-white/10 bg-navy-900/80 px-3 py-1 text-[11px] font-mono text-lavender-200">
                  {activeSlide.duration}
                </div>
              </div>

              {/* Right Column: Slide Information & Controls */}
              <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-10 bg-navy-900/40">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest text-purple-400">
                      {activeSlide.category}
                    </span>
                    <span className="font-mono text-sm font-bold text-lavender-200">
                      0{currentSlideIndex + 1} / 0{totalSlides}
                    </span>
                  </div>

                  <h3 className="font-display mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {activeSlide.title}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-lavender-200/80">
                    {activeSlide.description}
                  </p>

                  {/* Technical Specifications */}
                  <div className="mt-6 pt-5 border-t border-white/10">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-white/50 mb-2">
                      Technical Render Specifications
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {activeSlide.specs.map((spec) => (
                        <span
                          key={spec}
                          className="rounded-md border border-purple-500/20 bg-purple-950/30 px-2.5 py-1 text-xs text-lavender-200"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Row: CTA & Carousel Controls */}
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <Link
                    href={`/contact?service=motion-animation&concept=${activeSlide.id}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 px-5 py-2.5 text-xs font-semibold text-white shadow-[0_0_15px_rgba(124,58,237,0.4)] hover:bg-purple-500 transition-all"
                  >
                    <span>Enquire About Similar Motion</span>
                    <ArrowRight size={14} />
                  </Link>

                  {/* Prev / Next & Pause Controls */}
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

          {/* Slide Indicator Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {currentCollection.slides.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-2 transition-all rounded-full ${
                  currentSlideIndex === idx
                    ? "w-8 bg-purple-500 shadow-[0_0_10px_#7c3aed]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Jump to slide ${idx + 1}: ${slide.title}`}
                aria-current={currentSlideIndex === idx ? "true" : undefined}
              />
            ))}
          </div>

          <p className="mt-3 text-center text-xs text-lavender-200/50">
            Use arrow keys or swipe horizontally to navigate • Concepts labeled for creative preview only
          </p>
        </div>
      </Container>
    </section>
  );
}
