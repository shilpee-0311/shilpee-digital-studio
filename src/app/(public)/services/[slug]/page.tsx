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
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { getService, services } from "@/content/services";
import { demoProjects } from "@/content/demo-projects";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

type Params = { slug: string };

const serviceIcons: Record<string, typeof Globe> = {
  "website-development": Globe,
  "software-apps": Code2,
  "data-analytics": Database,
  "graphic-design": Palette,
  "digital-invitations": Mail,
  "social-media": Share2,
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
  const relatedDemo = demoProjects.find((item) => item.category === service.slug);

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

            {/* Related Demo Project Showcase if available */}
            {relatedDemo ? (
              <div className="rounded-2xl border border-purple-600/20 bg-purple-50/50 p-6 sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <Badge tone="demo">{relatedDemo.badgeType}</Badge>
                  <span className="text-xs font-semibold text-purple-700">Relevant Demonstration</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-navy-900">
                  {relatedDemo.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {relatedDemo.summary}
                </p>
                <div className="mt-4">
                  <Link
                    href={`/portfolio/${relatedDemo.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-purple-700 hover:text-purple-800"
                  >
                    Inspect Demo Architecture <ArrowRight size={13} aria-hidden />
                  </Link>
                </div>
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
                <Button href="/contact">
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
