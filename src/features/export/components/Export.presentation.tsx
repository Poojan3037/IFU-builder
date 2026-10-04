"use client";

import { ArrowLeft, Eye } from "lucide-react";
import Link from "next/link";
import type { UseFormReturn } from "react-hook-form";

import { DisclaimerFooter } from "@/components/shared/DisclaimerFooter";
import { Reveal } from "@/components/shared/motion";
import { Button } from "@/components/ui/button";

import type { ExportOptionsInput } from "../schema";
import type { DeviceSymbol, ExportRecord, ExportToggles, GenerationState } from "../types";
import { ExportHistory } from "./ExportHistory";
import { ExportOptionsForm } from "./ExportOptionsForm";
import { GenerationArea } from "./GenerationArea";
import { LiveThumbnail } from "./LiveThumbnail";

interface ExportPresentationProps {
  documentId: string;
  form: UseFormReturn<ExportOptionsInput>;
  onSubmit: () => void;
  emailVerified: boolean;
  toggles: ExportToggles;
  contentPageCount: number;
  symbols: DeviceSymbol[];
  generation: GenerationState;
  onDownload: (fileName: string) => void;
  onGenerateAgain: () => void;
  history: ExportRecord[];
}

export const ExportPresentation = ({
  documentId,
  form,
  onSubmit,
  emailVerified,
  toggles,
  contentPageCount,
  symbols,
  generation,
  onDownload,
  onGenerateAgain,
  history,
}: ExportPresentationProps) => (
  <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Export &amp; Download</h1>
        <p className="mt-1 text-sm text-muted-foreground">A few choices, then one tap to generate your final PDF.</p>
      </div>
      <div className="flex gap-2">
        <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
          <Link href="/dashboard">
            <ArrowLeft /> Back to Dashboard
          </Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link href={`/ifu/${documentId}/preview`}>
            <Eye /> Preview
          </Link>
        </Button>
      </div>
    </div>

    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <Reveal>
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6 rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
          <ExportOptionsForm form={form} emailVerified={emailVerified} disabled={generation.status !== "idle"} />
          <div className="border-t pt-5">
            <GenerationArea state={generation} onDownload={onDownload} onGenerateAgain={onGenerateAgain} />
          </div>
        </form>
      </Reveal>
      <Reveal delay={0.1} className="lg:sticky lg:top-20">
        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-medium text-muted-foreground">Live preview of your export</h2>
          <LiveThumbnail toggles={toggles} contentPageCount={contentPageCount} symbols={symbols} />
        </div>
      </Reveal>
    </div>

    <Reveal>
      <ExportHistory history={history} onDownload={onDownload} />
    </Reveal>

    <DisclaimerFooter />
  </div>
);
