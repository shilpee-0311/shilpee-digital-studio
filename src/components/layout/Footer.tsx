import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Github } from "@/components/ui/GithubIcon";
import { footerNav, mainNav } from "@/content/navigation";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { site, whatsappHref } from "@/lib/site";

export function Footer() {
  const whatsapp = whatsappHref();

  return (
    <footer className="mt-auto bg-navy-950 text-lavender-200">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-md text-sm leading-6 text-lavender-100/90">{site.tagline}</p>
          <p className="mt-2 max-w-md text-xs leading-5 text-lavender-200/70">
            Freelance digital studio crafting production-ready web solutions, custom applications, data workflows, graphic assets, and social campaigns with transparent, honest scopes.
          </p>
          {site.github ? (
            <div className="mt-5">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white transition-all hover:border-purple-400 hover:bg-white/10"
              >
                <Github size={15} aria-hidden />
                <span>Follow on GitHub (@shilpee-0311)</span>
                <ExternalLink size={12} className="opacity-70" aria-hidden />
              </a>
            </div>
          ) : null}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
            Navigation
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link className="transition-colors hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
            Connect & Legal
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {site.email ? (
              <li>
                <a className="transition-colors hover:text-white" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </li>
            ) : (
              <li>
                <Link className="transition-colors hover:text-white" href="/contact">
                  Contact form
                </Link>
              </li>
            )}
            {site.phone ? (
              <li>
                <a className="transition-colors hover:text-white" href={`tel:${site.phone}`}>
                  {site.phone}
                </a>
              </li>
            ) : null}
            {whatsapp ? (
              <li>
                <a
                  className="transition-colors hover:text-white"
                  href={whatsapp}
                  rel="noreferrer"
                  target="_blank"
                >
                  WhatsApp Quick Chat
                </a>
              </li>
            ) : null}
            {site.github ? (
              <li>
                <a
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={14} aria-hidden />
                  <span>GitHub Repositories</span>
                </a>
              </li>
            ) : null}
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link className="transition-colors hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-xs text-lavender-200/80 sm:flex-row sm:justify-between">
          <p>
            © 2026 {site.name}. All rights reserved.
          </p>
          <p>Portfolio samples are labelled Demo Project or Concept Showcase.</p>
        </Container>
      </div>
    </footer>
  );
}
