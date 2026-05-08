const LoginAttempt = require("../models/LoginAttempt");

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS_PER_IP = 5;
const MAX_ATTEMPTS_PER_EMAIL = 5;

const normalizeEmail = (email = "") => String(email || "").trim().toLowerCase();

const getClientIp = (req) => {
  const forwardedFor = String(req.headers["x-forwarded-for"] || "")
    .split(",")[0]
    .trim();

  return forwardedFor || req.ip || req.socket?.remoteAddress || "unknown";
};

const countRecentAttempts = (scope, value, cutoff) =>
  LoginAttempt.countDocuments({
    scope,
    value,
    createdAt: { $gte: cutoff },
  });

const getRetryAfterSeconds = async (scope, value, cutoff) => {
  const oldestAttempt = await LoginAttempt.findOne({
    scope,
    value,
    createdAt: { $gte: cutoff },
  })
    .sort({ createdAt: 1 })
    .select("createdAt")
    .lean();

  if (!oldestAttempt?.createdAt) {
    return Math.ceil(WINDOW_MS / 1000);
  }

  const retryAfterMs =
    WINDOW_MS - (Date.now() - new Date(oldestAttempt.createdAt).getTime());

  return Math.max(1, Math.ceil(retryAfterMs / 1000));
};

const loginRateLimit = async (req, res, next) => {
  try {
    const cutoff = new Date(Date.now() - WINDOW_MS);
    const ip = getClientIp(req);
    const email = normalizeEmail(req.body?.email);

    const [ipAttempts, emailAttempts] = await Promise.all([
      countRecentAttempts("ip", ip, cutoff),
      email ? countRecentAttempts("email", email, cutoff) : Promise.resolve(0),
    ]);

    const ipBlocked = ipAttempts >= MAX_ATTEMPTS_PER_IP;
    const emailBlocked = email && emailAttempts >= MAX_ATTEMPTS_PER_EMAIL;

    if (!ipBlocked && !emailBlocked) {
      return next();
    }

    const retryAfterSeconds = await getRetryAfterSeconds(
      ipBlocked ? "ip" : "email",
      ipBlocked ? ip : email,
      cutoff,
    );

    res.setHeader("Retry-After", String(retryAfterSeconds));
    return res.status(429).json({
      success: false,
      message: "Too many login attempts. Please try again later.",
    });
  } catch (error) {
    console.error("Login rate limit check failed:", error.message);
    return next();
  }
};

const registerLoginFailure = async (req, email = "") => {
  const ip = getClientIp(req);
  const normalizedEmail = normalizeEmail(email);
  const expiresAt = new Date(Date.now() + WINDOW_MS);
  const docs = [{ scope: "ip", value: ip, expiresAt }];

  if (normalizedEmail) {
    docs.push({ scope: "email", value: normalizedEmail, expiresAt });
  }

  await LoginAttempt.insertMany(docs, { ordered: false });
};

const clearLoginFailures = async (req, email = "") => {
  const ip = getClientIp(req);
  const normalizedEmail = normalizeEmail(email);
  const filters = [{ scope: "ip", value: ip }];

  if (normalizedEmail) {
    filters.push({ scope: "email", value: normalizedEmail });
  }

  await LoginAttempt.deleteMany({ $or: filters });
};

module.exports = {
  loginRateLimit,
  registerLoginFailure,
  clearLoginFailures,
};
