import type { Metadata } from "next";
import { HelpCircle, MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react";
import { faqs } from "@/content/faq";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Direct answers about studio services, custom quotations, portfolio demo labels, revisions, deliverables, and technical handoff.",
};

const additionalFaqs = [
  {
    question: "How do revisions and feedback cycles work?",
    answer:
      "All projects include structured revision cycles specified in the written scope (typically 2-3 feedback rounds). For design work, we finalize wireframes and visual moodboards before code implementation to minimize scope creep.",
  },
  {
    question: "Where can I inspect your coding practices and technical architectures?",
    answer:
      "You can visit our official public GitHub profile (@shilpee-0311) to inspect open repositories, code structure, TypeScript typing, and architectural discipline across web and data projects.",
  },
  {
    question: "What are your payment terms and milestones?",
    answer:
      "Standard projects operate on a milestone structure: 50% initial commitment upon scope approval, with the remaining 50% due upon staging review and prior to final production handoff. Monthly retainers are invoiced at the beginning of each billing cycle.",
  },
];

export default function FaqPage() {
  const allFaqs = [...faqs, ...additionalFaqs];

  return (
    <>
      <PageHeader
        eyebrow="Help & Clarifications"
        title="Frequently Asked Questions"
        description="Clear, honest answers regarding our process, quotation models, deliverables, and portfolio standards. If you have an inquiry not covered here, feel free to reach out directly."
      />

      <Section className="bg-cream">
        <Container className="max-w-4xl space-y-4">
          {allFaqs.map((item, index) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-line bg-white p-6 transition-all duration-200 open:border-purple-600/40 open:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg font-semibold text-navy-900 focus:outline-none">
                <span>{item.question}</span>
                <span className="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cream text-purple-700 transition-transform group-open:rotate-180">
                  ↓
                </span>
              </summary>
              <p className="mt-4 border-t border-line/40 pt-4 text-sm leading-7 text-muted">
                {item.answer}
              </p>
            </details>
          ))}
        </Container>
      </Section>

      {/* Still Have Questions CTA */}
      <Section className="bg-white">
        <Container className="text-center">
          <div className="mx-auto max-w-xl">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
              <MessageSquare size={24} aria-hidden />
            </div>
            <h2 className="font-display mt-4 text-2xl font-semibold text-navy-900">
              Still have a specific question about your project?
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Every project has its own nuances. We’re always happy to discuss scope feasibility, tech selection, and pricing options.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button href="/contact">Send an Inquiry</Button>
              <Button href="/services" variant="secondary">Browse All Services</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
