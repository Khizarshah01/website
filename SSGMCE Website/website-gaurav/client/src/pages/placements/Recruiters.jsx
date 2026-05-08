import { useEffect, useState } from "react";
import apiClient from "../../utils/apiClient";
import PageHeader from "../../components/PageHeader";
import PlacementSidebar from "../../components/PlacementSidebar";
import MarkdownEditor from "../../components/admin/MarkdownEditor";

const Recruiters = () => {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Major Recruiters | SSGMCE";
    
    apiClient
      .get("/pages/placements-recruiters")
      .then((res) => {
        if (res.data.success) {
          setPageContent(res.data.data);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Major Recruiters" subtitle="Our Esteemed Industry Partners" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4 flex-shrink-0">
            <div className="sticky top-24">
              <PlacementSidebar />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 space-y-10">
            {loading ? (
              <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-200">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-ssgmce-orange mx-auto mb-4" />
                <p className="text-gray-500">Loading content…</p>
              </div>
            ) : error || !pageContent?.sections?.length ? (
              <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-200">
                <p className="text-gray-500">No content available. Please configure from admin panel.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {pageContent.sections
                  .sort((a, b) => a.order - b.order)
                  .map((section) => (
                    <section key={section.sectionId} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                      {section.title && (
                        <h2 className="text-2xl font-bold text-ssgmce-orange mb-4 pb-2 border-b border-gray-200">
                          {section.title}
                        </h2>
                      )}
                      {section.type === "markdown" && section.content?.text && (
                        <MarkdownEditor value={section.content.text} className="prose max-w-none text-gray-700 leading-7" />
                      )}
                    </section>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recruiters;
