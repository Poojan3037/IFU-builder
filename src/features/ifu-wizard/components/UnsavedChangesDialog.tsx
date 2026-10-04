"use client";

import { TriangleAlert } from "lucide-react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface UnsavedChangesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveDraft: () => void;
  onDiscard: () => void;
}

/** FR-S1-04: leaving with unsaved changes offers Save draft / Discard / Cancel. */
export const UnsavedChangesDialog = ({ open, onOpenChange, onSaveDraft, onDiscard }: UnsavedChangesDialogProps) => (
  <AlertDialog open={open} onOpenChange={onOpenChange}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogMedia className="bg-warning-soft text-warning-soft-foreground">
          <TriangleAlert />
        </AlertDialogMedia>
        <AlertDialogTitle>You have unsaved changes</AlertDialogTitle>
        <AlertDialogDescription>
          Save them as a draft so you can pick up where you left off, or discard them and go back to the dashboard.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button variant="destructive" onClick={onDiscard}>
          Discard
        </Button>
        <Button onClick={onSaveDraft}>Save draft</Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
