"use client";

import type { IfuDocument } from "../types";
import { useBasicInfoActions, useBasicInfoForm } from "./BasicInfoForm.hooks";
import { BasicInfoFormPresentation } from "./BasicInfoForm.presentation";

interface BasicInfoFormContainerProps {
  document: IfuDocument;
}

export const BasicInfoFormContainer = ({ document }: BasicInfoFormContainerProps) => {
  const { form, handleManufacturerTypeChange } = useBasicInfoForm(document);
  const actions = useBasicInfoActions(form, document.id);

  return (
    <BasicInfoFormPresentation
      form={form}
      onSubmit={actions.handleSubmit}
      onSaveDraft={actions.handleSaveDraft}
      onBack={actions.handleBack}
      onDiscard={actions.handleDiscard}
      onManufacturerTypeChange={handleManufacturerTypeChange}
      leaveDialogOpen={actions.leaveDialogOpen}
      onLeaveDialogOpenChange={actions.setLeaveDialogOpen}
      isSavingDraft={actions.isSavingDraft}
      isContinuing={actions.isContinuing}
    />
  );
};
