import Link from "next/link";

import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  className?: string;
  /** Hide the wordmark on narrow layouts. */
  compact?: boolean;
}

export const LogoMark = ({ className }: { className?: string }) => (
  <span
    aria-hidden
    className={cn(
      "relative grid size-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-info text-primary-foreground shadow-md shadow-primary/25",
      className,
    )}
  >
    <svg viewBox="0 0 24 24" className="size-4.5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4" />
      <path d="m9.5 14 2 2 3.5-4" />
    </svg>
  </span>
);

export const Logo = ({ href = "/", className, compact = false }: LogoProps) => (
  <Link href={href} className={cn("group inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring", className)}>
    <LogoMark className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105" />
    <span className={cn("text-[15px] font-semibold tracking-tight", compact && "max-sm:sr-only")}>
      Smart IFU <span className="text-primary">Builder</span>
    </span>
  </Link>
);
