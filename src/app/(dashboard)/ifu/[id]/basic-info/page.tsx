import type { Metadata } from "next";

import { BasicInfoFormContainer } from "@/features/ifu-wizard/components/BasicInfoForm.container";
import { DEMO_DOCUMENT } from "@/features/ifu-wizard/mock-data";

export const metadata: Metadata = { title: "Basic Info" };

const BasicInfoPage = async ({ params }: PageProps<"/ifu/[id]/basic-info">) => {
  const { id } = await params;
  return <BasicInfoFormContainer document={{ ...DEMO_DOCUMENT, id }} />;
};

export default BasicInfoPage;
