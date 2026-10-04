"use client";

import { ListTree } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { SectionNav } from "./SectionNav";
import type { SectionNavItem } from "./SectionsWorkspace.hooks";

interface SectionNavDrawerProps {
  documentId: string;
  items: SectionNavItem[];
  completedCount: number;
  totalCount: number;
}

/** Section list as a drawer below the lg breakpoint (REQUIREMENTS §11 responsiveness). */
export const SectionNavDrawer = ({ documentId, items, completedCount, totalCount }: SectionNavDrawerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="size-9 shrink-0 lg:hidden" aria-label="Show sections">
          <ListTree />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 gap-0 p-0">
        <SheetHeader className="border-b">
          <SheetTitle>Sections</SheetTitle>
          <SheetDescription>
            {completedCount} of {totalCount} complete
          </SheetDescription>
        </SheetHeader>
        <div className="overflow-y-auto p-3">
          <SectionNav documentId={documentId} items={items} layoutScope="drawer" onNavigate={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
