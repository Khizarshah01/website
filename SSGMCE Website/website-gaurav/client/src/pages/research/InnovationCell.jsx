import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import ResearchSidebar from "../../components/ResearchSidebar";
import {
  FaRocket,
  FaLightbulb,
  FaUsers,
  FaTrophy,
  FaBuilding,
  FaPlayCircle,
  FaStar,
  FaHandshake,
} from "react-icons/fa";
import apiClient from "../../utils/apiClient";
import { getErrorMessage, logUnexpectedError } from "../../utils/apiErrors";

// Skeleton
const InnovationSkeleton = () => (
  <div className="bg-white p-6 rounded-2xl shadow-md animate-pulse">
    <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  </div>
);

const InnovationCell = () => {
  const [innovations, setInnovations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ type: "", status: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Innovation Cell | Research - SSGMCE";
    fetchInnovations();
  }, [filter]);

  const fetchInnovations = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter.type) params.append("type", filter.type);
      if (filter.status) params.append("status", filter.status);
      params.append("limit", "50");

      const res = await apiClient.get(`/research/innovations?${params}`);
      setInnovations(res.data.innovations);
      setError("");
    } catch (error) {
      logUnexpectedError("Error fetching innovations:", error);
      setError(getErrorMessage(error, "Failed to load innovations"));
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "launched":
        return "bg-green-100 text-green-700";
      case "incubated":
        return "bg-blue-100 text-blue-700";
      case "development":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "startup":
        return FaRocket;
      case "incubation":
        return FaBuilding;
      default:
        return FaLightbulb;
    }
  };

  const highlights = [
    { icon: FaRocket, title: "Startups Incubated", value: "5+", color: "blue" },
    {
      icon: FaLightbulb,
      title: "Innovation Projects",
      value: "25+",
      color: "orange",
    },
    { icon: FaTrophy, title: "Hackathon Wins", value: "15+", color: "blue" },
    {
      icon: FaHandshake,
      title: "Industry Partners",
      value: "10+",
      color: "orange",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Innovation Cell"
        subtitle="Nurturing Student Entrepreneurs and Innovators"
        breadcrumbs={[
          { label: "Research", link: "/research" },
          { label: "Innovation Cell" },
        ]}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <ResearchSidebar />
          </div>

          <div className="lg:col-span-9 space-y-10">
            {error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}
            {/* About Innovation Cell */}
            <section className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaRocket className="text-2xl text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    SSGMCE Innovation Cell
                  </h2>
                  <p className="text-gray-500">
                    Transforming Ideas into Reality
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                The SSGMCE Innovation Cell is dedicated to fostering a culture
                of innovation and entrepreneurship among students. We provide
                mentorship, resources, and incubation support to help students
                transform their innovative ideas into successful ventures.
              </p>

              {/* Highlights */}
              <div className="grid md:grid-cols-4 gap-4">
                {highlights.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className={`text-center p-4 rounded-xl ${
                        item.color === "blue" ? "bg-blue-50" : "bg-orange-50"
                      }`}
                    >
                      <Icon
                        className={`text-3xl mx-auto mb-2 ${
                          item.color === "blue"
                            ? "text-blue-600"
                            : "text-orange-500"
                        }`}
                      />
                      <p
                        className={`text-2xl font-bold ${
                          item.color === "blue"
                            ? "text-blue-700"
                            : "text-orange-600"
                        }`}
                      >
                        {item.value}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">{item.title}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Programs */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-gradient-to-b from-blue-600 to-orange-500 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Our Programs
                </h3>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-ssgmce-dark-blue to-ssgmce-blue text-white p-6 rounded-2xl shadow-xl">
                  <FaLightbulb className="text-3xl mb-4 text-blue-300" />
                  <h4 className="text-lg font-bold mb-2">Ideation Labs</h4>
                  <p className="text-sm text-blue-200">
                    Weekly brainstorming sessions to develop innovative ideas
                  </p>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-xl">
                  <FaPlayCircle className="text-3xl mb-4 text-orange-200" />
                  <h4 className="text-lg font-bold mb-2">Startup Bootcamp</h4>
                  <p className="text-sm text-orange-100">
                    Intensive training on entrepreneurship fundamentals
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-6 rounded-2xl shadow-xl">
                  <FaHandshake className="text-3xl mb-4 text-green-200" />
                  <h4 className="text-lg font-bold mb-2">Mentor Connect</h4>
                  <p className="text-sm text-green-100">
                    One-on-one mentorship from industry experts
                  </p>
                </div>
              </div>
            </section>

            {/* Filters */}
            <section className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
              <div className="flex flex-wrap gap-4 items-center">
                <span className="text-sm font-medium text-gray-600">
                  Filter:
                </span>
                <select
                  value={filter.type}
                  onChange={(e) =>
                    setFilter((prev) => ({ ...prev, type: e.target.value }))
                  }
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
                >
                  <option value="">All Types</option>
                  <option value="startup">Startups</option>
                  <option value="project">Projects</option>
                  <option value="incubation">Incubation</option>
                </select>
                <select
                  value={filter.status}
                  onChange={(e) =>
                    setFilter((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
                >
                  <option value="">All Status</option>
                  <option value="launched">Launched</option>
                  <option value="incubated">Incubated</option>
                  <option value="development">In Development</option>
                </select>
              </div>
            </section>

            {/* Innovations Grid */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-gradient-to-b from-blue-600 to-orange-500 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Student Innovations
                </h3>
              </div>

              {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array(6)
                    .fill(0)
                    .map((_, i) => (
                      <InnovationSkeleton key={i} />
                    ))}
                </div>
              ) : innovations.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl shadow-lg text-center">
                  <FaRocket className="text-6xl text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-700 mb-2">
                    No Innovations Found
                  </h3>
                  <p className="text-gray-500">
                    Check back soon for new projects!
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {innovations.map((innovation, idx) => {
                    const TypeIcon = getTypeIcon(innovation.type);
                    return (
                      <div
                        key={innovation._id || idx}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
                      >
                        {/* Image/Header */}
                        <div className="relative h-40 bg-gradient-to-br from-blue-900 to-blue-700 overflow-hidden">
                          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <TypeIcon className="text-6xl text-white/30" />
                          </div>
                          {/* Status Badge */}
                          <span
                            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(innovation.status)}`}
                          >
                            {innovation.status?.charAt(0).toUpperCase() +
                              innovation.status?.slice(1)}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <h4 className="font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                            {innovation.title}
                          </h4>

                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                            {innovation.description}
                          </p>

                          {/* Team */}
                          {innovation.team && innovation.team.length > 0 && (
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                              <FaUsers className="text-blue-500" />
                              <span>
                                {innovation.team.slice(0, 2).join(", ")}
                              </span>
                              {innovation.team.length > 2 && (
                                <span>+{innovation.team.length - 2} more</span>
                              )}
                            </div>
                          )}

                          {/* Achievements */}
                          {innovation.achievements &&
                            innovation.achievements.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
                                {innovation.achievements
                                  .slice(0, 2)
                                  .map((ach, i) => (
                                    <span
                                      key={i}
                                      className="inline-flex items-center gap-1 px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-full"
                                    >
                                      <FaStar className="text-orange-400" />{" "}
                                      {ach}
                                    </span>
                                  ))}
                              </div>
                            )}

                          {/* Funding */}
                          {innovation.funding && (
                            <div className="mt-3 pt-3 border-t border-gray-100">
                              <span className="text-xs text-green-600 font-medium">
                                💰 Funded: {innovation.funding}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 rounded-2xl text-white text-center">
              <h3 className="text-2xl font-bold mb-3">
                Have an Innovative Idea?
              </h3>
              <p className="text-orange-100 mb-6 max-w-xl mx-auto">
                Submit your idea to the Innovation Cell and get mentorship,
                funding support, and incubation facilities.
              </p>
              <a
                href="mailto:innovation@ssgmce.ac.in"
                className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-colors"
              >
                <FaRocket /> Submit Your Idea
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnovationCell;
