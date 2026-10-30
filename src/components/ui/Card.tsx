import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-white p-6 shadow-[0_18px_50px_rgb(11_18_36_/_0.06)]",
        className
      )}
    >
      {children}
    </div>
  );
}
