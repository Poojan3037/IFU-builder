import type { ReactNode } from "react";

import { Reveal } from "@/components/shared/motion";

interface AuthCardProps {
  title: string;
  description: ReactNode;
  /** Slot above the heading, e.g. the Log In / Sign Up tabs. */
  top?: ReactNode;
  /** Slot between heading and form, e.g. notices. */
  notice?: ReactNode;
  children: ReactNode;
}

export const AuthCard = ({ title, description, top, notice, children }: AuthCardProps) => (
  <Reveal variant="blurIn" className="w-full max-w-md">
    <div className="glass rounded-3xl p-6 shadow-xl shadow-primary/5 sm:p-8">
      {top && <div className="mb-6">{top}</div>}
      <div className="mb-6 space-y-1.5">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {notice && <div className="mb-5">{notice}</div>}
      {children}
    </div>
  </Reveal>
);
