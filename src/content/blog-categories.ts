export interface BlogCategory {
  title: string;
  slug: string;
  description: string;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    title: "Web Development",
    slug: "web-development",
    description:
      "Modern full-stack web architectures, Next.js best practices, semantic accessibility, and high-performance design patterns.",
  },
  {
    title: "Artificial Intelligence & Machine Learning",
    slug: "artificial-intelligence-machine-learning",
    description:
      "Applied machine learning, NLP algorithms, document parsing, TF-IDF vectorization, and AI-assisted software workflows.",
  },
  {
    title: "Data Analytics & Business Intelligence",
    slug: "data-analytics-business-intelligence",
    description:
      "Transforming raw operational data into actionable clarity through Python (Pandas), MySQL, and Power BI dashboards.",
  },
  {
    title: "Software & Technology",
    slug: "software-technology",
    description:
      "Bespoke application architecture, database normalization, secure session handling, and maintainable TypeScript engineering.",
  },
  {
    title: "Digital Marketing & SEO",
    slug: "digital-marketing-seo",
    description:
      "Organic search optimization, technical SEO best practices, high-intent landing page copy, and digital conversion funnels.",
  },
  {
    title: "Graphic Design",
    slug: "graphic-design",
    description:
      "Visual identity systems, social media creative strategies, brand guidelines, and editable Canva corporate templates.",
  },
  {
    title: "Motion Graphics, Animation & VFX",
    slug: "motion-graphics-animation-vfx",
    description:
      "Kinetic typography, 3D product assemblies, broadcast stingers, and retention-engineered vertical video motion.",
  },
  {
    title: "Business Growth & Automation",
    slug: "business-growth-automation",
    description:
      "Replacing chaotic manual spreadsheets and repetitive tasks with automated pipelines and structured operational dashboards.",
  },
];

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((c) => c.slug === slug);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
