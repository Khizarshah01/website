import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import apiClient from "../utils/apiClient";

const extractMarkdownFromSections = (sections = []) =>
  sections
    .filter((section) => section?.isVisible !== false && section?.type === "markdown")
    .sort((a, b) => (a?.order || 0) - (b?.order || 0))
    .map((section) => {
      if (typeof section.content === "string") return section.content;
      return section.content?.markdown || "";
    })
    .filter(Boolean)
    .join("\n\n")
    .trim();

const markdownComponents = {
  table: ({ children }) => (
    <div className="overflow-x-auto my-4 border border-gray-200 rounded-lg">
      <table className="min-w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-gray-50">{children}</thead>,
  th: ({ children }) => (
    <th className="px-3 py-2 text-left font-semibold text-gray-700 border-b border-gray-200">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-3 py-2 text-gray-700 border-b border-gray-100 align-top">{children}</td>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-ssgmce-blue font-medium hover:underline"
    >
      {children}
    </a>
  ),
};

const DocumentsMarkdownContent = ({ pageId, fallbackMarkdown = "" }) => {
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await apiClient.get(`/pages/${pageId}`);
        if (!active) return;
        if (res.data?.success) {
          const extracted = extractMarkdownFromSections(res.data.data?.sections || []);
          setMarkdown(extracted || fallbackMarkdown || "");
        } else {
          setMarkdown(fallbackMarkdown || "");
        }
      } catch {
        if (!active) return;
        setError("Unable to load page markdown content.");
        setMarkdown(fallbackMarkdown || "");
      } finally {
        if (active) setLoading(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [pageId, fallbackMarkdown]);

  const finalMarkdown = useMemo(() => markdown?.trim() || "", [markdown]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
        Loading content...
      </div>
    );
  }

  if (error && !finalMarkdown) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {error ? (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}
      {finalMarkdown ? (
        <div className="prose prose-sm max-w-none text-gray-700">
          <ReactMarkdown components={markdownComponents}>{finalMarkdown}</ReactMarkdown>
        </div>
      ) : (
        <p className="text-gray-500 text-sm">
          No markdown content available yet. Open Admin Documents and edit this page under Content Pages.
        </p>
      )}
    </div>
  );
};

export default DocumentsMarkdownContent;