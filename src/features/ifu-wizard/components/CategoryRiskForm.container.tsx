"use client";

import type { DeviceProfile, RiskClass, SectionKey } from "../types";
import { useCategoryRiskActions, useCategoryRiskDerived, useCategoryRiskForm } from "./CategoryRiskForm.hooks";
import { CategoryRiskFormPresentation } from "./CategoryRiskForm.presentation";

interface CategoryRiskFormContainerProps {
  documentId: string;
  profile: DeviceProfile;
  sectionsWithContent: SectionKey[];
}

export const CategoryRiskFormContainer = ({ documentId, profile, sectionsWithContent }: CategoryRiskFormContainerProps) => {
  const { form, handleCategoryChange, applyRiskClass } = useCategoryRiskForm(profile);
  const derived = useCategoryRiskDerived(form, profile, sectionsWithContent);
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
