import { useEffect } from "react";
import PageHeader from "./PageHeader";
import DocumentsSidebar from "./DocumentsSidebar";
import DocumentGrid from "./DocumentGrid";

/**
 * DocumentsLayout Component
 * Shared layout for all document pages with sidebar
 */
const DocumentsLayout = ({
  pageTitle,
  subtitle,
  category,
  description,
  backgroundImage = "https://images.unsplash.com/photo-1568667256549-094345857637?w=1200&q=80"
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${pageTitle} | SSGMCE Documents`;
  }, [pageTitle]);

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={pageTitle}
        subtitle={subtitle || "Official Documents & Downloads"}
        backgroundImage={backgroundImage}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <DocumentsSidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <DocumentGrid
              category={category}
              title={pageTitle}
              description={description}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsLayout;
