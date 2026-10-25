import { notFound, redirect } from "next/navigation";

import { SectionsStoreProvider } from "@/features/sections/components/SectionsStore.context";
import { SectionsWorkspaceContainer } from "@/features/sections/components/SectionsWorkspace.container";
import { getSectionsWorkspace } from "@/features/sections/queries";
import { DocumentNotFoundError } from "@/server/services/documents/get-owned-document";
import { requireSession } from "@/server/services/session";

/** Keeps the top bar, section nav and the client copy of the content alive while moving between sections. */
const SectionsLayout = async ({ children, params }: LayoutProps<"/ifu/[id]/sections">) => {
  const { id } = await params;
  const { user } = await requireSession(`/ifu/${id}/sections`);

  const data = await getSectionsWorkspace(id, user.id).catch((error: unknown) => {
    if (error instanceof DocumentNotFoundError) notFound();
    throw error;
  });

  // WF-01: Step 3 needs Steps 1 and 2 to be valid.
  if (!data.basicInfoValid) redirect(`/ifu/${id}/basic-info`);
  if (!data.categoryRiskValid) redirect(`/ifu/${id}/category-risk`);

  const fields = Object.fromEntries(Object.entries(data.content).map(([key, content]) => [key, content.fields]));

  return (
    <SectionsStoreProvider initial={{ fields, completeKeys: data.completeKeys, structured: data.structured }}>
      <SectionsWorkspaceContainer documentId={data.documentId} deviceName={data.deviceName || "Untitled IFU"} applicable={data.applicable}>
        {children}
      </SectionsWorkspaceContainer>
    </SectionsStoreProvider>
  );
};

export default SectionsLayout;
