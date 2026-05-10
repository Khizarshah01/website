import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import PageHeader from "./PageHeader";
import DocumentsSidebar from "./DocumentsSidebar";
import apiClient from "../utils/apiClient";
import { resolveDocumentUrl } from "../utils/contentUrls";

const extractMarkdownFromSections = (sections = []) =>
  sections
    .filter((section) => section?.isVisible !== false)
    .sort((a, b) => (a?.order || 0) - (b?.order || 0))
    .map((section) => {
      if (section?.type === "markdown") {
        if (typeof section.content === "string") return section.content;
        return section.content?.markdown || "";
      }
      return "";
    })
    .filter(Boolean)
    .join("\n\n")
    .trim();

const markdownComponents = {
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-gray-200 bg-gray-50 px-3 py-2 text-left font-semibold text-gray-700">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-gray-100 px-3 py-2 align-top text-gray-700">
      {children}
    </td>
  ),
  a: ({ href, children }) => (
    <a
      href={resolveDocumentUrl(href)}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-ssgmce-blue hover:underline"
    >
      {children}
    </a>
  ),
};

const DocumentsPageLayout = ({
  pageId,
  pageTitle,
  subtitle,
  backgroundImage,
  sectionTitle,
  sectionDescription,
  description,
  children,
}) => {
  const [dynamicDescription, setDynamicDescription] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${pageTitle} | SSGMCE Documents`;
  }, [pageTitle]);

  useEffect(() => {
    let active = true;

    const loadPageDescription = async () => {
      if (!pageId) {
        setDynamicDescription("");
        return;
      }

      try {
        const res = await apiClient.get(`/pages/${pageId}`);
        if (!active) return;
        if (res.data?.success) {
          setDynamicDescription(extractMarkdownFromSections(res.data.data?.sections || []));
          return;
        }
      } catch {
        // Fall back to static description when page content is unavailable.
      }

      if (active) {
        setDynamicDescription("");
      }
    };

    loadPageDescription();

    return () => {
      active = false;
    };
  }, [pageId]);

  const resolvedDescription =
    dynamicDescription || sectionDescription || description || "";

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={pageTitle}
        subtitle={subtitle || "Official Documents"}
        backgroundImage={backgroundImage}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <DocumentsSidebar />
          </div>

          <div className="lg:col-span-9 space-y-6">
            {(sectionTitle || resolvedDescription) && (
              <div className="bg-white rounded-xl shadow-md p-6">
                {sectionTitle ? (
                  <h2 className="text-2xl font-bold text-ssgmce-blue mb-2">
                    {sectionTitle}
                  </h2>
                ) : null}
                {resolvedDescription ? (
                  <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                    <ReactMarkdown components={markdownComponents}>
                      {resolvedDescription}
                    </ReactMarkdown>
                  </div>
                ) : null}
              </div>
            )}

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPageLayout;
