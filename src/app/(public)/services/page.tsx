import type { Metadata } from "next";
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
  CheckCircle2,
} from "lucide-react";
import { services } from "@/content/services";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Services & Capabilities",
  description:
    "Explore our seven digital service practices: Website Development, Software Applications, Data Analytics, Motion Animation & VFX, Graphic Design, Digital Invitations, and Social Media Management.",
};

const serviceIcons: Record<string, typeof Globe> = {
  "website-development": Globe,
  "software-apps": Code2,
  "data-analytics": Database,
  "graphic-design": Palette,
  "digital-invitations": Mail,
  "social-media": Share2,
  "motion-animation": Film,
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services & Practices"
        title="Engineering & Creative Solutions Built for Purpose"
        description="Seven dedicated practice areas crafted for clarity, scalability, and impact. Every project is scoped with written milestones, transparent pricing, and zero inflated promises."
      />

      <Section className="bg-cream">
        <Container className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = serviceIcons[service.slug] || Globe;
            const targetHref = service.customHref || `/services/${service.slug}`;
            return (
              <Link key={service.slug} href={targetHref}>
                <Card className="flex h-full flex-col justify-between transition-all hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-lg">
                  <div>
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
                      <Icon size={24} aria-hidden />
                    </div>
                    <h2 className="mt-5 text-xl font-semibold text-navy-900">
                      {service.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-muted">
                      {service.summary}
                    </p>

                    <div className="mt-6 space-y-2 border-t border-line/50 pt-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-purple-700">
                        Typical Deliverables:
                      </p>
                      <ul className="space-y-1.5 text-xs text-navy-800">
                        {service.offerings.slice(0, 3).map((item) => (
                          <li key={item} className="flex items-center gap-2">
                            <CheckCircle2 size={13} className="shrink-0 text-purple-600" aria-hidden />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-line/60 pt-4">
                    <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-purple-700">
                      Read Full Details <ArrowRight size={13} aria-hidden />
                    </p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </Container>
      </Section>

      {/* Cross-Service Collaboration CTA */}
      <Section className="bg-white">
        <Container className="text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-semibold text-navy-900">
              Need a multi-service digital solution?
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Many clients combine website development with motion graphics and monthly social media management, or pair software tools with automated data analytics. Custom bundled scopes are available with unified milestone billing.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/contact">Request Custom Quotation</Button>
              <Button href="/pricing" variant="secondary">View Pricing Framework</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
