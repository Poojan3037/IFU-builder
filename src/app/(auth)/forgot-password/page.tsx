import type { Metadata } from "next";

import { AuthCard } from "@/features/auth/components/AuthCard";
import { ForgotPasswordFormContainer } from "@/features/auth/components/ForgotPasswordForm.container";

export const metadata: Metadata = { title: "Forgot password" };

const ForgotPasswordPage = () => (
  <AuthCard title="Reset your password" description="Enter your email and we'll send you a reset link.">
    <ForgotPasswordFormContainer />
  </AuthCard>
);

export default ForgotPasswordPage;
