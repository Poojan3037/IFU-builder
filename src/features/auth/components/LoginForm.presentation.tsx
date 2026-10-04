"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import type { FormEventHandler } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import type { LoginInput } from "../schema";
import { AuthField } from "./AuthField";
import { AuthNotice } from "./AuthNotice";
import { GoogleButton } from "./GoogleButton";
import { OrDivider } from "./OrDivider";
import { PasswordInput } from "./PasswordInput";
import { SubmitButton } from "./SubmitButton";

interface LoginFormPresentationProps {
  form: UseFormReturn<LoginInput>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isLocked: boolean;
}

export const LoginFormPresentation = ({ form, onSubmit, isLocked }: LoginFormPresentationProps) => {
  const { register, control, formState } = form;
  const { errors, isSubmitting } = formState;

  return (
    <div className="space-y-5">
      <GoogleButton />
      <OrDivider />
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <AnimatePresence initial={false}>
          {(isLocked || errors.root) && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
              {isLocked ? (
                <AuthNotice tone="danger" icon="lock" title="Too many attempts">
                  For your security, logging in is paused for 15 minutes. You can reset your password in the meantime.
                </AuthNotice>
              ) : (
                <AuthNotice tone="danger" title={errors.root?.message ?? ""} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <FieldGroup className="gap-4">
          <AuthField id="email" label="Email" error={errors.email}>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.in"
              className="h-10"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
            />
          </AuthField>
          <AuthField
            id="password"
            label="Password"
            error={errors.password}
            labelAside={
              <Link href="/forgot-password" className="text-xs font-medium text-primary hover:underline">
                Forgot password?
              </Link>
            }
          >
            <PasswordInput
              id="password"
              autoComplete="current-password"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              {...register("password")}
            />
          </AuthField>
          <Controller
            control={control}
            name="rememberMe"
            render={({ field }) => (
              <div className="flex items-center gap-2.5">
                <Checkbox id="rememberMe" checked={field.value} onCheckedChange={(v) => field.onChange(v === true)} />
                <FieldLabel htmlFor="rememberMe" className="font-normal text-muted-foreground">
                  Remember me for 30 days
                </FieldLabel>
              </div>
            )}
          />
        </FieldGroup>
        <SubmitButton isSubmitting={isSubmitting || isLocked} pendingLabel={isLocked ? "Temporarily locked" : "Logging in…"}>
          Log in
        </SubmitButton>
      </form>
    </div>
  );
};
