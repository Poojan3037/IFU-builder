import type { DocumentFilters } from "./types";
import { filtersSchema } from "./schema";

type RawParams = Record<string, string | string[] | undefined> | URLSearchParams;

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

export const parseFilters = (params: RawParams): DocumentFilters => {
  const get = (key: string) => (params instanceof URLSearchParams ? (params.get(key) ?? undefined) : first(params[key]));
  return filtersSchema.parse({
    q: get("q") ?? "",
    status: get("status")?.toUpperCase(),
    risk: get("risk")?.toUpperCase(),
    page: get("page") ?? 1,
  });
};
