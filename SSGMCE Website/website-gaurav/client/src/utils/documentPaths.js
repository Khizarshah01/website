export const getDocumentAssetUrl = (input) => {
  if (!input) return "";

  if (/^https?:\/\//i.test(input)) {
    return input;
  }

  const hasLeadingSlash = input.startsWith("/");
  const normalized = input.replace(/\\/g, "/");
  const encoded = normalized
    .split("/")
    .filter((segment, index) => segment || index === 0)
    .map((segment, index) => {
      if (!segment && index === 0) {
        return "";
      }

      return encodeURIComponent(segment);
    })
    .join("/");

  return hasLeadingSlash ? encoded || "/" : encoded;
};
