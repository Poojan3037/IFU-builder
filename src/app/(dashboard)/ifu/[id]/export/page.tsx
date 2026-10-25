import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { ExportContainer } from "@/features/export/components/Export.container";
import { DEVICE_SYMBOLS, EXPORT_HISTORY } from "@/features/export/mock-data";
import { buildExportFileName } from "@/features/export/utils";
import { buildPreviewSections, paginate } from "@/features/preview/build-document";
import { getPreviewData } from "@/features/preview/queries";
import { DocumentNotFoundError } from "@/server/services/documents/get-owned-document";
import { requireSession } from "@/server/services/session";

export const metadata: Metadata = { title: "Export & Download" };

const ExportPage = async ({ params, searchParams }: PageProps<"/ifu/[id]/export">) => {
  const { id } = await params;
  // `?unverified=1` previews the unverified-email state (watermark forced on).
  const { unverified } = await searchParams;
  const { user } = await requireSession(`/ifu/${id}/export`);
  const emailVerified = unverified === "1" ? false : user.emailVerified;

  const { status, source, hasPassingCheck } = await getPreviewData(id, user.id).catch((error: unknown) => {
    if (error instanceof DocumentNotFoundError) notFound();
    throw error;
  });
  // Export needs a current compliance run with no blocking issues (FR-PRV-06); PDF generation itself is Phase 2.
  if (status !== "COMPLETED" && !hasPassingCheck) redirect(`/ifu/${id}/compliance`);

  return (
    <ExportContainer
      documentId={id}
      version={source.version}
      defaultFileName={buildExportFileName(source.deviceName, source.version)}
      emailVerified={emailVerified}
      contentPageCount={paginate(buildPreviewSections(source)).length}
      symbols={DEVICE_SYMBOLS}
      initialHistory={EXPORT_HISTORY}
    />
  );
};

export default ExportPage;
