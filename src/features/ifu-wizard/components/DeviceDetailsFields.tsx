"use client";

import { Stethoscope } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

import { FieldGroup } from "@/components/ui/field";

import type { BasicInfoInput } from "../schema";
import { FormSection } from "./FormSection";
import { FormTextField } from "./FormTextField";

interface DeviceDetailsFieldsProps {
  form: UseFormReturn<BasicInfoInput>;
}

export const DeviceDetailsFields = ({ form }: DeviceDetailsFieldsProps) => (
  <FormSection icon={Stethoscope} title="Device" description="How the device is named on the cover and in every section.">
    <FieldGroup>
      <FormTextField form={form} name="deviceName" label="Device name" required placeholder="e.g. Cortical Bone Screw" />
      <div className="grid gap-5 sm:grid-cols-2">
        <FormTextField form={form} name="brandName" label="Brand / trade name" placeholder="e.g. OrthoFix" />
        <FormTextField
          form={form}
          name="modelNumber"
          label="Model / catalogue number"
          placeholder="e.g. OF-CS-35"
          inputProps={{ className: "h-10 bg-background/60 font-mono" }}
        />
      </div>
      <FormTextField
        form={form}
        name="description"
        label="Brief description"
        multiline
        rows={4}
        maxLength={500}
        showCounter
        placeholder="One or two sentences about what the device is and does."
        description="We'll use this to pre-fill the Device Description section if it's empty."
      />
    </FieldGroup>
  </FormSection>
);
