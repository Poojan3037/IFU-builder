"use client";

import { AnimatePresence, motion } from "motion/react";
import { Bold, Italic, List, ListOrdered, Underline, type LucideIcon } from "lucide-react";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { MAX_FIELD_CHARS } from "../constants";

type Mark = "bold" | "italic" | "underline";

const MARKS: { key: Mark; label: string; icon: LucideIcon; className: string }[] = [
  { key: "bold", label: "Bold", icon: Bold, className: "font-semibold" },
  { key: "italic", label: "Italic", icon: Italic, className: "italic" },
  { key: "underline", label: "Underline", icon: Underline, className: "underline underline-offset-4" },
];

const LISTS = [
  { key: "bullet", label: "Bulleted list", icon: List, prefix: "• " },
  { key: "number", label: "Numbered list", icon: ListOrdered, prefix: "1. " },
] as const;

interface RichTextFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  autoFocus?: boolean;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

/** Static stand-in for the Tiptap editor: visual toolbar, plain textarea body. */
export const RichTextField = ({ id, label, placeholder, value, error, autoFocus, onChange, onBlur }: RichTextFieldProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [marks, setMarks] = useState<Set<Mark>>(new Set());
  const errorId = `${id}-error`;
  const count = value.length;

  const toggleMark = (mark: Mark) =>
    setMarks((prev) => {
      const next = new Set(prev);
      if (next.has(mark)) next.delete(mark);
      else next.add(mark);
      return next;
    });

  const insertListPrefix = (prefix: string) => {
    const node = textareaRef.current;
    const cursor = node?.selectionStart ?? value.length;
    const lineStart = value.lastIndexOf("\n", cursor - 1) + 1;
    onChange(value.slice(0, lineStart) + prefix + value.slice(lineStart));
    requestAnimationFrame(() => {
      node?.focus();
      node?.setSelectionRange(cursor + prefix.length, cursor + prefix.length);
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div
        className={cn(
          "overflow-hidden rounded-xl border bg-background shadow-xs transition-[border-color,box-shadow] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30",
          error && "border-destructive focus-within:border-destructive focus-within:ring-destructive/20",
        )}
      >
        <div role="toolbar" aria-label={`${label} formatting`} className="flex items-center gap-0.5 border-b bg-muted/40 px-1.5 py-1">
          {MARKS.map(({ key, label: markLabel, icon: Icon }) => (
            <button
              key={key}
              type="button"
              aria-label={markLabel}
              aria-pressed={marks.has(key)}
              onClick={() => toggleMark(key)}
              className={cn(
                "grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring",
                marks.has(key) && "bg-background text-primary shadow-xs",
              )}
            >
              <Icon className="size-3.5" />
            </button>
          ))}
          <span aria-hidden className="mx-1 h-4 w-px bg-border" />
          {LISTS.map(({ key, label: listLabel, icon: Icon, prefix }) => (
            <button
              key={key}
              type="button"
              aria-label={listLabel}
              onClick={() => insertListPrefix(prefix)}
              className="grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
            >
              <Icon className="size-3.5" />
            </button>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          id={id}
          value={value}
          placeholder={placeholder}
          autoFocus={autoFocus}
          maxLength={MAX_FIELD_CHARS}
          rows={4}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          className={cn(
            "block min-h-28 w-full resize-y bg-transparent px-3.5 py-3 text-sm leading-relaxed outline-none placeholder:text-muted-foreground/70",
            MARKS.filter((m) => marks.has(m.key)).map((m) => m.className),
          )}
        />
        <div className="flex justify-end px-3 pb-2 text-[11px] tabular-nums text-muted-foreground">
          {count.toLocaleString("en-IN")} / {MAX_FIELD_CHARS.toLocaleString("en-IN")}
        </div>
      </div>
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={errorId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs font-medium text-destructive"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
