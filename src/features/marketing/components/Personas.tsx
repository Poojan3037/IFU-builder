import { Quote } from "lucide-react";

import { Spotlight, Stagger, StaggerItem } from "@/components/shared/motion";

import { PERSONAS } from "../constants";
import { SectionHeading } from "./SectionHeading";

export const Personas = () => (
  <section aria-labelledby="personas-heading" className="py-24 sm:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <SectionHeading
        id="personas-heading"
        eyebrow="Who it's for"
        title="Made for Indian MedTech teams of every size"
      />
      <Stagger className="mt-14 grid gap-4 md:grid-cols-3" stagger={0.1}>
        {PERSONAS.map((persona) => {
          const Icon = persona.icon;
          return (
            <StaggerItem key={persona.title}>
              <Spotlight className="flex h-full flex-col p-6">
                <span className="mb-4 grid size-11 place-items-center rounded-full bg-accent text-primary">
                  <Icon aria-hidden className="size-5" />
                </span>
                <h3 className="text-lg font-semibold">{persona.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{persona.description}</p>
                <blockquote className="mt-6 flex gap-2 border-t pt-5 text-sm italic leading-relaxed text-foreground/80">
                  <Quote aria-hidden className="size-4 shrink-0 text-primary/60" />
                  <p>{persona.quote}</p>
                </blockquote>
              </Spotlight>
            </StaggerItem>
          );
        })}
      </Stagger>
    </div>
  </section>
);
