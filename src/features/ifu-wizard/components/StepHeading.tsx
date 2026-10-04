import { Reveal } from "@/components/shared/motion";

interface StepHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

export const StepHeading = ({ eyebrow, title, description }: StepHeadingProps) => (
  <Reveal variant="blurIn" className="space-y-2">
    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{eyebrow}</p>
    <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{title}</h1>
    <p className="max-w-2xl text-muted-foreground text-pretty">{description}</p>
  </Reveal>
);
