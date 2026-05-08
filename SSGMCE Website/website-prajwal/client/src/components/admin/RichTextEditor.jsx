import React, { useState, useEffect, useRef } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./RichTextEditor.css";
import { useEdit } from "../../contexts/EditContext";
import { FaCheck, FaTimes } from "react-icons/fa";

// Register custom fonts for the editor
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida",
  "times-new-roman",
  "verdana",
];
Quill.register(Font, true);

// Register custom sizes
const Size = Quill.import("formats/size");
Size.whitelist = [
  "10px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "28px",
  "32px",
  "36px",
  "48px",
  "60px",
  "72px",
];
Quill.register(Size, true);

/**
 * RichTextEditor Component
 * Full-featured WYSIWYG editor with formatting options
 * - Font family: Arial, Comic Sans, Courier New, Georgia, Helvetica, Lucida, Times New Roman, Verdana
 * - Font size: 10px to 72px
 * - Bold, italic, underline, strikethrough
 * - Text alignment (left, center, right, justify)
 * - Lists (ordered, unordered)
 * - Colors, background colors
 * - Links, images
 * - Headers, blockquotes, code blocks
 */
const RichTextEditor = ({
  path,
  value,
  onSave,
  placeholder = "Start typing...",
  className = "",
  minHeight = "200px",
}) => {
  const { data, updateData, isEditing } = useEdit();

  // Helper to safely get value from path
  const getValueFromPath = (obj, p) => {
    if (!p || !obj) return undefined;
    return p
      .replace(/\[(\d+)\]/g, ".$1")
      .split(".")
      .reduce((acc, part) => acc && acc[part], obj);
  };

  // Determine current value to display
  const displayValue =
    value !== undefined ? value : path ? getValueFromPath(data, path) : "";

  const [currentValue, setCurrentValue] = useState(displayValue || "");
  const [localEditing, setLocalEditing] = useState(false);
  const quillRef = useRef(null);

  // Sync state with props/context
  useEffect(() => {
    setCurrentValue(displayValue || "");
  }, [displayValue]);

  const handleSave = () => {
    if (onSave) {
      onSave(currentValue);
    } else if (path) {
      updateData(path, currentValue);
    }
    setLocalEditing(false);
  };

  const handleCancel = () => {
    setCurrentValue(displayValue || "");
    setLocalEditing(false);
  };

  // Quill modules configuration
  const modules = {
    toolbar: [
      // Font family and size
      [
        {
          font: [
            "arial",
            "comic-sans",
            "courier-new",
            "georgia",
            "helvetica",
            "lucida",
            "times-new-roman",
            "verdana",
          ],
        },
      ],
      [
        {
          size: [
            "10px",
            "12px",
            "14px",
            "16px",
            "18px",
            "20px",
            "24px",
            "28px",
            "32px",
            "36px",
            "48px",
            "60px",
            "72px",
          ],
        },
      ],

      // Headers
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      // Text formatting
      ["bold", "italic", "underline", "strike"],

      // Text color and background
      [{ color: [] }, { background: [] }],

      // Text alignment
      [{ align: [] }],

      // Lists
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],

      // Blockquote, code block
      ["blockquote", "code-block"],

      // Links and images
      ["link"],

      // Clear formatting
      ["clean"],
    ],
  };

  const formats = [
    "font",
    "size",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "align",
    "list",
    "bullet",
    "indent",
    "blockquote",
    "code-block",
    "link",
  ];

  // View Mode
  if (!isEditing) {
    return (
      <div
        className={`ql-editor ${className}`}
        dangerouslySetInnerHTML={{ __html: displayValue }}
      />
    );
  }

  // Edit Mode - Not actively editing
  if (!localEditing) {
    return (
      <div
        onClick={() => setLocalEditing(true)}
        className={`cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors rounded p-2 border-2 border-transparent hover:border-blue-200 ${className}`}
      >
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: displayValue || placeholder }}
        />
      </div>
    );
  }

  // Edit Mode - Actively editing
  return (
    <div className={`relative ${className}`}>
      <div
        className="bg-white dark:bg-[#1a1a2e] rounded-lg border-2 border-blue-500 shadow-lg"
        style={{ minHeight }}
      >
        <ReactQuill
          ref={quillRef}
          value={currentValue}
          onChange={setCurrentValue}
          modules={modules}
          formats={formats}
          theme="snow"
          placeholder={placeholder}
          className="rich-text-editor"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 mt-2">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm shadow-md"
        >
          <FaCheck /> Save
        </button>
        <button
          onClick={handleCancel}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors font-semibold text-sm shadow-md"
        >
          <FaTimes /> Cancel
        </button>
      </div>
    </div>
  );
};

export default RichTextEditor;
