"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";

/** Number of items "resolved" as the section scrolls through the viewport. */
export const useScrollResolvedCount = (total: number) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.55"] });
  const [resolved, setResolved] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.min(total, Math.max(0, Math.floor(latest * (total + 1))));
    if (next !== resolved) setResolved(next);
  });

  return { ref, resolved };
};
