"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";

import { Reveal } from "@/components/shared/motion";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { HOW_IT_WORKS_STEPS } from "../constants";
import { useScrollStep } from "./HowItWorks.hooks";
import { SectionHeading } from "./SectionHeading";
import { STEP_VISUALS } from "./StepVisuals";

const VisualFrame = ({ index }: { index: number }) => {
  const Visual = STEP_VISUALS[index];
  return (
    <div className="glass rounded-3xl p-5 shadow-2xl shadow-primary/10 sm:p-6">
      <Visual />
    </div>
  );
};

export const HowItWorks = () => {
  const { ref, active, scrollYProgress } = useScrollStep(HOW_IT_WORKS_STEPS.length);

  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="relative scroll-mt-24 py-24 sm:py-32">
      <SectionHeading
        id="how-heading"
        eyebrow="How it works"
        title="Four guided steps from blank page to finished PDF"
        description="The same 4-step wizard your team will use every day: no regulatory jargon, no formatting."
        className="px-4"
      />

      {/* Mobile / tablet: stacked */}
      <ol className="mx-auto mt-14 flex max-w-xl flex-col gap-10 px-4 lg:hidden">
        {HOW_IT_WORKS_STEPS.map((step, index) => (
          <Reveal as="li" key={step.id} className="space-y-4">
            <span className="font-mono text-sm text-primary">{step.step}</span>
            <h3 className="text-xl font-semibold">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
            <VisualFrame index={index} />
          </Reveal>
        ))}
      </ol>

      {/* Desktop: sticky scroll storytelling */}
      <div ref={ref} className="relative mx-auto mt-10 hidden h-[360vh] max-w-6xl px-6 lg:block">
        <div className="sticky top-0 grid h-dvh grid-cols-2 items-center gap-16">
          <div className="relative flex gap-8">
            <div aria-hidden className="relative w-0.5 shrink-0 rounded-full bg-border">
              <motion.div style={{ scaleY: scrollYProgress }} className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-primary to-info" />
            </div>
            <ol className="flex flex-col gap-3">
              {HOW_IT_WORKS_STEPS.map((step, index) => {
                const isActive = index === active;
                return (
                  <li key={step.id} aria-current={isActive ? "step" : undefined}>
                    <motion.div
                      animate={{ opacity: isActive ? 1 : 0.45 }}
                      transition={{ duration: 0.4 }}
                      className={cn("rounded-2xl p-4 transition-colors", isActive && "bg-card shadow-lg ring-1 ring-border")}
                    >
                      <div className="flex items-center gap-3">
                        <span className={cn("font-mono text-sm", isActive ? "text-primary" : "text-muted-foreground")}>{step.step}</span>
                        <h3 className="text-lg font-semibold">{step.title}</h3>
                      </div>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                            className="overflow-hidden"
                          >
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                            <ul className="mt-3 space-y-1.5">
                              {step.points.map((point) => (
                                <li key={point} className="flex items-center gap-2 text-sm">
                                  <Check aria-hidden className="size-3.5 text-primary" strokeWidth={3} /> {point}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </li>
                );
              })}
            </ol>
          </div>
          <div aria-hidden className="relative">
            <div className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,var(--glow-1),transparent_70%)] blur-2xl" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 30, scale: 0.96, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, scale: 0.96, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              >
                <VisualFrame index={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
