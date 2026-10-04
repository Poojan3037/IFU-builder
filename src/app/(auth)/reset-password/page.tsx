import type { Metadata } from "next";

import { AuthCard } from "@/features/auth/components/AuthCard";
import { ResetPasswordFormContainer } from "@/features/auth/components/ResetPasswordForm.container";

export const metadata: Metadata = { title: "Set a new password" };

const ResetPasswordPage = () => (
  <AuthCard title="Set a new password" description="Choose a strong password you haven't used before.">
    <ResetPasswordFormContainer />
  </AuthCard>
);

export default ResetPasswordPage;
