import API_BASE_URL from "../config/api";

const BACKEND_BASE_URL = API_BASE_URL.replace(/\/api$/, "");
const LEGACY_HOST_RE = /(^|\.)ssgmce\.(ac\.)?in$/i;
const DOCUMENT_EXT_RE = /\.(pdf|docx?|xlsx?|pptx?|zip)(?:$|[?#])/i;

export const resolveBackendUrl = (url = "") => {
  const normalizedUrl = String(url || "").trim().replace(/\\/g, "/");

  if (!normalizedUrl) return "";
  if (/^(mailto:|tel:|data:|blob:|#)/i.test(normalizedUrl)) {
    return normalizedUrl;
  }
  if (/^\/(uploads|api)\//i.test(normalizedUrl)) {
    return `${BACKEND_BASE_URL}${normalizedUrl}`;
  }
  if (/^(uploads|api)\//i.test(normalizedUrl)) {
    return `${BACKEND_BASE_URL}/${normalizedUrl}`;
  }

  return normalizedUrl;
};

export const resolveDocumentUrl = (url = "") => {
  const normalizedUrl = String(url || "").trim().replace(/\\/g, "/");
  if (!normalizedUrl) return "";

  if (/^(mailto:|tel:|#)/i.test(normalizedUrl)) return normalizedUrl;

  try {
    const parsedUrl = new URL(
      normalizedUrl.startsWith("//") ? `https:${normalizedUrl}` : normalizedUrl,
      window.location.origin,
    );
    const isLegacyHost = LEGACY_HOST_RE.test(parsedUrl.hostname);
    const isDocumentLike =
      DOCUMENT_EXT_RE.test(parsedUrl.pathname) ||
      /\/uploads\//i.test(parsedUrl.pathname);

    if (isLegacyHost && isDocumentLike) {
      const fileName = decodeURIComponent(
        parsedUrl.pathname.split("/").filter(Boolean).pop() || "",
      );
      return fileName
        ? `${BACKEND_BASE_URL}/uploads/documents/${encodeURIComponent(fileName)}`
        : `${BACKEND_BASE_URL}/uploads/documents/`;
    }
  } catch {
    // Fall through to backend-relative handling below.
  }

  return resolveBackendUrl(normalizedUrl);
};

export const isLegacySsgmceDocumentUrl = (url = "") => {
  try {
    const parsedUrl = new URL(
      String(url || "").startsWith("//") ? `https:${url}` : url,
      window.location.origin,
    );
    return (
      LEGACY_HOST_RE.test(parsedUrl.hostname) &&
      (DOCUMENT_EXT_RE.test(parsedUrl.pathname) ||
        /\/uploads\//i.test(parsedUrl.pathname))
    );
  } catch {
    return false;
  }
};
