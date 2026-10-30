"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Github } from "@/components/ui/GithubIcon";
import { mainNav } from "@/content/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-900/95 text-white backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo light />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {mainNav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-white/10 text-white font-medium"
                    : "text-lavender-200 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          {site.github ? (
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-lavender-200 transition-all hover:border-purple-400 hover:bg-white/10 hover:text-white"
              aria-label="GitHub Profile (opens in new tab)"
              title="Explore My GitHub Profile (@shilpee-0311)"
            >
              <Github size={18} aria-hidden />
            </a>
          ) : null}
          <Button href="/contact" variant="primary">
            Get a quote
          </Button>
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </Container>
      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-white/10 bg-navy-900 lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-lavender-100 hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {site.github ? (
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-lg px-3 py-3 text-lavender-200 hover:bg-white/5 hover:text-white"
                onClick={() => setOpen(false)}
              >
                <Github size={18} aria-hidden />
                <span>GitHub Profile (@shilpee-0311)</span>
              </a>
            ) : null}
            <Button href="/contact" className="mt-2">
              Get a quote
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
