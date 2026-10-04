"use client";

import { useLoginForm } from "./LoginForm.hooks";
import { LoginFormPresentation } from "./LoginForm.presentation";

interface LoginFormContainerProps {
  isLocked: boolean;
}

export const LoginFormContainer = ({ isLocked }: LoginFormContainerProps) => {
  const { form, onSubmit } = useLoginForm();
  return <LoginFormPresentation form={form} onSubmit={onSubmit} isLocked={isLocked} />;
};
