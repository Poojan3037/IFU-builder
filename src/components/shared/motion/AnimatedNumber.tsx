"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

import { EASE_OUT_EXPO } from "@/lib/motion";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

const format = (n: number) => Math.round(n).toLocaleString("en-IN");

export const AnimatedNumber = ({ value, duration = 1.4, prefix = "", suffix = "", className }: AnimatedNumberProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();

  // Count-up writes straight to the DOM node to avoid a React render per frame.
  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;
    if (reduceMotion) {
      node.textContent = `${prefix}${format(value)}${suffix}`;
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: EASE_OUT_EXPO,
      onUpdate: (latest) => {
        node.textContent = `${prefix}${format(latest)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, duration, prefix, suffix, reduceMotion]);

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${format(value)}${suffix}`}>
      {prefix}0{suffix}
    </span>
  );
};
