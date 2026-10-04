import { ShieldAlert, ShieldCheck } from "lucide-react";

import type { RiskClass } from "@/features/ifu-wizard/types";
import { cn } from "@/lib/utils";

interface RiskBadgeProps {
  riskClass: RiskClass;
  className?: string;
}

export const RiskBadge = ({ riskClass, className }: RiskBadgeProps) => {
  const isHigh = riskClass === "C" || riskClass === "D";
  const Icon = isHigh ? ShieldAlert : ShieldCheck;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-md px-2 py-0.5 font-mono text-xs font-medium ring-1 ring-inset",
        isHigh ? "bg-danger-soft text-danger-soft-foreground ring-danger/25" : "bg-secondary text-secondary-foreground ring-border",
        className,
      )}
    >
      <Icon aria-hidden className="size-3.5" />
      Class {riskClass}
    </span>
  );
};
