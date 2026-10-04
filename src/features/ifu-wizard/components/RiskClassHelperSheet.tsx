"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Check, Compass, RotateCcw, ShieldQuestion, TriangleAlert, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { stepSlide } from "@/lib/motion";

import { RISK_CLASS_META } from "../constants";
import type { RiskClass } from "../types";
import { useRiskClassHelper } from "./RiskClassHelper.hooks";
import type { HelperTrack } from "./RiskClassHelper.constants";
import { SegmentedControl } from "./SegmentedControl";

interface RiskClassHelperSheetProps {
  initialTrack: HelperTrack;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (riskClass: RiskClass) => void;
}

const TRACK_OPTIONS = [
  { value: "NON_IVD" as const, label: "Non-IVD device" },
  { value: "IVD" as const, label: "IVD" },
];

export const RiskClassHelperSheet = ({ initialTrack, open, onOpenChange, onApply }: RiskClassHelperSheetProps) => {
  const helper = useRiskClassHelper(initialTrack);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button type="button" variant="link" size="sm" className="h-auto px-0">
          <Compass /> Not sure? Use the Risk Class Helper
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full gap-0 sm:max-w-md">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="flex items-center gap-2">
            <ShieldQuestion className="size-4.5 text-primary" /> Risk Class Helper
          </SheetTitle>
          <SheetDescription>Answer a few questions based on the CDSCO First Schedule to get a suggested class.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-4">
          <SegmentedControl options={TRACK_OPTIONS} value={helper.track} onChange={helper.changeTrack} ariaLabel="Decision tree" />
          <div className="relative min-h-64">
            <AnimatePresence mode="wait" custom={helper.direction} initial={false}>
              {helper.question && (
                <motion.div key={helper.question.id} custom={helper.direction} variants={stepSlide} initial="enter" animate="center" exit="exit" className="space-y-5">
                  <p className="font-mono text-xs text-muted-foreground">Question {helper.step}</p>
                  <h3 className="text-lg font-semibold leading-snug text-balance">{helper.question.question}</h3>
                  {helper.question.help && <p className="text-sm text-muted-foreground">{helper.question.help}</p>}
                  <div className="grid grid-cols-2 gap-3">
                    <Button type="button" variant="outline" size="lg" className="h-12" onClick={() => helper.answer(true)}>
                      <Check /> Yes
                    </Button>
                    <Button type="button" variant="outline" size="lg" className="h-12" onClick={() => helper.answer(false)}>
                      <X /> No
                    </Button>
                  </div>
                </motion.div>
              )}
              {helper.result && (
                <motion.div key={helper.result.id} custom={helper.direction} variants={stepSlide} initial="enter" animate="center" exit="exit" className="space-y-4">
                  <div className="rounded-2xl border bg-gradient-to-br from-accent to-card p-5 text-center">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Suggested class</p>
                    <motion.p
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.1 }}
                      className="mt-1 text-5xl font-semibold tracking-tight text-gradient"
                    >
                      {RISK_CLASS_META[helper.result.riskClass].label}
                    </motion.p>
                    <p className="mt-1 text-sm text-muted-foreground">{RISK_CLASS_META[helper.result.riskClass].description}</p>
                  </div>
                  <p className="text-sm">{helper.result.summary}</p>
                  <p className="rounded-lg bg-muted px-3 py-2 font-mono text-xs text-muted-foreground">
                    {helper.result.rule} <span className="text-warning-soft-foreground">[verify]</span>
                  </p>
                  <Button type="button" size="lg" className="h-11 w-full" onClick={() => helper.result && onApply(helper.result.riskClass)}>
                    <Check /> Apply suggestion
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="mt-auto space-y-4">
            <div className="flex justify-between">
              <Button type="button" variant="ghost" size="sm" onClick={helper.back} disabled={!helper.canGoBack}>
                <ArrowLeft /> Back
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={helper.restart} disabled={!helper.canGoBack}>
                <RotateCcw /> Start over
              </Button>
            </div>
            <p role="note" className="flex items-start gap-2 rounded-lg bg-warning-soft px-3 py-2.5 text-xs text-warning-soft-foreground">
              <TriangleAlert aria-hidden className="mt-0.5 size-3.5 shrink-0" />
              Confirm against your CDSCO classification / licence.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
