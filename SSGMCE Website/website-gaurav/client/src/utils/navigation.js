export const getCurrentPath = (location) =>
  `${location?.pathname || ""}${location?.search || ""}${location?.hash || ""}`;

const isSafeInternalPath = (value) =>
  typeof value === "string" && value.startsWith("/") && !value.startsWith("//");

const normalizeFromLocationLike = (value) => {
  if (isSafeInternalPath(value)) return value;

  if (value && typeof value === "object") {
    const pathname = value.pathname || "";
    const search = value.search || "";
    const hash = value.hash || "";
    const nextValue = `${pathname}${search}${hash}`;
    return isSafeInternalPath(nextValue) ? nextValue : null;
  }

  return null;
};

export const getPathWithTab = (location, tabId) => {
  const params = new URLSearchParams(location?.search || "");
  params.set("tab", tabId);

  const search = params.toString();

  return `${location?.pathname || ""}${search ? `?${search}` : ""}${location?.hash || ""}`;
};

export const getRequestedTab = (location, fallbackTab = "overview") =>
  new URLSearchParams(location?.search || "").get("tab") || fallbackTab;

export const getReturnTarget = (location, fallbackPath) => {
  const fromState = normalizeFromLocationLike(location?.state?.from);
  if (fromState) return fromState;

  const returnTo = new URLSearchParams(location?.search || "").get("returnTo");
  if (isSafeInternalPath(returnTo)) return returnTo;

  return fallbackPath;
};

export const buildReturnState = (location, extraState = {}) => ({
  ...extraState,
  from: getCurrentPath(location),
});

export const goBackOrFallback = (navigate, location, fallbackPath) => {
  const returnTarget = getReturnTarget(location, null);
  if (returnTarget) {
    navigate(returnTarget);
    return;
  }

  if (typeof window !== "undefined" && window.history.length > 1) {
    navigate(-1);
    return;
  }

  navigate(fallbackPath);
};
