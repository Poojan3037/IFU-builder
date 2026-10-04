"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { REVEAL_VARIANTS, staggerContainer, type RevealVariant } from "@/lib/motion";

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  /** "view" animates on scroll into view; "mount" animates immediately. */
  trigger?: "view" | "mount";
  as?: "div" | "ul" | "ol" | "section";
}

export const Stagger = ({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  trigger = "view",
  as = "div",
}: StaggerProps) => {
  const Component = motion[as];
  const triggerProps =
    trigger === "view"
      ? { whileInView: "visible", viewport: { once: true, margin: "-60px" } }
      : { animate: "visible" };

  return (
    <Component
      className={className}
      initial="hidden"
      variants={staggerContainer(stagger, delay)}
      {...triggerProps}
    >
      {children}
    </Component>
  );
};

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  as?: "div" | "li" | "span";
}

export const StaggerItem = ({ children, className, variant = "fadeUp", as = "div" }: StaggerItemProps) => {
  const Component = motion[as];
  return (
    <Component className={className} variants={REVEAL_VARIANTS[variant]}>
      {children}
    </Component>
  );
};
