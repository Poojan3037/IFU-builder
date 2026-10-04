"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DocumentsPaginationProps {
  page: number;
  pageCount: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

export const DocumentsPagination = ({ page, pageCount, pageSize, totalCount, onPageChange }: DocumentsPaginationProps) => {
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalCount);

  return (
    <nav aria-label="Pagination" className="flex flex-col items-center justify-between gap-3 border-t px-4 py-3 text-sm sm:flex-row">
      <p className="text-muted-foreground">
        Showing <span className="font-medium text-foreground">{from}–{to}</span> of{" "}
        <span className="font-medium text-foreground">{totalCount}</span>
      </p>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          <ChevronLeft aria-hidden /> Previous
        </Button>
        {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
          <Button
            key={number}
            variant={number === page ? "outline" : "ghost"}
            size="icon-sm"
            aria-current={number === page ? "page" : undefined}
            aria-label={`Page ${number}`}
            onClick={() => onPageChange(number)}
            className={cn(number === page && "font-semibold")}
          >
            {number}
          </Button>
        ))}
        <Button variant="ghost" size="sm" disabled={page >= pageCount} onClick={() => onPageChange(page + 1)}>
          Next <ChevronRight aria-hidden />
        </Button>
      </div>
    </nav>
  );
};
