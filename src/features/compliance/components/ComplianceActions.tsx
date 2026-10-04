"use client";

import { ArrowLeft, ArrowRight, RefreshCw } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ComplianceActionsProps {
  backHref: string;
  previewHref: string;
  canContinue: boolean;
  isScanning: boolean;
  onRerun: () => void;
}

export const ComplianceActions = ({ backHref, previewHref, canContinue, isScanning, onRerun }: ComplianceActionsProps) => (
  <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
    <Button asChild variant="ghost" className="h-9">
      <Link href={backHref}>
        <ArrowLeft /> Back to Editing
      </Link>
    </Button>
    <div className="flex flex-col gap-2 sm:flex-row">
      <Button variant="outline" className="h-10" onClick={onRerun} disabled={isScanning}>
        <RefreshCw className={cn(isScanning && "animate-spin")} /> Re-run Check
      </Button>
      {canContinue ? (
        <Button asChild className="h-10 px-4 shadow-md shadow-primary/20">
          <Link href={previewHref}>
            Continue to Preview <ArrowRight />
          </Link>
        </Button>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <span tabIndex={0} className="inline-flex rounded-lg">
              <Button className="h-10 w-full px-4" disabled>
                Continue to Preview <ArrowRight />
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>Fix all blocking issues to continue</TooltipContent>
        </Tooltip>
      )}
    </div>
  </div>
);
