"use client";

import { motion } from "motion/react";
import { ArrowLeft, Download, FileText, RotateCcw } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { EASE_OUT_EXPO } from "@/lib/motion";

interface ReadyPanelProps {
  fileName: string;
  durationMs: number;
  onDownload: () => void;
  onGenerateAgain: () => void;
}

const CheckDraw = () => (
  <svg viewBox="0 0 64 64" className="size-16" aria-hidden>
    <motion.circle
      cx="32" cy="32" r="28" fill="none" stroke="var(--success)" strokeWidth="4" strokeLinecap="round"
      initial={{ pathLength: 0, rotate: -90 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
      style={{ originX: "50%", originY: "50%" }}
    />
    <motion.path
      d="M20 33 l8 8 l16 -18" fill="none" stroke="var(--success)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.45, delay: 0.45, ease: EASE_OUT_EXPO }}
    />
  </svg>
);

export const ReadyPanel = ({ fileName, durationMs, onDownload, onGenerateAgain }: ReadyPanelProps) => (
  <div role="status" aria-live="polite" className="flex flex-col items-center gap-4 rounded-xl border border-success/30 bg-success-soft/60 p-6 text-center">
    <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 16 }} className="relative">
      <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-success/20 [animation-iteration-count:2]" />
      <CheckDraw />
    </motion.div>
    <div>
      <h2 className="text-lg font-semibold">Your document is ready</h2>
      <p className="text-sm text-muted-foreground">Generated in {(durationMs / 1000).toFixed(1)} seconds</p>
    </div>
    <span className="inline-flex max-w-full items-center gap-2 rounded-lg border bg-background px-3 py-2 font-mono text-xs">
      <FileText aria-hidden className="size-4 shrink-0 text-primary" />
      <span className="truncate">{fileName}</span>
    </span>
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button size="lg" className="h-10 px-5 shadow-lg shadow-primary/25" onClick={onDownload}>
        <Download /> Download PDF
      </Button>
      <Button variant="outline" size="lg" className="h-10" onClick={onGenerateAgain}>
        <RotateCcw /> Change options
      </Button>
    </div>
    <Button asChild variant="link" size="sm" className="text-muted-foreground">
      <Link href="/dashboard">
        <ArrowLeft /> Back to Dashboard
      </Link>
    </Button>
  </div>
);
