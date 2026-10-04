import type { Metadata } from "next";

import { DEMO_DOCUMENT } from "@/features/ifu-wizard/mock-data";
import { buildPreviewMeta, buildPreviewSections, paginate } from "@/features/preview/build-document";
import { PreviewContainer } from "@/features/preview/components/Preview.container";

export const metadata: Metadata = { title: "Live Preview" };

const PreviewPage = async ({ params, searchParams }: PageProps<"/ifu/[id]/preview">) => {
  const { id } = await params;
  const { mode } = await searchParams;
  const pages = paginate(buildPreviewSections(DEMO_DOCUMENT));

  return (
    <PreviewContainer
      documentId={id}
      mode={mode === "view" ? "view" : "edit"}
      meta={buildPreviewMeta(DEMO_DOCUMENT)}
      pages={pages}
    />
  );
};

export default PreviewPage;
