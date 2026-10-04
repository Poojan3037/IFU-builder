"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useFormState, type FieldErrors } from "react-hook-form";
import { toast } from "sonner";

import { basicInfoDraftSchema, basicInfoSchema, type BasicInfoInput } from "../schema";
import type { IfuDocument, ManufacturerType } from "../types";
import { useWizardNavigation } from "./WizardNavigation.hooks";

const toDefaults = (doc: IfuDocument): BasicInfoInput => ({
  deviceName: doc.deviceName,
  brandName: doc.brandName,
  modelNumber: doc.modelNumber,
  manufacturerType: doc.manufacturerType,
  manufacturerName: doc.manufacturerName,
  manufacturerAddress: doc.manufacturerAddress,
  manufacturerState: doc.manufacturerState,
  manufacturerPin: doc.manufacturerPin,
  manufacturerCountry: doc.manufacturerType === "IMPORTER" ? doc.manufacturerCountry : "",
  licenceType: doc.licenceType,
  licenceNumber: doc.licenceNumber,
  importerName: doc.importerName,
  importerAddress: doc.importerAddress,
  importerState: "",
  importerPin: "",
  customerCarePhone: doc.customerCarePhone.replace(/^\+91\s?/, ""),
  customerCareEmail: doc.customerCareEmail,
  version: doc.version,
  issueDate: new Date(doc.issueDate),
  description: doc.description,
});

export const useBasicInfoForm = (document: IfuDocument) => {
  const form = useForm<BasicInfoInput>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: toDefaults(document),
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

/** Save as Draft (formats only), Continue (full validation) and the unsaved-changes guard. */
export const useBasicInfoActions = (form: ReturnType<typeof useBasicInfoForm>["form"], documentId: string) => {
  const nav = useWizardNavigation();
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
  const { isDirty } = useFormState({ control: form.control });

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
    nav.saveDraftAndExit();
  };

  const handleInvalid = (errors: FieldErrors<BasicInfoInput>) => {
    const count = Object.keys(errors).length;
    toast.error(`${count} field${count === 1 ? "" : "s"} need${count === 1 ? "s" : ""} your attention`);
  };

  const handleSubmit = form.handleSubmit(() => nav.continueTo(`/ifu/${documentId}/category-risk`), handleInvalid);

  const handleBack = () => {
    if (isDirty) setLeaveDialogOpen(true);
    else nav.go("/dashboard");
  };

  const handleDiscard = () => {
    setLeaveDialogOpen(false);
    nav.go("/dashboard");
  };

  return {
    handleSaveDraft,
    handleSubmit,
    handleBack,
    handleDiscard,
    leaveDialogOpen,
    setLeaveDialogOpen,
    isSavingDraft: nav.isSavingDraft,
    isContinuing: nav.isContinuing,
  };
};
