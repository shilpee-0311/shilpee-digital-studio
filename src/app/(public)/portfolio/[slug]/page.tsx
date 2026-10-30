import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Github } from "@/components/ui/GithubIcon";
import Link from "next/link";
import { demoProjects, getDemoProject } from "@/content/demo-projects";
import { getService } from "@/content/services";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return demoProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getDemoProject(slug);
  if (!project) return { title: "Sample project" };
  return {
    title: `${project.title} (${project.badgeType})`,
    description: project.summary,
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getDemoProject(slug);
  if (!project) notFound();
  const service = getService(project.category);

  return (
    <>
      <PageHeader
        eyebrow={project.badgeType}
        title={project.title}
        description={project.summary}
      />
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <article className="space-y-8">
            <div className="flex items-center gap-3">
              <Badge tone="demo">{project.badgeType}</Badge>
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-700">
                {service?.title ?? project.category}
              </span>
            </div>

            <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-navy-900">
                Overview & Objective
              </h2>
              <p className="mt-4 text-base leading-7 text-muted">
                {project.fullDescription}
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-navy-900">
                Demonstrated Features & Architecture
              </h2>
              <ul className="mt-4 space-y-3">
                {project.features.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-navy-800">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-purple-600" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-navy-900">
                Sample Deliverables
              </h2>
              <ul className="mt-4 space-y-3">
                {project.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-navy-800">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-purple-600" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-600">
                Project Blueprint
              </p>
              <dl className="mt-4 divide-y divide-line/60 text-sm">
                <div className="py-2.5">
                  <dt className="text-xs text-muted">Label Status</dt>
                  <dd className="mt-1 font-semibold text-purple-700">{project.badgeType}</dd>
                </div>
                <div className="py-2.5">
                  <dt className="text-xs text-muted">Service Category</dt>
                  <dd className="mt-1 font-medium text-navy-900">
                    {service?.title ?? project.category}
                  </dd>
                </div>
                <div className="py-2.5">
                  <dt className="text-xs text-muted">Technologies & Stack</dt>
                  <dd className="mt-1 font-medium text-navy-900">{project.techStack}</dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-col gap-3">
                {/* Real GitHub Repository Button if URL exists */}
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-navy-800"
                  >
                    <Github size={16} aria-hidden />
                    <span>View Source Code</span>
                    <ExternalLink size={13} className="opacity-70" aria-hidden />
                  </a>
                ) : null}

                {/* Central GitHub Profile Link */}
                {site.github ? (
                  <a
                    href={site.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-line bg-cream px-4 py-2.5 text-xs font-medium text-navy-900 transition-all hover:border-purple-400 hover:text-purple-700"
                  >
                    <Github size={14} aria-hidden />
                    <span>Explore GitHub Profile (@shilpee-0311)</span>
                    <ExternalLink size={11} className="opacity-70" aria-hidden />
                  </a>
                ) : null}

                <Button href="/contact">
                  Discuss a Similar Project
                </Button>
                <Button href="/portfolio" variant="secondary">
                  <ArrowLeft size={14} aria-hidden />
                  <span>Back to All Showcase Items</span>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-cream p-5 text-xs text-muted leading-relaxed">
              <strong className="font-semibold text-navy-900">Integrity Note:</strong> This work sample is an original concept study or demo prototype designed and developed to demonstrate craftsmanship. It is not an actual client engagement.
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}
