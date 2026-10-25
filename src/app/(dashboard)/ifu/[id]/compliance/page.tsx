import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { CATEGORY_CONTEXT } from "@/features/compliance/constants";
import { ComplianceCheckContainer } from "@/features/compliance/components/ComplianceCheck.container";
import { RISK_CLASS_META } from "@/features/ifu-wizard/constants";
import { getWizardDocument } from "@/features/ifu-wizard/queries";
import { getApplicableSections } from "@/features/ifu-wizard/rules/applicability";
import { DocumentNotFoundError } from "@/server/services/documents/get-owned-document";
import { requireSession } from "@/server/services/session";

export const metadata: Metadata = { title: "Compliance Check" };

const CompliancePage = async ({ params }: PageProps<"/ifu/[id]/compliance">) => {
  const { id } = await params;
  const { user } = await requireSession(`/ifu/${id}/compliance`);

  const doc = await getWizardDocument(id, user.id).catch((error: unknown) => {
    if (error instanceof DocumentNotFoundError) notFound();
    throw error;
  });

  // WF-01: the check needs Steps 1 and 2 to be valid.
  if (!doc.basicInfoValid) redirect(`/ifu/${id}/basic-info`);
  const { category, riskClass } = doc.profile;
  if (!doc.categoryRiskValid || !category || !riskClass) redirect(`/ifu/${id}/category-risk`);

  const subtitle = `We reviewed your document against MDR 2017 labelling requirements for ${RISK_CLASS_META[riskClass].label} ${CATEGORY_CONTEXT[category]} devices.`;

  return <ComplianceCheckContainer documentId={id} subtitle={subtitle} totalSections={getApplicableSections(doc.profile).length} />;
};

export default CompliancePage;
