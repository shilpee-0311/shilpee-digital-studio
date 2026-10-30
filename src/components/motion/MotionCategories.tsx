"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Film,
  Sparkles,
  Layers,
  Box,
  Wand2,
  Tv,
  Smartphone,
  Video,
  Type,
  Clapperboard,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

interface CategoryItem {
  id: string;
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: typeof Film;
  previewType:
    | "motion-graphics"
    | "2d-anim"
    | "3d-anim"
    | "vfx"
    | "logo-anim"
    | "product-anim"
    | "social-reels"
    | "explainer"
    | "typography"
    | "promo";
}

const CATEGORIES: CategoryItem[] = [
  {
    id: "motion-graphics",
    number: "01",
    title: "Motion Graphics",
    description:
      "Dynamic shape choreography, geometric transitions, and kinetic visual identity elements that transform complex ideas into captivating digital stories.",
    deliverables: ["Vector Keyframing", "UI Motion Systems", "4K 60FPS Masters", "Transparent Alpha"],
    icon: Film,
    previewType: "motion-graphics",
  },
  {
    id: "2d-animation",
    number: "02",
    title: "2D Animation",
    description:
      "Handcrafted vector animation, character rigging, and stylized illustrative storytelling tailored for brand narratives, educational content, and marketing.",
    deliverables: ["Character Rigging", "Storyboard to Final", "Vector Asset Packs", "Lottie Web Exports"],
    icon: Layers,
    previewType: "2d-anim",
  },
  {
    id: "3d-animation",
    number: "03",
    title: "3D Animation",
    description:
      "Dimension-rich cinematic sequences featuring high-fidelity lighting, camera sweeps, realistic textures, physics simulations, and spatial depth.",
    deliverables: ["Photoreal Lighting", "Volumetric Fog", "Camera Choreography", "Multi-pass EXR / MP4"],
    icon: Box,
    previewType: "3d-anim",
  },
  {
    id: "vfx-visual-effects",
    number: "04",
    title: "VFX & Visual Effects",
    description:
      "Hollywood-caliber post-production compositing, neon plasma glows, chromatic aberration, energy fields, particle disintegration, and scene enhancements.",
    deliverables: ["Multi-layer Compositing", "Light Leak FX", "Particle Systems", "Chroma Keying"],
    icon: Wand2,
    previewType: "vfx",
  },
  {
    id: "logo-animation",
    number: "05",
    title: "Logo Animation",
    description:
      "Distinctive animated brand idents, stingers, YouTube intros, and app launch screens engineered to make your identity unforgettable in the first 3 seconds.",
    deliverables: ["2-5s Brand Stingers", "App Splash Animations", "Custom Sound Design Sync", "Seamless Loops"],
    icon: Sparkles,
    previewType: "logo-anim",
  },
  {
    id: "product-animation",
    number: "06",
    title: "Product Animation",
    description:
      "Exploded mechanical assemblies, 360-degree orbital spins, macro detail callouts, and tactile material renders that showcase premium product engineering.",
    deliverables: ["Exploded Assemblies", "360 Orbital Views", "Feature Callouts", "E-commerce Turnarounds"],
    icon: Box,
    previewType: "product-anim",
  },
  {
    id: "social-media-reels",
    number: "07",
    title: "Social Media Reels & Animations",
    description:
      "High-retention 9:16 vertical motion assets with kinetic hook timing, dynamic captions, and viral pacing engineered for Instagram Reels, TikTok, and YouTube Shorts.",
    deliverables: ["9:16 Mobile Ratios", "Retention-Engineered Hooks", "Kinetic Subtitles", "Template Systems"],
    icon: Smartphone,
    previewType: "social-reels",
  },
  {
    id: "explainer-videos",
    number: "08",
    title: "Explainer Videos",
    description:
      "Script-to-screen animated explainer videos that break down SaaS platforms, fintech workflows, and complex enterprise products into intuitive customer journeys.",
    deliverables: ["Script & Storyboarding", "Voiceover Integration", "Paced Infographics", "Social Cutdowns"],
    icon: Video,
    previewType: "explainer",
  },
  {
    id: "animated-typography",
    number: "09",
    title: "Animated Typography",
    description:
      "Expressive kinetic typography, variable font morphing, rhythmic text reveals, and editorial title sequences synchronized with audio tempo.",
    deliverables: ["Variable Font Motion", "Kinetic Text Sync", "Title Sequence Packages", "CSS / SVG Code Options"],
    icon: Type,
    previewType: "typography",
  },
  {
    id: "promotional-video-graphics",
    number: "10",
    title: "Promotional Video Graphics",
    description:
      "Broadcast-grade broadcast packages, commercial lower-thirds, event teaser graphics, sales countdowns, and dynamic presentation overlays.",
    deliverables: ["Lower-Third Kits", "Promo Transition Packs", "Event Teaser Bundles", "Brand Guidelines Match"],
    icon: Clapperboard,
    previewType: "promo",
  },
];

