"use client";

import type { FormEventHandler } from "react";
import type { UseFormReturn } from "react-hook-form";

import type { BasicInfoInput } from "../schema";
import type { ManufacturerType } from "../types";
import { ContactDocumentFields } from "./ContactDocumentFields";
import { CoverPreview } from "./CoverPreview";
import { DeviceDetailsFields } from "./DeviceDetailsFields";
import { LicenceFields } from "./LicenceFields";
import { ManufacturerFields } from "./ManufacturerFields";
import { StepHeading } from "./StepHeading";
import { UnsavedChangesDialog } from "./UnsavedChangesDialog";
import { WizardFooterActions } from "./WizardFooterActions";

interface BasicInfoFormPresentationProps {
  form: UseFormReturn<BasicInfoInput>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onSaveDraft: () => void;
  onBack: () => void;
  onDiscard: () => void;
  onManufacturerTypeChange: (type: ManufacturerType) => void;
  leaveDialogOpen: boolean;
  onLeaveDialogOpenChange: (open: boolean) => void;
  isSavingDraft: boolean;
  isContinuing: boolean;
}

const FORM_ID = "basic-info-form";

export const BasicInfoFormPresentation = ({
  form,
  onSubmit,
  onSaveDraft,
  onBack,
  onDiscard,
  onManufacturerTypeChange,
  leaveDialogOpen,
  onLeaveDialogOpenChange,
  isSavingDraft,
  isContinuing,
}: BasicInfoFormPresentationProps) => (
  <>
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
      <StepHeading
        eyebrow="Step 1 of 4 · Basic Info"
        title="Tell us about the device"
        description="This information appears on the cover of your IFU document."
      />
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <form id={FORM_ID} onSubmit={onSubmit} noValidate className="space-y-6">
          <DeviceDetailsFields form={form} />
          <ManufacturerFields form={form} onManufacturerTypeChange={onManufacturerTypeChange} />
          <LicenceFields form={form} />
          <ContactDocumentFields form={form} />
        </form>
        <div className="hidden lg:block">
          <CoverPreview form={form} />
        </div>
      </div>
    </div>
    <WizardFooterActions
      formId={FORM_ID}
      backLabel="Back to Dashboard"
      onBack={onBack}
      onSaveDraft={onSaveDraft}
      isSavingDraft={isSavingDraft}
      isContinuing={isContinuing}
    />
    <UnsavedChangesDialog open={leaveDialogOpen} onOpenChange={onLeaveDialogOpenChange} onSaveDraft={onSaveDraft} onDiscard={onDiscard} />
  </>
);
