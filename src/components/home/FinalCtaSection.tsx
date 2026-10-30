"use client";

import Link from "next/link";
import { Sparkles, MessageSquare, ArrowRight, ShieldCheck, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { site, whatsappHref } from "@/lib/site";

export function FinalCtaSection() {
  const whatsapp = whatsappHref();

  return (
    <section className="relative overflow-hidden bg-[#070B16] py-24 sm:py-32 text-white border-t border-white/5">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.22),transparent_70%)]"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="mx-auto max-w-4xl rounded-3xl border border-purple-500/30 bg-navy-900/60 p-8 sm:p-16 text-center shadow-[0_20px_60px_rgba(7,11,22,0.9)] backdrop-blur-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-lavender-200">
            <Sparkles size={14} className="text-purple-400" aria-hidden />
            <span>Ready to Collaborate</span>
          </div>

          <h2 className="font-display mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl sm:leading-[1.15]">
            Have an Idea?{" "}
            <span className="bg-gradient-to-r from-purple-400 via-lavender-200 to-white bg-clip-text text-transparent">
              Let&apos;s Build Something Powerful.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-lavender-200/80 sm:text-lg">
            Tell us what you want to create. Let&apos;s turn your requirements into a practical digital solution with clear scopes, modern technology, and direct founder collaboration.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_35px_rgba(124,58,237,0.4)] hover:bg-purple-500 hover:shadow-[0_15px_45px_rgba(124,58,237,0.6)] transition-all"
            >
              <span>Start Your Project</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white hover:border-purple-400 hover:bg-white/10 transition-all"
            >
              <span>Contact Us</span>
            </Link>

            {whatsapp ? (
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600/90 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-950/40 hover:bg-emerald-500 transition-all"
              >
                <MessageSquare size={16} />
                <span>WhatsApp Quick Chat</span>
              </a>
            ) : null}
          </div>

          <div className="mt-10 flex items-center justify-center gap-2 text-xs text-lavender-200/60 font-mono">
            <ShieldCheck size={14} className="text-purple-400" />
            <span>Prompt 24-business-hour response time • Confidential &amp; NDA protected</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
