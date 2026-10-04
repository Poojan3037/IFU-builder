import type { Metadata } from "next";
import { Suspense } from "react";

import { AuthCard } from "@/features/auth/components/AuthCard";
import { AuthFormSkeleton } from "@/features/auth/components/AuthFormSkeleton";
import { AuthTabs } from "@/features/auth/components/AuthTabs";
import { SignupFormContainer } from "@/features/auth/components/SignupForm.container";

export const metadata: Metadata = { title: "Sign up" };

const SignupPage = () => (
  <AuthCard top={<AuthTabs />} title="Create your account" description="Draft your first compliant IFU in under 30 minutes.">
    <Suspense fallback={<AuthFormSkeleton />}>
      <SignupFormContainer />
    </Suspense>
  </AuthCard>
);

export default SignupPage;
