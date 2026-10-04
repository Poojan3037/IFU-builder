"use client";

import { AnimatePresence, motion } from "motion/react";
import { FileDown, Lock } from "lucide-react";

import { cn } from "@/lib/utils";

import { SHOWCASE_ISSUES } from "../constants";
import { useScrollResolvedCount } from "./ComplianceShowcase.hooks";
import { SectionHeading } from "./SectionHeading";
import { ShowcaseIssueCard } from "./ShowcaseIssueCard";

export const ComplianceShowcase = () => {
  const { ref, resolved } = useScrollResolvedCount(SHOWCASE_ISSUES.length);
  const remaining = SHOWCASE_ISSUES.length - resolved;
  const allClear = remaining === 0;

  return (
    <section id="compliance" aria-labelledby="compliance-heading" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-32">
          <SectionHeading
            id="compliance-heading"
            align="left"
            eyebrow="Compliance check"
            title="Catch what's missing before your IFU ships"
            description="Our rule engine checks your document against MDR 2017 labelling requirements for your device's category and class. Blocking issues stop export; advisory ones are suggestions."
          />
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full bg-danger-soft px-3 py-1 font-medium text-danger-soft-foreground">
              <span className="size-2 rounded-full bg-danger" /> Blocking
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-warning-soft px-3 py-1 font-medium text-warning-soft-foreground">
              <span className="size-2 rounded-full bg-warning" /> Advisory
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-success-soft px-3 py-1 font-medium text-success-soft-foreground">
              <span className="size-2 rounded-full bg-success" /> Looks good
            </span>
          </div>
        </div>

        <div ref={ref} className="glass rounded-3xl p-5 shadow-2xl shadow-primary/5 sm:p-6">
          <div aria-live="polite" className="mb-4 flex items-center justify-between gap-3">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={allClear ? "clear" : remaining}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="font-semibold"
              >
                {allClear ? "All checks passed" : `${remaining} ${remaining === 1 ? "issue needs" : "issues need"} your attention`}
              </motion.p>
            </AnimatePresence>
            <span className="text-xs text-muted-foreground">Class C implant</span>
          </div>
          <ul className="flex flex-col gap-3">
            {SHOWCASE_ISSUES.map((issue, index) => (
              <ShowcaseIssueCard key={issue.id} issue={issue} resolved={index < resolved} />
            ))}
          </ul>
          <div
            className={cn(
              "mt-5 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-500",
              allClear ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" : "bg-muted text-muted-foreground",
            )}
          >
            {allClear ? <FileDown aria-hidden className="size-4" /> : <Lock aria-hidden className="size-4" />}
            {allClear ? "Continue to Preview" : "Export locked until blocking issues are fixed"}
          </div>
        </div>
      </div>
    </section>
  );
};
