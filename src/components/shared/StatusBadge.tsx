import { CheckCircle2, CircleDot, Send } from "lucide-react";

import { STATUS_META } from "@/features/ifu-wizard/constants";
import type { DocumentStatus } from "@/features/ifu-wizard/types";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<DocumentStatus, string> = {
  DRAFT: "bg-warning-soft text-warning-soft-foreground ring-warning/30",
  READY: "bg-info-soft text-info-soft-foreground ring-info/30",
  COMPLETED: "bg-success-soft text-success-soft-foreground ring-success/30",
};

const STATUS_ICONS = { DRAFT: CircleDot, READY: Send, COMPLETED: CheckCircle2 } as const;

interface StatusBadgeProps {
  status: DocumentStatus;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const Icon = STATUS_ICONS[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        STATUS_STYLES[status],
        className,
      )}
    >
      <Icon aria-hidden className="size-3.5" />
      {STATUS_META[status].label}
    </span>
  );
};
