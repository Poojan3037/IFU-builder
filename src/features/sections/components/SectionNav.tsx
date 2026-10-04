"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import Link from "next/link";

import { SPRING } from "@/lib/motion";
import { cn } from "@/lib/utils";

import type { SectionNavItem } from "./SectionsWorkspace.hooks";

interface SectionNavProps {
  documentId: string;
  items: SectionNavItem[];
  /** Distinguishes desktop vs drawer instances so their sliding indicators don't share layout. */
  layoutScope: string;
  onNavigate?: () => void;
}

const StateMarker = ({ item }: { item: SectionNavItem }) => {
  if (item.state === "current")
    return (
      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground shadow-sm shadow-primary/30">
        {item.number}
      </span>
    );
  if (item.isComplete)
    return (
      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-success-soft text-success-soft-foreground ring-1 ring-inset ring-success/30">
        <Check className="size-3.5" strokeWidth={3} />
      </span>
    );
  return <span className="size-6 shrink-0 rounded-full border-2 border-dashed border-border bg-background" />;
};

export const SectionNav = ({ documentId, items, layoutScope, onNavigate }: SectionNavProps) => (
  <nav aria-label="IFU sections">
    <ol className="flex flex-col gap-0.5">
      {items.map((item) => {
        const isCurrent = item.state === "current";
        const needsAttention = item.isRequired && !item.isComplete && !isCurrent;
        return (
          <li key={item.key}>
            <Link
              href={`/ifu/${documentId}/sections/${item.key}`}
              onClick={onNavigate}
              aria-current={isCurrent ? "page" : undefined}
              className={cn(
                "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                isCurrent ? "font-medium text-foreground" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
              )}
            >
              {isCurrent && (
                <motion.span
                  layoutId={`section-nav-active-${layoutScope}`}
                  className="absolute inset-0 rounded-xl bg-accent ring-1 ring-inset ring-primary/15"
                  transition={SPRING.snappy}
                />
              )}
              <span className="relative">
                <StateMarker item={item} />
              </span>
              <span className="relative min-w-0 flex-1 truncate">{item.title}</span>
              {needsAttention && (
                <span className="relative flex items-center">
                  <span aria-hidden className="size-1.5 rounded-full bg-danger" />
                  <span className="sr-only">Required, not complete</span>
                </span>
              )}
              {item.isComplete && !isCurrent && <span className="sr-only">Complete</span>}
            </Link>
          </li>
        );
      })}
    </ol>
  </nav>
);
