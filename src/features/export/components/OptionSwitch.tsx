import type { ReactNode } from "react";

import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface OptionSwitchProps {
  id: string;
  title: string;
  description: ReactNode;
  icon: ReactNode;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const OptionSwitch = ({ id, title, description, icon, checked, onCheckedChange, disabled }: OptionSwitchProps) => (
  <label
    htmlFor={id}
    className={cn(
      "flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-colors duration-200 hover:bg-muted/50",
      checked && "border-primary/40 bg-accent/40",
      disabled && "cursor-not-allowed opacity-80",
    )}
  >
    <span
      aria-hidden
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground transition-colors",
        checked && "bg-primary/12 text-primary",
      )}
    >
      {icon}
    </span>
    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
      <span className="text-sm font-medium">{title}</span>
      <span className="text-xs leading-relaxed text-muted-foreground">{description}</span>
    </span>
    <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} disabled={disabled} className="mt-1" />
  </label>
);
