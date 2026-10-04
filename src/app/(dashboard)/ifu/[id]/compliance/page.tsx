import type { Metadata } from "next";

import { ComplianceCheckContainer } from "@/features/compliance/components/ComplianceCheck.container";

export const metadata: Metadata = { title: "Compliance Check" };

const CompliancePage = async ({ params, searchParams }: PageProps<"/ifu/[id]/compliance">) => {
  const [{ id }, query] = await Promise.all([params, searchParams]);

  return <ComplianceCheckContainer documentId={id} passed={query.state === "passed"} />;
};

export default CompliancePage;
