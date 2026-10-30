import type { Metadata } from "next";
import { termsSections } from "@/content/legal";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms for using the Shilpee Digital Studio website.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Use"
        description="These terms apply to this public website. Project work is governed by a written quotation."
      />
      <Section>
        <Container className="max-w-3xl space-y-8">
          {termsSections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-semibold text-navy-900">
                {section.title}
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted">{section.body}</p>
            </section>
          ))}
        </Container>
      </Section>
    </>
  );
}
