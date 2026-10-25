import type { Metadata } from "next";

import { BasicInfoFormContainer } from "@/features/ifu-wizard/components/BasicInfoForm.container";
import { getWizardDocument } from "@/features/ifu-wizard/queries";
import { requireSession } from "@/server/services/session";

export const metadata: Metadata = { title: "Basic Info" };

const BasicInfoPage = async ({ params }: PageProps<"/ifu/[id]/basic-info">) => {
  const { id } = await params;
  const { user } = await requireSession(`/ifu/${id}/basic-info`);
  // The layout already 404s foreign documents; this call is served from the per-request cache.
  const doc = await getWizardDocument(id, user.id);

  return <BasicInfoFormContainer documentId={doc.id} defaults={doc.basicInfo} />;
};

export default BasicInfoPage;
