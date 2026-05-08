import axios from "axios";

export const isNotFoundError = (error) => {
  if (axios.isAxiosError(error)) {
    return error.response?.status === 404;
  }

  return error?.message === "Page not found";
};

export const getErrorMessage = (error, fallback = "Something went wrong") => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || fallback;
  }

  return error?.message || fallback;
};

export const logUnexpectedError = (label, error) => {
  if (!isNotFoundError(error)) {
    console.error(label, error);
  }
};
