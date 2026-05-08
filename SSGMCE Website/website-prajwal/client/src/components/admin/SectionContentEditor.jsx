import React, { useState, useEffect } from "react";
import { FaTimes, FaCheck, FaExclamationTriangle } from "react-icons/fa";

/**
 * SectionContentEditor
 * Opens a modal with the section's content object as formatted JSON.
 * Lets admins add/remove/reorder items in stats, cards, table, list etc.
 */
const SectionContentEditor = ({ title, content, onSave, onClose }) => {
  const [jsonText, setJsonText] = useState("");
  const [parseError, setParseError] = useState(null);

  useEffect(() => {
    setJsonText(JSON.stringify(content, null, 2));
    setParseError(null);
  }, [content]);

  const handleChange = (e) => {
    setJsonText(e.target.value);
    try {
      JSON.parse(e.target.value);
      setParseError(null);
    } catch (err) {
      setParseError(err.message);
    }
  };

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonText);
      onSave(parsed);
      onClose();
    } catch (err) {
      setParseError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Edit Section Content
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {title}
              </span>
              {" — "}Edit the JSON to add, remove, or reorder items.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FaTimes size={16} />
          </button>
        </div>

        {/* Hint bar */}
        <div className="px-6 py-2 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800 flex-shrink-0">
          <p className="text-xs text-blue-700 dark:text-blue-300">
            Edit the JSON structure directly. Add new array items, change
            values, or remove entries. Click <strong>Save</strong> when done.
          </p>
        </div>

        {/* JSON Editor */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <textarea
            value={jsonText}
            onChange={handleChange}
            className={`w-full h-96 font-mono text-sm p-4 rounded-lg border-2 outline-none resize-y transition-colors
              ${
                parseError
                  ? "border-red-400 bg-red-50 dark:bg-red-900/10"
                  : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#12122a] focus:border-blue-400"
              } text-gray-900 dark:text-gray-100`}
            spellCheck={false}
          />
          {parseError && (
            <div className="flex items-start gap-2 mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-400">
              <FaExclamationTriangle className="mt-0.5 flex-shrink-0" />
              <span>
                <strong>JSON Error:</strong> {parseError}
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!!parseError}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium text-sm transition-all
              ${
                parseError
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
              }`}
          >
            <FaCheck size={12} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionContentEditor;
