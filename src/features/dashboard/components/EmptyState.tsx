import { Plus } from "lucide-react";
import Link from "next/link";

import { Magnetic, Reveal, Stagger, StaggerItem } from "@/components/shared/motion";
import { Button } from "@/components/ui/button";

import { EMPTY_STATE_STEPS } from "../constants";
import { EmptyStateIllustration } from "./EmptyStateIllustration";

/** FR-DASH-09: first-time user with no documents. */
export const EmptyState = () => (
  <section className="relative overflow-hidden rounded-3xl border bg-card px-6 py-14 text-center shadow-sm sm:px-12">
    <div aria-hidden className="bg-grid mask-radial pointer-events-none absolute inset-0" />
    <div className="relative">
      <Reveal variant="scaleIn">
        <EmptyStateIllustration />
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-6 text-2xl font-semibold tracking-tight">Create your first IFU</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Answer a few questions about your device and we&apos;ll show you exactly which sections and warnings Indian rules
          expect.
        </p>
      </Reveal>
      <Reveal delay={0.2} className="mt-6">
        <Magnetic strength={0.2}>
          <Button asChild className="h-10 gap-2 px-5 shadow-lg shadow-primary/25">
            <Link href="/ifu/demo/basic-info">
              <Plus aria-hidden /> Create your first IFU
            </Link>
          </Button>
        </Magnetic>
      </Reveal>
      <Stagger as="ol" delay={0.3} className="mx-auto mt-12 grid max-w-3xl gap-4 text-left sm:grid-cols-3">
        {EMPTY_STATE_STEPS.map((step, index) => (
          <StaggerItem as="li" key={step.title} className="rounded-2xl border bg-background/70 p-4 backdrop-blur-sm">
            <span className="grid size-7 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {index + 1}
            </span>
            <p className="mt-3 text-sm font-medium">{step.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{step.description}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  </section>
);
