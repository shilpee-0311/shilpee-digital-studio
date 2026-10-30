import type { Metadata } from "next";
import { Mail, Phone, MessageSquare, ExternalLink, ShieldCheck, Clock } from "lucide-react";
import { Github } from "@/components/ui/GithubIcon";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Project Inquiries",
  description:
    "Request a detailed quotation or schedule a consultation for websites, software, data analytics, graphic design, digital invitations, or social media.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: Promise<{ service?: string; tier?: string }>;
}) {
  const whatsapp = whatsappHref();
  const params = await searchParams;
  const initialService = params?.service || "website-development";
  const initialMessage = params?.tier
    ? `I would like to inquire about the ${params.tier} package.`
    : "";

  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        title="Start Your Project With Shilpee Digital Studio"
        description="Whether you have an established specification or an initial concept, let’s discuss deliverables, timeline, and budget. Every inquiry receives a structured, written response within 24 to 48 hours."
      />

      <Section className="bg-cream">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Public Contact Form */}
          <div className="rounded-3xl border border-line bg-white p-8 shadow-sm lg:col-span-7 sm:p-10">
            <h2 className="font-display text-2xl font-semibold text-navy-900">
              Project Enquiry Form
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Complete the details below to describe your requirements. Your brief will be reviewed by our lead developer and designer.
            </p>
            <div className="mt-8">
              <EnquiryForm
                initialService={initialService}
                initialMessage={initialMessage}
              />
            </div>
          </div>

          {/* Contact Details & Direct Connect */}
          <aside className="space-y-6 lg:col-span-5">
            <div className="rounded-3xl bg-navy-900 p-8 text-lavender-100 shadow-xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                Direct Communication
              </span>
              <h3 className="font-display mt-2 text-2xl font-semibold text-white">
                Studio Contact Details
              </h3>
              <p className="mt-3 text-sm leading-6 text-lavender-200">
                Prefer direct communication? Reach out through any of our official channels:
              </p>

              <div className="mt-6 space-y-4 text-sm">
                {site.email ? (
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-purple-400">
                      <Mail size={16} aria-hidden />
                    </div>
                    <div>
                      <p className="text-xs text-lavender-200/70">Email Address</p>
                      <a href={`mailto:${site.email}`} className="font-medium text-white hover:text-purple-300">
                        {site.email}
                      </a>
                    </div>
                  </div>
                ) : null}

                {site.phone ? (
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-purple-400">
                      <Phone size={16} aria-hidden />
                    </div>
                    <div>
                      <p className="text-xs text-lavender-200/70">Telephone</p>
                      <a href={`tel:${site.phone}`} className="font-medium text-white hover:text-purple-300">
                        {site.phone}
                      </a>
                    </div>
                  </div>
                ) : null}

                {whatsapp ? (
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-purple-400">
                      <MessageSquare size={16} aria-hidden />
                    </div>
                    <div>
                      <p className="text-xs text-lavender-200/70">WhatsApp Direct</p>
                      <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="font-medium text-white hover:text-purple-300">
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>
                ) : null}

                {site.github ? (
                  <div className="flex items-center gap-3 pt-2">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-purple-600/30 text-purple-300">
                      <Github size={16} aria-hidden />
                    </div>
                    <div>
                      <p className="text-xs text-lavender-200/70">Official GitHub Profile</p>
                      <a
                        href={site.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-white hover:text-purple-300"
                      >
                        <span>@shilpee-0311</span>
                        <ExternalLink size={12} className="opacity-70" aria-hidden />
                      </a>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <div className="flex items-center gap-2 text-xs text-lavender-200/80">
                  <Clock size={14} className="text-purple-400" aria-hidden />
                  <span>Typical response time: Within 24-48 hours</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-700">
                <ShieldCheck size={16} aria-hidden />
                <span>Our Privacy Promise</span>
              </div>
              <p className="mt-3 text-xs leading-5 text-muted">
                Your contact details and project briefs are kept strictly confidential. We never share client contact data or project ideas with third parties.
              </p>
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}
