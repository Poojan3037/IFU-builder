import { Reveal } from "@/components/shared/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

export const SectionHeading = ({ id, eyebrow, title, description, align = "center", className }: SectionHeadingProps) => (
  <Reveal className={cn("flex max-w-2xl flex-col gap-4", align === "center" && "mx-auto items-center text-center", className)}>
    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</span>
    <h2 id={id} className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
      {title}
    </h2>
    {description && <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>}
  </Reveal>
);
