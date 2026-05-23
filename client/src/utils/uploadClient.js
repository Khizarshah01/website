import apiClient from "./apiClient";

export const UPLOAD_LIMIT_TEXT = {
  image: "Large image uploads are supported.",
  document: "Large document uploads are supported.",
  nirf: "Large PDF uploads are supported.",
  video: "Large video uploads are supported (up to 1GB).",
};

export const validateUploadFile = (file, { kind = "document" } = {}) => {
  if (!file) {
    throw new Error("No file selected.");
  }

  if (kind === "image" && !String(file.type || "").startsWith("image/")) {
    throw new Error("Please select a valid image file.");
  }

  if (kind === "video" && !String(file.type || "").startsWith("video/")) {
    throw new Error("Please select a valid video file.");
  }

  if (kind === "pdf" && file.type !== "application/pdf") {
    throw new Error("Only PDF files are allowed.");
  }
};

export const getUploadErrorMessage = (
  error,
  fallback = "Upload failed. Please try again.",
) => {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback;

  if (
    error?.code === "ECONNABORTED" ||
    String(message).toLowerCase().includes("timeout")
  ) {
    return "Upload timed out before the server finished processing the file.";
  }

  if (
    error?.response?.status === 413 ||
    String(message).toLowerCase().includes("too large")
  ) {
    return message;
  }

  if (!error?.response && /network error/i.test(String(message))) {
    return "Upload could not reach the server. Check your connection and try again.";
  }

  return message;
};

export const uploadAsset = async ({
  endpoint,
  fieldName,
  file,
  onProgress,
}) => {
  validateUploadFile(file, {
    kind:
      endpoint === "/upload/image"
        ? "image"
        : endpoint === "/upload/video"
          ? "video"
          : endpoint === "/upload/nirf-pdf"
            ? "pdf"
            : "document",
  });

  const formData = new FormData();
  formData.append(fieldName, file);

  return apiClient.post(endpoint, formData, {
    timeout: 15 * 60 * 1000,
    onUploadProgress: (event) => {
      if (!onProgress || !event?.total) return;
      onProgress(Math.min(100, Math.round((event.loaded / event.total) * 100)));
    },
  });
};
