import type { ReactNode } from "react";

import { SectionNav } from "./SectionNav";
import { SectionNavDrawer } from "./SectionNavDrawer";
import { SectionsTopBar } from "./SectionsTopBar";
import type { SectionNavItem } from "./SectionsWorkspace.hooks";

interface SectionsWorkspacePresentationProps {
  documentId: string;
  deviceName: string;
  items: SectionNavItem[];
  completedCount: number;
  totalCount: number;
  canCheck: boolean;
  children: ReactNode;
}

export const SectionsWorkspacePresentation = ({
  documentId,
  deviceName,
  items,
  completedCount,
  totalCount,
  canCheck,
  children,
}: SectionsWorkspacePresentationProps) => (
  <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:py-8">
    <SectionsTopBar
      documentId={documentId}
      deviceName={deviceName}
      completedCount={completedCount}
      totalCount={totalCount}
      canCheck={canCheck}
      navTrigger={
        <SectionNavDrawer documentId={documentId} items={items} completedCount={completedCount} totalCount={totalCount} />
      }
    />
    <div className="grid flex-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="hidden lg:block">
        <div className="glass sticky top-20 rounded-2xl p-2 shadow-sm">
          <p className="px-3 pb-1 pt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Sections</p>
          <SectionNav documentId={documentId} items={items} layoutScope="desktop" />
        </div>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  </div>
);
