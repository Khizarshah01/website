import { resolveUploadedAssetUrl } from "./uploadUrls";

export const FALLBACK_IMAGE_DATA_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='420' viewBox='0 0 600 420'%3E%3Crect width='600' height='420' fill='%23f3f4f6'/%3E%3Cpath d='M132 302l92-108 72 78 44-48 128 78H132z' fill='%23d1d5db'/%3E%3Ccircle cx='399' cy='138' r='38' fill='%23d1d5db'/%3E%3Ctext x='300' y='360' text-anchor='middle' font-family='Arial, sans-serif' font-size='24' font-weight='700' fill='%236b7280'%3ESSGMCE%3C/text%3E%3C/svg%3E";

export const getFallbackImageUrl = () => FALLBACK_IMAGE_DATA_URL;

export const applyImageFallback = (image) => {
  if (!image || image.dataset?.fallbackApplied === "true") return;

  const fallbackSrc = image.dataset?.fallbackSrc
    ? resolveUploadedAssetUrl(image.dataset.fallbackSrc)
    : getFallbackImageUrl();

  image.dataset.fallbackApplied = "true";
  image.src = fallbackSrc;
  image.style.objectFit = image.style.objectFit || "cover";
};

export const installGlobalImageFallback = () => {
  const handleError = (event) => {
    const target = event.target;
    if (target instanceof HTMLImageElement) {
      applyImageFallback(target);
    }
  };

  window.addEventListener("error", handleError, true);
  return () => window.removeEventListener("error", handleError, true);
};
