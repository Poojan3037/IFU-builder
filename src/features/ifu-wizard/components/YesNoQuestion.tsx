"use client";

import { Controller, type Control } from "react-hook-form";

import { Field, FieldError } from "@/components/ui/field";

import type { CategoryRiskInput } from "../schema";
import { RequiredMark } from "./FormTextField";
import { SegmentedControl } from "./SegmentedControl";

type BooleanField = "isSterile" | "isReusable" | "isActive" | "hasMeasuringFn" | "isLayUser";

interface YesNoQuestionProps {
  control: Control<CategoryRiskInput>;
  name: BooleanField;
  question: string;
  hint?: string;
  required?: boolean;
}

const OPTIONS = [
  { value: "yes" as const, label: "Yes" },
  { value: "no" as const, label: "No" },
];

const toChoice = (value: boolean | null) => (value === null ? null : value ? "yes" : "no");

/** A question row with a Yes/No segmented toggle (FR-S2-02, FR-S2-03). */
export const YesNoQuestion = ({ control, name, question, hint, required = false }: YesNoQuestionProps) => {
  const labelId = `question-${name}`;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-2 rounded-xl border bg-background/50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-0.5">
            <p id={labelId} className="text-sm font-medium">
              {question} {required && <RequiredMark />}
            </p>
            {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
            <FieldError errors={[fieldState.error]} />
          </div>
          <SegmentedControl
            options={OPTIONS}
            value={toChoice(field.value)}
            onChange={(choice) => field.onChange(choice === "yes")}
            ariaLabelledBy={labelId}
            focusRef={field.ref}
            invalid={fieldState.invalid}
            className="shrink-0 sm:w-36"
          />
        </Field>
      )}
    />
  );
};
