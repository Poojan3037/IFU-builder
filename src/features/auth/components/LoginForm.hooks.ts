"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { signInEmailAction } from "../actions";
import { safeNext } from "../redirect";
import { loginSchema, type LoginInput } from "../schema";

export const useLoginForm = () => {
  const router = useRouter();
  const next = safeNext(useSearchParams().get("next"));
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: true },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    const result = await signInEmailAction(values);
    if (!result.success) {
      form.setError("root", { message: result.error });
      return;
    }
    toast.success("Welcome back!");
    router.push(next);
    router.refresh();
  });

  return { form, onSubmit };
};
