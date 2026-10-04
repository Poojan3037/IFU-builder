"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { FAKE_LATENCY_MS, wait } from "../constants";
import { forgotPasswordSchema, type ForgotPasswordInput } from "../schema";
import { ForgotPasswordFormPresentation } from "./ForgotPasswordForm.presentation";

export const ForgotPasswordFormContainer = () => {
  const [isSent, setIsSent] = useState(false);
  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  // FR-AUTH-06: always the same response, whether or not the account exists.
  const onSubmit = form.handleSubmit(async () => {
    await wait(FAKE_LATENCY_MS);
    setIsSent(true);
  });

  return (
    <ForgotPasswordFormPresentation
      form={form}
      onSubmit={onSubmit}
      isSent={isSent}
      onReset={() => {
        setIsSent(false);
        form.reset();
      }}
    />
  );
};
