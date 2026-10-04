"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Check, LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface SectionFooterActionsProps {
  previousHref: string | null;
  exitHref: string;
  completeLabel: string;
  isBursting: boolean;
  onComplete: () => void;
}

const BURST_RAYS = Array.from({ length: 8 }, (_, i) => i * 45);

export const SectionFooterActions = ({ previousHref, exitHref, completeLabel, isBursting, onComplete }: SectionFooterActionsProps) => (
  <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex gap-2">
      {previousHref ? (
        <Button asChild variant="ghost" className="h-9">
          <Link href={previousHref}>
            <ArrowLeft /> Previous Section
          </Link>
        </Button>
      ) : (
        <Button variant="ghost" className="h-9" disabled>
          <ArrowLeft /> Previous Section
        </Button>
      )}
      <Button asChild variant="outline" className="h-9">
        <Link href={exitHref}>
          <LogOut /> Save &amp; Exit
        </Link>
      </Button>
    </div>
    <div className="relative">
      <AnimatePresence>
        {isBursting && (
          <span aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
            {BURST_RAYS.map((angle) => (
              <motion.span
                key={angle}
                className="absolute size-1.5 rounded-full bg-success"
                initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                animate={{
                  opacity: 0,
                  x: Math.cos((angle * Math.PI) / 180) * 70,
                  y: Math.sin((angle * Math.PI) / 180) * 32,
                  scale: 0.4,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            ))}
          </span>
        )}
      </AnimatePresence>
      <motion.div animate={isBursting ? { scale: [1, 1.06, 1] } : { scale: 1 }} transition={{ duration: 0.35 }}>
        <Button
          onClick={onComplete}
          disabled={isBursting}
          className="h-10 w-full px-4 shadow-md shadow-primary/20 sm:w-auto disabled:opacity-100"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isBursting ? "done" : "idle"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="inline-flex items-center gap-1.5"
            >
              <Check className="size-4" strokeWidth={isBursting ? 3 : 2} />
              {isBursting ? "Marked complete" : completeLabel}
            </motion.span>
          </AnimatePresence>
        </Button>
      </motion.div>
    </div>
  </div>
);
