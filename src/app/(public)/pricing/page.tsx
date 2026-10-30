import type { Metadata } from "next";
import { CheckCircle2, HelpCircle, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { customQuotationNotes, socialMediaPackages } from "@/content/pricing";
import { services } from "@/content/services";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing & Quotation Framework",
  description:
    "Transparent pricing framework, Social Media Management starting packages, and custom quotation options for websites, software, analytics, design, and invitations.",
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing & Engagement"
        title="Predictable Packages & Custom Project Quotations"
        description="Clear milestones, honest deliverables, and zero hidden fees. Social retainers feature structured starting tiers; web, software, data, design, and invitation projects are quoted following a short discovery brief."
      />

      {/* Social Media Starting Packages */}
      <Section className="bg-cream">
        <Container>
          <div className="mb-10 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-600">
              Retainer Model
            </span>
            <h2 className="font-display mt-2 text-3xl font-semibold text-navy-900 sm:text-4xl">
              Social Media Management Packages
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Designed for consistent monthly brand presence. Starting rates cover planned editorial rhythms, high-definition creatives, and performance reporting.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {socialMediaPackages.map((item, index) => {
              const isPopular = item.id === "growth";
              return (
                <Card
                  key={item.id}
                  className={`flex flex-col justify-between transition-all ${
                    isPopular
                      ? "border-purple-600 shadow-xl shadow-purple-900/10 ring-2 ring-purple-600/30"
                      : "hover:-translate-y-1 hover:border-purple-500/30"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-purple-700">
                        {item.cadence} Retainer
                      </span>
                      {isPopular ? (
                        <span className="rounded-full bg-purple-600 px-3 py-0.5 text-xs font-medium text-white">
                          Recommended
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-3 text-2xl font-semibold text-navy-900">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{item.bestFor}</p>

                    <div className="mt-6 border-t border-line/50 pt-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-navy-900">
                        What’s Included:
                      </p>
                      <ul className="mt-3 space-y-2.5 text-sm text-navy-800">
                        {item.includes.map((line) => (
                          <li key={line} className="flex items-start gap-2.5">
                            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-purple-600" aria-hidden />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 border-t border-line/60 pt-5">
                    <p className="text-xs leading-5 text-muted">{item.note}</p>
                    <div className="mt-4">
                      <Button
                        href={`/contact?service=social-media&tier=${encodeURIComponent(item.name)}`}
                        variant={isPopular ? "primary" : "secondary"}
                        className="w-full justify-center"
                      >
                        Enquire for this Package
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Custom Quotation Guide for All Other Services */}
      <Section className="bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            <div className="space-y-6 lg:col-span-7">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-600">
                Tailored Estimates
              </span>
              <h2 className="font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
                Custom Quotations for Development, Data & Design
              </h2>
              <p className="text-base leading-7 text-muted">
                Because every web application, data pipeline, and branding project has unique functional requirements, we do not believe in one-size-fits-all pricing. We scope each project individually to match your timeline, technical stack, and complexity.
              </p>

              <div className="rounded-2xl border border-line bg-cream p-6">
                <h3 className="font-display text-lg font-semibold text-navy-900">
                  Services Quoted Upon Briefing:
                </h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 text-sm">
                  {services.filter(s => s.slug !== "social-media").map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="group flex items-center justify-between rounded-xl border border-line bg-white px-3.5 py-2.5 text-navy-900 transition-colors hover:border-purple-500 hover:text-purple-700"
                    >
                      <span>{s.title}</span>
                      <ArrowRight size={13} className="text-muted group-hover:text-purple-700" aria-hidden />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-display text-lg font-semibold text-navy-900">
                  Quotation Principles:
                </h3>
                <ul className="space-y-2.5 text-sm text-navy-800">
                  {customQuotationNotes.map((note) => (
                    <li key={note} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-purple-600" aria-hidden />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-3xl border border-line bg-cream p-8 shadow-sm lg:col-span-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-600/20 bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-800">
                <ShieldCheck size={14} aria-hidden />
                <span>Our Quotation Guarantee</span>
              </div>
              <h3 className="font-display mt-4 text-2xl font-semibold text-navy-900">
                Request a Free Project Scope
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                Send us a short summary of your requirements. We’ll review technical feasibility, suggest optimal architectures, and respond with a written estimate within 24 to 48 hours.
              </p>

              <div className="mt-8 space-y-4">
                <Button href="/contact" className="w-full justify-center">
                  Submit Project Brief
                </Button>
                <p className="text-center text-xs text-muted">
                  No commitment required. Honest consultation.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
