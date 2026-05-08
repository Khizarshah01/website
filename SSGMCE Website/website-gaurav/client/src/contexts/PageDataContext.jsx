import React, { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../utils/apiClient";
import {
  getErrorMessage,
  isNotFoundError,
  logUnexpectedError,
} from "../utils/apiErrors";

const PageDataContext = createContext();

/**
 * usePageData Hook
 * Provides page content data for both public and admin views
 * In admin mode: Uses EditContext
 * In public mode: Fetches data from API
 */
export const usePageData = () => {
  const context = useContext(PageDataContext);
  if (!context) {
    return {
      data: {},
      loading: true,
      error: null,
    };
  }
  return context;
};

/**
 * PageDataProvider Component
 * Loads page content from the database for public viewing
 * Use this to wrap department pages so they display saved content
 */
export const PageDataProvider = ({ children, pageId }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageData = async () => {
      if (!pageId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await apiClient.get(`/pages/${pageId}`);

        if (response.data.success) {
          setData(response.data.data || {});
        } else {
          setData({});
        }
      } catch (err) {
        logUnexpectedError("Error loading page data:", err);
        setError(isNotFoundError(err) ? null : getErrorMessage(err));
        // Don't fail completely - let defaults show
        setData({});
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, [pageId]);

  const value = {
    data,
    loading,
    error,
  };

  return (
    <PageDataContext.Provider value={value}>
      {children}
    </PageDataContext.Provider>
  );
};
