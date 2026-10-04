import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DEMO_DOCUMENT } from "@/features/ifu-wizard/mock-data";
import { getApplicableSections } from "@/features/ifu-wizard/rules/applicability";
import type { SectionKey } from "@/features/ifu-wizard/types";
import { SectionEditorContainer } from "@/features/sections/components/SectionEditor.container";

export const metadata: Metadata = { title: "Document Sections" };

const SectionPage = async ({ params, searchParams }: PageProps<"/ifu/[id]/sections/[sectionKey]">) => {
  const [{ id, sectionKey }, query] = await Promise.all([params, searchParams]);
  const applicable = getApplicableSections(DEMO_DOCUMENT.profile);
  if (!applicable.includes(sectionKey as SectionKey)) notFound();

  const focusField = typeof query.field === "string" ? query.field : undefined;

  return <SectionEditorContainer documentId={id} sectionKey={sectionKey as SectionKey} focusField={focusField} />;
};

export default SectionPage;
