"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm, useFormState, type FieldErrors } from "react-hook-form";
import { toast } from "sonner";

import { saveBasicInfoAction } from "../actions";
import type { BasicInfoDefaults } from "../queries";
import { basicInfoDraftSchema, basicInfoSchema, type BasicInfoInput, type SaveBasicInfoMode } from "../schema";
import type { ManufacturerType } from "../types";
import { useAutosave } from "./Autosave.hooks";
import { useAutosaveStatus } from "./AutosaveStatus.context";

const toDefaults = (defaults: BasicInfoDefaults): BasicInfoInput => ({
  ...defaults,
  customerCarePhone: defaults.customerCarePhone.replace(/^\+91\s?/, ""),
  issueDate: new Date(defaults.issueDate),
});

export const useBasicInfoForm = (defaults: BasicInfoDefaults) => {
  const form = useForm<BasicInfoInput>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: toDefaults(defaults),
    mode: "onTouched",
  });

  /** FR-S1-06: Importer forces an import licence; switching back restores a manufacturing licence. */
  const handleManufacturerTypeChange = (type: ManufacturerType) => {
    const current = form.getValues("licenceType");
    if (type === "IMPORTER") form.setValue("licenceType", "IMPORT", { shouldDirty: true });
    else if (current === "IMPORT") form.setValue("licenceType", "MANUFACTURING", { shouldDirty: true });
  };

  return { form, handleManufacturerTypeChange };
};

type SaveMode = SaveBasicInfoMode;

/** Save as Draft (formats only), Continue (full validation), autosave and the unsaved-changes guard. */
export const useBasicInfoActions = (form: ReturnType<typeof useBasicInfoForm>["form"], documentId: string) => {
  const router = useRouter();
  const { setStatus } = useAutosaveStatus();
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
  const [isSavingDraft, startDraft] = useTransition();
  const [isContinuing, startContinue] = useTransition();
  const { isDirty } = useFormState({ control: form.control });

  /** Persists `values`; returns false (after surfacing errors on fields or a toast) when the save fails. */
  const persist = async (values: BasicInfoInput, mode: SaveMode) => {
    const result = await saveBasicInfoAction({ documentId, mode, values });
    if (result.success) {
      // New baseline for isDirty without clobbering anything typed while the request was in flight.
      form.reset(values, { keepValues: true, keepErrors: true });
      return true;
    }
    const { fieldErrors, message } = result.error;
    const keys = Object.keys(fieldErrors ?? {}).filter((key) => key in form.getValues());
    keys.forEach((key, index) =>
      form.setError(key as keyof BasicInfoInput, { message: fieldErrors?.[key]?.[0] }, { shouldFocus: index === 0 }),
    );
    if (mode !== "autosave") toast.error(keys.length ? "Fix the highlighted fields before saving" : message);
    return false;
  };

  const autosave = (values: BasicInfoInput) => persist(values, "autosave");
  useAutosave({ form, save: autosave, paused: isSavingDraft || isContinuing });

  const handleSaveDraft = () => {
    const result = basicInfoDraftSchema.safeParse(form.getValues());
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof BasicInfoInput;
        form.setError(field, { message: issue.message }, { shouldFocus: true });
      });
      toast.error("Fix the highlighted formats before saving");
      return;
    }
    setLeaveDialogOpen(false);
    startDraft(async () => {
      setStatus({ state: "saving", savedAt: null });
      const saved = await persist(result.data, "draft");
      setStatus(saved ? { state: "saved", savedAt: new Date().toISOString() } : { state: "error", savedAt: null });
      if (!saved) return;
      toast.success("Draft saved", { description: "You can resume from the dashboard any time." });
      router.push("/dashboard");
    });
  };

  const handleInvalid = (errors: FieldErrors<BasicInfoInput>) => {
    const count = Object.keys(errors).length;
    toast.error(`${count} field${count === 1 ? "" : "s"} need${count === 1 ? "s" : ""} your attention`);
  };

  const handleSubmit = form.handleSubmit(
    (values) =>
      startContinue(async () => {
        setStatus({ state: "saving", savedAt: null });
        const saved = await persist(values, "continue");
        setStatus(saved ? { state: "saved", savedAt: new Date().toISOString() } : { state: "error", savedAt: null });
        if (saved) router.push(`/ifu/${documentId}/category-risk`);
      }),
    handleInvalid,
  );

  const handleBack = () => {
    if (isDirty) setLeaveDialogOpen(true);
    else router.push("/dashboard");
  };

  const handleDiscard = () => {
    setLeaveDialogOpen(false);
    router.push("/dashboard");
  };

  return {
    handleSaveDraft,
    handleSubmit,
    handleBack,
    handleDiscard,
    leaveDialogOpen,
    setLeaveDialogOpen,
    isSavingDraft,
    isContinuing,
  };
};
