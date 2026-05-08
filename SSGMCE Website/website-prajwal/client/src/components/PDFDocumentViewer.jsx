import { useState } from "react";
import { FaDownload, FaFilePdf, FaExternalLinkAlt, FaInfoCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";

/**
 * PDFDocumentViewer Component
 * Displays a PDF with summary, embedded viewer, and download button
 */
const PDFDocumentViewer = ({ title, summary, pdfUrl, fileSize, year }) => {
  const [showFullSummary, setShowFullSummary] = useState(false);

  const isExternalUrl = pdfUrl && (pdfUrl.startsWith("http://") || pdfUrl.startsWith("https://"));
  const isLocalPath = pdfUrl && pdfUrl.startsWith("/uploads/");

  const handleViewOnline = () => {
    window.open(pdfUrl, "_blank");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = title ? `${title}.pdf` : "document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Truncate summary for preview
  const summaryPreview = summary && summary.length > 300
    ? summary.slice(0, 300) + "..."
    : summary;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      {/* PDF Header */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 border-b border-gray-100">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <FaFilePdf className="text-3xl text-red-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
              {year && (
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  {year}
                </span>
              )}
              <span className="flex items-center gap-1">
                📄 PDF
              </span>
              {fileSize && (
                <span className="flex items-center gap-1">
                  💾 {fileSize}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      {summary && (
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <FaInfoCircle className="text-ssgmce-blue" />
            <h4 className="font-semibold text-gray-700">Document Summary</h4>
          </div>
          <div className="text-gray-600 text-sm leading-relaxed">
            <p>{showFullSummary ? summary : summaryPreview}</p>
            {summary.length > 300 && (
              <button
                onClick={() => setShowFullSummary(!showFullSummary)}
                className="mt-2 text-ssgmce-blue hover:text-ssgmce-dark-blue font-medium text-sm flex items-center gap-1"
              >
                {showFullSummary ? (
                  <>Show Less <FaChevronUp className="text-xs" /></>
                ) : (
                  <>Read More <FaChevronDown className="text-xs" /></>
                )}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Download Section */}
      <div className="p-6 bg-gray-50 flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleViewOnline}
          className="flex-1 flex items-center justify-center gap-2 bg-ssgmce-blue hover:bg-ssgmce-dark-blue text-white py-3 px-6 rounded-lg transition-colors font-medium shadow-md hover:shadow-lg"
        >
          <FaExternalLinkAlt />
          View PDF Online
        </button>
        <button
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-700 py-3 px-6 rounded-lg transition-colors font-medium border border-gray-200"
        >
          <FaDownload />
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default PDFDocumentViewer;
