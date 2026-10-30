export const PORTFOLIO_BADGES = ["Demo Project", "Concept Showcase"] as const;
export type PortfolioBadge = (typeof PORTFOLIO_BADGES)[number];

export type DemoProject = {
  slug: string;
  title: string;
  category: string;
  badgeType: PortfolioBadge;
  summary: string;
  fullDescription: string;
  techStack: string;
  features: string[];
  deliverables: string[];
  previewUrl: string;
  githubUrl?: string;
  thumbnail: string;
  isFeatured: boolean;
  sortOrder: number;
};

export const demoProjects: DemoProject[] = [
  {
    slug: "luxestay-boutique-hotel",
    title: "LuxeStay Boutique Retreat",
    category: "website-development",
    badgeType: "Demo Project",
    summary:
      "Hospitality marketing site with room showcase, enquiry path and a mobile-first layout.",
    fullDescription:
      "A sample hospitality website showing structure for rooms, galleries and enquiries. It is a Demo Project created to illustrate layout and conversion patterns — not a live hotel booking product or a completed client engagement.",
    techStack: "Next.js, TypeScript, Tailwind CSS",
    features: [
      "Responsive marketing layout",
      "Room-style content sections",
      "Enquiry-focused calls to action",
      "SEO-ready document structure",
    ],
    deliverables: [
      "Sample page architecture",
      "Component-based UI",
      "Form-ready contact pattern",
    ],
    previewUrl: "",
    thumbnail: "/demo/luxestay.svg",
    isFeatured: true,
    sortOrder: 1,
  },
  {
    slug: "nexustrack-ops-dashboard",
    title: "NexusTrack Operations Dashboard",
    category: "software-apps",
    badgeType: "Demo Project",
    summary:
      "Operations dashboard concept with KPI cards, tables and role-aware navigation.",
    fullDescription:
      "A Demo Project showing how an internal operations tool might be organised: metrics, records and filters. It is sample UI and information architecture, not a shipped client system.",
    techStack: "React, TypeScript, Prisma, Tailwind CSS",
    features: [
      "Dashboard layout with KPI cards",
      "Searchable records table pattern",
      "Role-aware navigation structure",
      "Clear empty and loading states",
    ],
    deliverables: [
      "Sample application shell",
      "Table and filter patterns",
      "Documented data model sketch",
    ],
    previewUrl: "",
    thumbnail: "/demo/nexustrack.svg",
    isFeatured: true,
    sortOrder: 2,
  },
  {
    slug: "retailpulse-sales-intelligence",
    title: "RetailPulse Sales Intelligence",
    category: "data-analytics",
    badgeType: "Demo Project",
    summary:
      "Sample analytics narrative: cleaning, modelling and an executive-style report view.",
    fullDescription:
      "This Demo Project describes a retail reporting workflow using Python, SQL and dashboard-style visuals. Figures and datasets here are illustrative. They are not client results.",
    techStack: "Python, Pandas, NumPy, MySQL, Power BI, Excel",
    features: [
      "Documented cleaning steps",
      "Relational table sketch",
      "Dashboard layout for KPIs",
      "Export-ready report structure",
    ],
    deliverables: [
      "Pipeline outline",
      "Sample dashboard composition",
      "Reporting cadence notes",
    ],
    previewUrl: "",
    thumbnail: "/demo/retailpulse.svg",
    isFeatured: true,
    sortOrder: 3,
  },
  {
    slug: "aura-botanicals-brand-suite",
    title: "Aura Botanicals Brand Suite",
    category: "graphic-design",
    badgeType: "Concept Showcase",
    summary:
      "Visual identity concept for social, brochure and stationery templates.",
    fullDescription:
      "A Concept Showcase of a cohesive brand kit: social frames, brochure layout and stationery. Created as original sample design. It is not work delivered for a real brand unless later commissioned.",
    techStack: "Canva, Figma, print-ready PDF workflow",
    features: [
      "Social post and story frames",
      "Brochure and menu layout",
      "Business card composition",
      "Editable template approach",
    ],
    deliverables: [
      "Sample visual system",
      "Print and digital layout set",
      "Template handover pattern",
    ],
    previewUrl: "",
    thumbnail: "/demo/aurabotanicals.svg",
    isFeatured: true,
    sortOrder: 4,
  },
  {
    slug: "ananya-kabir-royal-wedding",
    title: "Ananya & Kabir Invitation Site",
    category: "digital-invitations",
    badgeType: "Demo Project",
    summary:
      "Sample wedding invitation website with schedule, venue and RSVP layout.",
    fullDescription:
      "A Demo Project for a digital wedding invitation. Names and events are fictional and used only to demonstrate page flow. This is not a real couple’s wedding website.",
    techStack: "Next.js, Tailwind CSS",
    features: [
      "Event schedule sections",
      "Venue and map-ready block",
      "RSVP form layout",
      "Mobile-first invitation reading path",
    ],
    deliverables: [
      "Invitation page structure",
      "Guest-information layout",
      "Shareable-link pattern",
    ],
    previewUrl: "",
    thumbnail: "/demo/wedding.svg",
    isFeatured: true,
    sortOrder: 5,
  },
  {
    slug: "fitflow-studio-growth-campaign",
    title: "FitFlow Studio Content System",
    category: "social-media",
    badgeType: "Concept Showcase",
    summary:
      "Ninety-day content system sample: pillars, calendar and report template.",
    fullDescription:
      "A Concept Showcase of a social content operating system for a fitness studio. Calendars, captions and metrics shown are examples for structure only. They are not campaign results.",
    techStack: "Editorial calendar, Canva, scheduling tools",
    features: [
      "Content pillar structure",
      "Monthly calendar layout",
      "Caption and CTA framework",
      "Report template",
    ],
    deliverables: [
      "Sample calendar",
      "Creative set outline",
      "Reporting template",
    ],
    previewUrl: "",
    thumbnail: "/demo/fitflow.svg",
    isFeatured: true,
    sortOrder: 6,
  },
];

export function getDemoProject(slug: string): DemoProject | undefined {
  return demoProjects.find((project) => project.slug === slug);
}
