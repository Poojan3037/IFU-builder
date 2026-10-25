import type { Metadata } from "next";
import { notFound } from "next/navigation";

import type { SectionKey } from "@/features/ifu-wizard/types";
import { SectionEditorContainer } from "@/features/sections/components/SectionEditor.container";
import { getSectionsWorkspace } from "@/features/sections/queries";
import { DocumentNotFoundError } from "@/server/services/documents/get-owned-document";
import { requireSession } from "@/server/services/session";

export const metadata: Metadata = { title: "Document Sections" };

const SectionPage = async ({ params, searchParams }: PageProps<"/ifu/[id]/sections/[sectionKey]">) => {
  const [{ id, sectionKey }, query] = await Promise.all([params, searchParams]);
  const { user } = await requireSession(`/ifu/${id}/sections/${sectionKey}`);

  const data = await getSectionsWorkspace(id, user.id).catch((error: unknown) => {
    if (error instanceof DocumentNotFoundError) notFound();
    throw error;
  });
  // Sections that don't apply to this device are hidden (WF-02), so their URLs are not-found too.
  if (!data.applicable.includes(sectionKey as SectionKey)) notFound();

  const focusField = typeof query.field === "string" ? query.field : undefined;

  return (
    <SectionEditorContainer
      documentId={id}
      sectionKey={sectionKey as SectionKey}
      applicable={data.applicable}
      licence={data.licence}
      focusField={focusField}
    />
  );
};

export default SectionPage;
