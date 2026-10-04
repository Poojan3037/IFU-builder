import type { Metadata } from "next";
import { Suspense } from "react";

import { AuthCard } from "@/features/auth/components/AuthCard";
import { AuthFormSkeleton } from "@/features/auth/components/AuthFormSkeleton";
import { AuthNotice } from "@/features/auth/components/AuthNotice";
import { AuthTabs } from "@/features/auth/components/AuthTabs";
import { LoginFormContainer } from "@/features/auth/components/LoginForm.container";

export const metadata: Metadata = { title: "Log in" };

const LoginPage = async ({ searchParams }: PageProps<"/login">) => {
  const { state } = await searchParams;

  return (
    <AuthCard
      top={<AuthTabs />}
      title="Welcome back"
      description="Log in to continue drafting your IFU documents."
      notice={
        state === "unverified" ? (
          <AuthNotice tone="warning" icon="mail" title="Please verify your email">
            You can keep drafting, but PDF export unlocks once you click the link we emailed you.
          </AuthNotice>
        ) : undefined
      }
    >
      <Suspense fallback={<AuthFormSkeleton />}>
        <LoginFormContainer isLocked={state === "locked"} />
      </Suspense>
    </AuthCard>
  );
};

export default LoginPage;
