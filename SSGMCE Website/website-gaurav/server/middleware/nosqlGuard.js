const isPlainObject = (value) =>
  Object.prototype.toString.call(value) === "[object Object]";

const hasForbiddenKey = (value) => {
  if (Array.isArray(value)) {
    return value.some((item) => hasForbiddenKey(item));
  }

  if (!isPlainObject(value)) {
    return false;
  }

  return Object.keys(value).some((key) => {
    if (key.startsWith("$") || key.includes(".") || key.includes("\0")) {
      return true;
    }

    return hasForbiddenKey(value[key]);
  });
};

const noSqlInjectionGuard = (req, res, next) => {
  const payloads = [req.body, req.query, req.params];

  if (payloads.some((payload) => hasForbiddenKey(payload))) {
    return res.status(400).json({
      success: false,
      message: "Request contains unsafe input.",
    });
  }

  return next();
};

module.exports = {
  noSqlInjectionGuard,
};
