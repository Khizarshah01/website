const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const DEFAULT_COOKIE_NAME = "ssgmce_admin_session";
const DEFAULT_COOKIE_MAX_AGE_MS = 24 * 60 * 60 * 1000;
const WEAK_SECRET_VALUES = new Set([
  "",
  "your_jwt_secret_key_change_this",
  "change_this_admin_jwt_secret",
  "ssgmce-admin-secret-key-2024",
  "secret",
  "changeme",
]);

let cachedRuntimeSecret;
const DEV_SECRET_FILE = path.resolve(__dirname, "..", ".dev-jwt-secret");

const getNodeEnv = () => String(process.env.NODE_ENV || "development").trim();

const isProduction = () => getNodeEnv() === "production";

const getConfiguredJwtSecret = () => String(process.env.JWT_SECRET || "").trim();

const isWeakSecret = (secret) =>
  !secret || secret.length < 32 || WEAK_SECRET_VALUES.has(secret.toLowerCase());

const getPersistentDevJwtSecret = () => {
  if (cachedRuntimeSecret) {
    return cachedRuntimeSecret;
  }

  try {
    const existingSecret = fs.readFileSync(DEV_SECRET_FILE, "utf8").trim();
    if (existingSecret.length >= 32) {
      cachedRuntimeSecret = existingSecret;
      return cachedRuntimeSecret;
    }
  } catch {
    // File does not exist yet; generate it below.
  }

  cachedRuntimeSecret = crypto.randomBytes(48).toString("hex");
  try {
    fs.writeFileSync(DEV_SECRET_FILE, cachedRuntimeSecret, { encoding: "utf8" });
  } catch {
    // If writing fails, still return the in-memory value for this process.
  }

  return cachedRuntimeSecret;
};

const getJwtSecret = () => {
  const configuredSecret = getConfiguredJwtSecret();

  if (configuredSecret && !isWeakSecret(configuredSecret)) {
    return configuredSecret;
  }

  if (isProduction()) {
    throw new Error(
      "JWT_SECRET is missing or weak. Configure a unique secret with at least 32 characters before starting the server.",
    );
  }

  const devSecret = getPersistentDevJwtSecret();
  console.warn(
    "[WARN] Using a persistent local development JWT secret because JWT_SECRET is missing or weak.",
  );
  return devSecret;
};

const parseBoolean = (value, defaultValue) => {
  if (value === undefined) return defaultValue;
  return String(value).trim().toLowerCase() === "true";
};

const getAuthCookieName = () =>
  String(process.env.AUTH_COOKIE_NAME || DEFAULT_COOKIE_NAME).trim() ||
  DEFAULT_COOKIE_NAME;

const getAuthCookieOptions = () => {
  const sameSite = String(
    process.env.AUTH_COOKIE_SAME_SITE || "strict",
  )
    .trim()
    .toLowerCase();
  const secure = isProduction();

  return {
    httpOnly: true,
    secure,
    sameSite,
    path: "/",
    maxAge: Number(process.env.AUTH_COOKIE_MAX_AGE_MS) || DEFAULT_COOKIE_MAX_AGE_MS,
  };
};

const parseCookies = (cookieHeader = "") => {
  return String(cookieHeader || "")
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce((cookies, part) => {
      const separatorIndex = part.indexOf("=");
      if (separatorIndex === -1) {
        return cookies;
      }

      const key = part.slice(0, separatorIndex).trim();
      const value = part.slice(separatorIndex + 1).trim();

      if (!key) {
        return cookies;
      }

      cookies[key] = decodeURIComponent(value);
      return cookies;
    }, {});
};

const getAuthTokenFromRequest = (req) => {
  const cookies = parseCookies(req.headers.cookie);
  const cookieToken = cookies[getAuthCookieName()];
  if (cookieToken) {
    return cookieToken;
  }

  const authHeader = String(req.headers.authorization || "");
  if (authHeader.startsWith("Bearer ")) {
    const bearerToken = authHeader.slice("Bearer ".length).trim();
    if (
      bearerToken &&
      bearerToken !== "null" &&
      bearerToken !== "undefined"
    ) {
      return bearerToken;
    }
  }

  return null;
};

const setAuthCookie = (res, token) => {
  res.cookie(getAuthCookieName(), token, getAuthCookieOptions());
};

const clearAuthCookie = (res) => {
  res.clearCookie(getAuthCookieName(), {
    httpOnly: true,
    secure: getAuthCookieOptions().secure,
    sameSite: getAuthCookieOptions().sameSite,
    path: "/",
  });
};

module.exports = {
  clearAuthCookie,
  getAuthCookieName,
  getAuthCookieOptions,
  getAuthTokenFromRequest,
  getJwtSecret,
  isProduction,
  isWeakSecret,
  setAuthCookie,
};
