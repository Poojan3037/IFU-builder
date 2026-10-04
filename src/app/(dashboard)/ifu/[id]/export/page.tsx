import type { Metadata } from "next";

import { ExportContainer } from "@/features/export/components/Export.container";
import { DEVICE_SYMBOLS, EXPORT_HISTORY } from "@/features/export/mock-data";
import { buildExportFileName } from "@/features/export/utils";
import { DEMO_DOCUMENT } from "@/features/ifu-wizard/mock-data";
import { buildPreviewSections, paginate } from "@/features/preview/build-document";
import { requireSession } from "@/server/services/session";

export const metadata: Metadata = { title: "Export & Download" };

const ExportPage = async ({ params, searchParams }: PageProps<"/ifu/[id]/export">) => {
  const { id } = await params;
  // `?unverified=1` previews the unverified-email state (watermark forced on).
  const { unverified } = await searchParams;
  const { user } = await requireSession(`/ifu/${id}/export`);
  const emailVerified = unverified === "1" ? false : user.emailVerified;

  return (
    <ExportContainer
      documentId={id}
      version={DEMO_DOCUMENT.version}
      defaultFileName={buildExportFileName(DEMO_DOCUMENT.deviceName, DEMO_DOCUMENT.version)}
      emailVerified={emailVerified}
      contentPageCount={paginate(buildPreviewSections(DEMO_DOCUMENT)).length}
      symbols={DEVICE_SYMBOLS}
      initialHistory={EXPORT_HISTORY}
    />
  );
};

export default ExportPage;
