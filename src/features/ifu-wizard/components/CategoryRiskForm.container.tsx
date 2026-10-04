"use client";

import type { RiskClass } from "../types";
import type { DeviceProfile } from "../types";
import { useCategoryRiskActions, useCategoryRiskDerived, useCategoryRiskForm } from "./CategoryRiskForm.hooks";
import { CategoryRiskFormPresentation } from "./CategoryRiskForm.presentation";

interface CategoryRiskFormContainerProps {
  documentId: string;
  profile: DeviceProfile;
}

export const CategoryRiskFormContainer = ({ documentId, profile }: CategoryRiskFormContainerProps) => {
  const { form, handleCategoryChange, applyRiskClass } = useCategoryRiskForm(profile);
  const derived = useCategoryRiskDerived(form, profile);
  const actions = useCategoryRiskActions(form, documentId);

  const handleApplySuggestion = (riskClass: RiskClass) => {
    applyRiskClass(riskClass);
    actions.setHelperOpen(false);
  };

  return (
    <CategoryRiskFormPresentation
      form={form}
      category={derived.values.category}
      addedSections={derived.addedSections}
      coreSections={derived.coreSections}
      hiddenSections={derived.hiddenSections}
      extraWarnings={derived.extraWarnings}
      warnings={derived.warnings}
      onCategoryChange={handleCategoryChange}
      helperOpen={actions.helperOpen}
      onHelperOpenChange={actions.setHelperOpen}
      onApplySuggestion={handleApplySuggestion}
      onSubmit={actions.handleSubmit}
      onSaveDraft={actions.handleSaveDraft}
      onBack={actions.handleBack}
      isSavingDraft={actions.isSavingDraft}
      isContinuing={actions.isContinuing}
    />
  );
};
