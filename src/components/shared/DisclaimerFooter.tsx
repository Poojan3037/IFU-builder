import { Scale } from "lucide-react";

import { DISCLAIMER } from "@/features/ifu-wizard/constants";
import { cn } from "@/lib/utils";

interface DisclaimerFooterProps {
  className?: string;
}

/** Mandatory regulatory disclaimer (REQUIREMENTS §2) for Compliance, Preview and Export. */
export const DisclaimerFooter = ({ className }: DisclaimerFooterProps) => (
  <footer
    role="note"
    className={cn(
      "flex items-start gap-2.5 rounded-xl border border-dashed bg-muted/50 px-4 py-3 text-xs leading-relaxed text-muted-foreground",
      className,
    )}
  >
    <Scale aria-hidden className="mt-0.5 size-3.5 shrink-0" />
    <p>{DISCLAIMER}</p>
  </footer>
);
