import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Globe,
  Code2,
  Database,
  Palette,
  Mail,
  Share2,
  Film,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Brain,
  BarChart3,
  FlaskConical,
} from "lucide-react";
import { Github } from "@/components/ui/GithubIcon";
import { getService, services } from "@/content/services";
import { demoProjects } from "@/content/demo-projects";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

type Params = { slug: string };

const serviceIcons: Record<string, typeof Globe> = {
  "website-development": Globe,
  "software-apps": Code2,
  "data-analytics": Database,
  "graphic-design": Palette,
  "digital-invitations": Mail,
  "social-media": Share2,
  "motion-animation": Film,
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service" };
  return {
    title: `${service.title} | Shilpee Digital Studio`,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = serviceIcons[service.slug] || Globe;
  const relatedDemos = demoProjects.filter((item) => item.category === service.slug);

  return (
    <>
      <PageHeader
        eyebrow="Service Practice"
        title={service.title}
        description={service.summary}
      />
      <Section className="bg-cream">
        <Container className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-8">
            {/* Motion Animation banner */}
            {service.slug === "motion-animation" ? (
              <div className="rounded-2xl border border-purple-500/40 bg-navy-900 p-6 text-white shadow-xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/20 px-3 py-1 text-xs font-semibold text-lavender-200">
                  <Sparkles size={13} className="text-purple-300" aria-hidden />
                  <span>Dedicated Studio Experience</span>
                </div>
                <h3 className="font-display mt-3 text-xl font-semibold">
                  Explore the Dedicated Motion Animation & VFX Showcase
                </h3>
                <p className="mt-2 text-sm leading-6 text-lavender-200">
                  Visit our dedicated motion studio page featuring 10 service categories, interactive VFX demonstrations, and concept carousels.
                </p>
                <div className="mt-4">
                  <Button href="/motion-animation" variant="primary">
                    Open Motion Animation Studio <ArrowRight size={14} aria-hidden />
                  </Button>
                </div>
              </div>
            ) : null}

            {/* Data Analytics: Production vs Experimental Capabilities distinction */}
            {service.slug === "data-analytics" ? (
              <div className="rounded-2xl border border-purple-600/30 bg-white p-6 sm:p-8 shadow-sm">
                <div className="inline-flex items-center gap-2 rounded-full border border-purple-600/20 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
                  <BarChart3 size={14} aria-hidden />
                  <span>Practice Classification & Delivery Model</span>
                </div>
                <h3 className="font-display mt-3 text-xl font-semibold text-navy-900">
                  Available Services vs. Experimental Prototypes
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  To ensure complete transparency and realistic deliverables, we clearly distinguish established production services from experimental and exploratory capabilities.
                </p>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {/* Column 1: Available Production Services */}
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-50/40 p-5">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
                      <CheckCircle2 size={16} className="text-emerald-600" />
                      <span>Available Production Services</span>
                    </div>
                    <ul className="mt-3 space-y-2 text-xs leading-5 text-navy-800">
                      <li>
                        <strong>• Business Data Analysis:</strong> Exploratory data analysis (EDA), sales trends, and operational reporting.
                      </li>
                      <li>
                        <strong>• Data Cleaning & Transformation:</strong> Automated Python (Pandas/NumPy) scripts for deduplication, normalization, and Excel formatting.
                      </li>
                      <li>
                        <strong>• Power BI Reporting Dashboards:</strong> Interactive KPI tracking cards, multi-dimensional filters, and management views.
                      </li>
                      <li>
                        <strong>• SQL-Based Data Analysis:</strong> Relational MySQL schema creation, indexing, structured queries, and data extraction.
                      </li>
                    </ul>
                  </div>

                  {/* Column 2: Experimental & Learning Prototypes */}
                  <div className="rounded-xl border border-purple-500/30 bg-purple-50/40 p-5">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-800">
                      <FlaskConical size={16} className="text-purple-600" />
                      <span>Experimental & Learning Prototypes</span>
                    </div>
                    <ul className="mt-3 space-y-2 text-xs leading-5 text-navy-800">
                      <li>
                        <strong>• Predictive Modelling Prototypes:</strong> Scikit-learn regression and classification baseline models for preliminary forecasting and feature evaluation.
                      </li>
                      <li>
                        <strong>• NLP-Based Text Applications:</strong> PDF text extraction, TF-IDF vectorization, and cosine similarity matching algorithms.
                      </li>
                      <li>
                        <strong>• Streamlit Rapid Prototyping:</strong> Interactive web demonstrations developed to test analytical concepts before enterprise integration.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
                <Icon size={24} aria-hidden />
              </div>
              <h2 className="font-display mt-4 text-2xl font-semibold text-navy-900">
                Approach & Methodology
              </h2>
              <p className="mt-4 text-base leading-7 text-muted">
                {service.description}
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-navy-900">
                Core Offerings & Capabilities
              </h2>
              <ul className="mt-6 space-y-3">
                {service.offerings.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-navy-800">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-purple-600" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Demo & Personal Project Showcases if available */}
            {relatedDemos.length > 0 ? (
              <div className="space-y-4">
                <h2 className="font-display text-xl font-semibold text-navy-900">
                  Demonstrated Projects & Technical Studies
                </h2>
                {relatedDemos.map((demo) => (
                  <div key={demo.slug} className="rounded-2xl border border-purple-600/20 bg-purple-50/50 p-6 sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <Badge tone="demo">{demo.badgeType}</Badge>
                      <span className="text-xs font-semibold text-purple-700">
                        {demo.techStack}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-navy-900">
                      {demo.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {demo.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      <Link
                        href={`/portfolio/${demo.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-purple-700 hover:text-purple-800"
                      >
                        Inspect Architecture Blueprint <ArrowRight size={13} aria-hidden />
                      </Link>
                      {demo.githubUrl ? (
                        <a
                          href={demo.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900 hover:text-purple-700"
                        >
                          <Github size={13} aria-hidden />
                          <span>View on GitHub</span>
                          <ExternalLink size={11} className="opacity-70" aria-hidden />
                        </a>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl bg-navy-900 p-6 text-lavender-100 shadow-md">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
                <Sparkles size={14} aria-hidden />
                <span>What You Can Expect</span>
              </div>
              <ul className="mt-5 space-y-3.5 text-sm leading-6 text-lavender-200">
                {service.outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3">
                <Button href={`/contact?service=${service.slug}`}>
                  Request a Quotation
                </Button>
                <Button href="/pricing" variant="ghost">
                  Review Pricing Guide
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-white p-5 text-sm">
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 font-medium text-navy-900 hover:text-purple-700"
              >
                <ArrowLeft size={14} aria-hidden />
                <span>Explore Other Services</span>
              </Link>
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}
