import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { CategoryRiskFormContainer } from "@/features/ifu-wizard/components/CategoryRiskForm.container";
import { getSectionKeysWithContent, getWizardDocument } from "@/features/ifu-wizard/queries";
import { requireSession } from "@/server/services/session";

export const metadata: Metadata = { title: "Category & Risk" };

const CategoryRiskPage = async ({ params }: PageProps<"/ifu/[id]/category-risk">) => {
  const { id } = await params;
  const { user } = await requireSession(`/ifu/${id}/category-risk`);
  const [doc, sectionsWithContent] = await Promise.all([getWizardDocument(id, user.id), getSectionKeysWithContent(id, user.id)]);

  // WF-01: Step 2 opens only once Step 1 is valid.
  if (!doc.basicInfoValid) redirect(`/ifu/${id}/basic-info`);

  return <CategoryRiskFormContainer documentId={id} profile={doc.profile} sectionsWithContent={sectionsWithContent} />;
};

export default CategoryRiskPage;
