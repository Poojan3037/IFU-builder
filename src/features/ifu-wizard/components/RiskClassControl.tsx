"use client";

import { Controller, type Control } from "react-hook-form";

import { Field, FieldError } from "@/components/ui/field";

import { RISK_CLASS_META } from "../constants";
import type { CategoryRiskInput } from "../schema";
import type { RiskClass } from "../types";
import { SegmentedControl } from "./SegmentedControl";

interface RiskClassControlProps {
  control: Control<CategoryRiskInput>;
  labelledBy: string;
}

const OPTIONS = (Object.keys(RISK_CLASS_META) as RiskClass[]).map((value) => ({
  value,
  label: RISK_CLASS_META[value].label,
  description: RISK_CLASS_META[value].description,
}));

/** FR-S2-04: Class A–D segmented control. */
export const RiskClassControl = ({ control, labelledBy }: RiskClassControlProps) => (
  <Controller
    control={control}
    name="riskClass"
    render={({ field, fieldState }) => (
      <Field data-invalid={fieldState.invalid}>
        <SegmentedControl
          options={OPTIONS}
          value={field.value}
          onChange={field.onChange}
          ariaLabelledBy={labelledBy}
          focusRef={field.ref}
          invalid={fieldState.invalid}
          size="lg"
          className="max-sm:grid-flow-row max-sm:grid-cols-2"
        />
        <FieldError errors={[fieldState.error]} />
      </Field>
    )}
  />
);
