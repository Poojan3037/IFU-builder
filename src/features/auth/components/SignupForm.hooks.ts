"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FAKE_LATENCY_MS, wait } from "../constants";
import { signupSchema, type SignupInput } from "../schema";

export const useSignupForm = () => {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: "", email: "", password: "", companyName: "", consent: false },
    mode: "onTouched",
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await wait(FAKE_LATENCY_MS);
    toast.success("Account created");
    setSentTo(values.email);
  });

  const reset = () => {
    setSentTo(null);
    form.reset();
  };

  return { form, onSubmit, sentTo, reset };
};
