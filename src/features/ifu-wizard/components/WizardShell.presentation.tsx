"use client";

import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { stepSlide } from "@/lib/motion";

import { AutosaveIndicator } from "./AutosaveIndicator";
import { WizardStepper } from "./WizardStepper";

interface WizardShellPresentationProps {
  documentId: string;
  deviceName: string;
  stepIndex: number;
  direction: number;
  maxReachableIndex: number;
  children: ReactNode;
}

export const WizardShellPresentation = ({
  documentId,
  deviceName,
  stepIndex,
  direction,
  maxReachableIndex,
  children,
}: WizardShellPresentationProps) => (
  <div className="flex flex-1 flex-col">
    <div className="border-b bg-background/70 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <Button asChild variant="ghost" size="sm" className="-ml-2 text-muted-foreground">
            <Link href="/dashboard">
              <ArrowLeft /> Back to Dashboard
            </Link>
          </Button>
          <div className="flex min-w-0 items-center gap-3">
            <span className="hidden truncate text-sm font-medium text-muted-foreground sm:inline">{deviceName}</span>
            {/* Sections has its own live indicator; review steps don't autosave. */}
            {stepIndex < 2 && <AutosaveIndicator />}
          </div>
        </div>
        <WizardStepper documentId={documentId} activeIndex={stepIndex} maxReachableIndex={maxReachableIndex} />
      </div>
    </div>
    <motion.div
      key={stepIndex}
      custom={direction}
      variants={stepSlide}
      initial="enter"
      animate="center"
      className="flex flex-1 flex-col"
    >
      {children}
    </motion.div>
  </div>
);
