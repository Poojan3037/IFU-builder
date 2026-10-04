"use client";

import { motion } from "motion/react";
import { FileText, ShieldCheck, Sparkles } from "lucide-react";

/** Layered document stack that floats gently. Decorative only. */
export const EmptyStateIllustration = () => (
  <div aria-hidden className="relative mx-auto h-40 w-56">
    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,var(--glow-1),transparent_70%)] blur-2xl" />
    <motion.div
      className="absolute left-6 top-6 h-32 w-24 rotate-[-10deg] rounded-xl border bg-card shadow-md"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute right-6 top-6 h-32 w-24 rotate-[10deg] rounded-xl border bg-card shadow-md"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
    />
    <motion.div
      className="absolute left-1/2 top-2 flex h-36 w-28 -translate-x-1/2 flex-col gap-2 rounded-xl border bg-card p-3 shadow-xl"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <FileText className="size-5 text-primary" />
      <span className="h-1.5 w-16 rounded-full bg-muted" />
      <span className="h-1.5 w-20 rounded-full bg-muted" />
      <span className="h-1.5 w-12 rounded-full bg-muted" />
      <span className="mt-auto inline-flex items-center gap-1 self-start rounded-full bg-success-soft px-1.5 py-0.5 text-[9px] font-medium text-success-soft-foreground">
        <ShieldCheck className="size-2.5" /> MDR 2017
      </span>
    </motion.div>
    <motion.span
      className="absolute right-4 top-0 text-primary"
      animate={{ scale: [1, 1.25, 1], rotate: [0, 15, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <Sparkles className="size-5" />
    </motion.span>
  </div>
);
