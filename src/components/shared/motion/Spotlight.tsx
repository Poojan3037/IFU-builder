"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import type { MouseEvent, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SpotlightProps {
  children: ReactNode;
  className?: string;
}

/** Card surface with a soft radial highlight that follows the cursor, plus a hover lift. */
export const Spotlight = ({ children, className }: SpotlightProps) => {
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);
  const background = useMotionTemplate`radial-gradient(360px circle at ${mouseX}px ${mouseY}px, color-mix(in oklch, var(--primary) 14%, transparent), transparent 70%)`;

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn("group relative overflow-hidden rounded-2xl border bg-card", className)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
};
