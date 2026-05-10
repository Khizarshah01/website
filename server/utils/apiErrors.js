const getSafeErrorStatus = (error, fallbackStatus = 500) => {
  if (error?.name === "CastError" || error?.name === "ValidationError") {
    return 400;
  }

  return fallbackStatus;
};

const sendSafeError = (
  res,
  error,
  {
    fallbackStatus = 500,
    message = "Request failed",
    validationMessage = "Invalid request data",
  } = {},
) => {
  const status = getSafeErrorStatus(error, fallbackStatus);
  return res.status(status).json({
    success: false,
    message: status === 400 ? validationMessage : message,
  });
};

module.exports = {
  sendSafeError,
};
