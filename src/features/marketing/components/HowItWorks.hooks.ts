"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";

/** Maps the scroll progress through a tall section to an active step index. */
export const useScrollStep = (stepCount: number) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.min(stepCount - 1, Math.max(0, Math.floor(latest * stepCount)));
    if (next !== active) setActive(next);
  });

  return { ref, active, scrollYProgress };
};