function CategoryPreview({ type }: { type: CategoryItem["previewType"] }) {
  switch (type) {
    case "motion-graphics":
      return (
        <div className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-xl bg-navy-950/80 border border-purple-500/20">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-transparent" />
          {/* Animated concentric rings */}
          <div className="absolute h-24 w-24 rounded-full border border-purple-500/40 animate-ping opacity-25" />
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-lavender-300 shadow-[0_0_20px_rgba(124,58,237,0.5)] rotate-12 transition-transform duration-700 group-hover:rotate-45" />
          <div className="absolute h-8 w-8 rounded-full border-2 border-white/60 -translate-x-6 translate-y-6" />
          <div className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-wider text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/50">
            Vector
          </div>
        </div>
      );

    case "2d-anim":
      return (
        <div className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-xl bg-navy-950/80 border border-purple-500/20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.15),transparent_70%)]" />
          {/* 2D stylized geometric character rig simulation */}
          <div className="relative flex flex-col items-center">
            <div className="h-8 w-8 rounded-full bg-lavender-200 shadow-md group-hover:scale-110 transition-transform" />
            <div className="mt-1 h-10 w-12 rounded-t-xl bg-purple-600 flex items-center justify-center">
              <div className="h-4 w-4 rounded-sm bg-white/40 rotate-45" />
            </div>
            <div className="flex gap-2 -mt-1">
              <div className="h-6 w-2 bg-purple-400 rounded-b group-hover:translate-y-1 transition-transform" />
              <div className="h-6 w-2 bg-purple-400 rounded-b group-hover:-translate-y-1 transition-transform" />
            </div>
          </div>
          <div className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-wider text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/50">
            Rigged 2D
          </div>
        </div>
      );

    case "3d-anim":
      return (
        <div className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-xl bg-navy-950/80 border border-purple-500/20 perspective-1000">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent" />
          {/* 3D isometric cube */}
          <div className="relative h-14 w-14 preserve-3d animate-rotate-3d-slow group-hover:[animation-duration:4s]">
            <div className="absolute inset-0 rounded-lg border-2 border-purple-400 bg-purple-600/30 backdrop-blur-sm [transform:translateZ(28px)]" />
            <div className="absolute inset-0 rounded-lg border-2 border-lavender-300 bg-purple-800/30 backdrop-blur-sm [transform:rotateY(90deg)_translateZ(28px)]" />
            <div className="absolute inset-0 rounded-lg border-2 border-purple-500 bg-purple-900/40 backdrop-blur-sm [transform:rotateX(90deg)_translateZ(28px)]" />
          </div>
          <div className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-wider text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/50">
            Spatial 3D
          </div>
        </div>
      );

    case "vfx":
      return (
        <div className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-xl bg-navy-950/80 border border-purple-500/20">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-950/40 via-purple-600/20 to-purple-950/40" />
          {/* Glowing neon streak & particle sparkle */}
          <div className="relative h-1 w-3/4 rounded-full bg-gradient-to-r from-transparent via-purple-400 to-transparent shadow-[0_0_15px_rgba(192,132,252,0.9)] group-hover:scale-x-110 transition-transform" />
          <div className="absolute h-10 w-10 rounded-full bg-purple-500/30 blur-md animate-pulse" />
          <Sparkles className="absolute text-lavender-200 animate-bounce" size={20} />
          <div className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-wider text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/50">
            VFX Glow
          </div>
        </div>
      );

    case "logo-anim":
      return (
        <div className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-xl bg-navy-950/80 border border-purple-500/20">
          <div className="relative flex items-center justify-center">
            {/* Morphing emblem */}
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-600 to-lavender-300 p-0.5 shadow-lg group-hover:rotate-180 transition-transform duration-700">
              <div className="flex h-full w-full items-center justify-center rounded-2xl bg-navy-950">
                <span className="font-display text-xl font-bold bg-gradient-to-r from-purple-400 to-lavender-200 bg-clip-text text-transparent">
                  S
                </span>
              </div>
            </div>
            <div className="absolute -inset-2 rounded-full border border-purple-500/30 animate-spin [animation-duration:12s]" />
          </div>
          <div className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-wider text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/50">
            Ident Stinger
          </div>
        </div>
      );

    case "product-anim":
      return (
        <div className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-xl bg-navy-950/80 border border-purple-500/20">
          {/* Exploded parts mock */}
          <div className="relative flex flex-col items-center gap-1.5">
            <div className="h-2 w-16 rounded-full bg-lavender-200 shadow-sm group-hover:-translate-y-2 transition-transform duration-300" />
            <div className="h-8 w-20 rounded-lg border border-purple-400/80 bg-purple-600/20 backdrop-blur-sm flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-purple-400" />
            </div>
            <div className="h-2 w-16 rounded-full bg-lavender-300/80 shadow-sm group-hover:translate-y-2 transition-transform duration-300" />
          </div>
          <div className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-wider text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/50">
            Assembly
          </div>
        </div>
      );

    case "social-reels":
      return (
        <div className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-xl bg-navy-950/80 border border-purple-500/20">
          {/* Vertical 9:16 phone mockup */}
          <div className="relative h-24 w-14 rounded-lg border-2 border-purple-400/60 bg-navy-900/90 p-1 flex flex-col justify-between shadow-md group-hover:scale-105 transition-transform">
            <div className="h-1 w-4 mx-auto rounded-full bg-white/40" />
            <div className="space-y-1">
              <div className="h-1.5 w-3/4 rounded bg-purple-400" />
              <div className="h-1.5 w-1/2 rounded bg-lavender-300" />
            </div>
            <div className="flex justify-between items-center px-1">
              <div className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
              <div className="h-1 w-4 rounded bg-white/30" />
            </div>
          </div>
          <div className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-wider text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/50">
            9:16 Vertical
          </div>
        </div>
      );

    case "explainer":
      return (
        <div className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-xl bg-navy-950/80 border border-purple-500/20">
          {/* Step flow / timeline nodes */}
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-purple-600 flex items-center justify-center text-[10px] text-white font-bold">
              1
            </div>
            <div className="h-0.5 w-6 bg-purple-500/40 group-hover:bg-purple-400 transition-colors" />
            <div className="h-7 w-7 rounded-full bg-purple-500 border border-lavender-200 flex items-center justify-center text-[11px] text-white font-bold shadow-[0_0_10px_rgba(124,58,237,0.6)]">
              2
            </div>
            <div className="h-0.5 w-6 bg-purple-500/40 group-hover:bg-purple-400 transition-colors" />
            <div className="h-6 w-6 rounded-full bg-navy-800 border border-purple-500/40 flex items-center justify-center text-[10px] text-lavender-200 font-bold">
              3
            </div>
          </div>
          <div className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-wider text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/50">
            Narrative
          </div>
        </div>
      );

    case "typography":
      return (
        <div className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-xl bg-navy-950/80 border border-purple-500/20">
          <div className="space-y-1 text-center">
            <p className="font-display text-lg font-bold tracking-widest text-lavender-100 group-hover:tracking-[0.25em] transition-all duration-300">
              KINETIC
            </p>
            <p className="text-xs font-mono text-purple-400 group-hover:text-lavender-200 transition-colors">
              [ MOTION TYPE ]
            </p>
          </div>
          <div className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-wider text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/50">
            Editorial
          </div>
        </div>
      );

    case "promo":
      return (
        <div className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-xl bg-navy-950/80 border border-purple-500/20">
          {/* Lower third broadcast mock */}
          <div className="w-5/6 rounded-lg bg-navy-900 border-l-4 border-purple-500 p-2 shadow-lg group-hover:border-lavender-300 transition-colors">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-mono text-white/70 uppercase">LIVE EVENT MASTER</span>
            </div>
            <div className="mt-1 h-2 w-2/3 rounded bg-purple-400/80" />
          </div>
          <div className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-wider text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/50">
            Broadcast
          </div>
        </div>
      );
  }
}

