"use client";

import { useState } from "react";
import { Share2, Check, Copy, MessageSquare } from "lucide-react";
import { Linkedin } from "@/components/ui/LinkedinIcon";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const fullUrl = typeof window !== "undefined" ? window.location.href : url;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} - ${fullUrl}`)}`;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-mono uppercase tracking-wider text-lavender-200/60 mr-1 flex items-center gap-1.5">
        <Share2 size={13} />
        <span>Share:</span>
      </span>

      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg border border-white/10 bg-white/5 p-2 text-lavender-200 hover:border-purple-400 hover:text-white transition-colors"
        title="Share on LinkedIn"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={14} />
      </a>

      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-bold text-lavender-200 hover:border-purple-400 hover:text-white transition-colors"
        title="Share on X (Twitter)"
        aria-label="Share on X (Twitter)"
      >
        𝕏
      </a>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg border border-white/10 bg-white/5 p-2 text-lavender-200 hover:border-emerald-400 hover:text-emerald-300 transition-colors"
        title="Share on WhatsApp"
        aria-label="Share on WhatsApp"
      >
        <MessageSquare size={14} />
      </a>

      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-lavender-200 hover:border-purple-400 hover:text-white transition-colors"
        title="Copy article link"
      >
        {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
        <span>{copied ? "Copied!" : "Copy Link"}</span>
      </button>
    </div>
  );
}
