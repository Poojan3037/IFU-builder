"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

/** True once the page has scrolled past `threshold` pixels. */
export const useScrolledPast = (threshold = 24) => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > threshold;
    if (next !== scrolled) setScrolled(next);
  });

  return scrolled;
};
