"use client";

import { CinematicHero } from "@/components/home/CinematicHero";
import { CreativePortfolioCarousel } from "@/components/home/CreativePortfolioCarousel";
import { CoreServicesSection } from "@/components/home/CoreServicesSection";
import { MotionVfxFeature } from "@/components/home/MotionVfxFeature";
import { WhoWeHelpSection } from "@/components/home/WhoWeHelpSection";
import { HomeFeaturedProject } from "@/components/home/HomeFeaturedProject";
import { FounderIntroSection } from "@/components/home/FounderIntroSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

export function HomeContent() {
  return (
    <div className="bg-[#070B16] text-white">
      {/* 1. Cinematic Hero Section */}
      <CinematicHero />

      {/* 2. Creative Portfolio Carousel */}
      <CreativePortfolioCarousel />

      {/* 3. Core Services (7 Practice Areas) */}
      <CoreServicesSection />

      {/* 4. Motion Animation & VFX Feature */}
      <MotionVfxFeature />

      {/* 5. Who We Help (6 Audience Cards) */}
      <WhoWeHelpSection />

      {/* 6. Featured Technical Project (AI Resume Intelligence) */}
      <HomeFeaturedProject />

      {/* 7. Founder Introduction (Shilpee Srivastava) */}
      <FounderIntroSection />

      {/* 8. Process & Timeline (Discover, Plan, Create, Deliver) */}
      <ProcessSection />

      {/* 9. Final Call to Action */}
      <FinalCtaSection />
    </div>
  );
}
