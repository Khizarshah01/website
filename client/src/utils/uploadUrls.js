import API_BASE_URL from "../config/api";

const BACKEND_BASE_URL = API_BASE_URL.replace(/\/api$/, "");

export const isGeneratedUploadImagePath = (url = "") => {
  const normalizedUrl = String(url || "").trim();
  return /^(https?:\/\/[^/]+)?\/uploads\/images\/image-(?:\d+-\d+|url|placeholder)(?:$|[./?-])/i.test(
    normalizedUrl,
  );
};

export const resolveUploadedAssetUrl = (url = "") => {
  const normalizedUrl = String(url || "")
    .trim()
    .replace(/\\/g, "/");

  if (!normalizedUrl) return "";
  if (/^(https?:|\/\/)/i.test(normalizedUrl)) {
    try {
      const parsedUrl = new URL(
        normalizedUrl.startsWith("//")
          ? `https:${normalizedUrl}`
          : normalizedUrl,
      );
      if (/^\/(uploads|api)\//i.test(parsedUrl.pathname)) {
        return `${BACKEND_BASE_URL}${parsedUrl.pathname}${parsedUrl.search || ""}`;
      }
    } catch {
      // Fall back to the original absolute URL if parsing fails.
    }
    return normalizedUrl;
  }
  if (/^(data:|blob:)/i.test(normalizedUrl)) {
    return normalizedUrl;
  }
  if (
    /^(image|upload)-\d+-\d+.*\.(png|jpe?g|gif|webp|svg)$/i.test(normalizedUrl)
  ) {
    return `${BACKEND_BASE_URL}/uploads/images/${normalizedUrl}`;
  }
  if (/^(uploads|api)\//i.test(normalizedUrl)) {
    return `${BACKEND_BASE_URL}/${normalizedUrl}`;
  }
  if (/^\/(uploads|api)\//i.test(normalizedUrl)) {
    return `${BACKEND_BASE_URL}${normalizedUrl}`;
  }

  return normalizedUrl;
};
