import { FileText } from "lucide-react";

import { CATEGORY_META } from "@/features/ifu-wizard/constants";
import type { DeviceCategory } from "@/features/ifu-wizard/types";
import { cn } from "@/lib/utils";

interface CategoryIconProps {
  category: DeviceCategory | null;
  className?: string;
}

export const CategoryIcon = ({ category, className }: CategoryIconProps) => {
  const Icon = category ? CATEGORY_META[category].icon : FileText;
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent to-secondary text-primary ring-1 ring-inset ring-primary/10",
        className,
      )}
    >
      <Icon className="size-4.5" />
    </span>
  );
};
