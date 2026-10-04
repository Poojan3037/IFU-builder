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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { IfuDocumentSummary } from "@/features/ifu-wizard/types";

interface DocumentRowActionsProps {
  doc: IfuDocumentSummary;
  onDuplicate: (doc: IfuDocumentSummary) => void;
  onDelete: (doc: IfuDocumentSummary) => void;
}

export const DocumentRowActions = ({ doc, onDuplicate, onDelete }: DocumentRowActionsProps) => {
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
          <Link href={`/ifu/${doc.id}/basic-info`} aria-label={`Edit ${doc.deviceName}`}>
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
          <DropdownMenuItem onSelect={() => onDuplicate(doc)}>
            <Copy aria-hidden /> Duplicate
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onSelect={() => setConfirmOpen(true)}>
            <Trash2 aria-hidden /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this document?</AlertDialogTitle>
            <AlertDialogDescription>
              &ldquo;{doc.deviceName}&rdquo; will be moved to trash. Support can restore it within 30 days.
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
