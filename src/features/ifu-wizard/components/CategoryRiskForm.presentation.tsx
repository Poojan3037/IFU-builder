"use client";

import { AnimatePresence, motion } from "motion/react";
import { Gauge, LayoutGrid, MessageCircleQuestion } from "lucide-react";
import type { FormEventHandler } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";

import { FieldError } from "@/components/ui/field";
import { EASE_OUT_EXPO } from "@/lib/motion";

import type { ExtraWarning } from "../rules/applicability";
import type { CategoryRiskInput } from "../schema";
import type { DeviceCategory, RiskClass, SectionKey } from "../types";
import { CategoryCards } from "./CategoryCards";
import { ConsistencyWarnings, type ConsistencyWarning } from "./ConsistencyWarnings";
import { FormSection } from "./FormSection";
import { IncludesPanel } from "./IncludesPanel";
import { RiskClassControl } from "./RiskClassControl";
import { RiskClassHelperSheet } from "./RiskClassHelperSheet";
import { StepHeading } from "./StepHeading";
import { WizardFooterActions } from "./WizardFooterActions";
import { YesNoQuestion } from "./YesNoQuestion";

interface CategoryRiskFormPresentationProps {
  form: UseFormReturn<CategoryRiskInput>;
  category: DeviceCategory | null;
  addedSections: SectionKey[];
  coreSections: SectionKey[];
  hiddenSections: SectionKey[];
  extraWarnings: ExtraWarning[];
  warnings: ConsistencyWarning[];
  onCategoryChange: (category: DeviceCategory) => void;
  helperOpen: boolean;
  onHelperOpenChange: (open: boolean) => void;
  onApplySuggestion: (riskClass: RiskClass) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onSaveDraft: () => void;
  onBack: () => void;
  isSavingDraft: boolean;
  isContinuing: boolean;
}

const FORM_ID = "category-risk-form";

const reveal = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto", transition: { duration: 0.4, ease: EASE_OUT_EXPO } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
};

export const CategoryRiskFormPresentation = ({
  form,
  category,
  addedSections,
  coreSections,
  hiddenSections,
  extraWarnings,
  warnings,
  onCategoryChange,
  helperOpen,
  onHelperOpenChange,
  onApplySuggestion,
  onSubmit,
  onSaveDraft,
  onBack,
  isSavingDraft,
  isContinuing,
}: CategoryRiskFormPresentationProps) => {
  const isSamd = category === "SAMD";

  return (
    <>
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <StepHeading
          eyebrow="Step 2 of 4 · Category & Risk"
          title="What kind of device is this?"
          description="We'll use this to show you only the sections and warnings that apply."
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <form id={FORM_ID} onSubmit={onSubmit} noValidate className="space-y-6">
            <FormSection icon={LayoutGrid} title="Device category" description="Pick the one that fits best.">
              <p id="category-label" className="sr-only">
                Device category
              </p>
              <Controller
                control={form.control}
                name="category"
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <CategoryCards value={field.value} onChange={onCategoryChange} invalid={fieldState.invalid} focusRef={field.ref} labelledBy="category-label" />
                    <FieldError errors={[fieldState.error]} />
                  </div>
                )}
              />
            </FormSection>

            <FormSection icon={MessageCircleQuestion} title="Quick questions" description="Each answer adds or removes sections and warnings." delay={0.05}>
              <div className="space-y-3">
                <YesNoQuestion control={form.control} name="isSterile" question="Is the device supplied sterile?" required />
                <YesNoQuestion control={form.control} name="isReusable" question="Does it need to be cleaned/reprocessed and reused?" required />
                <AnimatePresence initial={false}>
                  {!isSamd && (
                    <motion.div key="active-measuring" {...reveal} className="space-y-3 overflow-hidden">
                      <YesNoQuestion control={form.control} name="isActive" question="Is it an active (powered) device?" hint="Runs on electricity, batteries or another energy source." />
                      <YesNoQuestion control={form.control} name="hasMeasuringFn" question="Does it have a measuring function?" hint="e.g. a thermometer or a dosing syringe with a scale." />
                    </motion.div>
                  )}
                </AnimatePresence>
                <YesNoQuestion control={form.control} name="isLayUser" question="Is it intended for lay/home users?" hint="People without medical training." />
              </div>
            </FormSection>

            <FormSection icon={Gauge} title="Risk classification" description="As per your CDSCO licence or registration." delay={0.1}>
              <p id="risk-class-label" className="sr-only">
                Risk class
              </p>
              <RiskClassControl control={form.control} labelledBy="risk-class-label" />
              <div className="mt-3">
                <RiskClassHelperSheet
                  key={category === "IVD" ? "IVD" : "NON_IVD"}
                  initialTrack={category === "IVD" ? "IVD" : "NON_IVD"}
                  open={helperOpen}
                  onOpenChange={onHelperOpenChange}
                  onApply={onApplySuggestion}
                />
              </div>
            </FormSection>

            <ConsistencyWarnings warnings={warnings} hiddenSections={hiddenSections} />
          </form>
          <div>
            <IncludesPanel coreSections={coreSections} addedSections={addedSections} extraWarnings={extraWarnings} />
          </div>
        </div>
      </div>
      <WizardFooterActions
        formId={FORM_ID}
        backLabel="Back"
        onBack={onBack}
        onSaveDraft={onSaveDraft}
        isSavingDraft={isSavingDraft}
        isContinuing={isContinuing}
      />
    </>
  );
};
