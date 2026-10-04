"use client";

import { useSignupForm } from "./SignupForm.hooks";
import { SignupFormPresentation } from "./SignupForm.presentation";

export const SignupFormContainer = () => {
  const { form, onSubmit, sentTo, reset } = useSignupForm();
  return <SignupFormPresentation form={form} onSubmit={onSubmit} sentTo={sentTo} onReset={reset} />;
};
