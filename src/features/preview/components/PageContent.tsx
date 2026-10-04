import type { PreviewMeta, PreviewPage } from "../types";

import { DocumentSection } from "./DocumentSection";
import { DocumentTitleBlock } from "./DocumentTitleBlock";

interface PageContentProps {
  page: PreviewPage;
  meta: PreviewMeta;
}

/** One page's body — shared by Document View and Print Layout so both stay faithful to the PDF. */
export const PageContent = ({ page, meta }: PageContentProps) => (
  <>
    {page.hasTitle && <DocumentTitleBlock meta={meta} />}
    {page.sections.map((section) => (
      <DocumentSection key={section.key} section={section} />
    ))}
  </>
);
