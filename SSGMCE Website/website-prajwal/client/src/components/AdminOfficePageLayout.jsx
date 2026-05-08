import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaDownload, FaEdit, FaFilePdf } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import apiClient from "../utils/apiClient";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import AdminOfficeSidebar from "./AdminOfficeSidebar";
import { isAdminOfficeDbEnabled } from "../config/adminOfficeHybridFlags";

function routeToPageId(pathname = "") {
  if (pathname.startsWith("/facilities/admin-office/")) {
    const suffix = pathname.replace("/facilities/admin-office/", "").replace(/^\/+/, "");
    if (suffix) return `facilities-admin-office-${suffix.replace(/\//g, "-").toLowerCase()}`;
  }
  if (pathname === "/facilities/administrative-office") {
    return "facilities-administrative-office";
  }
  return null;
}

const MARKDOWN_COMPONENTS = {
  h2: ({ children }) => <h2 className="mb-3 mt-6 text-2xl font-bold text-gray-900">{children}</h2>,
  h3: ({ children }) => <h3 className="mb-2 mt-5 text-xl font-semibold text-gray-900">{children}</h3>,
  p: ({ children }) => <p className="mb-3 leading-relaxed text-gray-700">{children}</p>,
  li: ({ children }) => <li className="mb-1 text-gray-700">{children}</li>,
  ul: ({ children }) => <ul className="mb-4 list-disc space-y-1 pl-5">{children}</ul>,
  ol: ({ children }) => <ol className="mb-4 list-decimal space-y-1 pl-5">{children}</ol>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-ssgmce-blue underline hover:text-ssgmce-dark-blue"
    >
      {children}
    </a>
  ),
};

const AdminOfficePageLayout = ({
  title,
  children,
  pdfLink,
  pdfTitle,
  useDbContent = false,
  enableInlineEditFallback = true,
}) => {
  const heroRef = useRef(null);
  const location = useLocation();
  const shouldUseDbContent = useMemo(() => {
    if (useDbContent) return true;
    return isAdminOfficeDbEnabled(location.pathname);
  }, [location.pathname, useDbContent]);

  const pageId = useMemo(() => {
    if (!shouldUseDbContent) return null;
    return routeToPageId(location.pathname);
  }, [location.pathname, shouldUseDbContent]);
  const [dbPage, setDbPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isInlineEditMode = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("adminEdit") === "1";
  }, [location.search]);

  useEffect(() => {
    // Scroll to hero section when page loads
    if (heroRef.current) {
      heroRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function fetchPage() {
      if (!pageId) {
        setDbPage(null);
        return;
      }
      setIsLoading(true);
      try {
        const response = await apiClient.get(`/pages/${pageId}`);
        if (isMounted && response?.data?.success) {
          setDbPage(response.data.data || null);
        }
      } catch (error) {
        if (isMounted) {
          setDbPage(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchPage();
    return () => {
      isMounted = false;
    };
  }, [pageId]);

  const visibleSections = useMemo(() => {
    if (!dbPage?.sections?.length) return [];
    return [...dbPage.sections]
      .filter((section) => section?.isVisible !== false)
      .sort((a, b) => Number(a?.order || 0) - Number(b?.order || 0));
  }, [dbPage]);

  const hasDbContent = shouldUseDbContent && visibleSections.length > 0;
  const pageTitle = dbPage?.pageTitle || title;

  const renderEditButton = (section) => {
    if (!enableInlineEditFallback || !isInlineEditMode || !pageId) return null;
    const sectionKey = section?.sectionId || section?.title || "section";
    return (
      <div className="mb-2 flex justify-end">
        <a
          href={`/admin/visual/${pageId}?section=${encodeURIComponent(sectionKey)}`}
          className="inline-flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
        >
          <FaEdit className="h-3 w-3" />
          Edit Section
        </a>
      </div>
    );
  };

  const renderComponentSection = (section) => {
    const componentType = section?.content?.component;
    const items = Array.isArray(section?.content?.items)
      ? section.content.items
      : [];

    if (componentType === "link-list") {
      return (
        <div className="space-y-2">
          {items.map((item, index) => {
            const href = item?.route || item?.url || "#";
            return (
              <a
                key={`${href}-${index}`}
                href={href}
                className="block rounded-lg border border-gray-200 px-4 py-3 text-gray-800 hover:border-ssgmce-blue hover:bg-blue-50"
              >
                <p className="font-semibold text-ssgmce-blue">{item?.title || "Link"}</p>
                {item?.description ? (
                  <p className="mt-0.5 text-sm text-gray-600">{item.description}</p>
                ) : null}
              </a>
            );
          })}
        </div>
      );
    }

    if (componentType === "info-cards") {
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item, index) => (
            <div
              key={`${item?.title || "card"}-${index}`}
              className="rounded-lg border border-gray-200 bg-gray-50 p-4"
            >
              <h3 className="text-base font-semibold text-gray-900">{item?.title || "Untitled"}</h3>
              {item?.description ? (
                <p className="mt-2 text-sm text-gray-700">{item.description}</p>
              ) : null}
            </div>
          ))}
        </div>
      );
    }

    return (
      <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs text-gray-700">
        {JSON.stringify(section?.content || {}, null, 2)}
      </pre>
    );
  };

  const renderSection = (section) => {
    const sectionText =
      typeof section?.content?.text === "string" ? section.content.text : null;

    const canRenderMarkdown = section?.type === "markdown" && sectionText;
    const canRenderComponent = section?.type === "component";

    if (!canRenderMarkdown && !canRenderComponent) return null;

    return (
      <section key={section.sectionId || section.title} className="mb-6 last:mb-0">
        {renderEditButton(section)}
        {section.title ? (
          <h2 className="mb-3 text-2xl font-bold text-gray-900">{section.title}</h2>
        ) : null}
        {canRenderMarkdown ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={MARKDOWN_COMPONENTS}
          >
            {sectionText}
          </ReactMarkdown>
        ) : (
          renderComponentSection(section)
        )}
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-4 text-sm text-blue-200">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span>Facilities</span>
            <span className="mx-2">/</span>
            <span>Administrative Office</span>
            <span className="mx-2">/</span>
            <span className="text-white">{pageTitle}</span>
          </nav>
          <h1 ref={heroRef} className="text-3xl font-bold text-white md:text-4xl">{pageTitle}</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <aside className="lg:w-80 lg:shrink-0">
            <AdminOfficeSidebar />
          </aside>

          {/* Content */}
          <main className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8"
            >
              {isLoading ? (
                <p className="text-gray-600">Loading page content...</p>
              ) : hasDbContent ? (
                visibleSections.map(renderSection)
              ) : (
                children
              )}

              {/* PDF Download Section */}
              {!hasDbContent && pdfLink && (
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-red-100 p-3">
                        <FaFilePdf className="h-8 w-8 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {pdfTitle || "Download Original Document"}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          View or download the official document with signatures and
                          complete details.
                        </p>
                        <a
                          href={pdfLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-2 rounded-lg bg-ssgmce-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ssgmce-dark-blue"
                        >
                          <FaDownload className="h-4 w-4" />
                          Download PDF
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminOfficePageLayout;
