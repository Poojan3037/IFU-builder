import type { Metadata } from "next";

import { CategoryRiskFormContainer } from "@/features/ifu-wizard/components/CategoryRiskForm.container";
import { DEMO_DOCUMENT } from "@/features/ifu-wizard/mock-data";

export const metadata: Metadata = { title: "Category & Risk" };

const CategoryRiskPage = async ({ params }: PageProps<"/ifu/[id]/category-risk">) => {
  const { id } = await params;
  return <CategoryRiskFormContainer documentId={id} profile={DEMO_DOCUMENT.profile} />;
};

export default CategoryRiskPage;
