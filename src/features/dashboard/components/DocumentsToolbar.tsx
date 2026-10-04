"use client";

import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { RISK_FILTER_OPTIONS, STATUS_FILTER_OPTIONS } from "../constants";
import type { RiskFilter, StatusFilter } from "../types";

interface DocumentsToolbarProps {
  search: string;
  status: StatusFilter;
  risk: RiskFilter;
  hasActiveFilters: boolean;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onRiskChange: (value: string) => void;
  onClearFilters: () => void;
}

export const DocumentsToolbar = ({
  search,
  status,
  risk,
  hasActiveFilters,
  onSearchChange,
  onStatusChange,
  onRiskChange,
  onClearFilters,
}: DocumentsToolbarProps) => (
  <div className="flex flex-col gap-3 border-b p-4 md:flex-row md:items-center">
    <InputGroup className="h-9 md:max-w-sm">
      <InputGroupAddon>
        <Search aria-hidden />
      </InputGroupAddon>
      <InputGroupInput
        type="search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search device, model or manufacturer"
        aria-label="Search documents"
      />
    </InputGroup>
    <div className="flex flex-wrap items-center gap-2 md:ml-auto">
      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger aria-label="Filter by status" className="h-9 min-w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STATUS_FILTER_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={risk} onValueChange={onRiskChange}>
        <SelectTrigger aria-label="Filter by risk class" className="h-9 min-w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {RISK_FILTER_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-muted-foreground">
          <X aria-hidden /> Clear
        </Button>
      )}
    </div>
  </div>
);
