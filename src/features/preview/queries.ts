import "server-only";

import { cache } from "react";

import { getWizardDocument } from "@/features/ifu-wizard/queries";
import { getApplicableSections } from "@/features/ifu-wizard/rules/applicability";
import type { DocumentStatus } from "@/features/ifu-wizard/types";
import { readSections } from "@/features/sections/stored";
import { prisma } from "@/lib/prisma";

import type { DocumentSource } from "./build-document";

export interface PreviewData {
  status: DocumentStatus;
  source: DocumentSource;
  /** Latest compliance run is current and has no blocking issues (FR-PRV-06). */
  hasPassingCheck: boolean;
}

/** Cached per request so the preview and export pages share one load. */
export const getPreviewData = cache(async (documentId: string, userId: string): Promise<PreviewData> => {
  const wizard = await getWizardDocument(documentId, userId);
  const [rows, latestRun] = await Promise.all([
    prisma.ifuSection.findMany({ where: { documentId }, select: { key: true, fields: true, isComplete: true } }),
    prisma.complianceRun.findFirst({
      where: { documentId },
      orderBy: { createdAt: "desc" },
      select: { isStale: true, blockingCount: true },
    }),
  ]);

  const { content, structured } = readSections(rows, wizard.basicInfo.description);
  const { basicInfo } = wizard;

  return {
    status: wizard.status,
    hasPassingCheck: latestRun !== null && !latestRun.isStale && latestRun.blockingCount === 0,
    source: {
      deviceName: basicInfo.deviceName,
      modelNumber: basicInfo.modelNumber,
      version: basicInfo.version,
      issueDate: basicInfo.issueDate,
      manufacturerType: basicInfo.manufacturerType,
      manufacturerName: basicInfo.manufacturerName,
      manufacturerAddress: basicInfo.manufacturerAddress,
      manufacturerState: basicInfo.manufacturerState,
      manufacturerPin: basicInfo.manufacturerPin,
      manufacturerCountry: basicInfo.manufacturerCountry || "India",
      licenceType: basicInfo.licenceType,
      licenceNumber: basicInfo.licenceNumber,
      importerName: basicInfo.importerName,
      importerAddress: basicInfo.importerAddress,
      importerState: basicInfo.importerState,
      importerPin: basicInfo.importerPin,
      customerCarePhone: basicInfo.customerCarePhone,
      customerCareEmail: basicInfo.customerCareEmail,
      applicable: getApplicableSections(wizard.profile),
      content,
      structured,
    },
  };
});
