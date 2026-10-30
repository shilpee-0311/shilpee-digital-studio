import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-purple-600 text-white hover:bg-purple-700 shadow-[0_10px_30px_rgb(124_58_237_/_0.28)]",
  secondary:
    "bg-white text-navy-900 border border-lavender-200 hover:border-purple-500 hover:text-purple-700",
  ghost:
    "bg-transparent text-lavender-100 hover:bg-white/10 border border-white/15",
  dark: "bg-navy-900 text-white hover:bg-navy-800",
} as const;

type Variant = keyof typeof variants;

type Common = {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
};

type ButtonAsButton = Common &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = Common & { href: string; type?: never };

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-colors disabled:opacity-50",
    variants[variant],
    className
  );

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
