"use client";

import { motion } from "motion/react";

import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
  password: string;
}

const LEVELS = [
  { label: "Too weak", className: "bg-danger" },
  { label: "Weak", className: "bg-danger" },
  { label: "Fair", className: "bg-warning" },
  { label: "Good", className: "bg-info" },
  { label: "Strong", className: "bg-success" },
] as const;

export const scorePassword = (password: string): number => {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Za-z]/.test(password) && /[0-9]/.test(password)) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password) || password.length >= 14) score++;
  return score;
};

export const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  const score = scorePassword(password);
  const level = LEVELS[score];

  return (
    <div className="space-y-1.5" aria-live="polite">
      <div className="grid grid-cols-4 gap-1.5" aria-hidden>
        {[0, 1, 2, 3].map((index) => (
          <span key={index} className="h-1 overflow-hidden rounded-full bg-muted">
            <motion.span
              className={cn("block h-full origin-left rounded-full", level.className)}
              initial={false}
              animate={{ scaleX: index < score ? 1 : 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            />
          </span>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        {password ? (
          <>
            Strength: <span className="font-medium text-foreground">{level.label}</span>
          </>
        ) : (
          "At least 8 characters, with a letter and a number."
        )}
      </p>
    </div>
  );
};
