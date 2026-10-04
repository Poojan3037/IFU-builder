import { AlertTriangle, Lock, MailWarning, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type NoticeTone = "danger" | "warning";

interface AuthNoticeProps {
  tone: NoticeTone;
  title: string;
  children?: ReactNode;
  icon?: "lock" | "mail" | "alert";
}

const ICONS: Record<NonNullable<AuthNoticeProps["icon"]>, LucideIcon> = {
  lock: Lock,
  mail: MailWarning,
  alert: AlertTriangle,
};

const TONES: Record<NoticeTone, string> = {
  danger: "border-danger/25 bg-danger-soft text-danger-soft-foreground",
  warning: "border-warning/30 bg-warning-soft text-warning-soft-foreground",
};

export const AuthNotice = ({ tone, title, children, icon = "alert" }: AuthNoticeProps) => {
  const Icon = ICONS[icon];
  return (
    <div role="alert" className={cn("flex gap-3 rounded-xl border px-4 py-3 text-sm", TONES[tone])}>
      <Icon aria-hidden className="mt-0.5 size-4 shrink-0" />
      <div className="space-y-0.5">
        <p className="font-medium">{title}</p>
        {children && <div className="text-xs leading-relaxed opacity-90">{children}</div>}
      </div>
    </div>
  );
};
