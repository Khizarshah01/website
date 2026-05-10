export const getCurrentPath = (location) =>
  `${location?.pathname || ""}${location?.search || ""}${location?.hash || ""}`;

export const SCROLL_OFFSET = 80;

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
  params.set("section", tabId);

  const search = params.toString();

  return `${location?.pathname || ""}${search ? `?${search}` : ""}${location?.hash || ""}`;
};

export const getPathWithSection = (location, sectionId) =>
  getPathWithTab(location, sectionId);

export const getRequestedTab = (location, fallbackTab = "overview") =>
  new URLSearchParams(location?.search || "").get("section") ||
  new URLSearchParams(location?.search || "").get("tab") ||
  fallbackTab;

export const scrollToSection = (
  sectionId,
  { behavior = "smooth", delay = 0, offset = SCROLL_OFFSET } = {},
) => {
  if (!sectionId || typeof window === "undefined") return;

  const run = () => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(top, 0), behavior });
  };

  if (delay > 0) {
    window.setTimeout(run, delay);
    return;
  }

  run();
};

export const updateSectionInUrl = (sectionId) => {
  if (!sectionId || typeof window === "undefined") return;

  const url = new URL(window.location.href);
  url.searchParams.set("section", sectionId);
  url.searchParams.set("tab", sectionId);
  window.history.replaceState(window.history.state, "", url.toString());
};

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

  navigate(fallbackPath);
};
