import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Reveal } from "@/components/shared/motion";
import { cn } from "@/lib/utils";

interface FormSectionProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  children: ReactNode;
  delay?: number;
  className?: string;
}

/** Elevated card that groups related wizard fields and reveals on scroll. */
export const FormSection = ({ icon: Icon, title, description, children, delay = 0, className }: FormSectionProps) => (
  <Reveal delay={delay} as="section" className={cn("rounded-2xl border bg-card/80 p-5 shadow-sm backdrop-blur-sm sm:p-6", className)}>
    <header className="mb-5 flex items-start gap-3">
      <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent text-primary ring-1 ring-inset ring-primary/10">
        <Icon className="size-4.5" />
      </span>
      <div className="space-y-0.5">
        <h2 className="text-base font-semibold tracking-tight">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
    </header>
    {children}
  </Reveal>
);
