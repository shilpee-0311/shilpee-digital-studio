"use client";

import { Sparkles, MessageSquare, Mail, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { site, whatsappHref } from "@/lib/site";

export function MotionEnquirySection() {
  const whatsapp = whatsappHref();

  return (
    <section id="motion-enquiry" className="relative scroll-mt-20 bg-[#070B16] py-24 sm:py-32 text-white border-t border-white/5">
      {/* Background radial lights */}
      <div
        className="pointer-events-none absolute left-1/2 top-10 h-[500px] w-full max-w-4xl -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.18),transparent_70%)]"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Value Proposition & Direct Contact */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-lavender-200 backdrop-blur-md">
              <Sparkles size={14} className="text-purple-400" aria-hidden />
              <span>Initiate Your Motion Project</span>
            </div>

            <h2 className="font-display mt-5 text-3xl font-bold tracking-tight sm:text-5xl sm:leading-[1.15]">
              Have a Creative Idea?{" "}
              <span className="bg-gradient-to-r from-purple-400 via-lavender-200 to-white bg-clip-text text-transparent">
                Let&apos;s Animate It.
              </span>
            </h2>

            <p className="mt-4 text-base leading-7 text-lavender-200/80">
              Bring your brand to life with dynamic motion design, visual effects, and compelling animation. Whether you need an unforgettable logo stinger, a full 3D product showcase, or high-converting social motion creatives, we deliver cinema-grade craftsmanship.
            </p>

            {/* Studio Commitments */}
            <div className="mt-8 space-y-3.5">
              {[
                "Complimentary creative consultation & pacing breakdown",
                "Strict NDA & intellectual property protection",
                "Full commercial usage rights on all masters",
                "Guaranteed 24-business-hour response time",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-purple-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-lavender-200/90">{item}</span>
                </div>
              ))}
            </div>

            {/* Direct Channels */}
            <div className="mt-10 pt-8 border-t border-white/10 space-y-4">
              <p className="text-xs font-mono uppercase tracking-widest text-lavender-200/60">
                Direct Communication Channels
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                {whatsapp ? (
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs font-semibold text-white shadow-lg shadow-emerald-950/40 hover:bg-emerald-500 transition-colors"
                  >
                    <MessageSquare size={16} />
                    <span>Chat on WhatsApp</span>
                  </a>
                ) : null}

                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-xs font-semibold text-white hover:border-purple-400 hover:bg-white/10 transition-colors"
                >
                  <Mail size={16} />
                  <span>{site.email}</span>
                </a>
              </div>
            </div>

            {/* Privacy Assurance */}
            <div className="mt-8 flex items-center gap-2 text-xs text-lavender-200/60">
              <ShieldCheck size={16} className="text-purple-400" />
              <span>100% confidential. Your details and creative concepts are never shared.</span>
            </div>
          </div>

          {/* Right Column: Preselected Motion Animation Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/15 bg-navy-900/60 p-6 sm:p-10 shadow-[0_20px_60px_rgba(7,11,22,0.9)] backdrop-blur-xl">
              <div className="mb-6 pb-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Submit Motion Brief
                  </h3>
                  <p className="text-xs text-lavender-200/70 mt-1">
                    Directly sent to our Motion &amp; VFX creative leads
                  </p>
                </div>
                <span className="rounded-full border border-purple-500/30 bg-purple-950/60 px-3 py-1 text-[11px] font-mono text-purple-300">
                  Motion Preselected
                </span>
              </div>

              {/* Integrated Existing Enquiry Form with initialService="motion-animation" */}
              <EnquiryForm initialService="motion-animation" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