export function MotionCategories() {
  const [filter, setFilter] = useState<"all" | "branding" | "3d" | "commercial">("all");

  const filteredCategories = CATEGORIES.filter((c) => {
    if (filter === "branding") return ["logo-anim", "motion-graphics", "typography"].includes(c.previewType);
    if (filter === "3d") return ["3d-anim", "product-anim", "vfx"].includes(c.previewType);
    if (filter === "commercial") return ["social-reels", "explainer", "promo", "2d-anim"].includes(c.previewType);
    return true;
  });

  return (
    <section id="service-categories" className="relative scroll-mt-20 bg-[#070B16] py-24 sm:py-32 text-white">
      {/* Background accents */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-full -translate-x-1/2 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.12),transparent_70%)]"
        aria-hidden="true"
      />

      <Container className="relative">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-lavender-200 backdrop-blur-md">
            <Sparkles size={14} className="text-purple-400" aria-hidden />
            <span>Full-Spectrum Motion Suite</span>
          </div>

          <h2 className="font-display mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
            Ten Tailored Motion Services for{" "}
            <span className="bg-gradient-to-r from-purple-400 via-lavender-200 to-white bg-clip-text text-transparent">
              Every Screen.
            </span>
          </h2>

          <p className="mt-4 text-base leading-7 text-lavender-200/80 sm:text-lg">
            From kinetic brand identities and 3D product assemblies to viral 9:16 social reels and broadcast graphics, we engineer visual motion that commands attention and accelerates conversion.
          </p>

          {/* Filter tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All Practices (10)" },
              { id: "branding", label: "Identity & Typography" },
              { id: "3d", label: "3D & VFX" },
              { id: "commercial", label: "Commercial & Social" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id as typeof filter)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  filter === tab.id
                    ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]"
                    : "border border-white/10 bg-white/5 text-lavender-200/70 hover:border-purple-400/40 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-navy-900/40 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-500/50 hover:bg-navy-900/70 hover:shadow-[0_20px_40px_rgba(7,11,22,0.8),0_0_30px_rgba(124,58,237,0.15)]"
              >
                {/* Visual Preview Box */}
                <div className="mb-5">
                  <CategoryPreview type={cat.previewType} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-purple-400">{cat.number}</span>
                    <div className="rounded-lg bg-white/5 p-2 text-lavender-200 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <Icon size={18} aria-hidden />
                    </div>
                  </div>

                  <h3 className="font-display mt-3 text-xl font-semibold text-white group-hover:text-lavender-100">
                    {cat.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-lavender-200/75">{cat.description}</p>

                  {/* Typical Deliverables Pills */}
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-lavender-200/60 mb-2">
                      Key Deliverables
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.deliverables.map((deliv) => (
                        <span
                          key={deliv}
                          className="inline-flex items-center gap-1 rounded bg-white/5 px-2 py-0.5 text-[11px] text-lavender-200/90 border border-white/5"
                        >
                          <CheckCircle2 size={10} className="text-purple-400" />
                          <span>{deliv}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Enquiry CTA for this category */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <Link
                    href={`/contact?service=motion-animation&category=${cat.id}`}
                    className="inline-flex w-full items-center justify-between rounded-xl border border-purple-500/30 bg-purple-950/40 px-4 py-2.5 text-xs font-semibold text-lavender-100 transition-all hover:border-purple-400 hover:bg-purple-600 hover:text-white"
                  >
                    <span>Enquire for {cat.title}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
