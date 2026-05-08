import React, { useState, useRef } from "react";
import { useEdit } from "../../contexts/EditContext";
import { FaUpload, FaTrash, FaTimes } from "react-icons/fa";
import apiClient from "../../utils/apiClient";
import {
  isGeneratedUploadImagePath,
  resolveUploadedAssetUrl,
} from "../../utils/uploadUrls";

const MAX_IMAGE_SIZE_BYTES = 20 * 1024 * 1024;

/**
 * EditableImage Component
 * Supports two modes:
 * 1. Path Mode: Pass 'path' string to bind to EditContext data directly.
 * 2. Controlled Mode: Pass 'src' and 'onSave' to handle data manually.
 *
 * Features:
 * - Click to upload new image
 * - Drag and drop support
 * - Image preview
 * - Remove image option
 * - Fallback placeholder when no image
 */
const EditableImage = ({
  path,
  src,
  fallbackSrc,
  onSave,
  className = "",
  alt = "Image",
  placeholder = "Click to upload image",
}) => {
  const { data, updateData, isEditing } = useEdit();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [showUploadUI, setShowUploadUI] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Helper to safely get value from path
  const getValueFromPath = (obj, p) => {
    if (!p || !obj) return undefined;
    return p
      .replace(/\[(\d+)\]/g, ".$1")
      .split(".")
      .reduce((acc, part) => acc && acc[part], obj);
  };

  // Determine current image URL
  const imageUrl =
    src !== undefined ? src : path ? getValueFromPath(data, path) : "";
  const resolvedImageUrl = resolveUploadedAssetUrl(imageUrl);
  const resolvedFallbackUrl = resolveUploadedAssetUrl(fallbackSrc);
  const shouldPreferFallback =
    isGeneratedUploadImagePath(imageUrl) && Boolean(resolvedFallbackUrl);
  const displayImageUrl = shouldPreferFallback
    ? resolvedFallbackUrl
    : resolvedImageUrl || resolvedFallbackUrl;

  const applyFallbackImage = (event) => {
    if (
      resolvedFallbackUrl &&
      event.currentTarget.src !== resolvedFallbackUrl
    ) {
      event.currentTarget.src = resolvedFallbackUrl;
      return;
    }
    event.currentTarget.style.display = "none";
  };

  const handleFileSelect = async (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    // Validate file size (20MB limit)
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setError("File size must be less than 20MB");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await apiClient.post("/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const newUrl =
        response?.data?.fileUrl ||
        response?.data?.url ||
        response?.data?.data?.fileUrl ||
        response?.data?.data?.url;

      if (newUrl) {
        // Save the new URL
        if (onSave) {
          onSave(newUrl);
        } else if (path) {
          updateData(path, newUrl);
        }

        setShowUploadUI(false);
      } else {
        setError(
          response.data.error || response.data.message || "Upload failed",
        );
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.response?.data?.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    e.target.value = "";
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  const handleRemoveImage = () => {
    if (onSave) {
      onSave("");
    } else if (path) {
      updateData(path, "");
    }
    setShowUploadUI(false);
  };

  // View Mode (not editing)
  if (!isEditing) {
    return displayImageUrl ? (
      <img
        src={displayImageUrl}
        alt={alt}
        className={className}
        onError={applyFallbackImage}
      />
    ) : (
      <div
        className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 ${className}`}
      >
        <span className="text-sm">No image</span>
      </div>
    );
  }

  // Edit Mode - Upload UI Active
  if (showUploadUI) {
    return (
      <div className="relative">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragOver
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
              : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50"
          } ${className}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />

          {uploading ? (
            <div className="space-y-2">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Uploading...
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <FaUpload className="mx-auto text-4xl text-gray-400 dark:text-gray-500" />
              <div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Choose File
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  or drag and drop an image here
                </p>
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Maximum file size: 20MB
              </p>
            </div>
          )}

          {error && (
            <div className="mt-4 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/30 p-2 rounded">
              {error}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowUploadUI(false)}
          className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg"
          title="Cancel"
        >
          <FaTimes size={12} />
        </button>
      </div>
    );
  }

  // Edit Mode - Image Display
  return (
    <div className="relative group">
      {displayImageUrl ? (
        <>
          <img
            src={displayImageUrl}
            alt={alt}
            className={className}
            onError={applyFallbackImage}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => setShowUploadUI(true)}
              className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 shadow-lg transform scale-90 hover:scale-100 transition-transform"
              title="Change Image"
            >
              <FaUpload />
            </button>
            <button
              type="button"
              onClick={handleRemoveImage}
              className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 shadow-lg transform scale-90 hover:scale-100 transition-transform"
              title="Remove Image"
            >
              <FaTrash />
            </button>
          </div>
        </>
      ) : (
        <div
          onClick={() => setShowUploadUI(true)}
          className={`flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 cursor-pointer transition-colors ${className}`}
        >
          <FaUpload className="text-3xl text-gray-400 dark:text-gray-500 mb-2" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {placeholder}
          </span>
        </div>
      )}
    </div>
  );
};

export default EditableImage;
