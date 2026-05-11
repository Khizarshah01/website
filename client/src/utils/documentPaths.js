export const getDocumentAssetUrl = (input) => {
  if (!input) return "";

  const normalized = String(input).trim().replace(/\\/g, "/");
  return encodeURI(normalized);
};
