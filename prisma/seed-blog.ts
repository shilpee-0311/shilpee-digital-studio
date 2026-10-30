import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SAMPLE_POSTS = [
  {
    title: "Why Modern Businesses are Moving from Heavy CMS to Next.js Full-Stack Architectures",
    slug: "why-modern-businesses-are-moving-to-nextjs",
    category: "Web Development",
    categorySlug: "web-development",
    excerpt:
      "Legacy content management systems often suffer from bloated plugins, fragile database dependencies, and sluggish page speed. Discover why high-growth brands are transitioning to modern Next.js TypeScript architectures.",
    coverImage: "/demo/luxestay.svg",
    coverImageAlt: "Modern web architecture diagram with Next.js and TypeScript",
    tags: "Next.js, Web Development, TypeScript, Performance, SEO",
    author: "Shilpee Srivastava",
    status: "PUBLISHED",
    isFeatured: true,
    seoTitle: "Why Modern Businesses Move to Next.js Full-Stack Architecture",
    seoDescription:
      "Explore the performance, security, and developer-experience advantages of migrating from legacy monolithic CMS to Next.js and TypeScript.",
    readingTime: 6,
    publishedAt: new Date("2026-10-15T10:00:00Z"),
    content: `## The Modern Web Performance Challenge

For over a decade, traditional monolithic CMS platforms dominated digital web publishing. While they made early page composition accessible to non-technical operators, they inevitably accumulated technical debt: dozens of third-party plugins, redundant database queries on every page hit, and brittle update cycles that frequently broke production interfaces.

In today's competitive landscape where **Core Web Vitals directly dictate Google organic ranking**, milliseconds matter. A one-second delay in page load time can reduce conversions by over 7%, while unoptimized server-side rendering frustrates mobile visitors.

### 1. Zero Bloat and Static Generation (SSG/ISR)

Next.js fundamentally transforms website delivery by compiling pages at build time into pure static HTML and optimized JavaScript bundles. When a customer visits your website:

- The page is served instantly from an edge CDN closest to the user's geographical location.
- Time-to-First-Byte (TTFB) drops under 50ms.
- There are no fragile database queries holding up the initial render.

\`\`\`typescript
// Example: Instant static generation with incremental revalidation
export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
\`\`\`

### 2. TypeScript Type Safety and Maintainability

In an agency environment, code reliability is paramount. By enforcing strict TypeScript interfaces across layouts, API routes, and components, developers eliminate entire classes of runtime errors before they ever reach staging or production.

### 3. Integrated Security and Zero Database Vulnerabilities

Monolithic CMS platforms represent the single largest target for automated web bots scanning for unpatched plugins and SQL injections. With Next.js:

- The public-facing front end is isolated from raw database credentials.
- Input validation is strictly enforced at API boundaries using schema validators like **Zod**.
- Sensitive environment variables remain securely encapsulated on the server.

### Conclusion

Migrating to Next.js is not merely a technical upgrade; it is an operational investment in your brand's digital speed, conversion rate, and long-term security. At **Shilpee Digital Studio**, we architect bespoke Next.js web applications engineered for measurable business impact.`,
  },
  {
    title: "How NLP and TF-IDF Power Automated Document Matching and Resume Intelligence",
    slug: "how-nlp-tfidf-power-automated-resume-intelligence",
    category: "Artificial Intelligence & Machine Learning",
    categorySlug: "artificial-intelligence-machine-learning",
    excerpt:
      "An in-depth technical walk-through of how text preprocessing, TF-IDF vectorization, and cosine similarity algorithms transform unstructured resumes into actionable candidate ranking models.",
    coverImage: "/demo/resume-intelligence.svg",
    coverImageAlt: "NLP document parsing and vector similarity flow diagram",
    tags: "NLP, Python, Machine Learning, TF-IDF, Cosine Similarity, Streamlit",
    author: "Shilpee Srivastava",
    status: "PUBLISHED",
    isFeatured: true,
    seoTitle: "How NLP & TF-IDF Power Resume Intelligence Systems | Shilpee Studio",
    seoDescription:
      "A technical guide to automated resume parsing, TF-IDF vectorization, and cosine similarity matching using Python and Scikit-learn.",
    readingTime: 7,
    publishedAt: new Date("2026-10-20T14:30:00Z"),
    content: `## The Problem with Manual Document Review

Recruiters and hiring managers spend an average of six seconds reviewing an individual resume. When an open position receives hundreds of applicants, manually reading through varying document formats, disparate fonts, and inconsistent phrasing becomes an overwhelming bottleneck.

Automating this process requires more than simple keyword search. An effective system must understand vocabulary frequency, down-weight ubiquitous English stop words, and calculate vector orientation in a multi-dimensional semantic space.

### The 4-Stage Document Intelligence Pipeline

Our open-source **AI Resume Intelligence Platform** implements a clean, 4-stage pipeline built entirely with Python, Scikit-learn, and Streamlit:

1. **PDF Text Extraction:** Reading binary stream data and normalizing unicode characters into raw plain text.
2. **Text Preprocessing & Cleaning:** Removing punctuation, digits, email addresses, and URLs using regular expressions, followed by lowercasing and stop-word filtering.
3. **TF-IDF Vector Space Representation:** Converting words into a mathematical matrix where unique, domain-specific terminology receives higher weight than common vocabulary.
4. **Cosine Similarity Computation:** Calculating the cosine of the angle between the resume vector and the target job description vector.

\`\`\`python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def calculate_match_score(resume_text: str, job_description: str) -> float:
    corpus = [resume_text, job_description]
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(corpus)
    similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
    return round(float(similarity[0][0]) * 100, 2)
\`\`\`

### Why Cosine Similarity Over Euclidean Distance?

In document comparison, raw length varies drastically. A senior engineer may submit a comprehensive three-page CV, while an equally qualified applicant submits a concise single-page resume.

Euclidean distance measures the physical distance between points, penalizing longer documents simply because they contain higher word counts. **Cosine similarity**, however, measures the cosine of the angle between two multi-dimensional vectors:

$$\\text{Cosine Similarity} = \\frac{\\mathbf{A} \\cdot \\mathbf{B}}{\\|\\mathbf{A}\\| \\|\\mathbf{B}\\|}$$

Because it normalizes by vector length, it accurately reflects semantic similarity regardless of document length.

### Interactive Prototyping with Streamlit

To make these analytical models immediately accessible to non-technical stakeholders, we wrap the algorithm in a lightweight **Streamlit** user interface, providing immediate drag-and-drop resume evaluation, skill-gap analysis, and keyword overlap visualization.`,
  },
  {
    title: "From Messy Spreadsheets to Power BI: A Practical Blueprint for SME Analytics",
    slug: "from-messy-spreadsheets-to-power-bi-practical-blueprint",
    category: "Data Analytics & Business Intelligence",
    categorySlug: "data-analytics-business-intelligence",
    excerpt:
      "Spreadsheets are great for entry, but dangerous for decision-making. Learn how to transform scattered Excel files into automated, reliable Power BI executive dashboards.",
    coverImage: "/demo/retailpulse.svg",
    coverImageAlt: "Power BI executive analytics dashboard mockup",
    tags: "Power BI, Data Analytics, Python, MySQL, Business Intelligence",
    author: "Shilpee Srivastava",
    status: "PUBLISHED",
    isFeatured: false,
    seoTitle: "From Spreadsheets to Power BI: SME Analytics Blueprint",
    seoDescription:
      "Learn how to modernize your business reporting by migrating manual Excel spreadsheets to automated Power BI dashboards.",
    readingTime: 5,
    publishedAt: new Date("2026-10-24T09:15:00Z"),
    content: `## The Spreadsheet Trap

Nearly every business starts on spreadsheets. They are flexible, intuitive, and universally accessible. However, as transaction volumes grow and multiple team members edit files, businesses inevitably face the "Spreadsheet Trap":

- Multiple versions of the truth ("Sales_Final_v2_updated.xlsx").
- Accidental formula deletions and silent calculation errors.
- Hours spent manually copy-pasting numbers each Monday morning.
- Zero real-time visibility into actual operating margins or inventory velocity.

### Step 1: Data Cleaning and Standardization

Before building dashboards, raw data must be structured. Using Python and **Pandas**, we automate repetitive cleaning tasks:

- Standardizing date and timestamp formats across disparate sources.
- Removing duplicate customer transactions.
- Filling or imputing missing categorical attributes.
- Normalizing currency values into a unified standard.

### Step 2: Relational Schema Design (Star Schema)

A robust reporting dashboard requires clean relational separation between:

- **Fact Tables:** Quantitative business events (e.g., individual sales orders, invoices, shipment events).
- **Dimension Tables:** Contextual attributes (e.g., customer profiles, product categories, store locations, calendar tables).

### Step 3: Interactive Power BI Visualizations

Once connected, Power BI empowers decision-makers with interactive filtering:

- Click a product category to instantly filter all revenue, regional demand, and return metrics.
- Track executive KPIs against historical monthly targets.
- Set automated daily data refresh schedules so reports are always accurate.

### Conclusion

Modern business intelligence does not require massive enterprise licensing or six-month consulting engagements. By structuring your existing data systematically, **Shilpee Digital Studio** delivers clear, decision-ready reporting in days, not quarters.`,
  },
  {
    title: "The Psychology of Motion: How Kinetic Typography and 3D Visuals Accelerate Conversion",
    slug: "psychology-of-motion-kinetic-typography-and-conversion",
    category: "Motion Graphics, Animation & VFX",
    categorySlug: "motion-graphics-animation-vfx",
    excerpt:
      "Static graphics are easily ignored in today's visual economy. Discover how purposeful motion graphics, kinetic typography, and 3D product assemblies capture attention and build brand trust.",
    coverImage: "/demo/aurabotanicals.svg",
    coverImageAlt: "Kinetic motion design and 3D visual demonstration",
    tags: "Motion Graphics, Animation, VFX, Video Marketing, 3D",
    author: "Shilpee Srivastava",
    status: "PUBLISHED",
    isFeatured: false,
    seoTitle: "The Psychology of Motion Graphics in Digital Marketing | Shilpee Studio",
    seoDescription:
      "Discover how kinetic typography, 3D product animations, and purposeful visual effects command attention and improve digital conversions.",
    readingTime: 5,
    publishedAt: new Date("2026-10-26T16:00:00Z"),
    content: `## The 3-Second Visual Battleground

On modern digital feeds, users scroll past an estimated 300 feet of content every day. In this hyper-accelerated visual environment, static imagery has lost much of its stopping power.

Motion graphics and animation trigger our brain's innate peripheral orientation reflex: **when something moves, we look**.

### Purposeful Motion vs. Visual Clutter

Not all animation is beneficial. Excessive, uncoordinated motion creates cognitive fatigue and drives visitors away. Purposeful motion design follows three core principles:

1. **Guiding Eye Direction:** A subtle kinetic text reveal guides the visitor's gaze directly toward your value proposition and primary call-to-action.
2. **Explaining Complex Architecture:** When demonstrating a physical hardware product or abstract SaaS platform, a 3D exploded assembly clarifies value ten times faster than paragraphs of technical copy.
3. **Establishing Brand Authority:** Smooth, 60 FPS keyframed transitions signal high production quality, subconsciously communicating reliability and attention to detail.

### Practical Motion Practices for Modern Brands

- **Logo Ident Stingers:** 3-second animated signatures that make your brand memorable at the start and end of every video asset.
- **Exploded 3D Product Tours:** Revealing internal engineering, premium materials, and tactile finishes.
- **High-Retention 9:16 Reels:** Vertical motion assets designed with kinetic hook pacing tailored for social algorithms.

Explore our dedicated [Motion Animation & VFX Practice](/motion-animation) to inspect real-time in-engine demonstrations and discover how we bring ideas to life through motion.`,
  },
  {
    title: "Technical SEO Checklist for 2026: Core Web Vitals, Structured Data, and Semantic Search",
    slug: "technical-seo-checklist-core-web-vitals-and-semantic-search",
    category: "Digital Marketing & SEO",
    categorySlug: "digital-marketing-seo",
    excerpt:
      "Search engines have evolved beyond basic keyword density. Here is your actionable technical checklist for optimizing Core Web Vitals, JSON-LD schemas, and semantic search authority.",
    coverImage: "/demo/fitflow.svg",
    coverImageAlt: "Technical SEO and Core Web Vitals analytics graph",
    tags: "SEO, Technical SEO, Core Web Vitals, Structured Data, Organic Growth",
    author: "Shilpee Srivastava",
    status: "PUBLISHED",
    isFeatured: false,
    seoTitle: "Technical SEO Checklist for 2026: Core Web Vitals & JSON-LD",
    seoDescription:
      "A comprehensive technical SEO guide covering Largest Contentful Paint, Cumulative Layout Shift, semantic HTML, and JSON-LD schema integration.",
    readingTime: 6,
    publishedAt: new Date("2026-10-28T11:00:00Z"),
    content: `## Search Engines are Technical Evaluators

Modern search algorithms no longer evaluate pages purely on backlink counts or keyword density. With Google's continuous refinement of **Helpful Content** criteria and the integration of AI-driven search overviews, search bots demand technical excellence, fast performance, and machine-readable data structures.

### 1. Master the Core Web Vitals

Your website must meet strict performance thresholds:

- **Largest Contentful Paint (LCP):** Must occur within **2.5 seconds** of when the page first starts loading. Optimize hero images with modern formats (AVIF/WebP) and avoid render-blocking fonts.
- **Interaction to Next Paint (INP):** Must remain under **200 milliseconds** to ensure fluid, lag-free user input response.
- **Cumulative Layout Shift (CLS):** Must measure less than **0.1** by setting explicit \`width\` and \`height\` attributes on all image and video containers.

### 2. Implement Semantic JSON-LD Structured Data

Search engines rely on Schema.org microdata to understand the contextual meaning of your content. Always include:

\`\`\`html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Technical SEO Checklist for 2026",
  "author": {
    "@type": "Person",
    "name": "Shilpee Srivastava"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Shilpee Digital Studio"
  }
}
</script>
\`\`\`

### 3. XML Sitemaps and Canonicalization

- Ensure every canonical URL is explicitly defined to prevent duplicate content penalties.
- Include only 200 OK, indexable, published URLs in your \`sitemap.xml\`.
- Exclude draft posts, internal admin panels, and query parameter variations from bot indexing.

At **Shilpee Digital Studio**, every website and blog post we deploy is baked with automated structured data, strict canonical tags, and lightweight mobile optimization.`,
  },
];

async function main() {
  console.log("🌱 Seeding initial blog articles...");

  for (const post of SAMPLE_POSTS) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
    console.log(`  ✓ Seeded: ${post.title}`);
  }

  console.log("✅ Blog articles seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
