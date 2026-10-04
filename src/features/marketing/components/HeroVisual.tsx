"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

import { EASE_OUT_EXPO } from "@/lib/motion";

import { HeroComplianceMock, HeroDashboardMock, HeroPageMock } from "./HeroMocks";

/** Layered product mock that un-tilts and separates as the user scrolls past the hero. */
export const HeroVisual = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.5 });

  const tilt = useTransform(progress, [0, 0.5], [22, 0]);
  const scale = useTransform(progress, [0, 0.5], [0.92, 1]);
  const leftX = useTransform(progress, [0.2, 0.7], [40, -40]);
  const leftY = useTransform(progress, [0.2, 0.8], [40, -60]);
  const rightX = useTransform(progress, [0.2, 0.7], [-40, 40]);
  const rightY = useTransform(progress, [0.2, 0.8], [80, -100]);
  const rightRotate = useTransform(progress, [0.2, 0.8], [2, 8]);

  const still = reduceMotion ?? false;

  return (
    <div ref={ref} aria-hidden className="relative mx-auto mt-16 max-w-5xl px-4 [perspective:1600px] sm:mt-20 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.5, ease: EASE_OUT_EXPO }}
      >
        <motion.div style={still ? undefined : { rotateX: tilt, scale }} className="relative mx-auto max-w-3xl origin-bottom">
          <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/20 via-info/10 to-chart-3/20 blur-2xl" />
          <HeroDashboardMock />
        </motion.div>
        <motion.div
          style={still ? undefined : { x: leftX, y: leftY }}
          className="absolute -left-2 bottom-6 hidden md:block lg:-left-8"
        >
          <HeroComplianceMock />
        </motion.div>
        <motion.div
          style={still ? undefined : { x: rightX, y: rightY, rotate: rightRotate }}
          className="absolute -right-2 top-10 hidden md:block lg:-right-6"
        >
          <HeroPageMock />
        </motion.div>
      </motion.div>
    </div>
  );
};
