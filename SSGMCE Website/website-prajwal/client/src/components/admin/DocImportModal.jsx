import React, { useState, useRef } from "react";
import apiClient from "../../utils/apiClient";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {
  FaFilePdf,
  FaFileWord,
  FaTimes,
  FaSpinner,
  FaUpload,
  FaCheckCircle,
  FaExclamationTriangle,
  FaPlus,
} from "react-icons/fa";
import { useEdit } from "../../contexts/EditContext";

/** Styled markdown renderers for the import preview — tables, images, lists */
const PREVIEW_COMPONENTS = {
  table: ({ children }) => (
    <div className="overflow-x-auto my-3">
      <table className="min-w-full border divide-y divide-gray-200 dark:divide-gray-700 rounded overflow-hidden text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-ssgmce-blue text-white">{children}</thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-gray-200 bg-white dark:bg-gray-900">
      {children}
    </tbody>
  ),
  tr: ({ children }) => (
    <tr className="even:bg-gray-50 dark:even:bg-gray-800">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="px-3 py-2 text-left text-xs font-semibold">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">
      {children}
    </td>
  ),
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt || ""}
      className="max-w-full h-auto rounded-lg my-3 shadow-sm border border-gray-200 dark:border-gray-700"
      loading="lazy"
    />
  ),
  p: ({ children }) => (
    <p className="text-gray-700 dark:text-gray-300 mb-2 leading-relaxed text-sm">
      {children}
    </p>
  ),
  h1: ({ children }) => (
    <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-2 mt-4">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-base font-bold text-ssgmce-blue mb-2 mt-3">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1 mt-2">
      {children}
    </h3>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-5 space-y-0.5 mb-2 text-sm text-gray-700 dark:text-gray-300">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-5 space-y-0.5 mb-2 text-sm text-gray-700 dark:text-gray-300">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="text-sm leading-relaxed">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-900 dark:text-white">
      {children}
    </strong>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-ssgmce-blue underline hover:text-ssgmce-orange"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  hr: () => <hr className="border-gray-200 dark:border-gray-700 my-3" />,
};

/**
 * DocImportModal
 *
 * Allows admins to upload a PDF or DOCX file.
 * The server converts it to Markdown, which is previewed here.
 * On confirm, a new `markdown` section is appended to the page.
 */
const DocImportModal = ({ onClose }) => {
  const { addSection } = useEdit();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [converting, setConverting] = useState(false);
  const [result, setResult] = useState(null); // { markdown, wordCount, filename, method }
  const [error, setError] = useState(null);
  const [sectionTitle, setSectionTitle] = useState("Imported Content");
  const [added, setAdded] = useState(false);

  const accept = ".pdf,.docx";

  const handleFileChange = (selected) => {
    if (!selected) return;
    const ext = selected.name.split(".").pop().toLowerCase();
    if (!["pdf", "docx"].includes(ext)) {
      setError("Only PDF and DOCX files are supported.");
      return;
    }
    setFile(selected);
    setError(null);
    setResult(null);
    setAdded(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFileChange(dropped);
  };

  const handleConvert = async () => {
    if (!file) return;
    setConverting(true);
    setError(null);
    setResult(null);
    setAdded(false);

    try {
      const token = localStorage.getItem("adminToken");
      const formData = new FormData();
      formData.append("document", file);

      const res = await apiClient.post("/convert/document", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setResult(res.data);
        setSectionTitle(
          file.name.replace(/\.(pdf|docx)$/i, "").replace(/[-_]/g, " "),
        );
      } else {
        setError(res.data.message || "Conversion failed.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Conversion failed.",
      );
    } finally {
      setConverting(false);
    }
  };

  const handleAddSection = () => {
    if (!result?.markdown) return;
    addSection({
      sectionId: `imported-${Date.now()}`,
      type: "markdown",
      title: sectionTitle || "Imported Content",
      order: 9999,
      content: { text: result.markdown },
    });
    setAdded(true);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Import from PDF / DOCX
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Upload a document to convert its content to an editable Markdown
              section.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Close"
          >
            <FaTimes size={16} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Drop zone */}
          {!result && (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`
                border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
                ${
                  dragging
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/40"
                }
              `}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files?.[0])}
              />
              <div className="flex justify-center gap-4 mb-3 text-gray-400">
                <FaFilePdf size={32} className="text-red-400" />
                <FaFileWord size={32} className="text-blue-400" />
              </div>
              {file ? (
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {file.name}{" "}
                  <span className="font-normal text-gray-400">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </p>
              ) : (
                <>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Drag & drop a file here, or click to browse
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Supported: PDF, DOCX — max 10 MB
                  </p>
                </>
              )}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-400">
              <FaExclamationTriangle className="mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Result: section title input + markdown preview */}
          {result && (
            <div className="space-y-4">
              {/* File info */}
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <FaCheckCircle className="text-green-500" />
                <span>
                  <b className="text-gray-700 dark:text-gray-300">
                    {result.filename}
                  </b>{" "}
                  converted via{" "}
                  <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">
                    {result.method}
                  </code>{" "}
                  — ~{result.wordCount} words
                </span>
                <button
                  onClick={() => {
                    setResult(null);
                    setFile(null);
                    setAdded(false);
                  }}
                  className="ml-auto text-xs underline text-blue-600 dark:text-blue-400 hover:text-blue-800"
                >
                  Change file
                </button>
              </div>

              {/* Section title */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide">
                  Section Title
                </label>
                <input
                  type="text"
                  value={sectionTitle}
                  onChange={(e) => setSectionTitle(e.target.value)}
                  maxLength={120}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Section title"
                />
              </div>

              {/* Markdown preview */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide">
                  Converted Markdown Preview
                </label>
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 p-4 max-h-72 overflow-y-auto text-sm">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={PREVIEW_COMPONENTS}
                  >
                    {result.markdown}
                  </ReactMarkdown>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  After inserting, you can edit this markdown directly on the
                  page.
                </p>
              </div>
            </div>
          )}

          {/* Added confirmation */}
          {added && (
            <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg text-sm text-green-700 dark:text-green-400">
              <FaCheckCircle />
              Section added! Click <b>Save</b> in the toolbar to persist the
              changes.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {added ? "Close" : "Cancel"}
          </button>

          {!result && (
            <button
              onClick={handleConvert}
              disabled={!file || converting}
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow"
            >
              {converting ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Converting…
                </>
              ) : (
                <>
                  <FaUpload size={13} />
                  Convert to Markdown
                </>
              )}
            </button>
          )}

          {result && !added && (
            <button
              onClick={handleAddSection}
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors shadow"
            >
              <FaPlus size={12} />
              Add as Section
            </button>
          )}

          {result && added && (
            <button
              onClick={() => {
                setResult(null);
                setFile(null);
                setAdded(false);
                setSectionTitle("Imported Content");
              }}
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow"
            >
              <FaUpload size={13} />
              Import Another
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocImportModal;
