const PAGE_CACHE_TTL_MS = 5 * 60 * 1000;
const PAGE_DATA_CACHE_KEY = "__ssgmcePageDataCache";
const PAGE_REQUEST_CACHE_KEY = "__ssgmcePageRequestCache";

const getRoot = () => {
  if (typeof window !== "undefined") return window;
  return globalThis;
};

const getMapStore = (storeKey) => {
  const root = getRoot();
  if (!(root[storeKey] instanceof Map)) {
    root[storeKey] = new Map();
  }
  return root[storeKey];
};

export const getPageDataCache = () => getMapStore(PAGE_DATA_CACHE_KEY);

export const getPageRequestCache = () => getMapStore(PAGE_REQUEST_CACHE_KEY);

export const getStorageCacheKey = (pageId) =>
  `ssgmce-page-cache:${String(pageId || "").toLowerCase()}`;

export const getCachedPageEntry = (pageId, maxAgeMs = PAGE_CACHE_TTL_MS) => {
  const normalizedPageId = String(pageId || "").toLowerCase();
  if (!normalizedPageId) return null;

  const cached = getPageDataCache().get(normalizedPageId);
  if (!cached) return null;

  if (Date.now() - cached.timestamp > maxAgeMs) {
    getPageDataCache().delete(normalizedPageId);
    return null;
  }

  return cached;
};

export const setCachedPageEntry = (pageId, entry) => {
  const normalizedPageId = String(pageId || "").toLowerCase();
  if (!normalizedPageId || !entry?.data) return;

  const normalizedEntry = {
    data: entry.data,
    timestamp: entry.timestamp || Date.now(),
  };

  getPageDataCache().set(normalizedPageId, normalizedEntry);

  try {
    sessionStorage.setItem(
      getStorageCacheKey(normalizedPageId),
      JSON.stringify(normalizedEntry),
    );
  } catch {
    // Ignore storage errors so page rendering keeps working.
  }
};

export const readSessionCachedPageEntry = (
  pageId,
  maxAgeMs = PAGE_CACHE_TTL_MS,
) => {
  const normalizedPageId = String(pageId || "").toLowerCase();
  if (!normalizedPageId) return null;

  try {
    const raw = sessionStorage.getItem(getStorageCacheKey(normalizedPageId));
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed?.timestamp || !parsed?.data) return null;

    if (Date.now() - parsed.timestamp > maxAgeMs) {
      sessionStorage.removeItem(getStorageCacheKey(normalizedPageId));
      return null;
    }

    getPageDataCache().set(normalizedPageId, parsed);
    return parsed;
  } catch {
    return null;
  }
};

export const clearCachedPageEntry = (pageId) => {
  const normalizedPageId = String(pageId || "").toLowerCase();
  if (!normalizedPageId) return;

  getPageDataCache().delete(normalizedPageId);
  getPageRequestCache().delete(normalizedPageId);

  try {
    sessionStorage.removeItem(getStorageCacheKey(normalizedPageId));
  } catch {
    // Ignore storage errors while clearing stale cache entries.
  }
};

export { PAGE_CACHE_TTL_MS };
