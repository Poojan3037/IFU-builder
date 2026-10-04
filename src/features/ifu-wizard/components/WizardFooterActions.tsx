"use client";

import { ArrowLeft, ArrowRight, Loader2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";

interface WizardFooterActionsProps {
  backLabel: string;
  onBack: () => void;
  onSaveDraft: () => void;
  isSavingDraft?: boolean;
  isContinuing?: boolean;
  continueLabel?: string;
  /** Form id so Continue can submit a form rendered elsewhere in the tree. */
  formId?: string;
}

/** Sticky action bar: Back / Save as Draft / Continue (FR-S1-02…04, FR-S2-08). */
export const WizardFooterActions = ({
  backLabel,
  onBack,
  onSaveDraft,
  isSavingDraft = false,
  isContinuing = false,
  continueLabel = "Continue",
  formId,
}: WizardFooterActionsProps) => (
  <div className="glass sticky bottom-0 z-30 border-x-0 border-b-0">
    <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
      <Button type="button" variant="ghost" size="lg" onClick={onBack} className="text-muted-foreground">
        <ArrowLeft />
        <span className="max-sm:sr-only">{backLabel}</span>
      </Button>
      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" size="lg" onClick={onSaveDraft} disabled={isSavingDraft || isContinuing}>
          {isSavingDraft ? <Loader2 className="animate-spin" /> : <Save />}
          Save as Draft
        </Button>
        <Button
          type="submit"
          form={formId}
          size="lg"
          disabled={isContinuing || isSavingDraft}
          className="group min-w-32 bg-gradient-to-r from-primary to-info px-4 shadow-md shadow-primary/25 hover:opacity-95"
        >
          {isContinuing ? <Loader2 className="animate-spin" /> : null}
          {continueLabel}
          {!isContinuing && <ArrowRight className="transition-transform group-hover:translate-x-0.5" />}
        </Button>
      </div>
    </div>
  </div>
);
