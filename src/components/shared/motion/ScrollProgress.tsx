"use client";

import { motion, useScroll, useSpring } from "motion/react";

import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  className?: string;
}

export const ScrollProgress = ({ className }: ScrollProgressProps) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className={cn(
        "fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-primary via-info to-chart-3",
        className,
      )}
    />
  );
};
