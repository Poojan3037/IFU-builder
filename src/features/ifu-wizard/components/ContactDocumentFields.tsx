"use client";

import { FileText } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

import { FieldGroup } from "@/components/ui/field";

import type { BasicInfoInput } from "../schema";
import { FormSection } from "./FormSection";
import { FormTextField } from "./FormTextField";
import { IssueDatePicker } from "./IssueDatePicker";
import { PhoneField } from "./PhoneField";

interface ContactDocumentFieldsProps {
  form: UseFormReturn<BasicInfoInput>;
}

export const ContactDocumentFields = ({ form }: ContactDocumentFieldsProps) => (
  <FormSection icon={FileText} title="Contact & document" description="Customer care details and document identification." delay={0.15}>
    <FieldGroup>
      <div className="grid gap-5 sm:grid-cols-2">
        <PhoneField form={form} />
        <FormTextField
          form={form}
          name="customerCareEmail"
          label="Customer care email"
          placeholder="care@company.in"
          inputProps={{ type: "email", autoComplete: "email" }}
        />
      </div>
      <p className="-mt-2 text-xs text-muted-foreground">Add at least one: phone or email.</p>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormTextField
          form={form}
          name="version"
          label="Document version"
          required
          placeholder="v1.0"
          inputProps={{ className: "h-10 bg-background/60 font-mono" }}
        />
        <IssueDatePicker form={form} />
      </div>
    </FieldGroup>
  </FormSection>
);
