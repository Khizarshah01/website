import DOMPurify from "dompurify";

export const sanitizeMarkdownHtml = (markdown = "") =>
  DOMPurify.sanitize(String(markdown || ""), {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target"],
  });
