import { CheckCircle2 } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/shared/motion";
import { SECTION_CATALOGUE } from "@/features/sections/catalogue";

import type { LooksGoodItem } from "../types";

interface LooksGoodListProps {
  items: LooksGoodItem[];
}

export const LooksGoodList = ({ items }: LooksGoodListProps) => (
  <section aria-labelledby="looks-good-title" className="rounded-2xl border bg-card p-5 shadow-xs">
    <h2 id="looks-good-title" className="flex items-center gap-2 text-sm font-semibold">
      <CheckCircle2 aria-hidden className="size-4 text-success" /> Looks good
      <span className="rounded-full bg-success-soft px-2 py-0.5 text-xs font-medium text-success-soft-foreground">{items.length}</span>
    </h2>
    <Stagger as="ul" trigger="mount" stagger={0.05} delay={0.2} className="mt-3 flex flex-col gap-2">
      {items.map((item) => (
        <StaggerItem as="li" key={item.sectionKey} variant="slideInFromLeft" className="flex items-start gap-2.5 text-sm">
          <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-success" />
          <span>
            <span className="font-medium">{SECTION_CATALOGUE[item.sectionKey].title}</span>
            {item.note && <span className="text-muted-foreground"> — {item.note}</span>}
          </span>
        </StaggerItem>
      ))}
    </Stagger>
  </section>
);
