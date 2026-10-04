"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { EASE_OUT_EXPO } from "@/lib/motion";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/** Entry transition for route content. Use from a `template.tsx` so it re-runs on every navigation. */
export const PageTransition = ({ children, className }: PageTransitionProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
  >
    {children}
  </motion.div>
);
