"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm, useWatch, type FieldErrors } from "react-hook-form";
import { toast } from "sonner";

import { SECTION_CATALOGUE } from "@/features/sections/catalogue";

import { saveCategoryRiskAction } from "../actions";
import { CONDITIONAL_SECTIONS, getApplicableSections, getExtraWarnings } from "../rules/applicability";
import { categoryRiskDraftSchema, categoryRiskSchema, type CategoryRiskInput, type SaveCategoryRiskMode } from "../schema";
import type { DeviceCategory, DeviceProfile, RiskClass, SectionKey } from "../types";
import type { ConsistencyWarning } from "./ConsistencyWarnings";

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

/** Live derived state for the includes panel, consistency warnings and the WF-02 notice. */
export const useCategoryRiskDerived = (
  form: ReturnType<typeof useCategoryRiskForm>["form"],
  initialProfile: DeviceProfile,
  sectionsWithContent: SectionKey[],
) => {
  const values = useWatch({ control: form.control }) as CategoryRiskInput;
  const applicable = getApplicableSections(values);
  const initiallyApplicable = getApplicableSections(initialProfile);

  const addedSections = applicable.filter((key) => CONDITIONAL_SECTIONS.includes(key));
  const coreSections = applicable.filter((key) => !CONDITIONAL_SECTIONS.includes(key));
  const hiddenSections = initiallyApplicable.filter((key) => !applicable.includes(key) && sectionsWithContent.includes(key));

  const warnings: ConsistencyWarning[] = [];
  if (values.category === "SINGLE_USE" && values.isReusable === true)
    warnings.push({ id: "single-use-reusable", message: "You chose Single-use but said the device is reprocessed and reused. Check one of these answers." });
  if (values.category === "REUSABLE" && values.isReusable === false)
    warnings.push({ id: "reusable-not-reused", message: "You chose Reusable instrument but said it isn't reused. Check one of these answers." });
  if (values.riskClass === "A" && values.isSterile === true)
    warnings.push({ id: "class-a-sterile", message: "Sterile Class A devices may need a licence, not just registration. [verify]" });

  return { values, addedSections, coreSections, hiddenSections, extraWarnings: getExtraWarnings(values), warnings };
};

const sectionTitles = (keys: SectionKey[]) => keys.map((key) => SECTION_CATALOGUE[key].title).join(", ");

export const useCategoryRiskActions = (form: ReturnType<typeof useCategoryRiskForm>["form"], documentId: string) => {
  const router = useRouter();
  const [helperOpen, setHelperOpen] = useState(false);
  const [isSavingDraft, startDraft] = useTransition();
  const [isContinuing, startContinue] = useTransition();

  /** Returns true on success; surfaces field errors or a toast otherwise, and the WF-02 notice when sections get hidden. */
  const persist = async (values: CategoryRiskInput, mode: SaveCategoryRiskMode) => {
    const result = await saveCategoryRiskAction({ documentId, mode, values });
    if (result.success) {
      form.reset(values, { keepValues: true, keepErrors: true });
      const { hiddenSections } = result.data;
      if (hiddenSections.length)
        toast.info("Some sections are now hidden", {
          description: `${sectionTitles(hiddenSections)} no longer apply. Your content is kept if you change the answers back.`,
        });
      return true;
    }
    const { fieldErrors, message } = result.error;
    const keys = Object.keys(fieldErrors ?? {}).filter((key) => key in form.getValues());
    keys.forEach((key, index) =>
      form.setError(key as keyof CategoryRiskInput, { message: fieldErrors?.[key]?.[0] }, { shouldFocus: index === 0 }),
    );
    toast.error(keys.length ? "Fix the highlighted answers before saving" : message);
    return false;
  };

  const handleInvalid = (errors: FieldErrors<CategoryRiskInput>) => {
    const count = Object.keys(errors).length;
    toast.error(`${count} answer${count === 1 ? " is" : "s are"} still needed`);
  };

  const handleSaveDraft = () => {
    const result = categoryRiskDraftSchema.safeParse(form.getValues());
    if (!result.success) return toast.error("Some answers are not valid");
    startDraft(async () => {
      if (!(await persist(result.data, "draft"))) return;
      toast.success("Draft saved", { description: "You can resume from the dashboard any time." });
      router.push("/dashboard");
    });
  };

  const handleSubmit = form.handleSubmit(
    (values) =>
      startContinue(async () => {
        const parsed = categoryRiskSchema.safeParse(values);
        if (!parsed.success) return;
        if (await persist(parsed.data, "continue")) router.push(`/ifu/${documentId}/sections/device_description`);
      }),
    handleInvalid,
  );

  return {
    helperOpen,
    setHelperOpen,
    isSavingDraft,
    isContinuing,
    handleSubmit,
    handleSaveDraft,
    handleBack: () => router.push(`/ifu/${documentId}/basic-info`),
  };
};
