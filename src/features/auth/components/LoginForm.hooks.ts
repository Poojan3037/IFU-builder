"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FAKE_LATENCY_MS, wait } from "../constants";
import { loginSchema, type LoginInput } from "../schema";

/** Demo-only: this password simulates FR-AUTH-01's generic failure message. */
const DEMO_WRONG_PASSWORD = "wrong";

export const useLoginForm = () => {
  const router = useRouter();
  const next = useSearchParams().get("next") ?? "/dashboard";
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: true },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await wait(FAKE_LATENCY_MS);
    if (values.password === DEMO_WRONG_PASSWORD) {
      form.setError("root", { message: "Email or password is incorrect." });
      return;
    }
    toast.success("Welcome back!");
    router.push(next.startsWith("/") ? next : "/dashboard");
  });

  return { form, onSubmit };
};
