const blacklist = new Set();
const BLACKLIST_TTL_MS = 24 * 60 * 60 * 1000;

function blacklistToken(token) {
  if (!token) return;
  blacklist.add(token);
  setTimeout(() => blacklist.delete(token), BLACKLIST_TTL_MS);
}

function isTokenBlacklisted(token) {
  if (!token) return false;
  return blacklist.has(token);
}

module.exports = {
  blacklistToken,
  isTokenBlacklisted,
};
