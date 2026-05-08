import { FaFilePdf, FaDownload, FaTrophy, FaChartLine } from "react-icons/fa";

/**
 * NIRFArchiveTable Component
 * Table showing year-wise NIRF data with PDF downloads
 */
const NIRFArchiveTable = ({ data = [] }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center">
        <p className="text-gray-500">No NIRF data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-ssgmce-blue to-blue-700 text-white p-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <FaChartLine />
          Year-wise NIRF Data
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Year</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Rank</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Overall Score</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Submission Date</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Report</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((item, index) => (
              <tr key={item._id || index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-bold text-ssgmce-blue text-lg">{item.year}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium capitalize">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <FaTrophy className="text-ssgmce-orange" />
                    <span className="font-bold text-gray-800">{item.rank || "N/A"}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-lg font-bold">
                    {item.overallScore?.toFixed(2) || "N/A"}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {formatDate(item.submissionDate)}
                </td>
                <td className="px-6 py-4 text-center">
                  {item.reportUrl ? (
                    <a
                      href={item.reportUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all text-sm font-medium"
                    >
                      <FaFilePdf />
                      Download
                      <FaDownload className="text-xs" />
                    </a>
                  ) : (
                    <span className="text-gray-400">Not available</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NIRFArchiveTable;
