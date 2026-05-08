import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import ResearchSidebar from "../../components/ResearchSidebar";
import {
  FaCertificate,
  FaCheckCircle,
  FaClock,
  FaFileAlt,
  FaUsers,
  FaCalendarAlt,
  FaCopyright,
  FaLightbulb,
} from "react-icons/fa";
import apiClient from "../../utils/apiClient";
import { getErrorMessage, logUnexpectedError } from "../../utils/apiErrors";

// Skeleton Loader
const PatentSkeleton = () => (
  <div className="bg-white p-6 rounded-xl shadow-md animate-pulse">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
      <div className="flex-1">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
          <div className="h-6 bg-gray-200 rounded-full w-24"></div>
        </div>
      </div>
    </div>
  </div>
);

const PatentsIP = () => {
  const [patents, setPatents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: "", type: "" });
  const [stats, setStats] = useState({ total: 0, granted: 0, filed: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Patents & IP | Research - SSGMCE";
    fetchPatents();
  }, [filter]);

  const fetchPatents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter.status) params.append("status", filter.status);
      if (filter.type) params.append("type", filter.type);
      params.append("limit", "50");

      const res = await apiClient.get(`/research/patents?${params}`);
      setPatents(res.data.patents);
      setError("");

      // Calculate stats
      const all = res.data.patents;
      setStats({
        total: all.length,
        granted: all.filter((p) => p.status === "granted").length,
        filed: all.filter(
          (p) => p.status === "filed" || p.status === "published",
        ).length,
      });
    } catch (error) {
      logUnexpectedError("Error fetching patents:", error);
      setError(getErrorMessage(error, "Failed to load patents"));
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "granted":
        return "bg-green-100 text-green-700 border-green-200";
      case "published":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "filed":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "patent":
        return FaCertificate;
      case "copyright":
        return FaCopyright;
      default:
        return FaLightbulb;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Patents & Intellectual Property"
        subtitle="Protecting Innovation Through Intellectual Property Rights"
        breadcrumbs={[
          { label: "Research", link: "/research" },
          { label: "Patents & IP" },
        ]}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <ResearchSidebar />
          </div>

          <div className="lg:col-span-9 space-y-8">
            {error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}
            {/* Stats */}
            <section className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white p-6 rounded-2xl shadow-xl text-center">
                <FaCertificate className="text-4xl mx-auto mb-3 text-blue-300" />
                <p className="text-4xl font-bold">{stats.total}</p>
                <p className="text-blue-200 text-sm mt-1">Total Patents & IP</p>
              </div>
              <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-6 rounded-2xl shadow-xl text-center">
                <FaCheckCircle className="text-4xl mx-auto mb-3 text-green-200" />
                <p className="text-4xl font-bold">{stats.granted}</p>
                <p className="text-green-100 text-sm mt-1">Granted</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-xl text-center">
                <FaClock className="text-4xl mx-auto mb-3 text-orange-200" />
                <p className="text-4xl font-bold">{stats.filed}</p>
                <p className="text-orange-100 text-sm mt-1">
                  Filed / Published
                </p>
              </div>
            </section>

            {/* Filters */}
            <section className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
              <div className="flex flex-wrap gap-4 items-center">
                <span className="text-sm font-medium text-gray-600">
                  Filter by:
                </span>
                <select
                  value={filter.status}
                  onChange={(e) =>
                    setFilter((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
                >
                  <option value="">All Status</option>
                  <option value="granted">Granted</option>
                  <option value="published">Published</option>
                  <option value="filed">Filed</option>
                </select>
                <select
                  value={filter.type}
                  onChange={(e) =>
                    setFilter((prev) => ({ ...prev, type: e.target.value }))
                  }
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
                >
                  <option value="">All Types</option>
                  <option value="patent">Patents</option>
                  <option value="copyright">Copyrights</option>
                  <option value="design">Design</option>
                </select>
              </div>
            </section>

            {/* Patents Grid */}
            <section>
              {loading ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <PatentSkeleton key={i} />
                    ))}
                </div>
              ) : patents.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl shadow-lg text-center">
                  <FaCertificate className="text-6xl text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-700 mb-2">
                    No Patents Found
                  </h3>
                  <p className="text-gray-500">
                    Adjust filters to see more results
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {patents.map((patent, idx) => {
                    const TypeIcon = getTypeIcon(patent.type);
                    return (
                      <div
                        key={patent._id || idx}
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                      >
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              patent.status === "granted"
                                ? "bg-green-100"
                                : "bg-blue-100"
                            }`}
                          >
                            <TypeIcon
                              className={`text-xl ${
                                patent.status === "granted"
                                  ? "text-green-600"
                                  : "text-blue-600"
                              }`}
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            {/* Title */}
                            <h3 className="font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                              {patent.title}
                            </h3>

                            {/* Inventors */}
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                              <FaUsers className="text-blue-500 flex-shrink-0" />
                              <p className="truncate">
                                {patent.inventors?.join(", ")}
                              </p>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(patent.status)}`}
                              >
                                {patent.status?.charAt(0).toUpperCase() +
                                  patent.status?.slice(1)}
                              </span>
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                {patent.type?.charAt(0).toUpperCase() +
                                  patent.type?.slice(1)}
                              </span>
                              {patent.department && (
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                  {patent.department}
                                </span>
                              )}
                            </div>

                            {/* Details */}
                            <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                              {patent.patentNumber && (
                                <span className="flex items-center gap-1">
                                  <FaFileAlt /> Patent No: {patent.patentNumber}
                                </span>
                              )}
                              {patent.filingDate && (
                                <span className="flex items-center gap-1">
                                  <FaCalendarAlt /> Filed:{" "}
                                  {new Date(patent.filingDate).getFullYear()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        {patent.description && (
                          <p className="text-sm text-gray-600 mt-4 pt-4 border-t border-gray-100 line-clamp-2">
                            {patent.description}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatentsIP;
