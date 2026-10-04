import type { Transition, Variants } from "motion/react";

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const DURATION = {
  fast: 0.15,
  base: 0.3,
  slow: 0.6,
  slower: 0.9,
} as const;

export const SPRING = {
  snappy: { type: "spring", stiffness: 420, damping: 32 },
  soft: { type: "spring", stiffness: 180, damping: 24 },
  bouncy: { type: "spring", stiffness: 300, damping: 18 },
} satisfies Record<string, Transition>;

export const baseTransition: Transition = { duration: DURATION.slow, ease: EASE_OUT_EXPO };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: baseTransition },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: baseTransition },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 12 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: baseTransition },
};

export const slideInFromLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: baseTransition },
};

export const slideInFromRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: baseTransition },
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

export const REVEAL_VARIANTS = {
  fadeUp,
  fadeIn,
  scaleIn,
  blurIn,
  slideInFromLeft,
  slideInFromRight,
} as const;

export type RevealVariant = keyof typeof REVEAL_VARIANTS;

/** Directional slide used for wizard step changes: 1 = forward, -1 = back. */
export const stepSlide: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 40 }),
  center: { opacity: 1, x: 0, transition: { duration: DURATION.base, ease: EASE_OUT_EXPO } },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -40,
    transition: { duration: DURATION.fast, ease: EASE_IN_OUT },
  }),
};
