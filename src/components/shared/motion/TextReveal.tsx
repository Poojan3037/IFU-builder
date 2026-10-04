"use client";

import { motion } from "motion/react";

import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  /** Words (case-insensitive, punctuation stripped) to render with the brand gradient. */
  highlight?: string[];
  delay?: number;
  as?: "h1" | "h2" | "p";
}

const normalise = (word: string) => word.toLowerCase().replace(/[^a-z0-9]/g, "");

export const TextReveal = ({ text, className, highlight = [], delay = 0, as = "h1" }: TextRevealProps) => {
  const Component = motion[as];
  const highlighted = new Set(highlight.map(normalise));
  const words = text.split(" ");

  return (
    <Component
      className={className}
      initial="hidden"
      animate="visible"
      aria-label={text}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-top">
          <motion.span
            className={cn("inline-block", highlighted.has(normalise(word)) && "text-gradient")}
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: { y: "0%", opacity: 1, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
            }}
          >
            {word}
            {index < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </Component>
  );
};
