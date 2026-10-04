"use client";

import { motion } from "motion/react";
import { MailCheck } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { SPRING } from "@/lib/motion";

interface CheckEmailPanelProps {
  title: string;
  children: ReactNode;
  onBack?: () => void;
}

export const CheckEmailPanel = ({ title, children, onBack }: CheckEmailPanelProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center gap-5 py-6 text-center"
    role="status"
  >
    <motion.span
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ ...SPRING.bouncy, delay: 0.1 }}
      className="grid size-16 place-items-center rounded-2xl bg-success-soft text-success-soft-foreground ring-1 ring-success/25"
    >
      <MailCheck aria-hidden className="size-8" />
    </motion.span>
    <div className="space-y-2">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
    <div className="flex w-full flex-col gap-2">
      <Button asChild className="h-10">
        <Link href="/login">Back to log in</Link>
      </Button>
      {onBack && (
        <Button variant="ghost" onClick={onBack}>
          Use a different email
        </Button>
      )}
    </div>
  </motion.div>
);
