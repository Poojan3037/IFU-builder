"use client";

import type { FormEventHandler } from "react";
import type { UseFormReturn } from "react-hook-form";

import { FieldGroup } from "@/components/ui/field";

import type { ResetPasswordInput } from "../schema";
import { AuthField } from "./AuthField";
import { PasswordInput } from "./PasswordInput";
import { PasswordStrength } from "./PasswordStrength";
import { SubmitButton } from "./SubmitButton";

interface ResetPasswordFormPresentationProps {
  form: UseFormReturn<ResetPasswordInput>;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export const ResetPasswordFormPresentation = ({ form, onSubmit }: ResetPasswordFormPresentationProps) => {
  const { register, watch, formState } = form;
  const { errors, isSubmitting } = formState;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <FieldGroup className="gap-4">
        <AuthField id="password" label="New password" error={errors.password}>
          <PasswordInput
            id="password"
            autoComplete="new-password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
            {...register("password")}
          />
          <PasswordStrength password={watch("password")} />
        </AuthField>
        <AuthField id="confirmPassword" label="Confirm new password" error={errors.confirmPassword}>
          <PasswordInput
            id="confirmPassword"
            autoComplete="new-password"
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
            {...register("confirmPassword")}
          />
        </AuthField>
      </FieldGroup>
      <SubmitButton isSubmitting={isSubmitting} pendingLabel="Updating…">
        Update password
      </SubmitButton>
    </form>
  );
};
