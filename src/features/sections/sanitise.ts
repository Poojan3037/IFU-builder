import "server-only";

import sanitizeHtml from "sanitize-html";

/** Only the marks the editor toolbar can produce (FR-S3-03, NFR-SEC-02). No attributes, links or styles. */
const ALLOWED_TAGS = ["p", "br", "strong", "em", "u", "ul", "ol", "li"];

/** Server-side allow-list sanitisation of rich-text before it is stored or rendered. */
export const sanitiseRichText = (html: string): string =>
  sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {},
    transformTags: { b: "strong", i: "em" },
    disallowedTagsMode: "discard",
  });
