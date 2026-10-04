"use client";

import type { ComponentProps, ReactNode } from "react";
import { useFormState, useWatch, type FieldValues, type Path, type UseFormReturn } from "react-hook-form";

import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface FormTextFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: ReactNode;
  required?: boolean;
  description?: ReactNode;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
  /** Shows a live "n / max" counter (requires maxLength). */
  showCounter?: boolean;
  inputProps?: Omit<ComponentProps<"input">, "name" | "id">;
  className?: string;
}

export const RequiredMark = () => (
  <>
    <span aria-hidden className="text-destructive">*</span>
    <span className="sr-only">(required)</span>
  </>
);

/** Text input/textarea bound to RHF with label, helper text and inline error. */
export const FormTextField = <T extends FieldValues>({
  form,
  name,
  label,
  required = false,
  description,
  placeholder,
  multiline = false,
  rows = 3,
  maxLength,
  showCounter = false,
  inputProps,
  className,
}: FormTextFieldProps<T>) => {
  // Subscribe locally so this field re-renders on its own error/value changes (safe under React Compiler memoisation).
  const formState = useFormState({ control: form.control, name });
  const watched: unknown = useWatch({ control: form.control, name });
  const { error, invalid } = form.getFieldState(name, formState);
  const id = `field-${name}`;
  const describedBy = [description ? `${id}-desc` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
  const value = showCounter ? String(watched ?? "") : "";
  const shared = {
    id,
    placeholder,
    "aria-invalid": invalid || undefined,
    "aria-required": required || undefined,
    "aria-describedby": describedBy,
    ...form.register(name),
  };

  return (
    <Field data-invalid={invalid} className={className}>
      <div className="flex items-baseline justify-between gap-2">
        <FieldLabel htmlFor={id}>
          {label} {required && <RequiredMark />}
        </FieldLabel>
        {showCounter && maxLength && (
          <span className={cn("font-mono text-[11px] tabular-nums text-muted-foreground", value.length > maxLength && "text-destructive")}>
            {value.length} / {maxLength}
          </span>
        )}
      </div>
      {multiline ? (
        <Textarea rows={rows} className="min-h-24 resize-y bg-background/60" {...shared} />
      ) : (
        <Input className="h-10 bg-background/60" {...inputProps} {...shared} />
      )}
      {description && !error && <FieldDescription id={`${id}-desc`}>{description}</FieldDescription>}
      <FieldError id={`${id}-error`} errors={[error]} />
    </Field>
  );
};
