import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  tone = "lavender",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "lavender" | "demo" | "light";
}) {
  const tones = {
    lavender: "bg-lavender-100 text-purple-700",
    demo: "bg-purple-600 text-white",
    light: "bg-white/10 text-lavender-100 border border-white/15",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
