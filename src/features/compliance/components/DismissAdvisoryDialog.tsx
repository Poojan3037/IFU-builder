"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type { ComplianceIssue } from "../types";

interface DismissAdvisoryDialogProps {
  issue: ComplianceIssue | null;
  onCancel: () => void;
  onConfirm: (reason: string) => void;
}

export const DismissAdvisoryDialog = ({ issue, onCancel, onConfirm }: DismissAdvisoryDialogProps) => {
  const [reason, setReason] = useState("");

  const close = () => {
    setReason("");
    onCancel();
  };

  return (
    <Dialog open={issue !== null} onOpenChange={(open) => !open && close()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dismiss this advisory?</DialogTitle>
          <DialogDescription>
            &ldquo;{issue?.title}&rdquo; won&apos;t block export. The dismissal is kept for this document version and listed in the audit trail.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Label htmlFor="dismiss-reason">
            Reason <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Textarea
            id="dismiss-reason"
            value={reason}
            maxLength={500}
            onChange={(event) => setReason(event.target.value)}
            placeholder="e.g. Residual risks are covered in the accompanying surgical technique guide."
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm(reason.trim());
              setReason("");
            }}
          >
            Dismiss advisory
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
