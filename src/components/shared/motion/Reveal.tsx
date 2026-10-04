"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { baseTransition, REVEAL_VARIANTS, type RevealVariant } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}

/** Animates children into view once, when they scroll into the viewport. */
export const Reveal = ({ children, variant = "fadeUp", delay = 0, className, as = "div" }: RevealProps) => {
  const Component = motion[as];
  const base = REVEAL_VARIANTS[variant];
  // Variant transitions win over the `transition` prop, so merge the delay into the variant itself.
  const variants = delay
    ? { ...base, visible: { ...base.visible, transition: { ...baseTransition, delay } } }
    : base;
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </Component>
  );
};
