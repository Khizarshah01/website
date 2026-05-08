import { useState } from "react";
import { FaSearch } from "react-icons/fa";

/**
 * SeatMatrix Component
 * Displays seat distribution across categories with search functionality
 */
const SeatMatrix = ({ data, title }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on search
  const filteredData = data.filter(
    (item) =>
      item.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-ssgmce-blue to-blue-700 text-white p-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-90">
          Seat distribution across various categories
        </p>
      </div>

      {/* Search Bar */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="relative max-w-md">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by branch name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-ssgmce-blue focus:outline-none transition-colors duration-300"
          />
        </div>
      </div>

      {/* Table - Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b-2 border-ssgmce-orange">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-bold text-ssgmce-blue">
                Branch
              </th>
              <th className="px-4 py-3 text-center text-sm font-bold text-ssgmce-blue">
                Code
              </th>
              <th className="px-4 py-3 text-center text-sm font-bold text-ssgmce-blue">
                Total
              </th>
              <th className="px-4 py-3 text-center text-sm font-bold text-ssgmce-blue">
                Open
              </th>
              <th className="px-4 py-3 text-center text-sm font-bold text-ssgmce-blue">
                EWS
              </th>
              <th className="px-4 py-3 text-center text-sm font-bold text-ssgmce-blue">
                OBC
              </th>
              <th className="px-4 py-3 text-center text-sm font-bold text-ssgmce-blue">
                SC
              </th>
              <th className="px-4 py-3 text-center text-sm font-bold text-ssgmce-blue">
                ST
              </th>
              <th className="px-4 py-3 text-center text-sm font-bold text-ssgmce-blue">
                VJNT
              </th>
              {filteredData[0]?.sbc !== undefined && (
                <th className="px-4 py-3 text-center text-sm font-bold text-ssgmce-blue">
                  SBC
                </th>
              )}
              {filteredData[0]?.orphan !== undefined && (
                <th className="px-4 py-3 text-center text-sm font-bold text-ssgmce-blue">
                  Orphan
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-200 hover:bg-blue-50 transition-colors duration-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">
                    {item.branch}
                  </td>
                  <td className="px-4 py-3 text-sm text-center">
                    <span className="inline-block bg-ssgmce-orange text-white px-3 py-1 rounded-full text-xs font-bold">
                      {item.code}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-center font-bold text-ssgmce-blue">
                    {item.intake}
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-gray-700">
                    {item.openCategory}
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-gray-700">
                    {item.ews}
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-gray-700">
                    {item.obc}
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-gray-700">
                    {item.sc}
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-gray-700">
                    {item.st}
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-gray-700">
                    {item.vjnt}
                  </td>
                  {item.sbc !== undefined && (
                    <td className="px-4 py-3 text-sm text-center text-gray-700">
                      {item.sbc}
                    </td>
                  )}
                  {item.orphan !== undefined && (
                    <td className="px-4 py-3 text-sm text-center text-gray-700">
                      {item.orphan}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="11"
                  className="px-4 py-8 text-center text-gray-500"
                >
                  No branches found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Cards */}
      <div className="md:hidden p-4 space-y-4">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-ssgmce-blue to-blue-700 text-white p-4">
                <h4 className="font-bold text-lg mb-1">{item.branch}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-90">Code: {item.code}</span>
                  <span className="bg-ssgmce-orange px-3 py-1 rounded-full text-xs font-bold">
                    Total: {item.intake}
                  </span>
                </div>
              </div>

              <div className="p-4 grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Open:</span>
                  <span className="font-semibold text-ssgmce-blue">
                    {item.openCategory}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">EWS:</span>
                  <span className="font-semibold text-ssgmce-blue">
                    {item.ews}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">OBC:</span>
                  <span className="font-semibold text-ssgmce-blue">
                    {item.obc}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">SC:</span>
                  <span className="font-semibold text-ssgmce-blue">
                    {item.sc}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ST:</span>
                  <span className="font-semibold text-ssgmce-blue">
                    {item.st}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">VJNT:</span>
                  <span className="font-semibold text-ssgmce-blue">
                    {item.vjnt}
                  </span>
                </div>
                {item.sbc !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">SBC:</span>
                    <span className="font-semibold text-ssgmce-blue">
                      {item.sbc}
                    </span>
                  </div>
                )}
                {item.orphan !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Orphan:</span>
                    <span className="font-semibold text-ssgmce-blue">
                      {item.orphan}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">
            No branches found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default SeatMatrix;
