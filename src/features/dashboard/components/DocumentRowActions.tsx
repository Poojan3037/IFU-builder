"use client";

import { Copy, Download, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { getStepPath } from "@/features/ifu-wizard/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { DashboardDocument } from "../types";

interface DocumentRowActionsProps {
  doc: DashboardDocument;
  onDelete: (doc: DashboardDocument) => void;
  deleting?: boolean;
}

export const DocumentRowActions = ({ doc, onDelete, deleting = false }: DocumentRowActionsProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const isCompleted = doc.status === "COMPLETED";

  return (
    <div className="flex items-center justify-end gap-1">
      {isCompleted ? (
        <>
          <Button asChild variant="ghost" size="sm">
            <Link href={`/ifu/${doc.id}/preview`} aria-label={`View ${doc.deviceName}`}>
              <Eye aria-hidden /> View
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href={`/ifu/${doc.id}/export`} aria-label={`Export ${doc.deviceName}`}>
              <Download aria-hidden /> Export
            </Link>
          </Button>
        </>
      ) : (
        <Button asChild variant="outline" size="sm">
          <Link href={getStepPath(doc.id, doc.lastStep)} aria-label={`Edit ${doc.deviceName}`}>
            <Pencil aria-hidden /> Edit
          </Link>
        </Button>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label={`More actions for ${doc.deviceName}`}>
            <MoreHorizontal aria-hidden />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem disabled title="Coming soon">
            <Copy aria-hidden /> Duplicate <span className="ml-auto text-xs text-muted-foreground">Soon</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" disabled={deleting} onSelect={() => setConfirmOpen(true)}>
            <Trash2 aria-hidden /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this document?</AlertDialogTitle>
            <AlertDialogDescription>
              &ldquo;{doc.deviceName || "Untitled device"}&rdquo; will be moved to trash. Support can restore it within 30 days.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={() => onDelete(doc)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
