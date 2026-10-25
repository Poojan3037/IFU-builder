"use client";

import type { BasicInfoDefaults } from "../queries";
import { useBasicInfoActions, useBasicInfoForm } from "./BasicInfoForm.hooks";
import { BasicInfoFormPresentation } from "./BasicInfoForm.presentation";

interface BasicInfoFormContainerProps {
  documentId: string;
  defaults: BasicInfoDefaults;
}

export const BasicInfoFormContainer = ({ documentId, defaults }: BasicInfoFormContainerProps) => {
  const { form, handleManufacturerTypeChange } = useBasicInfoForm(defaults);
  const actions = useBasicInfoActions(form, documentId);

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
