import { useEffect } from "react";
import { useParams } from "react-router-dom";
import GenericPage from "../../components/GenericPage";
import DocumentsSidebar from "../../components/DocumentsSidebar";
import {
  DOCUMENT_CATEGORIES,
  DOCUMENT_SECTION_ALIASES,
  getDocumentSection,
} from "../../data/documentsCatalog";
import { getDocumentAssetUrl } from "../../utils/documentPaths";

const getActiveSection = (sectionKey) => {
  const resolved =
    DOCUMENT_SECTION_ALIASES[sectionKey] &&
    DOCUMENT_SECTION_ALIASES[sectionKey] !== "all"
      ? DOCUMENT_SECTION_ALIASES[sectionKey]
      : "policies";

  return getDocumentSection(resolved);
};

const DocumentsHub = () => {
  const { sectionKey } = useParams();
  const activeSection = getActiveSection(sectionKey);
  const activeCategory = DOCUMENT_CATEGORIES.find(
    (category) => category.id === activeSection?.categoryId,
  );
  const sidebarSections = [
    { sectionId: "documents-overview", title: "Overview" },
    { sectionId: "documents-list", title: "Available Documents" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sectionKey]);

  useEffect(() => {
    document.title = `${activeSection?.label || "Documents"} | SSGMCE Documents`;
  }, [activeSection]);

  const openDocumentInNewTab = (href) => {
    const documentUrl = getDocumentAssetUrl(href);
    const newWindow = window.open(documentUrl, "_blank", "noopener,noreferrer");

    if (!newWindow) {
      window.location.assign(documentUrl);
    }
  };

  if (!activeSection) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <GenericPage
        title="Documents"
        showInnerTitle={false}
        backgroundImage="https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1600&q=80"
        sidebar={<DocumentsSidebar sections={sidebarSections} />}
      >
        <div className="mb-6 border-l-4 border-ssgmce-orange pl-4">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-ssgmce-blue">
            {activeCategory?.label || "Documents"}
          </p>
          <h2 className="text-3xl font-bold text-ssgmce-blue">
            {activeSection.label}
          </h2>
          <p className="mt-3 text-sm leading-7 text-gray-700">
            {activeSection.summary}
          </p>
        </div>

        <section id="documents-list" className="rounded-xl bg-white shadow-sm">
          <div className="border-b border-gray-100 px-4 py-3">
            <h3 className="text-base font-semibold text-gray-900">
              Available Documents
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100 text-sm">
              <thead className="bg-white">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">
                    Title
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {Array.isArray(activeSection.documents) &&
                activeSection.documents.length ? (
                  activeSection.documents.map((document, index) => (
                    <tr
                      key={document.href || index}
                      className="odd:bg-white even:bg-gray-50"
                    >
                      <td className="w-12 px-4 py-3 align-top text-gray-500">
                        {String(index + 1).padStart(2, "0")}
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">
                            {document.title}
                          </span>
                          {document.description ? (
                            <span className="mt-1 text-xs text-gray-500">
                              {document.description}
                            </span>
                          ) : null}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right align-top">
                        <button
                          type="button"
                          onClick={() => openDocumentInNewTab(document.href)}
                          className="inline-flex items-center gap-2 text-sm font-medium text-ssgmce-blue hover:underline"
                        >
                          Open
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-6 text-center text-sm text-gray-500"
                    >
                      No documents available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </GenericPage>
    </div>
  );
};

export default DocumentsHub;
