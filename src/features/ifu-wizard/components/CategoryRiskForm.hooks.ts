"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch, type FieldErrors } from "react-hook-form";
import { toast } from "sonner";

import { MOCK_SECTION_CONTENT } from "@/features/sections/mock-data";

import { CONDITIONAL_SECTIONS, getApplicableSections, getExtraWarnings } from "../rules/applicability";
import { categoryRiskSchema, type CategoryRiskInput } from "../schema";
import type { DeviceCategory, DeviceProfile, RiskClass } from "../types";
import type { ConsistencyWarning } from "./ConsistencyWarnings";
import { useWizardNavigation } from "./WizardNavigation.hooks";

/** FR-S2-02: sensible defaults pre-selected by category (user can still change them). */
const CATEGORY_DEFAULTS: Partial<Record<DeviceCategory, Partial<CategoryRiskInput>>> = {
  SINGLE_USE: { isReusable: false },
  REUSABLE: { isReusable: true },
  IMPLANT: { isReusable: false },
  SAMD: { isSterile: false, isReusable: false, isActive: null, hasMeasuringFn: null },
};

export const useCategoryRiskForm = (profile: DeviceProfile) => {
  const form = useForm<CategoryRiskInput>({
    resolver: zodResolver(categoryRiskSchema),
    defaultValues: { ...profile },
    mode: "onTouched",
  });

  const handleCategoryChange = (category: DeviceCategory) => {
    form.setValue("category", category, { shouldDirty: true, shouldValidate: form.formState.isSubmitted });
    const defaults = CATEGORY_DEFAULTS[category] ?? {};
    (Object.keys(defaults) as (keyof CategoryRiskInput)[]).forEach((key) => {
      form.setValue(key, defaults[key] as never, { shouldDirty: true });
    });
  };

  const applyRiskClass = (riskClass: RiskClass) => form.setValue("riskClass", riskClass, { shouldDirty: true, shouldValidate: true });

  return { form, handleCategoryChange, applyRiskClass };
};

const SECTIONS_WITH_CONTENT = new Set(Object.keys(MOCK_SECTION_CONTENT));

/** Live derived state for the includes panel, consistency warnings and the WF-02 notice. */
export const useCategoryRiskDerived = (form: ReturnType<typeof useCategoryRiskForm>["form"], initialProfile: DeviceProfile) => {
  const values = useWatch({ control: form.control }) as CategoryRiskInput;
  const applicable = getApplicableSections(values);
  const initiallyApplicable = getApplicableSections(initialProfile);

  const addedSections = applicable.filter((key) => CONDITIONAL_SECTIONS.includes(key));
  const coreSections = applicable.filter((key) => !CONDITIONAL_SECTIONS.includes(key));
  const hiddenSections = initiallyApplicable.filter((key) => !applicable.includes(key) && SECTIONS_WITH_CONTENT.has(key));

  const warnings: ConsistencyWarning[] = [];
  if (values.category === "SINGLE_USE" && values.isReusable === true)
    warnings.push({ id: "single-use-reusable", message: "You chose Single-use but said the device is reprocessed and reused. Check one of these answers." });
  if (values.category === "REUSABLE" && values.isReusable === false)
    warnings.push({ id: "reusable-not-reused", message: "You chose Reusable instrument but said it isn't reused. Check one of these answers." });
  if (values.riskClass === "A" && values.isSterile === true)
    warnings.push({ id: "class-a-sterile", message: "Sterile Class A devices may need a licence, not just registration. [verify]" });

  return { values, addedSections, coreSections, hiddenSections, extraWarnings: getExtraWarnings(values), warnings };
};

export const useCategoryRiskActions = (form: ReturnType<typeof useCategoryRiskForm>["form"], documentId: string) => {
  const nav = useWizardNavigation();
  const [helperOpen, setHelperOpen] = useState(false);

  const handleInvalid = (errors: FieldErrors<CategoryRiskInput>) => {
    const count = Object.keys(errors).length;
    toast.error(`${count} answer${count === 1 ? " is" : "s are"} still needed`);
  };

  return {
    helperOpen,
    setHelperOpen,
    isSavingDraft: nav.isSavingDraft,
    isContinuing: nav.isContinuing,
    handleSubmit: form.handleSubmit(() => nav.continueTo(`/ifu/${documentId}/sections/device_description`), handleInvalid),
    handleSaveDraft: nav.saveDraftAndExit,
    handleBack: () => nav.go(`/ifu/${documentId}/basic-info`),
  };
};
