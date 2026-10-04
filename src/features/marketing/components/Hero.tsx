import { ArrowRight, PlayCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { GradientBackdrop } from "@/components/shared/GradientBackdrop";
import { Magnetic, Reveal, TextReveal } from "@/components/shared/motion";
import { Button } from "@/components/ui/button";

import { HeroVisual } from "./HeroVisual";

export const Hero = () => (
  <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden pb-16 pt-14 sm:pt-20 lg:pb-28">
    <GradientBackdrop />
    <div className="mx-auto flex max-w-6xl flex-col items-center px-4 text-center sm:px-6">
      <Reveal variant="blurIn">
        <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground">
          <ShieldCheck aria-hidden className="size-3.5 text-primary" />
          Built for India&apos;s Medical Devices Rules, 2017
        </span>
      </Reveal>
      <div id="hero-heading">
        <TextReveal
          text="Create compliant device instructions in minutes, not days."
          highlight={["compliant", "minutes,"]}
          delay={0.15}
          className="mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        />
      </div>
      <Reveal delay={0.6} className="mt-6 max-w-2xl">
        <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          A guided IFU builder for Indian MedTech teams. Answer simple questions, write only the sections your
          device needs, catch missing statements automatically, and export a finished A4 PDF.
        </p>
      </Reveal>
      <Reveal delay={0.75} className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
        <Magnetic>
          <Button asChild className="h-12 rounded-full px-6 text-base shadow-xl shadow-primary/30">
            <Link href="/signup">
              Start your first IFU <ArrowRight />
            </Link>
          </Button>
        </Magnetic>
        <Button asChild variant="outline" className="glass h-12 rounded-full px-6 text-base">
          <a href="#how-it-works">
            <PlayCircle /> See how it works
          </a>
        </Button>
      </Reveal>
      <Reveal delay={0.9}>
        <p className="mt-4 text-xs text-muted-foreground">Free to start · No credit card · Data hosted in India</p>
      </Reveal>
    </div>
    <HeroVisual />
  </section>
);
