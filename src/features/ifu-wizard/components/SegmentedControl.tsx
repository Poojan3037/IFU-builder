"use client";

import { motion } from "motion/react";
import { useId, type ReactNode } from "react";

import { SPRING } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { useRadioGroupKeys } from "./SegmentedControl.hooks";

export interface SegmentedOption<T extends string> {
  value: T;
  label: ReactNode;
  description?: ReactNode;
}

interface SegmentedControlProps<T extends string> {
  options: readonly SegmentedOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  invalid?: boolean;
  /** Ref for the first item so RHF can focus the control on error. */
  focusRef?: (node: HTMLElement | null) => void;
  size?: "default" | "lg";
  className?: string;
}

/** Radio-group semantics with a spring-animated selection pill. */
export const SegmentedControl = <T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  ariaLabelledBy,
  invalid = false,
  focusRef,
  size = "default",
  className,
}: SegmentedControlProps<T>) => {
  const layoutId = useId();
  const values = options.map((option) => option.value);
  const { handleKeyDown, setItemRef, tabIndexFor } = useRadioGroupKeys(values, value, onChange);

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-invalid={invalid || undefined}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative inline-grid w-full auto-cols-fr grid-flow-col gap-1 rounded-xl border bg-muted/60 p-1",
        invalid && "border-destructive ring-3 ring-destructive/15",
        className,
      )}
    >
      {options.map((option, index) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            ref={(node) => {
              setItemRef(index)(node);
              if (index === 0) focusRef?.(node);
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={tabIndexFor(option.value, index)}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative z-0 flex flex-col items-center justify-center rounded-lg px-3 text-sm font-medium outline-none transition-colors",
              "focus-visible:ring-3 focus-visible:ring-ring/50",
              size === "lg" ? "min-h-14 py-2" : "min-h-9 py-1.5",
              selected ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {selected && (
              <motion.span
                layoutId={layoutId}
                transition={SPRING.snappy}
                aria-hidden
                className="absolute inset-0 -z-10 rounded-lg bg-background shadow-sm ring-1 ring-primary/25"
              />
            )}
            <span>{option.label}</span>
            {option.description && <span className="text-[11px] font-normal text-muted-foreground">{option.description}</span>}
          </button>
        );
      })}
    </div>
  );
};
