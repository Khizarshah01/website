import { useState } from "react";
import {
  FaDownload,
  FaEye,
  FaFileAlt,
  FaFileArchive,
  FaFileExcel,
  FaFileImage,
  FaFilePdf,
  FaFilePowerpoint,
  FaFileWord,
  FaExternalLinkAlt,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";
import apiClient from "../utils/apiClient";
import { logUnexpectedError } from "../utils/apiErrors";

/**
 * DocumentCard Component
 * Displays a single document with download/view options.
 * For PDFs: shows summary modal with embedded viewer and download button.
 */
const DocumentCard = ({ document }) => {
  const {
    _id,
    title,
    description,
    fileUrl,
    fileSize,
    fileType,
    year,
    uploadDate,
    subcategory,
  } = document;
  const [showPDFModal, setShowPDFModal] = useState(false);

  const safeFileUrl = typeof fileUrl === "string" ? fileUrl.trim() : "";
  const isPDF =
    fileType === "pdf" || safeFileUrl.toLowerCase().endsWith(".pdf");

  const getFileIcon = () => {
    const iconClass = "text-3xl";

    switch (fileType) {
      case "pdf":
        return <FaFilePdf className={`${iconClass} text-red-500`} />;
      case "doc":
      case "docx":
        return <FaFileWord className={`${iconClass} text-blue-600`} />;
      case "xls":
      case "xlsx":
        return <FaFileExcel className={`${iconClass} text-green-600`} />;
      case "ppt":
      case "pptx":
        return <FaFilePowerpoint className={`${iconClass} text-orange-500`} />;
      case "jpg":
      case "jpeg":
      case "png":
        return <FaFileImage className={`${iconClass} text-purple-500`} />;
      case "zip":
        return <FaFileArchive className={`${iconClass} text-yellow-600`} />;
      default:
        return <FaFileAlt className={`${iconClass} text-gray-500`} />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const openFile = () => {
    if (!safeFileUrl) return;
    window.open(safeFileUrl, "_blank", "noopener,noreferrer");
  };

  const handleDownload = async () => {
    if (!safeFileUrl) return;

    try {
      await apiClient.post(`/documents/${_id}/download`);
      openFile();
    } catch (error) {
      logUnexpectedError("Error tracking download:", error);
      openFile();
    }
  };

  return (
    <div className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:shadow-xl">
      <div className="border-b border-gray-100 p-5">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-gray-50 p-3 transition-colors group-hover:bg-blue-50">
            {getFileIcon()}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 text-lg font-semibold text-gray-800 transition-colors group-hover:text-ssgmce-blue">
              {title}
            </h3>
            {description ? (
              <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                {description}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 bg-gray-50 px-5 py-3 text-xs text-gray-500">
        {year ? (
          <span className="rounded-full bg-ssgmce-blue/10 px-2 py-1 font-medium text-ssgmce-blue">
            {year}
          </span>
        ) : null}
        {subcategory ? (
          <span className="rounded-full bg-ssgmce-orange/10 px-2 py-1 font-medium text-ssgmce-orange">
            {subcategory}
          </span>
        ) : null}
        <span className="flex items-center gap-1">
          File: {fileType?.toUpperCase() || "PDF"}
        </span>
        <span className="flex items-center gap-1">Size: {fileSize || "N/A"}</span>
        <span className="ml-auto flex items-center gap-1">
          Date: {formatDate(uploadDate)}
        </span>
      </div>

      <div className="flex gap-3 p-4">
        {isPDF ? (
          <button
            onClick={() => setShowPDFModal(true)}
            className="flex-1 rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
          >
            <span className="flex items-center justify-center gap-2">
              <FaEye />
              View Summary
            </span>
          </button>
        ) : (
          <a
            href={safeFileUrl || undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
          >
            <span className="flex items-center justify-center gap-2">
              <FaEye />
              View
            </span>
          </a>
        )}

        <button
          onClick={handleDownload}
          className="flex-1 rounded-lg bg-gradient-to-r from-ssgmce-blue to-blue-700 px-4 py-2.5 text-sm font-medium text-white transition-all hover:from-blue-700 hover:to-ssgmce-blue"
        >
          <span className="flex items-center justify-center gap-2">
            <FaDownload />
            Download
          </span>
        </button>
      </div>

      {showPDFModal && isPDF ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowPDFModal(false)}
        >
          <div
            className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-red-50 to-orange-50 p-5">
              <div className="flex items-center gap-3">
                <FaFilePdf className="text-2xl text-red-500" />
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                  <div className="mt-0.5 flex items-center gap-2 text-sm text-gray-500">
                    {year ? (
                      <span className="font-medium text-blue-600">{year}</span>
                    ) : null}
                    {fileSize ? <span>&bull; {fileSize}</span> : null}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowPDFModal(false)}
                className="rounded-full p-2 transition-colors hover:bg-gray-200"
              >
                <FaTimes className="text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {description ? (
                <div className="border-b border-gray-100 p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <FaInfoCircle className="text-blue-600" />
                    <h4 className="font-semibold text-gray-700">
                      Document Summary
                    </h4>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {description}
                  </p>
                </div>
              ) : null}

              <div className="p-5">
                <h4 className="mb-3 font-semibold text-gray-700">
                  Document Preview
                </h4>
                <div className="h-[500px] w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                  <iframe
                    src={`${safeFileUrl}#toolbar=1&navpanes=0`}
                    className="h-full w-full"
                    title={title}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50 p-5 sm:flex-row">
              <button
                onClick={handleDownload}
                className="flex-1 rounded-lg bg-ssgmce-blue px-6 py-3 font-medium text-white shadow-md transition-colors hover:bg-ssgmce-dark-blue"
              >
                <span className="flex items-center justify-center gap-2">
                  <FaDownload />
                  Download PDF
                </span>
              </button>
              <a
                href={safeFileUrl || undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-lg border border-gray-200 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-100"
              >
                <span className="flex items-center justify-center gap-2">
                  <FaExternalLinkAlt />
                  Open in New Tab
                </span>
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DocumentCard;
