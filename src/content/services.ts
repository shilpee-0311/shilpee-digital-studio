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
  customHref?: string;
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
      "Python, MySQL, Pandas, NumPy, Power BI, Excel, business data analysis and exploratory AI prototypes.",
    description:
      "Transforming raw datasets, spreadsheets, and scattered logs into clean, decision-ready intelligence. We construct documented data cleaning workflows, relational SQL queries, and interactive Power BI dashboards for operational visibility. Additionally, we build experimental NLP and predictive modeling prototypes for document matching and trend exploration.",
    offerings: [
      "Business data analysis & exploratory analysis (EDA)",
      "Data cleaning and transformation (Python Pandas, NumPy)",
      "Power BI reporting dashboards & interactive KPI views",
      "SQL-based data analysis & relational MySQL schema design",
      "Excel analytical models & automated spreadsheet reporting",
      "Predictive modelling prototypes (regression & classification concepts)",
      "NLP-based text analysis & document matching prototypes (TF-IDF)",
    ],
    outcomes: [
      "Repeatable, automated data cleaning and reporting workflows",
      "Interactive executive dashboards with actionable metric tracking",
      "Clear distinction between production-ready pipelines and experimental models",
      "Well-documented code scripts and transparent query handover",
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
  {
    slug: "motion-animation",
    title: "Motion Animation & VFX",
    shortTitle: "Motion",
    summary:
      "Motion graphics, 2D/3D animation, visual effects, logo reveals, product animations and social media reels.",
    description:
      "Creative motion design and visual effects that bring brands, digital products, and cinematic campaigns to life. From subtle UI micro-interactions to 3D product exploding assemblies and high-impact social reels.",
    offerings: [
      "Motion graphics & kinetic typography",
      "2D & 3D product animations",
      "VFX compositing & particle simulations",
      "Logo animation & animated stingers",
      "Social media reels & promotional video graphics",
    ],
    outcomes: [
      "Cinema-grade 60 FPS animation masters",
      "Multi-platform optimization (WebM, MP4, Lottie, GIF)",
      "Bespoke storyboards and dynamic visual rhythm",
    ],
    customHref: "/motion-animation",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
