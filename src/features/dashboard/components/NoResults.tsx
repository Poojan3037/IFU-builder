"use client";

import { motion } from "motion/react";
import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";

interface NoResultsProps {
  onClearFilters: () => void;
}

export const NoResults = ({ onClearFilters }: NoResultsProps) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center gap-3 px-6 py-16 text-center"
  >
    <span className="grid size-12 place-items-center rounded-2xl bg-muted text-muted-foreground">
      <SearchX aria-hidden className="size-6" />
    </span>
    <div>
      <p className="font-medium">No documents match</p>
      <p className="mt-1 text-sm text-muted-foreground">Try a different search term or clear the filters.</p>
    </div>
    <Button variant="outline" size="sm" onClick={onClearFilters}>
      Clear filters
    </Button>
  </motion.div>
);
