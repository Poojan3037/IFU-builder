/** Rough characters per A4 page at the preview's type size; drives deterministic pagination. */
export const PAGE_CAPACITY = { first: 2400, rest: 3200 } as const;

/** Fixed cost of a section heading and of each labelled block, in the same "characters" unit. */
export const HEADING_WEIGHT = 140;
export const BLOCK_WEIGHT = 70;
