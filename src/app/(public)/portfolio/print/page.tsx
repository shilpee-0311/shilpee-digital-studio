import type { Metadata } from "next";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { demoProjects } from "@/content/demo-projects";
import { services } from "@/content/services";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";
import { PrintButton } from "@/components/portfolio/PrintButton";

export const metadata: Metadata = {
  title: "Downloadable Portfolio Summary | Shilpee Digital Studio",
  description: `Printable sample portfolio for ${site.name}. All items are Demo Projects or Concept Showcases.`,
  robots: { index: false, follow: true },
};

export default function PortfolioPrintPage() {
  return (
    <Container className="py-12 print:max-w-none print:px-0 print:py-4">
      {/* Action Bar (Hidden in Print) */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-cream p-4 print:hidden">
        <Button href="/portfolio" variant="secondary" className="gap-2">
          <ArrowLeft size={14} aria-hidden />
          <span>Back to Portfolio</span>
        </Button>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted">Ready to export:</span>
          <PrintButton />
        </div>
      </div>

      {/* PDF Header */}
      <header className="border-b-2 border-navy-900 pb-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-baseline">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700">
              Studio Capability & Sample Dossier
            </p>
            <h1 className="font-display mt-2 text-3xl font-bold text-navy-950 sm:text-4xl">
              {site.name}
            </h1>
            <p className="mt-2 text-base font-medium text-navy-800">
              {site.tagline}
            </p>
          </div>
          <div className="text-right text-xs text-muted">
            <p><strong>GitHub:</strong> github.com/shilpee-0311</p>
            {site.email ? <p><strong>Email:</strong> {site.email}</p> : null}
            <p><strong>Date:</strong> 2026 Edition</p>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-purple-50 p-4 text-xs leading-relaxed text-purple-900">
          <strong>Transparency Notice:</strong> All work items documented in this dossier are original demonstration projects and concept showcases developed to verify technical architecture, responsive execution, and visual craft. No completed third-party client contracts are claimed.
        </div>
      </header>

      {/* Practice Areas */}
      <section className="mt-8 border-b border-line pb-8">
        <h2 className="font-display text-xl font-bold text-navy-900">
          Six Core Practice Areas
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.slug} className="rounded-xl border border-line p-3 text-xs">
              <p className="font-semibold text-navy-900">{service.title}</p>
              <p className="mt-1 text-muted">{service.summary}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Projects Catalog */}
      <section className="mt-8 space-y-8">
        <h2 className="font-display text-xl font-bold text-navy-900">
          Demonstration Projects & Architecture Specifications
        </h2>

        <div className="grid gap-6">
          {demoProjects.map((project, idx) => (
            <article
              key={project.slug}
              className="break-inside-avoid rounded-2xl border border-line p-6"
            >
              <div className="flex items-center justify-between gap-3 border-b border-line/60 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                  {project.badgeType} • {project.category.replace("-", " ")}
                </span>
                <span className="font-mono text-xs text-muted">0{idx + 1}</span>
              </div>

              <h3 className="font-display mt-3 text-xl font-semibold text-navy-900">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {project.fullDescription}
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 text-xs">
                <div>
                  <p className="font-semibold text-navy-900">Key Features:</p>
                  <ul className="mt-1.5 space-y-1 text-muted">
                    {project.features.map((f) => (
                      <li key={f}>• {f}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-navy-900">Sample Deliverables:</p>
                  <ul className="mt-1.5 space-y-1 text-muted">
                    {project.deliverables.map((d) => (
                      <li key={d}>• {d}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 border-t border-line/50 pt-3 text-xs text-navy-800">
                <strong>Demonstrated Tech Stack:</strong> {project.techStack}
              </div>
            </article>
          ))}
        </div>
      </section>
    </Container>
  );
}
