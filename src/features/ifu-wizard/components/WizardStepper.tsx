"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import Link from "next/link";

import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { WIZARD_STEPS } from "../constants";

interface WizardStepperProps {
  documentId: string;
  activeIndex: number;
  /** Furthest step the user may jump to (WF-01). */
  maxReachableIndex: number;
}

const stepHref = (documentId: string, slug: string) =>
  slug === "sections" ? `/ifu/${documentId}/sections/device_description` : `/ifu/${documentId}/${slug}`;

export const WizardStepper = ({ documentId, activeIndex, maxReachableIndex }: WizardStepperProps) => (
  <nav aria-label="IFU wizard progress">
    <ol className="flex items-center">
      {WIZARD_STEPS.map((step, index) => {
        const isDone = index < activeIndex;
        const isActive = index === activeIndex;
        const reachable = index <= maxReachableIndex;
        const isLast = index === WIZARD_STEPS.length - 1;

        const circle = (
          <span
            className={cn(
              "relative grid size-8 shrink-0 place-items-center rounded-full border-2 text-xs font-semibold transition-colors duration-300",
              isDone && "border-primary bg-primary text-primary-foreground",
              isActive && "border-primary bg-background text-primary shadow-[0_0_0_4px] shadow-primary/15",
              !isDone && !isActive && "border-border bg-background text-muted-foreground",
            )}
          >
            {isDone ? (
              <motion.span initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                <Check className="size-4" strokeWidth={3} />
              </motion.span>
            ) : (
              index + 1
            )}
            {isActive && (
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full border-2 border-primary"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
            )}
          </span>
        );

        const label = (
          <span className={cn("hidden text-sm font-medium md:inline", isActive ? "text-foreground" : "text-muted-foreground")}>
            {step.label}
          </span>
        );

        return (
          <li key={step.key} className={cn("flex items-center", !isLast && "flex-1")}>
            {reachable && !isActive ? (
              <Link href={stepHref(documentId, step.slug)} className="group flex items-center gap-2.5 rounded-full pr-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                {circle}
                {label}
              </Link>
            ) : (
              <span className="flex items-center gap-2.5" aria-current={isActive ? "step" : undefined}>
                {circle}
                {label}
                <span className="sr-only">{isDone ? "(completed)" : isActive ? "(current step)" : "(not yet available)"}</span>
              </span>
            )}
            {!isLast && (
              <span aria-hidden className="relative mx-3 h-0.5 flex-1 overflow-hidden rounded-full bg-border">
                <motion.span
                  className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-primary to-info"
                  initial={false}
                  animate={{ scaleX: isDone ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                />
              </span>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);
