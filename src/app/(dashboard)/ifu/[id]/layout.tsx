import { notFound } from "next/navigation";

import { AutosaveStatusProvider } from "@/features/ifu-wizard/components/AutosaveStatus.context";
import { WizardShellContainer } from "@/features/ifu-wizard/components/WizardShell.container";
import { getWizardDocument } from "@/features/ifu-wizard/queries";
import { DocumentNotFoundError } from "@/server/services/documents/get-owned-document";
import { requireSession } from "@/server/services/session";

const WizardLayout = async ({ children, params }: LayoutProps<"/ifu/[id]">) => {
  const { id } = await params;
  const { user } = await requireSession(`/ifu/${id}/basic-info`);

  // Missing, soft-deleted and foreign documents are indistinguishable (404).
  const doc = await getWizardDocument(id, user.id).catch((error: unknown) => {
    if (error instanceof DocumentNotFoundError) notFound();
    throw error;
  });

  return (
    <AutosaveStatusProvider>
      <WizardShellContainer
        documentId={doc.id}
        deviceName={doc.deviceName || "Untitled IFU"}
        maxReachableIndex={doc.maxReachableIndex}
      >
        {children}
      </WizardShellContainer>
    </AutosaveStatusProvider>
  );
};

export default WizardLayout;
