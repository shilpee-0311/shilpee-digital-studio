import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Database,
  Globe,
  Palette,
  Mail,
  Share2,
  CalendarCheck,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  PhoneCall,
} from "lucide-react";
import { Github } from "@/components/ui/GithubIcon";
import { services } from "@/content/services";
import { demoProjects } from "@/content/demo-projects";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { site, whatsappHref } from "@/lib/site";

const serviceIcons: Record<string, typeof Globe> = {
  "website-development": Globe,
  "software-apps": Code2,
  "data-analytics": Database,
  "graphic-design": Palette,
  "digital-invitations": Mail,
  "social-media": Share2,
};

export default function HomePage() {
  const whatsapp = whatsappHref();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-purple-600/25 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 left-10 h-80 w-80 rounded-full bg-lavender-200/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(#7c3aed_1px,transparent_1px)] [background-size:24px_24px] opacity-10"
          aria-hidden="true"
        />

        <Container className="relative py-20 sm:py-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-lavender-200 backdrop-blur">
            <Sparkles size={14} className="text-purple-400" aria-hidden />
            <span>Freelance Digital Solutions Practice</span>
          </div>

          <h1 className="font-display mt-6 max-w-4xl text-4xl font-semibold leading-[1.15] tracking-tight sm:text-6xl sm:leading-[1.12]">
            Turning Ideas into{" "}
            <span className="bg-gradient-to-r from-purple-400 via-lavender-200 to-white bg-clip-text text-transparent">
              Powerful Digital Experiences.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-lavender-200 sm:text-lg">
            <strong>{site.name}</strong> designs and builds modern websites, bespoke web applications, data analytics workflows, visual branding, digital invitations, and social media campaigns — with written scopes and zero inflated claims.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="/contact">Start a Project</Button>
            <Button href="/portfolio" variant="ghost">
              Explore Demo Work
            </Button>
            {site.github ? (
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:border-purple-400 hover:bg-white/10"
                title="View GitHub Profile (@shilpee-0311)"
              >
                <Github size={17} aria-hidden />
                <span>GitHub Profile</span>
                <ExternalLink size={13} className="opacity-70" aria-hidden />
              </a>
            ) : null}
          </div>

          {/* Tech Stack Pills Bar */}
          <div className="mt-14 border-t border-white/10 pt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-lavender-200/70">
              Core Technologies & Tooling
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-lavender-100">
              {[
                "Next.js 15",
                "TypeScript",
                "React 19",
                "Tailwind CSS",
                "Python (Pandas, NumPy)",
                "MySQL & SQLite",
                "Power BI",
                "Canva Pro",
              ].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Six Services Section */}
      <Section className="bg-cream">
        <Container>
          <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-600">
                Studio Capabilities
              </p>
              <h2 className="font-display mt-2 text-3xl font-semibold text-navy-900 sm:text-4xl">
                Six Core Practices, One Unified Studio
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
                From frontend customer experiences to backend databases and branded social kits, every service is tailored to deliver measurable value.
              </p>
            </div>
            <Button href="/services" variant="secondary">
              All 6 Services
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = serviceIcons[service.slug] || Globe;
              return (
                <Link key={service.slug} href={`/services/${service.slug}`}>
                  <Card className="flex h-full flex-col justify-between transition-all hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-md">
                    <div>
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                        <Icon size={22} aria-hidden />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-navy-900">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {service.summary}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-line/50 pt-4">
                      <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-purple-700">
                        Explore Offerings & Outcomes <ArrowRight size={13} aria-hidden />
                      </p>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Portfolio Demo Showcase Preview */}
      <Section className="bg-white">
        <Container>
          <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-600/20 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
                <CheckCircle2 size={13} aria-hidden />
                <span>Strict Integrity & Transparency Policy</span>
              </div>
              <h2 className="font-display mt-3 text-3xl font-semibold text-navy-900 sm:text-4xl">
                Demo Projects & Concept Showcases
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
                Every project displayed below is an original demonstration prototype or concept study built to verify technical execution and design craft. We do not invent completed client engagements or fake metrics.
              </p>
            </div>
            <Button href="/portfolio" variant="secondary">
              Browse Full Showcase (6)
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {demoProjects.slice(0, 4).map((project) => (
              <Link key={project.slug} href={`/portfolio/${project.slug}`}>
                <Card className="flex h-full flex-col justify-between transition-all hover:-translate-y-1 hover:border-purple-500/30">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <Badge tone="demo">{project.badgeType}</Badge>
                      <span className="text-xs font-medium text-muted capitalize">
                        {project.category.replace("-", " ")}
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-navy-900">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {project.summary}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-line/50 pt-4">
                    <p className="text-xs font-medium text-purple-700">
                      Stack: {project.techStack}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Structured Delivery Process */}
      <Section className="bg-cream">
        <Container>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-600">
              Methodology
            </p>
            <h2 className="font-display mt-2 text-3xl font-semibold text-navy-900 sm:text-4xl">
              How We Work: Transparent & Predictable
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted">
              Every project follows an honest, documented 4-step delivery pipeline with regular communication and no surprises.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Discovery & Written Scope",
                desc: "We discuss your exact requirements, define deliverables, agree on timeline milestones, and provide a binding written quotation.",
              },
              {
                step: "02",
                title: "Architecture & Design",
                desc: "We plan structure, UI wireframes, and design themes for your review and approval before writing production code.",
              },
              {
                step: "03",
                title: "Agile Build & Testing",
                desc: "Development proceeds with clean, responsive code, mobile accessibility checks, and continuous quality assurance.",
              },
              {
                step: "04",
                title: "Handover & Documentation",
                desc: "Full code and asset ownership transferred with deployment assistance, user guides, and clear maintenance instructions.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative rounded-2xl border border-line bg-white p-6 shadow-sm"
              >
                <span className="text-3xl font-bold text-purple-600/30 font-display">
                  {item.step}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact & Social Links Section with GitHub Button */}
      <Section className="relative overflow-hidden bg-navy-950 text-white">
        <div
          className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative">
          <div className="grid gap-10 rounded-3xl border border-white/10 bg-navy-900/90 p-8 sm:p-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-lavender-200">
                <CalendarCheck size={14} className="text-purple-400" aria-hidden />
                <span>Open for Client Inquiries & Collaborations</span>
              </span>
              <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Ready to turn your idea into a digital reality?
              </h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-lavender-200">
                Get in touch for a straightforward discussion about your website, custom application, data requirements, or branding needs.
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:col-span-4">
              <Button href="/contact" className="w-full justify-center">
                Request a Project Quote
              </Button>

              {whatsapp ? (
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
                >
                  <PhoneCall size={16} aria-hidden />
                  <span>Chat on WhatsApp</span>
                </a>
              ) : null}

              {site.github ? (
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-purple-500/40 bg-purple-600/15 py-2.5 text-sm font-semibold text-lavender-100 transition-all hover:border-purple-400 hover:bg-purple-600/30 hover:text-white"
                >
                  <Github size={16} aria-hidden />
                  <span>Explore GitHub Code (@shilpee-0311)</span>
                  <ExternalLink size={13} className="opacity-70" aria-hidden />
                </a>
              ) : null}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
