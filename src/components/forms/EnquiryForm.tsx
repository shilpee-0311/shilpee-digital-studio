"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";
import { services } from "@/content/services";
import { Button } from "@/components/ui/Button";

interface EnquiryFormProps {
  initialService?: string;
  initialMessage?: string;
}

export function EnquiryForm({
  initialService = "website-development",
  initialMessage = "",
}: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: initialService,
    budgetRange: "₹25k - ₹50k",
    timeline: "1-month",
    message: initialMessage,
    website_url_check: "", // Honeypot
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setGeneralError(null);
    setFieldErrors({});

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccessMessage(result.message);
        setFormData({
          name: "",
          email: "",
          phone: "",
          serviceType: initialService,
          budgetRange: "₹25k - ₹50k",
          timeline: "1-month",
          message: "",
          website_url_check: "",
        });
      } else {
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }
        setGeneralError(result.error || "Please check your inputs and try again.");
      }
    } catch {
      setGeneralError(
        "Network connection error. Please verify your connection or email contact@shilpeedigitalstudio.com directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (successMessage) {
    return (
      <div className="rounded-2xl border border-purple-500/40 bg-purple-50/60 p-8 text-center sm:p-10">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg shadow-purple-600/30">
          <CheckCircle2 size={28} aria-hidden />
        </div>
        <h3 className="font-display mt-5 text-2xl font-semibold text-navy-900">
          Enquiry Received
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-navy-800">
          {successMessage}
        </p>
        <div className="mt-8">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setSuccessMessage(null);
              setGeneralError(null);
            }}
          >
            Submit Another Inquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      {generalError ? (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-xs leading-5 text-red-800">
          <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-600" aria-hidden />
          <span>{generalError}</span>
        </div>
      ) : null}

      {/* Honeypot anti-spam field (hidden from legitimate humans) */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website_url_check">Leave this field blank</label>
        <input
          id="website_url_check"
          type="text"
          name="website_url_check"
          value={formData.website_url_check}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Priya Sharma"
            className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm text-navy-900 focus:outline-none ${
              fieldErrors.name
                ? "border-red-400 bg-red-50/30 focus:border-red-600"
                : "border-line bg-cream/50 focus:border-purple-600 focus:bg-white"
            }`}
          />
          {fieldErrors.name ? (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. priya@company.com"
            className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm text-navy-900 focus:outline-none ${
              fieldErrors.email
                ? "border-red-400 bg-red-50/30 focus:border-red-600"
                : "border-line bg-cream/50 focus:border-purple-600 focus:bg-white"
            }`}
          />
          {fieldErrors.email ? (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
            Phone / WhatsApp (Optional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. +91 98765 43210"
            className="mt-2 w-full rounded-xl border border-line bg-cream/50 px-4 py-3 text-sm text-navy-900 focus:border-purple-600 focus:bg-white focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="serviceType" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
            Primary Service *
          </label>
          <select
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-line bg-cream/50 px-4 py-3 text-sm text-navy-900 focus:border-purple-600 focus:bg-white focus:outline-none"
          >
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="budgetRange" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
            Budget Range (Estimated)
          </label>
          <select
            id="budgetRange"
            name="budgetRange"
            value={formData.budgetRange}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-line bg-cream/50 px-4 py-3 text-sm text-navy-900 focus:border-purple-600 focus:bg-white focus:outline-none"
          >
            <option value="under-25k">Under ₹25,000 / $300</option>
            <option value="25k-50k">₹25,000 - ₹50,000 / $300 - $600</option>
            <option value="50k-100k">₹50,000 - ₹1,00,000 / $600 - $1,200</option>
            <option value="100k-plus">₹1,00,000+ / $1,200+</option>
            <option value="flexible">Flexible / Seeking Guidance</option>
          </select>
        </div>

        <div>
          <label htmlFor="timeline" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
            Target Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-line bg-cream/50 px-4 py-3 text-sm text-navy-900 focus:border-purple-600 focus:bg-white focus:outline-none"
          >
            <option value="urgent">Urgent (&lt; 2 weeks)</option>
            <option value="1-month">2 to 4 weeks</option>
            <option value="2-3-months">1 to 2 months</option>
            <option value="flexible">Flexible / Planning Phase</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-navy-900">
          Project Description & Goals *
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Briefly describe what you'd like built, key features, reference links, or existing pain points..."
          className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm text-navy-900 focus:outline-none ${
            fieldErrors.message
              ? "border-red-400 bg-red-50/30 focus:border-red-600"
              : "border-line bg-cream/50 focus:border-purple-600 focus:bg-white"
          }`}
        />
        {fieldErrors.message ? (
          <p className="mt-1 text-xs text-red-600">{fieldErrors.message}</p>
        ) : null}
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          disabled={submitting}
          className="w-full justify-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden />
              <span>Transmitting Securely...</span>
            </>
          ) : (
            <>
              <Send size={15} aria-hidden />
              <span>Submit Project Enquiry</span>
            </>
          )}
        </Button>
        <p className="mt-3 text-center text-xs text-muted">
          Your information is kept strictly confidential. Protected by server-side validation & rate limiting.
        </p>
      </div>
    </form>
  );
}
