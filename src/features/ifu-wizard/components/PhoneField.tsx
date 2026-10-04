"use client";

import { useFormState, type UseFormReturn } from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";

import type { BasicInfoInput } from "../schema";

interface PhoneFieldProps {
  form: UseFormReturn<BasicInfoInput>;
}

export const PhoneField = ({ form }: PhoneFieldProps) => {
  const formState = useFormState({ control: form.control, name: "customerCarePhone" });
  const { error, invalid } = form.getFieldState("customerCarePhone", formState);

  return (
    <Field data-invalid={invalid}>
      <FieldLabel htmlFor="field-customerCarePhone">Customer care phone</FieldLabel>
      <InputGroup className="h-10 bg-background/60">
        <InputGroupAddon>
          <InputGroupText className="font-mono">+91</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          id="field-customerCarePhone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="98765 43210"
          aria-invalid={invalid || undefined}
          className="font-mono"
          {...form.register("customerCarePhone")}
        />
      </InputGroup>
      <FieldError errors={[error]} />
    </Field>
  );
};
