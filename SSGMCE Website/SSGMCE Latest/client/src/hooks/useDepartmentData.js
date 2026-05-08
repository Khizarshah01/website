import { useState, useEffect } from "react";
import apiClient from "../utils/apiClient";
import { useEdit } from "../contexts/EditContext";
import { logUnexpectedError } from "../utils/apiErrors";

/**
 * Custom hook to load department page data
 * Works both in edit mode (admin) and public view mode
 *
 * @param {string} pageId - The page identifier (e.g., 'departments-cse')
 * @returns {object} - { data, loading, isEditing, updateData, t }
 */
export const useDepartmentData = (pageId) => {
  const [pageData, setPageData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const { data: editData, updateData, removeData, isEditing } = useEdit();

  // Fetch page data on mount if not in edit mode
  useEffect(() => {
    const loadPageData = async () => {
      // If in edit mode, data comes from EditContext
      if (isEditing) {
        setDataLoading(false);
        return;
      }

      try {
        const response = await apiClient.get(`/pages/${pageId}`);
        if (response.data.success) {
          setPageData(response.data.data);
        }
      } catch (error) {
        logUnexpectedError(`Error loading ${pageId} page data:`, error);
        // Continue with defaults
      } finally {
        setDataLoading(false);
      }
    };

    loadPageData();
  }, [pageId, isEditing]);

  // Use edit context data if available, otherwise use loaded page data
  const activeData = isEditing ? editData : pageData || {};

  /**
   * Helper to get value from data path or return default
   * @param {string} path - Dot-notation path (e.g., "hod.name" or "overview.tableBE")
   * @param {any} defaultValue - Default value if path not found
   * @returns {any} - Value at path or default
   */
  const t = (path, defaultValue) => {
    if (!activeData || Object.keys(activeData).length === 0)
      return defaultValue;
    const parts = path.split(".");
    let current = activeData;
    for (const part of parts) {
      if (current === undefined || current === null) return defaultValue;
      current = current[part];
    }
    return current !== undefined && current !== null && current !== ""
      ? current
      : defaultValue;
  };

  return {
    data: activeData,
    loading: dataLoading,
    isEditing,
    updateData,
    removeData,
    t,
  };
};
