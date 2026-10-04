import type { ReactNode } from "react";
import type { FieldError as RhfFieldError } from "react-hook-form";

import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";

interface AuthFieldProps {
  id: string;
  label: string;
  error?: RhfFieldError;
  description?: ReactNode;
  /** Right-aligned element next to the label, e.g. "Forgot password?". */
  labelAside?: ReactNode;
  children: ReactNode;
}

export const AuthField = ({ id, label, error, description, labelAside, children }: AuthFieldProps) => (
  <Field data-invalid={error ? true : undefined}>
    <div className="flex items-center justify-between gap-2">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      {labelAside}
    </div>
    {children}
    {description && !error && <FieldDescription>{description}</FieldDescription>}
    <FieldError id={`${id}-error`} errors={error ? [error] : undefined} />
  </Field>
);
