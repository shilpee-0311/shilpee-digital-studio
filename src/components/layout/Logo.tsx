import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3"
      aria-label={`${site.name} home`}
    >
      <span
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 font-display text-sm text-white",
          light && "bg-purple-500"
        )}
        aria-hidden="true"
      >
        S
      </span>
      <span className="leading-tight">
        <span
          className={cn(
            "block text-sm font-semibold tracking-wide",
            light ? "text-white" : "text-navy-900"
          )}
        >
          {site.name}
        </span>
        <span
          className={cn(
            "block text-[11px]",
            light ? "text-lavender-200" : "text-muted"
          )}
        >
          Digital Studio
        </span>
      </span>
    </Link>
  );
}
