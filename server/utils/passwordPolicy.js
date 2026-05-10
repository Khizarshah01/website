function validatePassword(password) {
  const errors = [];
  const value = String(password || "");

  if (value.length < 8) {
    errors.push("Password must be at least 8 characters.");
  }
  if (!/[A-Z]/.test(value)) {
    errors.push("Password must contain at least one uppercase letter.");
  }
  if (!/[a-z]/.test(value)) {
    errors.push("Password must contain at least one lowercase letter.");
  }
  if (!/[0-9]/.test(value)) {
    errors.push("Password must contain at least one number.");
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(value)) {
    errors.push("Password must contain at least one special character.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

module.exports = {
  validatePassword,
};
