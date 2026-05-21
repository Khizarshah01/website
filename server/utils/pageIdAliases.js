const PAGE_ID_ALIASES = Object.freeze({
  "about-glance": "about-at-glance",
  "about-board-of-directors": "about-directors",
  "about-board": "about-directors",
  "about-governing-body": "about-governing",
  "about-organization": "about-structure",
  "about-principal-message": "about-principal",
  "about-vision-mission": "about-vision",
  contact: "contact-us",
});

const resolveCanonicalPageId = (pageId = "") => {
  const normalizedPageId = String(pageId || "").trim().toLowerCase();
  if (!normalizedPageId) return "";
  return PAGE_ID_ALIASES[normalizedPageId] || normalizedPageId;
};

const getRelatedPageIds = (pageId = "") => {
  const canonicalPageId = resolveCanonicalPageId(pageId);
  if (!canonicalPageId) return [];

  const aliases = Object.entries(PAGE_ID_ALIASES)
    .filter(([, target]) => target === canonicalPageId)
    .map(([alias]) => alias);

  return [canonicalPageId, ...aliases.filter((alias) => alias !== canonicalPageId)];
};

module.exports = {
  PAGE_ID_ALIASES,
  resolveCanonicalPageId,
  getRelatedPageIds,
};
