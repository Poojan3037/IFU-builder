"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import { exportOptionsSchema, type ExportOptionsInput } from "../schema";
import type { DeviceSymbol, ExportRecord } from "../types";
import { notifyDownload, useExportHistory, useFakeGeneration } from "./Export.hooks";
import { ExportPresentation } from "./Export.presentation";

interface ExportContainerProps {
  documentId: string;
  version: string;
  defaultFileName: string;
  emailVerified: boolean;
  contentPageCount: number;
  symbols: DeviceSymbol[];
  initialHistory: ExportRecord[];
}

export const ExportContainer = ({
  documentId,
  version,
  defaultFileName,
  emailVerified,
  contentPageCount,
  symbols,
  initialHistory,
}: ExportContainerProps) => {
  const form = useForm<ExportOptionsInput>({
    resolver: zodResolver(exportOptionsSchema),
    defaultValues: {
      fileName: defaultFileName,
      language: "en",
      coverPage: false,
      symbolGlossary: true,
      // Forced on while the email is unverified (FR-EXP-05).
      watermark: !emailVerified,
    },
  });
  const [coverPage, symbolGlossary, watermark] = useWatch({ control: form.control, name: ["coverPage", "symbolGlossary", "watermark"] });
  const toggles = { coverPage, symbolGlossary, watermark: emailVerified ? watermark : true };

  const { history, add } = useExportHistory(initialHistory);
  const { state, generate, reset } = useFakeGeneration(add);

  const onSubmit = form.handleSubmit((values) => {
    void generate(values.fileName, version, { ...toggles });
  });

  return (
    <ExportPresentation
      documentId={documentId}
      form={form}
      onSubmit={onSubmit}
      emailVerified={emailVerified}
      toggles={toggles}
      contentPageCount={contentPageCount}
      symbols={symbols}
      generation={state}
      onDownload={notifyDownload}
      onGenerateAgain={reset}
      history={history}
    />
  );
};
