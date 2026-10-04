"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { signUpEmailAction } from "../actions";
import { signupSchema, type SignupInput } from "../schema";

export const useSignupForm = () => {
  const router = useRouter();
  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: "", email: "", password: "", companyName: "", consent: false },
    mode: "onTouched",
  });

  const onSubmit = form.handleSubmit(async (values) => {
    const result = await signUpEmailAction(values);
    if (!result.success) {
      form.setError("root", { message: result.error });
      return;
    }
    toast.success("Account created");
    router.push("/dashboard");
    router.refresh();
  });

  return { form, onSubmit };
};
