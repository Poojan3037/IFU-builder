import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Magnetic, ParallaxLayer, Reveal } from "@/components/shared/motion";
import { Button } from "@/components/ui/button";

export const CtaBand = () => (
  <section aria-labelledby="cta-heading" className="px-4 py-24 sm:px-6 sm:py-32">
    <Reveal variant="scaleIn" className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-[color-mix(in_oklch,var(--primary),var(--info)_45%)] to-info px-6 py-16 text-center text-primary-foreground shadow-2xl shadow-primary/30 sm:px-12 sm:py-24">
      <ParallaxLayer speed={-120} className="pointer-events-none absolute -left-20 -top-24 size-80 rounded-full bg-white/15 blur-3xl">
        <span />
      </ParallaxLayer>
      <ParallaxLayer speed={140} className="pointer-events-none absolute -bottom-24 -right-16 size-96 rounded-full bg-white/10 blur-3xl">
        <span />
      </ParallaxLayer>
      <div aria-hidden className="bg-grid absolute inset-0 opacity-30 mask-radial" />
      <div className="relative">
        <h2 id="cta-heading" className="mx-auto max-w-3xl text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
          Your next IFU could be ready before lunch
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-base opacity-90 sm:text-lg">
          Sign up, answer a few questions and download a finished, checked PDF, typically in under 30 minutes.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Magnetic>
            <Button asChild className="h-12 rounded-full bg-background px-6 text-base text-foreground shadow-xl hover:bg-background/90">
              <Link href="/signup">
                Create your free account <ArrowRight />
              </Link>
            </Button>
          </Magnetic>
          <Button asChild variant="ghost" className="h-12 rounded-full px-6 text-base text-primary-foreground hover:bg-white/15 hover:text-primary-foreground">
            <Link href="/login">I already have an account</Link>
          </Button>
        </div>
      </div>
    </Reveal>
  </section>
);
