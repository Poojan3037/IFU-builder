"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

interface ParallaxLayerProps {
  children: ReactNode;
  /** Pixels moved across the element's scroll range. Negative moves up. */
  speed?: number;
  rotate?: number;
  className?: string;
}

export const ParallaxLayer = ({ children, speed = -80, rotate = 0, className }: ParallaxLayerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const y = useTransform(smooth, [0, 1], [-speed / 2, speed / 2]);
  const r = useTransform(smooth, [0, 1], [-rotate / 2, rotate / 2]);

  return (
    <motion.div ref={ref} className={className} style={reduceMotion ? undefined : { y, rotate: r }}>
      {children}
    </motion.div>
  );
};
