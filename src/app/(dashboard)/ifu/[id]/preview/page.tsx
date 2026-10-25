import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { buildPreviewMeta, buildPreviewSections, paginate } from "@/features/preview/build-document";
import { PreviewContainer } from "@/features/preview/components/Preview.container";
import { getPreviewData } from "@/features/preview/queries";
import { DocumentNotFoundError } from "@/server/services/documents/get-owned-document";
import { requireSession } from "@/server/services/session";

export const metadata: Metadata = { title: "Live Preview" };

const PreviewPage = async ({ params }: PageProps<"/ifu/[id]/preview">) => {
  const { id } = await params;
  const { user } = await requireSession(`/ifu/${id}/preview`);

  const { status, source, hasPassingCheck } = await getPreviewData(id, user.id).catch((error: unknown) => {
    if (error instanceof DocumentNotFoundError) notFound();
    throw error;
  });

  // WF-03 / FR-PRV-06: Preview needs a current compliance run with no blocking issues.
  // Exported (COMPLETED) documents stay viewable; they open read-only (FR-PRV-07).
  if (status !== "COMPLETED" && !hasPassingCheck) redirect(`/ifu/${id}/compliance`);

  return (
    <PreviewContainer
      documentId={id}
      mode={status === "COMPLETED" ? "view" : "edit"}
      meta={buildPreviewMeta(source)}
      pages={paginate(buildPreviewSections(source))}
    />
  );
};

export default PreviewPage;
