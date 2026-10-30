export type SocialPackage = {
  id: string;
  name: string;
  cadence: string;
  bestFor: string;
  includes: string[];
  note: string;
};

export const socialMediaPackages: SocialPackage[] = [
  {
    id: "starter",
    name: "Starter Presence",
    cadence: "Monthly",
    bestFor: "A single primary channel with a consistent posting rhythm.",
    includes: [
      "One platform (Instagram, Facebook or LinkedIn)",
      "8 designed posts per month",
      "Captions and hashtag sets",
      "Simple content calendar",
      "End-of-month activity summary",
    ],
    note: "Starting package. Final fee depends on platforms, volume and production needs.",
  },
  {
    id: "growth",
    name: "Growth Rhythm",
    cadence: "Monthly",
    bestFor: "Two platforms with planned creatives, captions and scheduling.",
    includes: [
      "Two platforms",
      "12 designed posts per month",
      "Captions, CTAs and scheduling support",
      "Shared editorial calendar",
      "Monthly performance snapshot",
    ],
    note: "Starting package. Scope is confirmed in writing before work begins.",
  },
  {
    id: "studio",
    name: "Studio Retainer",
    cadence: "Monthly",
    bestFor: "Instagram, Facebook and LinkedIn with reporting and tighter coordination.",
    includes: [
      "Three platforms",
      "16 designed posts per month",
      "Captions, calendar and scheduling",
      "Story or carousel layouts as agreed",
      "Monthly performance report and next-month plan",
    ],
    note: "Starting package. Larger volumes and video-heavy work are quoted separately.",
  },
];

export const customQuotationNotes = [
  "Website, software, analytics, design and invitation projects are quoted individually after a short brief.",
  "Social retainers can be mixed with design or website work in a single proposal.",
  "Rush timelines, extra platforms, paid-ads management and video production are not included unless specified.",
];
