"use client";

import { useRef, type KeyboardEvent } from "react";

const NEXT_KEYS = ["ArrowRight", "ArrowDown"];
const PREV_KEYS = ["ArrowLeft", "ArrowUp"];

/**
 * WAI-ARIA radio-group keyboard behaviour: arrow keys move selection and focus,
 * Home/End jump to the ends. Returns per-item refs and a shared keydown handler.
 */
export const useRadioGroupKeys = <T extends string>(options: readonly T[], value: T | null, onChange: (value: T) => void) => {
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  const select = (index: number) => {
    const next = (index + options.length) % options.length;
    onChange(options[next]);
    itemRefs.current[next]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const current = value === null ? -1 : options.indexOf(value);
    if (NEXT_KEYS.includes(event.key)) select(current + 1);
    else if (PREV_KEYS.includes(event.key)) select(current < 0 ? options.length - 1 : current - 1);
    else if (event.key === "Home") select(0);
    else if (event.key === "End") select(options.length - 1);
    else return;
    event.preventDefault();
  };

  const setItemRef = (index: number) => (node: HTMLElement | null) => {
    itemRefs.current[index] = node;
  };

  /** Roving tabindex: the selected item (or the first, if none) is the single tab stop. */
  const tabIndexFor = (option: T, index: number) => (value === option || (value === null && index === 0) ? 0 : -1);

  return { handleKeyDown, setItemRef, tabIndexFor };
};
