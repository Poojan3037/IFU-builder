import type { ReactNode } from "react";

import { PageTransition } from "@/components/shared/motion";

interface TemplateProps {
  children: ReactNode;
}

const Template = ({ children }: TemplateProps) => <PageTransition>{children}</PageTransition>;

export default Template;
