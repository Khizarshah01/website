import React, { useState, useEffect, useRef } from "react";
import { useEdit } from "../../contexts/EditContext";
import { FaPencilAlt, FaCheck, FaTimes } from "react-icons/fa";
import RichTextEditor from "./RichTextEditor";

/**
 * EditableText Component
 * Supports three modes:
 * 1. Path Mode: Pass 'path' string to bind to EditContext data directly.
 * 2. Controlled Mode: Pass 'value' and 'onSave' to handle data manually.
 * 3. Rich Text Mode: Set richText={true} for WYSIWYG editor with formatting
 *
 * Features for Rich Text Mode:
 * - Font family and font size selection
 * - Bold, Italic, Underline, Strikethrough
 * - Text alignment (left, center, right, justify)
 * - Text and background colors
 * - Lists (ordered and unordered)
 * - Headers, blockquotes, code blocks
 * - Links and formatting tools
 *
 * Note: Rich text mode is automatically enabled for multiline content
 * Set richText={false} explicitly to disable for multiline fields
 */
const EditableText = ({
  path,
  value,
  onSave,
  className = "",
  element = "div",
  placeholder = "Click to edit...",
  multiline = false,
  richText = null, // null = auto-detect, true = force enable, false = force disable
}) => {
  const { data, updateData, isEditing } = useEdit();

  // Auto-enable rich text for multiline content (can be explicitly overridden)
  const useRichText = richText !== null ? richText : multiline;

  // Helper to safely get value from path
  const getValueFromPath = (obj, p) => {
    if (!p || !obj) return undefined;
    return p
      .replace(/\[(\d+)\]/g, ".$1")
      .split(".")
      .reduce((acc, part) => acc && acc[part], obj);
  };

  // Determine current value to display
  // Use 'value' prop if provided (Controlled), otherwise lookup path (Uncontrolled)
  const displayValue =
    value !== undefined ? value : path ? getValueFromPath(data, path) : "";

  const [currentValue, setCurrentValue] = useState(displayValue || "");
  const [localEditing, setLocalEditing] = useState(false);
  const inputRef = useRef(null);

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !multiline) {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  // Rich Text Mode - Delegate to RichTextEditor
  if (useRichText && isEditing) {
    return (
      <RichTextEditor
        path={path}
        value={value}
        onSave={onSave}
        placeholder={placeholder}
        className={className}
      />
    );
  }

  // View Mode
  if (!isEditing) {
    const Tag = element;
    // If richText, render HTML; otherwise just text
    if (useRichText) {
      return (
        <div
          className={`ql-editor ${className}`}
          dangerouslySetInnerHTML={{ __html: displayValue }}
        />
      );
    }
    return <Tag className={className}>{displayValue}</Tag>;
  }

  // Edit Interact Mode
  if (localEditing) {
    const WrapperTag = multiline ? "div" : "span";
    return (
      <WrapperTag
        className="relative group inline-block w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {multiline ? (
          <textarea
            ref={inputRef}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className={`w-full bg-white dark:bg-[#1a1a2e] text-gray-900 dark:text-white p-2 rounded border-2 border-blue-500 outline-none shadow-lg z-10 relative ${className}`}
            rows={4}
            autoFocus
          />
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className={`w-full bg-white dark:bg-[#1a1a2e] text-gray-900 dark:text-white px-2 py-1 rounded border-2 border-blue-500 outline-none shadow-lg z-10 relative ${className}`}
            autoFocus
          />
        )}
        <span className="absolute right-0 bottom-full mb-1 flex gap-1 z-20">
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="bg-green-500 text-white p-1 rounded hover:bg-green-600 text-xs shadow"
          >
            <FaCheck />
          </button>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              handleCancel();
            }}
            className="bg-red-500 text-white p-1 rounded hover:bg-red-600 text-xs shadow"
          >
            <FaTimes />
          </button>
        </span>
      </WrapperTag>
    );
  }

  // Edit Trigger Mode
  const Tag = element;
  const WrapperTag = multiline ? "div" : "span";
  return (
    <WrapperTag
      onClick={(e) => {
        e.stopPropagation();
        setLocalEditing(true);
      }}
      className={`relative group cursor-pointer border-2 border-transparent hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-all px-1 -mx-1 ${className}`}
      title={path ? `Edit ${path}` : "Edit Text"}
    >
      {displayValue ? (
        <Tag>{displayValue}</Tag>
      ) : (
        <span className="text-gray-400 dark:text-gray-500 italic bg-gray-100 dark:bg-gray-800 px-2 rounded text-sm select-none">
          {placeholder}
        </span>
      )}
      <span className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 bg-blue-500 text-white p-1.5 rounded-full shadow-md transform scale-90 transition-all pointer-events-none">
        <FaPencilAlt size={10} />
      </span>
    </WrapperTag>
  );
};

export default EditableText;
