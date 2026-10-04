"use client";

import Link from "next/link";
import type { FormEventHandler } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import type { SignupInput } from "../schema";
import { AuthField } from "./AuthField";
import { AuthNotice } from "./AuthNotice";
import { GoogleButton } from "./GoogleButton";
import { OrDivider } from "./OrDivider";
import { PasswordInput } from "./PasswordInput";
import { PasswordStrength } from "./PasswordStrength";
import { SubmitButton } from "./SubmitButton";

interface SignupFormPresentationProps {
  form: UseFormReturn<SignupInput>;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export const SignupFormPresentation = ({ form, onSubmit }: SignupFormPresentationProps) => {
  const { register, control, watch, formState } = form;
  const { errors, isSubmitting } = formState;

  const describedBy = (name: keyof SignupInput) => (errors[name] ? `${name}-error` : undefined);

  return (
    <div className="space-y-5">
      <GoogleButton label="Sign up with Google" />
      <OrDivider />
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        {errors.root && <AuthNotice tone="danger" title={errors.root.message ?? ""} />}
        <FieldGroup className="gap-4">
          <AuthField id="fullName" label="Full name" error={errors.fullName}>
            <Input id="fullName" autoComplete="name" placeholder="Ananya Rao" className="h-10" aria-invalid={!!errors.fullName} aria-describedby={describedBy("fullName")} {...register("fullName")} />
          </AuthField>
          <AuthField id="email" label="Work email" error={errors.email}>
            <Input id="email" type="email" autoComplete="email" placeholder="you@company.in" className="h-10" aria-invalid={!!errors.email} aria-describedby={describedBy("email")} {...register("email")} />
          </AuthField>
          <AuthField id="password" label="Password" error={errors.password}>
            <PasswordInput id="password" autoComplete="new-password" aria-invalid={!!errors.password} aria-describedby={describedBy("password")} {...register("password")} />
            <PasswordStrength password={watch("password")} />
          </AuthField>
          <AuthField id="companyName" label="Company name (optional)" error={errors.companyName}>
            <Input id="companyName" autoComplete="organization" placeholder="Sanjeevani MedTech Pvt. Ltd." className="h-10" aria-invalid={!!errors.companyName} {...register("companyName")} />
          </AuthField>
          <Controller
            control={control}
            name="consent"
            render={({ field, fieldState }) => (
              <div className="space-y-1.5">
                <div className="flex items-start gap-2.5">
                  <Checkbox
                    id="consent"
                    className="mt-0.5"
                    checked={field.value}
                    onCheckedChange={(v) => field.onChange(v === true)}
                    onBlur={field.onBlur}
                    aria-invalid={!!fieldState.error}
                    aria-describedby={fieldState.error ? "consent-error" : undefined}
                  />
                  <FieldLabel htmlFor="consent" className="block font-normal leading-relaxed text-muted-foreground">
                    I agree to the{" "}
                    <Link href="#" className="font-medium text-primary hover:underline">Terms of Service</Link> and{" "}
                    <Link href="#" className="font-medium text-primary hover:underline">Privacy Policy</Link>, and consent to my
                    data being processed and stored in India under the DPDP Act, 2023.
                  </FieldLabel>
                </div>
                <FieldError id="consent-error" errors={fieldState.error ? [fieldState.error] : undefined} />
              </div>
            )}
          />
        </FieldGroup>
        <SubmitButton isSubmitting={isSubmitting} pendingLabel="Creating account…">
          Create account
        </SubmitButton>
      </form>
    </div>
  );
};
