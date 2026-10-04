"use client";

import { AnimatePresence, motion } from "motion/react";
import { Building2 } from "lucide-react";
import { Controller, useWatch, type UseFormReturn } from "react-hook-form";

import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { EASE_OUT_EXPO } from "@/lib/motion";

import { MANUFACTURER_TYPE_META } from "../constants";
import type { BasicInfoInput } from "../schema";
import type { ManufacturerType } from "../types";
import { FormSection } from "./FormSection";
import { FormSelectField } from "./FormSelectField";
import { FormTextField, RequiredMark } from "./FormTextField";
import { ImporterFields, STATE_OPTIONS } from "./ImporterFields";
import { SegmentedControl } from "./SegmentedControl";

interface ManufacturerFieldsProps {
  form: UseFormReturn<BasicInfoInput>;
  onManufacturerTypeChange: (type: ManufacturerType) => void;
}

const TYPE_OPTIONS = (Object.keys(MANUFACTURER_TYPE_META) as ManufacturerType[]).map((value) => ({
  value,
  label: MANUFACTURER_TYPE_META[value].label,
  description: value === "IMPORTER" ? "Device made outside India" : "Made in India",
}));

const expand = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1, transition: { duration: 0.45, ease: EASE_OUT_EXPO } },
  exit: { height: 0, opacity: 0, transition: { duration: 0.25 } },
};

export const ManufacturerFields = ({ form, onManufacturerTypeChange }: ManufacturerFieldsProps) => {
  const manufacturerType = useWatch({ control: form.control, name: "manufacturerType" });
  const isImporter = manufacturerType === "IMPORTER";

  return (
    <FormSection icon={Building2} title="Manufacturer" description="The legal manufacturer shown on the label." delay={0.05}>
      <FieldGroup>
        <Controller
          control={form.control}
          name="manufacturerType"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel id="manufacturer-type-label">
                Manufacturer type <RequiredMark />
              </FieldLabel>
              <SegmentedControl
                options={TYPE_OPTIONS}
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  onManufacturerTypeChange(value);
                }}
                ariaLabelledBy="manufacturer-type-label"
                focusRef={field.ref}
                size="lg"
              />
              <FieldDescription>This decides which licence details we&apos;ll check your document against.</FieldDescription>
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
        <FormTextField form={form} name="manufacturerName" label="Manufacturer name" required placeholder="Legal entity name" />
        <FormTextField
          form={form}
          name="manufacturerAddress"
          label={isImporter ? "Manufacturer address (outside India)" : "Manufacturer address"}
          required
          multiline
          rows={2}
          placeholder={isImporter ? "Full foreign address" : "Plot / building, street, area, city"}
        />
        <AnimatePresence mode="popLayout" initial={false}>
          {isImporter ? (
            <motion.div key="foreign" {...expand} className="overflow-hidden">
              <FormTextField form={form} name="manufacturerCountry" label="Country" required placeholder="e.g. Germany" />
            </motion.div>
          ) : (
            <motion.div key="indian" {...expand} className="overflow-hidden">
              <div className="grid gap-5 sm:grid-cols-[1fr_10rem]">
                <FormSelectField form={form} name="manufacturerState" label="State / UT" required options={STATE_OPTIONS} placeholder="Choose state" />
                <FormTextField
                  form={form}
                  name="manufacturerPin"
                  label="PIN code"
                  required
                  placeholder="500078"
                  inputProps={{ inputMode: "numeric", maxLength: 6, className: "h-10 bg-background/60 font-mono tracking-wider" }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence initial={false}>
          {isImporter && (
            <motion.div key="importer" {...expand} className="overflow-hidden">
              <ImporterFields form={form} />
            </motion.div>
          )}
        </AnimatePresence>
      </FieldGroup>
    </FormSection>
  );
};
