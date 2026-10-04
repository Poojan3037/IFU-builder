"use client";

import { useSignupForm } from "./SignupForm.hooks";
import { SignupFormPresentation } from "./SignupForm.presentation";

export const SignupFormContainer = () => {
  const { form, onSubmit } = useSignupForm();
  return <SignupFormPresentation form={form} onSubmit={onSubmit} />;
};
