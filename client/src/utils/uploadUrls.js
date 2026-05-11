import API_BASE_URL from "../config/api";

const BACKEND_BASE_URL = API_BASE_URL.replace(/\/api$/, "");
const FALLBACK_IMAGE_DATA_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='420' viewBox='0 0 600 420'%3E%3Crect width='600' height='420' fill='%23f3f4f6'/%3E%3Cpath d='M132 302l92-108 72 78 44-48 128 78H132z' fill='%23d1d5db'/%3E%3Ccircle cx='399' cy='138' r='38' fill='%23d1d5db'/%3E%3Ctext x='300' y='360' text-anchor='middle' font-family='Arial, sans-serif' font-size='24' font-weight='700' fill='%236b7280'%3ESSGMCE%3C/text%3E%3C/svg%3E";

const encodeUrlPreservingStructure = (url = "") => {
  if (!url) return "";

  try {
    return encodeURI(url);
  } catch {
    return url;
  }
};

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
        return encodeUrlPreservingStructure(
          `${BACKEND_BASE_URL}${parsedUrl.pathname}${parsedUrl.search || ""}${parsedUrl.hash || ""}`,
        );
      }
      if (
        typeof window !== "undefined" &&
        window.location.protocol === "https:" &&
        parsedUrl.protocol === "http:" &&
        !/^(localhost|127(?:\.\d+){3})$/i.test(parsedUrl.hostname)
      ) {
        parsedUrl.protocol = "https:";
        return encodeUrlPreservingStructure(parsedUrl.toString());
      }
    } catch {
      // Fall back to the original absolute URL if parsing fails.
    }
    return encodeUrlPreservingStructure(normalizedUrl);
  }
  if (/^(data:|blob:)/i.test(normalizedUrl)) {
    return normalizedUrl;
  }
  if (
    /^(image|upload)-\d+-\d+.*\.(png|jpe?g|gif|webp|svg)$/i.test(normalizedUrl)
  ) {
    return encodeUrlPreservingStructure(
      `${BACKEND_BASE_URL}/uploads/images/${normalizedUrl}`,
    );
  }
  if (/^(uploads|api)\//i.test(normalizedUrl)) {
    return encodeUrlPreservingStructure(`${BACKEND_BASE_URL}/${normalizedUrl}`);
  }
  if (/^\/(uploads|api)\//i.test(normalizedUrl)) {
    return encodeUrlPreservingStructure(`${BACKEND_BASE_URL}${normalizedUrl}`);
  }

  return encodeUrlPreservingStructure(normalizedUrl);
};

export const fallbackImageUrl = FALLBACK_IMAGE_DATA_URL;
