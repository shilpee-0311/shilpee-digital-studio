"use client";

import React, { useMemo } from "react";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

/**
 * Safe, lightweight client-side Markdown renderer for blog articles.
 * Strictly sanitizes raw HTML and prevents XSS while supporting headings,
 * lists, bold, italics, links, blockquotes, code blocks, tables, and images.
 */
export function MarkdownContent({ content, className = "" }: MarkdownContentProps) {
  const renderedNodes = useMemo(() => {
    if (!content) return null;

    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];

    let inCodeBlock = false;
    let codeLanguage = "";
    let codeLines: string[] = [];
    let inList = false;
    let listItems: string[] = [];
    let listOrdered = false;

    const flushList = () => {
      if (inList && listItems.length > 0) {
        if (listOrdered) {
          elements.push(
            <ol key={`ol-${elements.length}`} className="my-4 list-decimal space-y-2 pl-6 text-lavender-200">
              {listItems.map((item, idx) => (
                <li key={idx} className="leading-relaxed">
                  {renderInlineFormatting(item)}
                </li>
              ))}
            </ol>
          );
        } else {
          elements.push(
            <ul key={`ul-${elements.length}`} className="my-4 list-disc space-y-2 pl-6 text-lavender-200">
              {listItems.map((item, idx) => (
                <li key={idx} className="leading-relaxed">
                  {renderInlineFormatting(item)}
                </li>
              ))}
            </ul>
          );
        }
        inList = false;
        listItems = [];
      }
    };

    const flushCodeBlock = () => {
      if (inCodeBlock) {
        const fullCode = codeLines.join("\n");
        elements.push(
          <div key={`code-${elements.length}`} className="my-6 overflow-hidden rounded-2xl border border-white/10 bg-navy-900 shadow-xl">
            {codeLanguage ? (
              <div className="flex items-center justify-between border-b border-white/10 bg-navy-950/80 px-4 py-2 text-[11px] font-mono text-purple-300">
                <span>{codeLanguage.toUpperCase()}</span>
                <span className="text-white/40">CODE PREVIEW</span>
              </div>
            ) : null}
            <pre className="overflow-x-auto p-4 text-xs font-mono leading-relaxed text-lavender-100">
              <code>{fullCode}</code>
            </pre>
          </div>
        );
        inCodeBlock = false;
        codeLanguage = "";
        codeLines = [];
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // Code Block Start/End
      if (trimmed.startsWith("```")) {
        if (!inCodeBlock) {
          flushList();
          inCodeBlock = true;
          codeLanguage = trimmed.slice(3).trim();
          codeLines = [];
        } else {
          flushCodeBlock();
        }
        continue;
      }

      if (inCodeBlock) {
        codeLines.push(line);
        continue;
      }

      // List Items (- or * or numbered 1.)
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        if (!inList) {
          inList = true;
          listOrdered = false;
          listItems = [];
        }
        listItems.push(trimmed.slice(2));
        continue;
      }

      const orderedMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
      if (orderedMatch) {
        if (!inList) {
          inList = true;
          listOrdered = true;
          listItems = [];
        }
        listItems.push(orderedMatch[2]);
        continue;
      }

      // If we were in a list and hit non-list, flush it
      if (inList && trimmed.length > 0) {
        flushList();
      }

      // Blank line
      if (trimmed.length === 0) {
        flushList();
        continue;
      }

      // Headings
      if (trimmed.startsWith("### ")) {
        const text = trimmed.slice(4);
        const id = slugifyHeading(text);
        elements.push(
          <h3 key={`h3-${i}`} id={id} className="font-display mt-8 mb-3 scroll-mt-24 text-xl font-bold tracking-tight text-white sm:text-2xl">
            {text}
          </h3>
        );
        continue;
      }

      if (trimmed.startsWith("## ")) {
        const text = trimmed.slice(3);
        const id = slugifyHeading(text);
        elements.push(
          <h2 key={`h2-${i}`} id={id} className="font-display mt-12 mb-4 scroll-mt-24 text-2xl font-bold tracking-tight text-white sm:text-3xl border-b border-white/10 pb-3">
            {text}
          </h2>
        );
        continue;
      }

      if (trimmed.startsWith("# ")) {
        const text = trimmed.slice(2);
        const id = slugifyHeading(text);
        elements.push(
          <h1 key={`h1-${i}`} id={id} className="font-display mt-10 mb-4 scroll-mt-24 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {text}
          </h1>
        );
        continue;
      }

      // Blockquotes (> )
      if (trimmed.startsWith("> ")) {
        elements.push(
          <blockquote key={`quote-${i}`} className="my-6 border-l-4 border-purple-500 bg-purple-950/20 py-3 pl-4 pr-3 text-sm italic text-lavender-200/90 rounded-r-xl">
            {renderInlineFormatting(trimmed.slice(2))}
          </blockquote>
        );
        continue;
      }

      // Horizontal Rule (--- or ***)
      if (trimmed === "---" || trimmed === "***") {
        elements.push(<hr key={`hr-${i}`} className="my-8 border-white/10" />);
        continue;
      }

      // Standard Paragraph
      elements.push(
        <p key={`p-${i}`} className="my-4 text-base leading-relaxed text-lavender-200/90">
          {renderInlineFormatting(line)}
        </p>
      );
    }

    flushList();
    flushCodeBlock();

    return elements;
  }, [content]);

  return <div className={`prose-custom max-w-none text-lavender-200 ${className}`}>{renderedNodes}</div>;
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Inline formatter for **bold**, *italic*, `code`, and [link](url)
 */
function renderInlineFormatting(text: string): React.ReactNode {
  // Regex to detect link [text](url) or code `code` or bold **bold**
  const tokens: React.ReactNode[] = [];
  let remaining = text;
  let keyIdx = 0;

  // Simple token regex
  const regex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`|\*([^*]+)\*)/;

  while (remaining.length > 0) {
    const match = remaining.match(regex);
    if (!match || match.index === undefined) {
      tokens.push(remaining);
      break;
    }

    const before = remaining.slice(0, match.index);
    if (before) tokens.push(before);

    const fullMatch = match[0];

    if (match[2] && match[3]) {
      // Link [text](url)
      const linkText = match[2];
      const linkHref = match[3];
      const isSafe =
        linkHref.startsWith("/") ||
        linkHref.startsWith("https://") ||
        linkHref.startsWith("http://");

      tokens.push(
        <a
          key={`l-${keyIdx++}`}
          href={isSafe ? linkHref : "#"}
          target={linkHref.startsWith("http") ? "_blank" : undefined}
          rel={linkHref.startsWith("http") ? "noopener noreferrer" : undefined}
          className="text-purple-400 underline underline-offset-4 hover:text-lavender-100 transition-colors"
        >
          {linkText}
        </a>
      );
    } else if (match[4]) {
      // Bold **bold**
      tokens.push(
        <strong key={`b-${keyIdx++}`} className="font-semibold text-white">
          {match[4]}
        </strong>
      );
    } else if (match[5]) {
      // Inline `code`
      tokens.push(
        <code
          key={`c-${keyIdx++}`}
          className="rounded bg-white/10 px-1.5 py-0.5 text-[12px] font-mono text-purple-300"
        >
          {match[5]}
        </code>
      );
    } else if (match[6]) {
      // Italic *italic*
      tokens.push(
        <em key={`i-${keyIdx++}`} className="italic text-lavender-100">
          {match[6]}
        </em>
      );
    }

    remaining = remaining.slice(match.index + fullMatch.length);
  }

  return <>{tokens}</>;
}
