"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FAKE_LATENCY_MS, wait } from "../constants";
import { resetPasswordSchema, type ResetPasswordInput } from "../schema";
import { ResetPasswordFormPresentation } from "./ResetPasswordForm.presentation";

export const ResetPasswordFormContainer = () => {
  const router = useRouter();
  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = form.handleSubmit(async () => {
    await wait(FAKE_LATENCY_MS);
    toast.success("Password updated. Log in with your new password.");
    router.push("/login");
  });

  return <ResetPasswordFormPresentation form={form} onSubmit={onSubmit} />;
};
