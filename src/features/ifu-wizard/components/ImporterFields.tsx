"use client";

import { Ship } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

import { FieldGroup } from "@/components/ui/field";

import { INDIAN_STATES } from "../constants";
import type { BasicInfoInput } from "../schema";
import { FormSelectField } from "./FormSelectField";
import { FormTextField } from "./FormTextField";

interface ImporterFieldsProps {
  form: UseFormReturn<BasicInfoInput>;
}

export const STATE_OPTIONS = INDIAN_STATES.map((state) => ({ value: state, label: state }));

/** Indian importer details, required when the manufacturer type is Importer (IN-LBL-004). */
export const ImporterFields = ({ form }: ImporterFieldsProps) => (
  <div className="rounded-xl border border-dashed border-primary/30 bg-accent/40 p-4 sm:p-5">
    <div className="mb-4 flex items-center gap-2 text-sm font-medium text-accent-foreground">
      <Ship aria-hidden className="size-4" />
      Indian importer details
    </div>
    <FieldGroup>
      <FormTextField form={form} name="importerName" label="Importer name" required placeholder="Legal entity name of the importer" />
      <FormTextField form={form} name="importerAddress" label="Importer address" required multiline rows={2} placeholder="Street, area, city" />
      <div className="grid gap-5 sm:grid-cols-[1fr_10rem]">
        <FormSelectField form={form} name="importerState" label="State / UT" required options={STATE_OPTIONS} placeholder="Choose state" />
        <FormTextField
          form={form}
          name="importerPin"
          label="PIN code"
          required
          placeholder="400001"
          inputProps={{ inputMode: "numeric", maxLength: 6, className: "h-10 bg-background/60 font-mono tracking-wider" }}
        />
      </div>
    </FieldGroup>
  </div>
);
