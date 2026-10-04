"use client";

import type { ReactNode } from "react";
import { Controller, type FieldValues, type Path, type UseFormReturn } from "react-hook-form";

import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { RequiredMark } from "./FormTextField";

interface FormSelectFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: ReactNode;
  options: readonly { value: string; label: ReactNode }[];
  placeholder?: string;
  required?: boolean;
  description?: ReactNode;
  onValueChange?: (value: string) => void;
  className?: string;
}

export const FormSelectField = <T extends FieldValues>({
  form,
  name,
  label,
  options,
  placeholder = "Select…",
  required = false,
  description,
  onValueChange,
  className,
}: FormSelectFieldProps<T>) => {
  const id = `field-${name}`;

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className}>
          <FieldLabel htmlFor={id}>
            {label} {required && <RequiredMark />}
          </FieldLabel>
          <Select
            value={field.value || undefined}
            onValueChange={(value) => {
              field.onChange(value);
              onValueChange?.(value);
            }}
          >
            <SelectTrigger
              id={id}
              ref={field.ref}
              onBlur={field.onBlur}
              aria-invalid={fieldState.invalid || undefined}
              aria-required={required || undefined}
              className="h-10 w-full bg-background/60"
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent position="popper" className="max-h-72">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && !fieldState.error && <FieldDescription>{description}</FieldDescription>}
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
};
