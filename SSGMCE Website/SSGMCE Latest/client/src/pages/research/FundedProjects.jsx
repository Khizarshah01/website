import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import ResearchSidebar from "../../components/ResearchSidebar";
import {
  FaProjectDiagram,
  FaCheckCircle,
  FaClock,
  FaMoneyBillWave,
  FaUsers,
  FaCalendarAlt,
  FaBuilding,
} from "react-icons/fa";
import apiClient from "../../utils/apiClient";
import { getErrorMessage, logUnexpectedError } from "../../utils/apiErrors";

// Skeleton Loader
const ProjectSkeleton = () => (
  <div className="bg-white p-6 rounded-xl shadow-md animate-pulse">
    <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
    <div className="flex gap-2 mb-3">
      <div className="h-6 bg-gray-200 rounded-full w-20"></div>
      <div className="h-6 bg-gray-200 rounded-full w-24"></div>
    </div>
    <div className="h-2 bg-gray-200 rounded-full w-full"></div>
  </div>
);

const FundedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: "", agency: "" });
  const [stats, setStats] = useState({ total: 0, ongoing: 0, totalFunding: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Funded Projects | Research - SSGMCE";
    fetchProjects();
  }, [filter]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter.status) params.append("status", filter.status);
      if (filter.agency) params.append("agency", filter.agency);
      params.append("limit", "50");

      const res = await apiClient.get(`/research/projects?${params}`);
      setProjects(res.data.projects);
      setError("");

      // Calculate stats
      const all = res.data.projects;
      setStats({
        total: all.length,
        ongoing: all.filter((p) => p.status === "ongoing").length,
        totalFunding: all.reduce((sum, p) => sum + (p.amount || 0), 0),
      });
    } catch (error) {
      logUnexpectedError("Error fetching projects:", error);
      setError(getErrorMessage(error, "Failed to load funded projects"));
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount?.toLocaleString()}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ongoing":
        return "bg-green-100 text-green-700 border-green-200";
      case "completed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "sanctioned":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getMilestoneProgress = (milestones) => {
    if (!milestones || milestones.length === 0) return 0;
    const completed = milestones.filter((m) => m.completed).length;
    return Math.round((completed / milestones.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Funded Research Projects"
        subtitle="Research Grants and Sponsored Projects"
        breadcrumbs={[
          { label: "Research", link: "/research" },
          { label: "Funded Projects" },
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
              <div className="bg-gradient-to-br from-ssgmce-dark-blue to-ssgmce-blue text-white p-6 rounded-2xl shadow-xl text-center">
                <FaProjectDiagram className="text-4xl mx-auto mb-3 text-blue-300" />
                <p className="text-4xl font-bold">{stats.total}</p>
                <p className="text-blue-200 text-sm mt-1">Total Projects</p>
              </div>
              <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-6 rounded-2xl shadow-xl text-center">
                <FaClock className="text-4xl mx-auto mb-3 text-green-200" />
                <p className="text-4xl font-bold">{stats.ongoing}</p>
                <p className="text-green-100 text-sm mt-1">Ongoing Projects</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-xl text-center">
                <FaMoneyBillWave className="text-4xl mx-auto mb-3 text-orange-200" />
                <p className="text-4xl font-bold">
                  {formatAmount(stats.totalFunding)}
                </p>
                <p className="text-orange-100 text-sm mt-1">Total Funding</p>
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
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="sanctioned">Sanctioned</option>
                </select>
                <select
                  value={filter.agency}
                  onChange={(e) =>
                    setFilter((prev) => ({ ...prev, agency: e.target.value }))
                  }
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
                >
                  <option value="">All Agencies</option>
                  <option value="AICTE">AICTE</option>
                  <option value="DST">DST</option>
                  <option value="UGC">UGC</option>
                  <option value="Industry">Industry</option>
                </select>
              </div>
            </section>

            {/* Projects Timeline */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-gradient-to-b from-blue-600 to-orange-500 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Project Timeline
                </h3>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <ProjectSkeleton key={i} />
                    ))}
                </div>
              ) : projects.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl shadow-lg text-center">
                  <FaProjectDiagram className="text-6xl text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-700 mb-2">
                    No Projects Found
                  </h3>
                  <p className="text-gray-500">
                    Adjust filters to see more results
                  </p>
                </div>
              ) : (
                <div className="relative">
                  {/* Vertical Timeline Line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-orange-500 to-blue-600 hidden md:block"></div>

                  <div className="space-y-6">
                    {projects.map((project, idx) => {
                      const progress = getMilestoneProgress(project.milestones);
                      return (
                        <div
                          key={project._id || idx}
                          className="relative flex gap-6 group"
                        >
                          {/* Timeline Node */}
                          <div
                            className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-lg ${
                              project.status === "ongoing"
                                ? "bg-gradient-to-br from-green-500 to-green-600"
                                : project.status === "completed"
                                  ? "bg-gradient-to-br from-blue-600 to-blue-700"
                                  : "bg-gradient-to-br from-orange-500 to-orange-600"
                            }`}
                          >
                            {project.status === "completed" ? (
                              <FaCheckCircle />
                            ) : (
                              <FaClock />
                            )}
                          </div>

                          {/* Project Card */}
                          <div className="flex-1 bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                            {/* Title & Status */}
                            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                              <div>
                                <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                  {project.title}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                  <FaUsers className="text-blue-500" />
                                  <span>
                                    PI: {project.principalInvestigator}
                                  </span>
                                </div>
                              </div>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}
                              >
                                {project.status?.charAt(0).toUpperCase() +
                                  project.status?.slice(1)}
                              </span>
                            </div>

                            {/* Funding Info */}
                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center gap-2 text-sm">
                                <FaBuilding className="text-orange-500" />
                                <span className="text-gray-600">
                                  {project.fundingAgency}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <FaMoneyBillWave className="text-green-500" />
                                <span className="font-medium text-green-700">
                                  {formatAmount(project.amount)}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <FaCalendarAlt className="text-blue-500" />
                                <span className="text-gray-600">
                                  {project.duration || "N/A"}
                                </span>
                              </div>
                            </div>

                            {/* Description */}
                            {project.description && (
                              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                {project.description}
                              </p>
                            )}

                            {/* Progress Bar */}
                            {project.milestones &&
                              project.milestones.length > 0 && (
                                <div className="mt-4">
                                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                    <span>Progress</span>
                                    <span>{progress}%</span>
                                  </div>
                                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500"
                                      style={{ width: `${progress}%` }}
                                    ></div>
                                  </div>
                                </div>
                              )}

                            {/* Outcomes */}
                            {project.outcomes &&
                              project.outcomes.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                  <p className="text-xs font-medium text-gray-500 mb-2">
                                    Outcomes:
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {project.outcomes.map((outcome, i) => (
                                      <span
                                        key={i}
                                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                                      >
                                        {outcome}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundedProjects;
