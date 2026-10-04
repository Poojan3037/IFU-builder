import type { PreviewMeta, PreviewPage } from "../types";

import { A4Page } from "./A4Page";

interface PrintLayoutProps {
  pages: PreviewPage[];
  meta: PreviewMeta;
  zoom: number;
}

/** Paginated A4 pages with margins, header and footer (FR-PRV-02). */
export const PrintLayout = ({ pages, meta, zoom }: PrintLayoutProps) => (
  <div className="flex flex-col gap-8">
    {pages.map((page) => (
      <A4Page key={page.index} page={page} pageCount={pages.length} meta={meta} zoom={zoom} />
    ))}
  </div>
);
