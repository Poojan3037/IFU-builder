import { cn } from "@/lib/utils";

import type { DeviceSymbol } from "../types";

export type MiniPageKind = "cover" | "content" | "glossary";

interface MiniPageProps {
  kind: MiniPageKind;
  pageLabel: string;
  symbols: DeviceSymbol[];
}

const LINE_WIDTHS = ["w-full", "w-11/12", "w-4/5", "w-full", "w-3/4", "w-10/12", "w-2/3"];

const ContentLines = () => (
  <div className="flex flex-col gap-[3px]">
    <span className="mb-1 h-1.5 w-1/2 rounded-full bg-[oklch(0.56_0.11_210)]/70" />
    {LINE_WIDTHS.map((width, index) => (
      <span key={index} className={cn("h-[3px] rounded-full bg-[oklch(0.85_0.01_250)]", width)} />
    ))}
    <span className="mb-1 mt-2 h-1.5 w-2/5 rounded-full bg-[oklch(0.56_0.11_210)]/70" />
    {LINE_WIDTHS.slice(2).map((width, index) => (
      <span key={index} className={cn("h-[3px] rounded-full bg-[oklch(0.85_0.01_250)]", width)} />
    ))}
  </div>
);

const CoverContent = () => (
  <div className="flex h-full flex-col justify-between">
    <span className="h-3 w-8 rounded-sm border border-dashed border-[oklch(0.8_0.02_250)]" />
    <div className="flex flex-col gap-1">
      <span className="h-[3px] w-1/3 rounded-full bg-[oklch(0.56_0.11_210)]/70" />
      <span className="h-2 w-4/5 rounded-full bg-[oklch(0.3_0.02_250)]" />
      <span className="h-1.5 w-3/5 rounded-full bg-[oklch(0.6_0.02_250)]" />
    </div>
    <div className="flex flex-col gap-[3px]">
      <span className="h-[3px] w-2/3 rounded-full bg-[oklch(0.85_0.01_250)]" />
      <span className="h-[3px] w-1/2 rounded-full bg-[oklch(0.85_0.01_250)]" />
    </div>
  </div>
);

const GlossaryContent = ({ symbols }: { symbols: DeviceSymbol[] }) => (
  <div className="flex flex-col gap-1.5">
    <span className="h-1.5 w-1/2 rounded-full bg-[oklch(0.56_0.11_210)]/70" />
    <div className="grid grid-cols-2 gap-1">
      {symbols.slice(0, 8).map((symbol) => (
        <span key={symbol.id} className="flex items-center gap-1">
          <span className="grid h-3 min-w-3 place-items-center rounded-[2px] border border-[oklch(0.4_0.02_250)] px-px text-[4px] font-bold leading-none text-[oklch(0.3_0.02_250)]">
            {symbol.glyph}
          </span>
          <span className="h-[3px] flex-1 rounded-full bg-[oklch(0.85_0.01_250)]" />
        </span>
      ))}
    </div>
  </div>
);

/** A schematic A4 page used in the export thumbnail; always light, like paper. */
export const MiniPage = ({ kind, pageLabel, symbols }: MiniPageProps) => (
  <div className="flex aspect-[210/297] w-full flex-col overflow-hidden rounded-md bg-paper p-2.5 shadow-lg shadow-black/10 ring-1 ring-black/5">
    <div className="flex-1">
      {kind === "cover" && <CoverContent />}
      {kind === "content" && <ContentLines />}
      {kind === "glossary" && <GlossaryContent symbols={symbols} />}
    </div>
    <span className="mt-1 self-end font-mono text-[6px] text-[oklch(0.6_0.02_250)]">{pageLabel}</span>
  </div>
);
