import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  isSubmitting: boolean;
  children: ReactNode;
  pendingLabel: string;
}

export const SubmitButton = ({ isSubmitting, children, pendingLabel }: SubmitButtonProps) => (
  <Button type="submit" disabled={isSubmitting} className="h-10 w-full text-sm shadow-md shadow-primary/20">
    {isSubmitting ? (
      <>
        <Loader2 aria-hidden className="animate-spin" /> {pendingLabel}
      </>
    ) : (
      children
    )}
  </Button>
);
