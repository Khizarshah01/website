import React, { createContext, useContext, useRef, useState } from "react";
import apiClient from "../utils/apiClient";

const EditContext = createContext();

/**
 * useEdit Hook
 * Provides editing state and methods for editable components
 */
export const useEdit = () => {
  const context = useContext(EditContext);
  if (!context) {
    // Return default values when not in edit mode
    return {
      isEditing: false,
      data: {},
      updateData: () => {},
      saveData: async () => ({ success: false }),
      addSection: () => {},
      removeSection: () => {},
      moveSection: () => {},
      hasChanges: false,
      undo: () => {},
      canUndo: false,
      discardChanges: () => {},
    };
  }
  return context;
};

/**
 * EditProvider Component
 * Wraps components that need editing capabilities
 * Used in admin/visual editor mode
 */
export const EditProvider = ({ children, pageId, initialData = {} }) => {
  const [isEditing, setIsEditing] = useState(true);
  const [data, setData] = useState(initialData);
  const [hasChanges, setHasChanges] = useState(false);
  const [history, setHistory] = useState([]);
  const savedDataRef = useRef(initialData);

  const pushHistory = (snapshot) => {
    setHistory((prev) => [...prev.slice(-49), snapshot]);
  };

  const undo = () => {
    setHistory((prev) => {
      if (prev.length === 0) return prev;
      const next = [...prev];
      const snapshot = next.pop();
      setData(snapshot);
      setHasChanges(true);
      return next;
    });
  };

  const canUndo = history.length > 0;

  const discardChanges = () => {
    setData(savedDataRef.current);
    setHistory([]);
    setHasChanges(false);
  };

  /**
   * Update a field in the data object using a path string
   * @param {string} path - Dot notation path (e.g., "hod.name")
   * @param {any} value - New value to set
   */
  const updateData = (path, value) => {
    setData((prevData) => {
      pushHistory(prevData);
      const newData = { ...prevData };
      const keys = path.replace(/\[(\d+)\]/g, ".$1").split(".");
      let current = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!current[key] || typeof current[key] !== "object") {
          current[key] = {};
        } else if (Array.isArray(current[key])) {
          current[key] = [...current[key]]; // preserve array type
        } else {
          current[key] = { ...current[key] };
        }
        current = current[key];
      }

      current[keys[keys.length - 1]] = value;
      setHasChanges(true);
      return newData;
    });
  };

  /**
   * Save all changes to the server
   */
  const saveData = async () => {
    if (!pageId) {
      console.error("No pageId provided");
      return { success: false, error: "No pageId" };
    }

    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        console.error("No authentication token found");
        return {
          success: false,
          error: "Not authenticated. Please login again.",
        };
      }

      const response = await apiClient.put(
        `/pages/${pageId}`,
        data, // send the full data object directly so the server can merge top-level fields
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        savedDataRef.current = data;
        setHasChanges(false);
        setHistory([]);
        return { success: true };
      } else {
        return { success: false, error: response.data.message };
      }
    } catch (error) {
      console.error("Error saving data:", error);
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  };

  /**
   * Append a new section to the page data
   * @param {object} section - Section object with sectionId, type, title, order, content
   */
  const addSection = (section) => {
    setData((prev) => {
      pushHistory(prev);
      return {
        ...prev,
        sections: [...(prev.sections || []), section],
      };
    });
    setHasChanges(true);
  };

  /**
   * Remove the section at the given index and re-sequence order values.
   * @param {number} index - Index of the section to remove
   */
  const removeSection = (index) => {
    setData((prev) => {
      pushHistory(prev);
      const sections = [...(prev.sections || [])];
      sections.splice(index, 1);
      // Re-sequence order so there are no gaps
      const reordered = sections.map((s, i) => ({ ...s, order: i + 1 }));
      return { ...prev, sections: reordered };
    });
    setHasChanges(true);
  };

  /**
   * Move the section at `index` one step up or down.
   * @param {number} index - Index of the section to move
   * @param {"up"|"down"} direction
   */
  const moveSection = (index, direction) => {
    setData((prev) => {
      pushHistory(prev);
      const sections = [...(prev.sections || [])];
      const swapIndex = direction === "up" ? index - 1 : index + 1;
      if (swapIndex < 0 || swapIndex >= sections.length) return prev;

      // Swap the two sections
      [sections[index], sections[swapIndex]] = [
        sections[swapIndex],
        sections[index],
      ];

      // Re-sequence order values to match positions
      const reordered = sections.map((s, i) => ({ ...s, order: i + 1 }));
      return { ...prev, sections: reordered };
    });
    setHasChanges(true);
  };

  const value = {
    isEditing,
    setIsEditing,
    data,
    setData,
    updateData,
    saveData,
    addSection,
    removeSection,
    moveSection,
    hasChanges,
    undo,
    canUndo,
    discardChanges,
  };

  return <EditContext.Provider value={value}>{children}</EditContext.Provider>;
};
