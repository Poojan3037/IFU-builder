"use client";

import { Loader2, Plus } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { createDocumentAction } from "../actions";

interface CreateIfuButtonProps {
  label?: string;
  className?: string;
}

export const CreateIfuButton = ({ label = "Create New IFU", className }: CreateIfuButtonProps) => {
  const [pending, startTransition] = useTransition();

  const onClick = () =>
    startTransition(async () => {
      // On success the action redirects, so a returned result is always a failure.
      const result = await createDocumentAction();
      if (result && !result.success) toast.error(result.error.message);
    });

  return (
    <Button onClick={onClick} disabled={pending} className={className}>
      {pending ? <Loader2 aria-hidden className="animate-spin" /> : <Plus aria-hidden />} {label}
    </Button>
  );
};
