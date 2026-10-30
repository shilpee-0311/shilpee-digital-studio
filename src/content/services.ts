import { SERVICE_TYPES } from "@/lib/validations";

export type ServiceSlug = (typeof SERVICE_TYPES)[number];
export const serviceSlugs = SERVICE_TYPES;

export type Service = {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  offerings: string[];
  outcomes: string[];
};

export const services: Service[] = [ // slugs must match SERVICE_TYPES
  {
    slug: "website-development",
    title: "Website Development",
    shortTitle: "Websites",
    summary:
      "Business websites, portfolios, landing pages, wedding invitation sites and event websites.",
    description:
      "Custom-designed websites built for clarity, speed and conversion. Every project is responsive, accessible and structured for search engines — from a single landing page to a multi-page business or event experience.",
    offerings: [
      "Business and brand websites",
      "Personal and studio portfolios",
      "Campaign landing pages",
      "Wedding invitation websites",
      "Event and conference microsites",
    ],
    outcomes: [
      "Mobile-first, production-ready front end",
      "Clear calls to action and enquiry paths",
      "SEO-ready metadata and page structure",
    ],
  },
  {
    slug: "software-apps",
    title: "Software & Web Applications",
    shortTitle: "Applications",
    summary:
      "Custom applications, management systems, admin dashboards and business tools.",
    description:
      "Purpose-built web applications that replace spreadsheets and scattered processes with a single, secure workspace — including role-based access, dashboards and operational workflows.",
    offerings: [
      "Custom web applications",
      "Internal management systems",
      "Admin dashboards and reporting views",
      "Business tools and workflow apps",
    ],
    outcomes: [
      "Structured data instead of ad-hoc files",
      "Role-aware access for your team",
      "Maintainable TypeScript codebase",
    ],
  },
  {
    slug: "data-analytics",
    title: "Data Analytics & Automation",
    shortTitle: "Analytics",
    summary:
      "Python, MySQL, Pandas, NumPy, Excel, Power BI, data cleaning and reporting.",
    description:
      "From messy source files to decision-ready reports. Pipelines are documented, repeatable and designed so you can refresh numbers without starting from scratch each month.",
    offerings: [
      "Data cleaning and transformation",
      "MySQL schema and query work",
      "Python (Pandas, NumPy) analysis",
      "Excel models and automated reports",
      "Power BI dashboards",
    ],
    outcomes: [
      "Repeatable cleaning and reporting steps",
      "Clear KPI views for operators and owners",
      "Handover notes so the work can be rerun",
    ],
  },
  {
    slug: "graphic-design",
    title: "Graphic Design & Canva",
    shortTitle: "Design",
    summary:
      "Social media creatives, presentations, menu cards, brochures, business cards and templates.",
    description:
      "Visual systems that stay consistent across print and social. Deliverables can be print-ready files, editable Canva templates, or both — so your team can continue the look after handover.",
    offerings: [
      "Social media creatives",
      "Presentations and pitch decks",
      "Menu cards and brochures",
      "Business cards and stationery",
      "Reusable Canva templates",
    ],
    outcomes: [
      "Cohesive visual language",
      "Print and digital file sets",
      "Editable templates where requested",
    ],
  },
  {
    slug: "digital-invitations",
    title: "Digital Invitations",
    shortTitle: "Invitations",
    summary:
      "Wedding, engagement, birthday and event invitation websites.",
    description:
      "Invitation websites that feel personal and are easy for guests to use — schedule, venue, dress notes, RSVP and maps — designed to work beautifully on a phone.",
    offerings: [
      "Wedding invitation websites",
      "Engagement and reception pages",
      "Birthday and private event sites",
      "RSVP and guest-information layouts",
    ],
    outcomes: [
      "Mobile-first guest experience",
      "Shareable link and optional QR code",
      "Clear event details in one place",
    ],
  },
  {
    slug: "social-media",
    title: "Social Media Management",
    shortTitle: "Social",
    summary:
      "Instagram, Facebook and LinkedIn management, content, calendars, captions, scheduling and reports.",
    description:
      "A structured cadence for the channels you actually use. Packages cover planning, creatives, captions and reporting. One-off campaigns and mixed-service retainers are quoted separately.",
    offerings: [
      "Instagram, Facebook and LinkedIn management",
      "Content creation and caption writing",
      "Editorial calendars",
      "Scheduling support",
      "Performance reports",
    ],
    outcomes: [
      "A planned month of content, not last-minute posts",
      "On-brand creatives and captions",
      "Simple reporting you can act on",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
