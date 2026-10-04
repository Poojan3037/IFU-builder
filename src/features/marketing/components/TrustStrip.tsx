import { BadgeCheck } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/shared/motion";

import { TRUST_CHIPS } from "../constants";

export const TrustStrip = () => (
  <section aria-label="Standards supported" className="border-y bg-muted/30 py-8">
    <Stagger as="ul" stagger={0.06} className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4">
      {TRUST_CHIPS.map((chip) => (
        <StaggerItem as="li" key={chip} variant="fadeIn" className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <BadgeCheck aria-hidden className="size-4 text-primary" />
          {chip}
        </StaggerItem>
      ))}
    </Stagger>
  </section>
);
