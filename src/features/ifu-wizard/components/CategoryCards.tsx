"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";

import { SPRING } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { CATEGORY_META } from "../constants";
import type { DeviceCategory } from "../types";
import { useRadioGroupKeys } from "./SegmentedControl.hooks";

interface CategoryCardsProps {
  value: DeviceCategory | null;
  onChange: (value: DeviceCategory) => void;
  invalid?: boolean;
  focusRef?: (node: HTMLElement | null) => void;
  labelledBy: string;
}

const CATEGORIES = Object.keys(CATEGORY_META) as DeviceCategory[];

/** FR-S2-01: single-select category cards with radio-group semantics. */
export const CategoryCards = ({ value, onChange, invalid = false, focusRef, labelledBy }: CategoryCardsProps) => {
  const { handleKeyDown, setItemRef, tabIndexFor } = useRadioGroupKeys(CATEGORIES, value, onChange);

  return (
    <div
      role="radiogroup"
      aria-labelledby={labelledBy}
      aria-invalid={invalid || undefined}
      onKeyDown={handleKeyDown}
      className="grid grid-cols-2 gap-3 md:grid-cols-3"
    >
      {CATEGORIES.map((category, index) => {
        const meta = CATEGORY_META[category];
        const Icon = meta.icon;
        const selected = value === category;
        return (
          <motion.button
            key={category}
            ref={(node) => {
              setItemRef(index)(node);
              if (index === 0) focusRef?.(node);
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={tabIndexFor(category, index)}
            onClick={() => onChange(category)}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            animate={{ scale: selected ? 1.02 : 1 }}
            transition={SPRING.bouncy}
            className={cn(
              "relative flex flex-col items-start gap-3 rounded-2xl border bg-card p-4 text-left outline-none transition-[border-color,box-shadow] sm:p-5",
              "focus-visible:ring-3 focus-visible:ring-ring/50",
              selected ? "border-transparent shadow-lg shadow-primary/10" : "hover:border-primary/30 hover:shadow-md",
              invalid && !value && "border-destructive/60",
            )}
          >
            {selected && (
              <motion.span
                layoutId="category-highlight"
                transition={SPRING.snappy}
                aria-hidden
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/80 to-transparent ring-2 ring-primary"
              />
            )}
            <span
              aria-hidden
              className={cn(
                "relative grid size-10 place-items-center rounded-xl transition-colors duration-300",
                selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
              )}
            >
              <Icon className="size-5" />
            </span>
            <span className="relative space-y-1">
              <span className="block text-sm font-semibold leading-tight">{meta.label}</span>
              <span className="block text-xs leading-snug text-muted-foreground">{meta.description}</span>
            </span>
            {selected && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={SPRING.bouncy}
                aria-hidden
                className="absolute right-3 top-3 grid size-5 place-items-center rounded-full bg-primary text-primary-foreground"
              >
                <Check className="size-3" strokeWidth={3} />
              </motion.span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};
