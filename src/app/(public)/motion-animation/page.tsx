import type { Metadata } from "next";
import { MotionHero } from "@/components/motion/MotionHero";
import { MotionCategories } from "@/components/motion/MotionCategories";
import { MotionVfxShowcase } from "@/components/motion/MotionVfxShowcase";
import { MotionCarousels } from "@/components/motion/MotionCarousels";
import { MotionProcess } from "@/components/motion/MotionProcess";
import { MotionEnquirySection } from "@/components/motion/MotionEnquirySection";

export const metadata: Metadata = {
  title: "Motion Animation & Motion Graphics | Shilpee Digital Studio",
  description:
    "Premium motion graphics, 2D/3D animation, VFX, logo animation, product visualization, and promotional video graphics by Shilpee Digital Studio. Bringing ideas to life through cinematic motion.",
  alternates: {
    canonical: "/motion-animation",
  },
  openGraph: {
    title: "Motion Animation & Motion Graphics | Shilpee Digital Studio",
    description:
      "Creative motion graphics, 2D/3D animation, and visual effects that make brands, products and digital experiences stand out.",
    url: "/motion-animation",
    siteName: "Shilpee Digital Studio",
    locale: "en_IN",
    type: "website",
  },
  keywords: [
    "motion graphics",
    "motion animation",
    "3D animation",
    "2D animation",
    "VFX visual effects",
    "logo animation",
    "product animation",
    "social media reels",
    "explainer videos",
    "animated typography",
    "promotional video graphics",
    "Shilpee Digital Studio",
  ],
};

const motionServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Motion Animation & VFX Services",
  provider: {
    "@type": "Organization",
    name: "Shilpee Digital Studio",
    url: "https://shilpee-digital-studio.vercel.app",
  },
  serviceType: "Motion Graphics & Visual Effects",
  description:
    "Creative motion graphics, 2D/3D animation, and visual effects that make brands, products and digital experiences stand out.",
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Motion Animation Practices",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Motion Graphics" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "2D Animation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "3D Animation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "VFX & Visual Effects" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Logo Animation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Product Animation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Social Media Reels & Animations" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Explainer Videos" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Animated Typography" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Promotional Video Graphics" } },
    ],
  },
};

export default function MotionAnimationPage() {
  return (
    <div className="bg-[#070B16] text-white min-h-screen">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(motionServiceSchema) }}
      />

      {/* 1. Hero Section */}
      <MotionHero />

      {/* 2. Ten Service Categories */}
      <MotionCategories />

      {/* 3. Animation & VFX Showcase (8 Visual Demonstrations) */}
      <MotionVfxShowcase />

      {/* 4. Interactive Carousels (4 Curated Collections) */}
      <MotionCarousels />

      {/* 5. Production Pipeline / Process */}
      <MotionProcess />

      {/* 6. Project Enquiry Section */}
      <MotionEnquirySection />
    </div>
  );
}
