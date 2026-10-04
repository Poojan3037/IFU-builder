"use client";

import { motion } from "motion/react";
import { FileText, ScrollText } from "lucide-react";

import { SPRING } from "@/lib/motion";
import { cn } from "@/lib/utils";

import type { PreviewViewMode } from "../types";

const OPTIONS: { value: PreviewViewMode; label: string; icon: typeof FileText }[] = [
  { value: "document", label: "Document View", icon: ScrollText },
  { value: "print", label: "Print Layout", icon: FileText },
];

interface ViewModeToggleProps {
  value: PreviewViewMode;
  onChange: (value: PreviewViewMode) => void;
}

export const ViewModeToggle = ({ value, onChange }: ViewModeToggleProps) => (
  <div role="radiogroup" aria-label="Preview layout" className="inline-flex rounded-full border bg-muted/60 p-1">
    {OPTIONS.map((option) => {
      const isActive = option.value === value;
      const Icon = option.icon;
      return (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={isActive}
          onClick={() => onChange(option.value)}
          className={cn(
            "relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
            isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {isActive && (
            <motion.span layoutId="preview-view-pill" transition={SPRING.snappy} className="absolute inset-0 rounded-full bg-background shadow-sm ring-1 ring-border" />
          )}
          <Icon aria-hidden className="relative size-3.5" />
          <span className="relative max-sm:sr-only">{option.label}</span>
        </button>
      );
    })}
  </div>
);
