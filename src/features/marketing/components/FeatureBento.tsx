import { Spotlight, Stagger, StaggerItem } from "@/components/shared/motion";
import { cn } from "@/lib/utils";

import { FEATURES } from "../constants";
import { SectionHeading } from "./SectionHeading";

export const FeatureBento = () => (
  <section id="features" aria-labelledby="features-heading" className="relative scroll-mt-24 bg-muted/30 py-24 sm:py-32">
    <div aria-hidden className="bg-dots mask-radial pointer-events-none absolute inset-0" />
    <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
      <SectionHeading
        id="features-heading"
        eyebrow="Features"
        title="Everything an IFU needs, nothing it doesn't"
        description="Rule-based and deterministic: every suggestion is explainable, and nothing is generated behind your back."
      />
      <Stagger className="mt-14 grid gap-4 md:grid-cols-3" stagger={0.07}>
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <StaggerItem key={feature.title} className={cn(feature.className)}>
              <Spotlight className="h-full p-6 sm:p-7">
                <span className="mb-5 grid size-11 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-info/15 text-primary ring-1 ring-inset ring-primary/15">
                  <Icon aria-hidden className="size-5" />
                </span>
                <h3 className="text-lg font-semibold tracking-tight">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </Spotlight>
            </StaggerItem>
          );
        })}
      </Stagger>
    </div>
  </section>
);
