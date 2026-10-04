"use client";

import { AnimatePresence, motion } from "motion/react";
import { BadgeCheck, Info } from "lucide-react";
import { useWatch, type UseFormReturn } from "react-hook-form";

import { FieldGroup } from "@/components/ui/field";

import { LICENCE_TYPE_META, LICENCE_TYPES_BY_MANUFACTURER } from "../constants";
import type { BasicInfoInput } from "../schema";
import { FormSection } from "./FormSection";
import { FormSelectField } from "./FormSelectField";
import { FormTextField } from "./FormTextField";

interface LicenceFieldsProps {
  form: UseFormReturn<BasicInfoInput>;
}

export const LicenceFields = ({ form }: LicenceFieldsProps) => {
  const [manufacturerType, watchedLicenceType] = useWatch({ control: form.control, name: ["manufacturerType", "licenceType"] });
  const allowedTypes = LICENCE_TYPES_BY_MANUFACTURER[manufacturerType];
  // The watched value can be briefly unset or stale (e.g. mid manufacturer switch); fall back to a valid type.
  const licenceType = watchedLicenceType && watchedLicenceType in LICENCE_TYPE_META ? watchedLicenceType : allowedTypes[0];
  const options = allowedTypes.map((value) => ({
    value,
    label: (
      <span className="flex items-center gap-2">
        {LICENCE_TYPE_META[value].label}
        <span className="font-mono text-[11px] text-muted-foreground">{LICENCE_TYPE_META[value].form}</span>
      </span>
    ),
  }));
  const numberLabel = LICENCE_TYPE_META[licenceType].numberLabel;

  return (
    <FormSection icon={BadgeCheck} title="Licence" description="CDSCO licence or registration that covers this device." delay={0.1}>
      <FieldGroup>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormSelectField
            form={form}
            name="licenceType"
            label="Licence type"
            required
            options={options}
            description={manufacturerType === "IMPORTER" ? "Importers need an import licence (Form MD-15)." : undefined}
          />
          <div className="relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={licenceType} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
                <FormTextField
                  form={form}
                  name="licenceNumber"
                  label={numberLabel}
                  placeholder="e.g. MFG/MD/2025/000418"
                  inputProps={{ className: "h-10 bg-background/60 font-mono" }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <p className="flex items-start gap-2 rounded-lg bg-info-soft px-3 py-2 text-xs text-info-soft-foreground">
          <Info aria-hidden className="mt-0.5 size-3.5 shrink-0" />
          You can leave the number empty while drafting. It becomes a blocking issue at the compliance check.
        </p>
      </FieldGroup>
    </FormSection>
  );
};
