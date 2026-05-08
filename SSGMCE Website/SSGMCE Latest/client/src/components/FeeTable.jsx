import { FaDownload, FaRupeeSign } from "react-icons/fa";

/**
 * FeeTable Component
 * Displays fee structure in a professional table format
 */
const FeeTable = ({ feeData, title, downloadLink }) => {
  // Convert feeData object to array for mapping
  const feeCategories = Object.values(feeData);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-ssgmce-orange to-orange-600 text-white p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-sm opacity-90">
              Annual fee structure for academic year 2024-25
            </p>
          </div>
          {downloadLink && (
            <button
              onClick={() => window.open(downloadLink, "_blank")}
              className="flex items-center gap-2 bg-white text-ssgmce-orange px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              <FaDownload /> Download PDF
            </button>
          )}
        </div>
      </div>

      {/* Fee Breakdown Note */}
      <div className="bg-blue-50 border-l-4 border-ssgmce-blue p-4">
        <p className="text-sm text-gray-700">
          <strong className="text-ssgmce-blue">Note:</strong> The fee structure
          mentioned is for the first year only and is subject to change as per
          university and government norms. Additional charges may apply for
          hostel, mess, and other facilities.
        </p>
      </div>

      {/* Table - Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b-2 border-ssgmce-blue">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-ssgmce-blue">
                Category
              </th>
              <th className="px-6 py-4 text-right text-sm font-bold text-ssgmce-blue">
                Tuition Fee
              </th>
              <th className="px-6 py-4 text-right text-sm font-bold text-ssgmce-blue">
                Development Fee
              </th>
              <th className="px-6 py-4 text-right text-sm font-bold text-ssgmce-blue">
                Other Fees
              </th>
              <th className="px-6 py-4 text-right text-sm font-bold text-ssgmce-orange">
                Total Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {feeCategories.map((fee, index) => (
              <tr
                key={index}
                className={`border-b border-gray-200 hover:bg-orange-50 transition-colors duration-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {fee.category}
                    </span>
                    {fee.category.includes("TFWS") && (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">
                        Waiver
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1 text-gray-700">
                    <FaRupeeSign className="text-xs" />
                    <span className="font-medium">
                      {fee.tuitionFee.toLocaleString("en-IN")}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1 text-gray-700">
                    <FaRupeeSign className="text-xs" />
                    <span className="font-medium">
                      {fee.developmentFee.toLocaleString("en-IN")}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1 text-gray-700">
                    <FaRupeeSign className="text-xs" />
                    <span className="font-medium">
                      {fee.otherFees.toLocaleString("en-IN")}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1 text-ssgmce-orange font-bold text-lg">
                    <FaRupeeSign className="text-sm" />
                    <span>{fee.total.toLocaleString("en-IN")}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Cards */}
      <div className="md:hidden p-4 space-y-4">
        {feeCategories.map((fee, index) => (
          <div
            key={index}
            className="border-2 border-gray-200 rounded-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-ssgmce-blue to-blue-700 text-white p-4">
              <h4 className="font-bold text-lg flex items-center justify-between">
                <span>{fee.category}</span>
                {fee.category.includes("TFWS") && (
                  <span className="bg-green-500 px-2 py-1 rounded text-xs">
                    Waiver
                  </span>
                )}
              </h4>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Tuition Fee:</span>
                <div className="flex items-center gap-1 font-semibold text-gray-800">
                  <FaRupeeSign className="text-xs" />
                  <span>{fee.tuitionFee.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Development Fee:</span>
                <div className="flex items-center gap-1 font-semibold text-gray-800">
                  <FaRupeeSign className="text-xs" />
                  <span>{fee.developmentFee.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Other Fees:</span>
                <div className="flex items-center gap-1 font-semibold text-gray-800">
                  <FaRupeeSign className="text-xs" />
                  <span>{fee.otherFees.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 bg-orange-50 -mx-4 px-4 py-3">
                <span className="text-base font-bold text-ssgmce-blue">
                  Total Amount:
                </span>
                <div className="flex items-center gap-1 font-bold text-ssgmce-orange text-xl">
                  <FaRupeeSign />
                  <span>{fee.total.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="bg-gray-50 p-4 border-t border-gray-200">
        <div className="grid md:grid-cols-3 gap-4 text-xs text-gray-600">
          <div className="flex items-start gap-2">
            <span className="text-ssgmce-orange">•</span>
            <span>
              Fees once paid are non-refundable except in special cases
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-ssgmce-orange">•</span>
            <span>Fee payment can be made online or through demand draft</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-ssgmce-orange">•</span>
            <span>Hostel and mess fees are charged separately</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeTable;
