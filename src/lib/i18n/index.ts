import { en, type Messages } from "./en";

export const DEFAULT_LOCALE = "en";

type Path<T> = {
  [K in keyof T & string]: T[K] extends string ? K : `${K}.${Path<T[K]>}`;
}[keyof T & string];

export type MessageKey = Path<Messages>;

const messages: Messages = en;

/** Looks up a string by dot path; `{name}` placeholders are filled from `params`. */
export const t = (key: MessageKey, params?: Record<string, string | number>): string => {
  const value = key.split(".").reduce<unknown>((node, part) => (node as Record<string, unknown>)?.[part], messages);
  const text = typeof value === "string" ? value : key;
  return params ? text.replace(/\{(\w+)\}/g, (match, name: string) => String(params[name] ?? match)) : text;
};
