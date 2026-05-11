export const getDocumentAssetUrl = (input) => {
  if (!input) return "";

  const normalized = String(input).trim().replace(/\\/g, "/");

  if (!normalized) return "";
  if (/^(mailto:|tel:|data:|blob:|#)/i.test(normalized)) {
    return normalized;
  }

  if (/^https?:\/\//i.test(normalized) || normalized.startsWith("//")) {
    return encodeURI(normalized);
  }

  if (/^\/?documents\//i.test(normalized)) {
    const cleaned = normalized.replace(/^\/?documents\//i, "");
    return encodeURI(`/api/documents/${cleaned}`);
  }

  if (/^\/?(api|uploads)\//i.test(normalized)) {
    return encodeURI(normalized.startsWith("/") ? normalized : `/${normalized}`);
  }

  return encodeURI(normalized);
};
