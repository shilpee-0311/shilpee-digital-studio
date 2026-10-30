import type { Metadata } from "next";
import { Download, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";

export const metadata: Metadata = {
  title: "Demo Projects & Concept Showcases",
  description:
    "Filterable showcase of original demonstration projects across web development, custom software, data analytics, graphic design, digital invitations, and social media.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work & Prototypes"
        title="Demonstration Projects & Concept Showcases"
        description="Every piece in this showcase is an original prototype built to illustrate architecture, code quality, responsive layouts, and design craftsmanship. Strictly labelled Demo Project or Concept Showcase — zero invented clients or metrics."
      />
      <Section className="bg-cream">
        <Container>
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-700">
              <ShieldCheck size={16} aria-hidden />
              <span>Verifiable Architecture Showcases</span>
            </div>
            <Button href="/portfolio/print" variant="secondary" className="gap-2">
              <Download size={14} aria-hidden />
              <span>Download / Print Portfolio PDF</span>
            </Button>
          </div>
          <PortfolioGrid />
        </Container>
      </Section>
    </>
  );
}
