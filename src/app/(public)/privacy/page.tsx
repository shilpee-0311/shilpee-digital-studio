import type { Metadata } from "next";
import { privacySections } from "@/content/legal";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Shilpee Digital Studio handles enquiry data submitted through this website.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="This policy describes enquiry data on this website. It will be updated when the contact form and admin inbox go live."
      />
      <Section>
        <Container className="max-w-3xl space-y-8">
          {privacySections.map((section) => (
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
