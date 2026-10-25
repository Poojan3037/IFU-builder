"use client";

import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { AnimatePresence, motion } from "motion/react";
import { Bold, Italic, List, ListOrdered, Underline, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { MAX_FIELD_CHARS } from "../constants";
import { htmlToPlainText } from "../text";

type ToolbarKey = "bold" | "italic" | "underline" | "bulletList" | "orderedList";

const MARKS: { key: ToolbarKey; label: string; icon: LucideIcon }[] = [
  { key: "bold", label: "Bold", icon: Bold },
  { key: "italic", label: "Italic", icon: Italic },
  { key: "underline", label: "Underline", icon: Underline },
];

const LISTS: { key: ToolbarKey; label: string; icon: LucideIcon }[] = [
  { key: "bulletList", label: "Bulleted list", icon: List },
  { key: "orderedList", label: "Numbered list", icon: ListOrdered },
];

/** Only the formatting the server sanitiser allows (FR-S3-03); everything else StarterKit offers is off. */
const EXTENSIONS = [
  StarterKit.configure({
    heading: false,
    blockquote: false,
    code: false,
    codeBlock: false,
    horizontalRule: false,
    strike: false,
    link: false,
  }),
];

const EDITOR_CLASSES = cn(
  "min-h-28 px-3.5 py-3 text-sm leading-relaxed outline-none",
  "[&_p]:my-0 [&_p+p]:mt-2 [&_ul]:my-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-1 [&_ol]:list-decimal [&_ol]:pl-5",
);

interface RichTextFieldProps {
  id: string;
  label: string;
  placeholder: string;
  /** Initial HTML. The editor owns the content afterwards; remount (key) to reset it. */
  value: string;
  error?: string;
  onChange: (html: string) => void;
  onBlur?: () => void;
}

export const RichTextField = ({ id, label, placeholder, value, error, onChange, onBlur }: RichTextFieldProps) => {
  const labelId = `${id}-label`;
  const errorId = `${id}-error`;
  const count = htmlToPlainText(value).length;
  const isOverLimit = count > MAX_FIELD_CHARS;

  const editor = useEditor({
    extensions: EXTENSIONS,
    content: value,
    // Next.js renders client components on the server first; Tiptap must wait for the browser.
    immediatelyRender: false,
    editorProps: {
      attributes: {
        id,
        role: "textbox",
        "aria-multiline": "true",
        "aria-labelledby": labelId,
        ...(error ? { "aria-invalid": "true", "aria-describedby": errorId } : {}),
        class: EDITOR_CLASSES,
      },
    },
    onUpdate: ({ editor: instance }) => onChange(instance.isEmpty ? "" : instance.getHTML()),
    onBlur: () => onBlur?.(),
  });

  const state = useEditorState({
    editor,
    selector: ({ editor: instance }) => ({
      isEmpty: instance?.isEmpty ?? true,
      bold: instance?.isActive("bold") ?? false,
      italic: instance?.isActive("italic") ?? false,
      underline: instance?.isActive("underline") ?? false,
      bulletList: instance?.isActive("bulletList") ?? false,
      orderedList: instance?.isActive("orderedList") ?? false,
    }),
  });

  const run = (key: ToolbarKey) => {
    const chain = editor?.chain().focus();
    if (!chain) return;
    const commands = {
      bold: () => chain.toggleBold(),
      italic: () => chain.toggleItalic(),
      underline: () => chain.toggleUnderline(),
      bulletList: () => chain.toggleBulletList(),
      orderedList: () => chain.toggleOrderedList(),
    } as const;
    commands[key]().run();
  };

  const renderButton = ({ key, label: buttonLabel, icon: Icon }: { key: ToolbarKey; label: string; icon: LucideIcon }) => (
    <button
      key={key}
      type="button"
      aria-label={buttonLabel}
      aria-pressed={state?.[key] ?? false}
      // Keeps the caret and selection in the editor when a toolbar button is pressed.
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => run(key)}
      className={cn(
        "grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring",
        state?.[key] && "bg-background text-primary shadow-xs",
      )}
    >
      <Icon className="size-3.5" />
    </button>
  );

  return (
    <div className="flex flex-col gap-2">
      <span id={labelId} className="text-sm font-medium">
        {label}
      </span>
      <div
        className={cn(
          "overflow-hidden rounded-xl border bg-background shadow-xs transition-[border-color,box-shadow] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30",
          (error || isOverLimit) && "border-destructive focus-within:border-destructive focus-within:ring-destructive/20",
        )}
      >
        <div role="toolbar" aria-label={`${label} formatting`} className="flex items-center gap-0.5 border-b bg-muted/40 px-1.5 py-1">
          {MARKS.map(renderButton)}
          <span aria-hidden className="mx-1 h-4 w-px bg-border" />
          {LISTS.map(renderButton)}
        </div>
        <div className="relative">
          {state?.isEmpty && (
            <span aria-hidden className="pointer-events-none absolute left-3.5 top-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground/70">
              {placeholder}
            </span>
          )}
          <EditorContent editor={editor} />
        </div>
        <div className={cn("flex justify-end px-3 pb-2 text-[11px] tabular-nums text-muted-foreground", isOverLimit && "font-medium text-destructive")}>
          {count.toLocaleString("en-IN")} / {MAX_FIELD_CHARS.toLocaleString("en-IN")}
        </div>
      </div>
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={errorId}
            role="alert"
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
