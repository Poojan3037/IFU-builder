"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { FormEventHandler } from "react";
import type { UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";

import type { ForgotPasswordInput } from "../schema";
import { AuthField } from "./AuthField";
import { CheckEmailPanel } from "./CheckEmailPanel";
import { SubmitButton } from "./SubmitButton";

interface ForgotPasswordFormPresentationProps {
  form: UseFormReturn<ForgotPasswordInput>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isSent: boolean;
  onReset: () => void;
}

export const ForgotPasswordFormPresentation = ({ form, onSubmit, isSent, onReset }: ForgotPasswordFormPresentationProps) => {
  const { errors, isSubmitting } = form.formState;

  if (isSent) {
    return (
      <CheckEmailPanel title="Check your inbox" onBack={onReset}>
        If an account exists, we&apos;ve emailed a link. It expires in 1 hour and can only be used once.
      </CheckEmailPanel>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <AuthField id="email" label="Email" error={errors.email}>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.in"
          className="h-10"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...form.register("email")}
        />
      </AuthField>
      <SubmitButton isSubmitting={isSubmitting} pendingLabel="Sending link…">
        Send reset link
      </SubmitButton>
      <Link href="/login" className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft aria-hidden className="size-3.5" /> Back to log in
      </Link>
    </form>
  );
};
