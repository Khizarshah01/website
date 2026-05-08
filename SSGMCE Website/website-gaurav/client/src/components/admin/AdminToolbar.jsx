import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEdit } from "../../contexts/EditContext";
import {
  FaSave,
  FaArrowLeft,
  FaCheck,
  FaExclamationTriangle,
  FaFileImport,
  FaUndo,
  FaTimes,
} from "react-icons/fa";
import { ADMIN_ROUTE_PREFIX } from "../../config/adminAccess";
import DocImportModal from "./DocImportModal";
import { goBackOrFallback } from "../../utils/navigation";

/**
 * AdminToolbar - Floating toolbar for visual page editor
 * Provides save, back navigation, and change status indicators
 */
const AdminToolbar = ({
  title = "Page Editor",
  fallbackPath = "/admin/pages",
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { hasChanges, saveData, undo, canUndo, discardChanges } = useEdit();
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'success' | 'error' | null
  const [showImportModal, setShowImportModal] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus(null);

    const result = await saveData();

    if (result.success) {
      setSaveStatus("success");
      setTimeout(() => setSaveStatus(null), 3000);
    } else {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(null), 5000);
    }

    setSaving(false);
  };

  const handleBack = () => {
    if (hasChanges) {
      const confirmed = window.confirm(
        "You have unsaved changes. Are you sure you want to leave?",
      );
      if (!confirmed) return;
    }
    goBackOrFallback(navigate, location, fallbackPath);
  };

  const handleDiscard = () => {
    if (!hasChanges) return;
    const confirmed = window.confirm(
      "Discard all unsaved changes and restore the last saved version?",
    );
    if (!confirmed) return;
    discardChanges();
    setSaveStatus(null);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-500 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Title and Status */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaArrowLeft />
              <span className="hidden sm:inline">Back to Admin</span>
            </button>

            <div className="border-l border-gray-300 pl-4">
              <h3 className="font-semibold text-gray-800">{title}</h3>
              <div className="flex items-center gap-2 text-sm">
                {hasChanges && (
                  <span className="flex items-center gap-1 text-orange-600">
                    <FaExclamationTriangle className="text-xs" />
                    Unsaved changes
                  </span>
                )}
                {saveStatus === "success" && (
                  <span className="flex items-center gap-1 text-green-600">
                    <FaCheck className="text-xs" />
                    Saved successfully
                  </span>
                )}
                {saveStatus === "error" && (
                  <span className="flex items-center gap-1 text-red-600">
                    <FaExclamationTriangle className="text-xs" />
                    Save failed
                  </span>
                )}
                {!hasChanges && !saveStatus && (
                  <span className="text-gray-500">All changes saved</span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={undo}
              disabled={!canUndo}
              title="Undo last change"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all border ${
                canUndo
                  ? "border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
                  : "border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
            >
              <FaUndo />
              <span className="hidden sm:inline">Undo</span>
            </button>
            <button
              onClick={handleDiscard}
              disabled={!hasChanges}
              title="Discard all unsaved changes"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all border ${
                hasChanges
                  ? "border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                  : "border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
            >
              <FaTimes />
              <span className="hidden sm:inline">Discard</span>
            </button>
            <button
              onClick={() => setShowImportModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all border border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
            >
              <FaFileImport />
              <span className="hidden sm:inline">Import Doc/PDF</span>
            </button>
            <button
              onClick={handleSave}
              disabled={!hasChanges || saving}
              className={`
                flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all
                ${
                  hasChanges && !saving
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
              `}
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FaSave />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {showImportModal && (
        <DocImportModal onClose={() => setShowImportModal(false)} />
      )}
    </div>
  );
};

export default AdminToolbar;
