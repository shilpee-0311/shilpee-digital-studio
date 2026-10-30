"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Code2 } from "lucide-react";
import { demoProjects } from "@/content/demo-projects";
import { services } from "@/content/services";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export function PortfolioGrid() {
  const [category, setCategory] = useState("all");

  const items = useMemo(() => {
    if (category === "all") return demoProjects;
    return demoProjects.filter((project) => project.category === category);
  }, [category]);

  return (
    <div>
      <div
        className="flex flex-wrap items-center gap-2"
        role="tablist"
        aria-label="Filter sample projects"
      >
        <FilterChip
          active={category === "all"}
          onClick={() => setCategory("all")}
          count={demoProjects.length}
        >
          All Showcases
        </FilterChip>
        {services.map((service) => {
          const count = demoProjects.filter((p) => p.category === service.slug).length;
          return (
            <FilterChip
              key={service.slug}
              active={category === service.slug}
              onClick={() => setCategory(service.slug)}
              count={count}
            >
              {service.shortTitle}
            </FilterChip>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((project) => (
          <Link key={project.slug} href={`/portfolio/${project.slug}`}>
            <Card className="flex h-full flex-col justify-between transition-all hover:-translate-y-1 hover:border-purple-500/40 hover:shadow-lg">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <Badge tone="demo">{project.badgeType}</Badge>
                  <span className="text-xs font-medium text-muted capitalize">
                    {project.category.replace("-", " ")}
                  </span>
                </div>

                <h2 className="mt-4 text-xl font-semibold text-navy-900">
                  {project.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {project.summary}
                </p>
              </div>

              <div className="mt-6 border-t border-line/60 pt-4">
                <p className="text-xs text-navy-800 line-clamp-1 font-mono">
                  Stack: {project.techStack}
                </p>
                <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-purple-700">
                  Inspect Architecture <ArrowRight size={13} aria-hidden />
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-line bg-white p-12 text-center text-muted">
          <p>No sample projects in this category.</p>
        </div>
      ) : null}
    </div>
  );
}

function FilterChip({
  children,
  active,
  onClick,
  count,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  count?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all",
        active
          ? "bg-navy-900 text-white shadow-md shadow-navy-950/20"
          : "border border-line bg-white text-navy-900 hover:border-purple-400 hover:bg-cream"
      )}
    >
      <span>{children}</span>
      {typeof count === "number" ? (
        <span
          className={cn(
            "rounded-full px-1.5 py-0.2 text-[10px]",
            active ? "bg-white/20 text-white" : "bg-purple-100 text-purple-800"
          )}
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}
