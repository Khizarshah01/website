import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../utils/apiClient";
import AdminLayout from "../../components/admin/AdminLayout";
import { useAuth } from "../../hooks/useAuth";
import { DASHBOARD_SECTIONS } from "../../constants/navConfig";
import { isAcademicsWebsiteRoute } from "../../constants/academicsPages";
import { getErrorMessage, logUnexpectedError } from "../../utils/apiErrors";
import {
  FaPlus, FaEdit, FaClock, FaFileAlt, FaChartLine, FaArrowRight,
  FaChartPie, FaDatabase, FaUniversity, FaArrowUp, FaNewspaper,
} from "react-icons/fa";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

const DEPT_TO_PAGEID = {
  CSE: "departments-cse", IT: "departments-it", MECH: "departments-mechanical",
  ELECTRICAL: "departments-electrical", ENTC: "departments-entc",
  MBA: "departments-mba", ASH: "departments-applied-sciences",
};

const isLegacyAcademicsPage = (page) =>
  (page.category || "").toLowerCase() === "academics" &&
  !isAcademicsWebsiteRoute(page.route);

const StatCard = ({ label, value, sub, icon: Icon, accent = "gray" }) => {
  const colors = {
    gray: "bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    violet: "bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
  };
  return (
    <div className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-200/80 dark:border-gray-800 p-5 flex items-start gap-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colors[accent]}`}>
        <Icon className="text-base" />
      </div>
      <div>
        <p className="text-[13px] text-gray-400 dark:text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">{value}</p>
        {sub && <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const { isSuperAdmin, isCoordinator, userDepartment, user } = useAuth();
  const [categoryCounts, setCategoryCounts] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [recentPages, setRecentPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [trafficData, setTrafficData] = useState([]);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    fetchDashboardData();
    generateTrafficData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await apiClient.get("/pages");
      if (res.data.success) {
        const pages = (res.data.data || []).filter(
          (page) => !isLegacyAcademicsPage(page),
        );
        setTotalPages(pages.length);
        const counts = {};
        DASHBOARD_SECTIONS.forEach((c) => { counts[c.id] = 0; });
        pages.forEach((p) => {
          const cat = (p.category || "").toLowerCase();
          if (counts[cat] !== undefined) counts[cat]++;
        });
        setCategoryCounts(counts);
        const sorted = [...pages].sort(
          (a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0),
        );
        setRecentPages(sorted.slice(0, 6));
        setError("");
      }
    } catch (err) {
      logUnexpectedError("Error fetching dashboard data:", err);
      setError(getErrorMessage(err, "Failed to load dashboard data"));
    } finally {
      setLoading(false);
    }
  };

  const generateTrafficData = () => {
    const data = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      data.push({
        date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        views: Math.floor(Math.random() * 600) + 150,
        visits: Math.floor(Math.random() * 350) + 80,
      });
    }
    setTrafficData(data);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
    });
  };

  const seedAllPages = async () => {
    if (seeding) return;
    setSeeding(true);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await apiClient.post("/pages/seed-all", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        alert(res.data.message);
        fetchDashboardData();
      }
    } catch (err) {
      alert("Error seeding pages: " + (err.response?.data?.message || err.message));
    } finally {
      setSeeding(false);
    }
  };

  const pieData = DASHBOARD_SECTIONS
    .map((c) => ({ name: c.label, value: categoryCounts[c.id] || 0, color: c.color }))
    .filter((d) => d.value > 0);

  const activeCats = Object.values(categoryCounts).filter((v) => v > 0).length;

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 border-t-gray-900 dark:border-t-white rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        ) : null}
        {/* Page title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            {isCoordinator ? `Welcome, ${user?.name || "Coordinator"}` : "Dashboard"}
          </h1>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
            {isCoordinator
              ? `Managing ${userDepartment} department`
              : `Welcome back, ${user?.name || "Admin"}. Here's your overview.`}
          </p>
        </div>

        {/* Coordinator quick-access */}
        {isCoordinator && DEPT_TO_PAGEID[userDepartment] && (
          <Link
            to={`/admin/visual/${DEPT_TO_PAGEID[userDepartment]}`}
            className="flex items-center justify-between bg-white dark:bg-[#1a1a2e] border border-gray-200/80 dark:border-gray-800 rounded-xl p-5 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gray-900 dark:bg-white flex items-center justify-center text-white dark:text-gray-900">
                <FaUniversity />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Edit Department Page</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">Manage the public {userDepartment} page content</p>
              </div>
            </div>
            <FaArrowRight className="text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors" />
          </Link>
        )}

        {/* SuperAdmin content */}
        {isSuperAdmin && (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Total Pages" value={totalPages} icon={FaFileAlt} accent="blue" />
              <StatCard label="Categories" value={`${activeCats}/${DASHBOARD_SECTIONS.length}`} icon={FaChartPie} accent="amber" />
              <StatCard label="Content Sections" value={DASHBOARD_SECTIONS.length} icon={FaDatabase} accent="emerald" />
              <StatCard label="Recent Updates" value={recentPages.length} icon={FaClock} accent="violet" />
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Traffic */}
              <div className="lg:col-span-2 bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-200/80 dark:border-gray-800 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Site Traffic</h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Last 30 days</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" />Views</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" />Visits</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={trafficData}>
                    <defs>
                      <linearGradient id="gViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.15} />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gVisits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.15} />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.15} vertical={false} />
                    <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: "10px" }} interval={5} tickLine={false} axisLine={false} />
                    <YAxis stroke="#6b7280" style={{ fontSize: "10px" }} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ borderRadius: "10px", fontSize: "12px", border: "1px solid #374151", backgroundColor: "#1f2937", color: "#e5e7eb" }}
                    />
                    <Area type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} fill="url(#gViews)" name="Views" />
                    <Area type="monotone" dataKey="visits" stroke="#f59e0b" strokeWidth={2} fill="url(#gVisits)" name="Visits" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Distribution */}
              <div className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-200/80 dark:border-gray-800 p-5">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Content Distribution</h3>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 mb-3">Pages per category</p>
                {pieData.length > 0 ? (
                  <>
                    <ResponsiveContainer width="100%" height={170}>
                      <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={3} dataKey="value" strokeWidth={0}>
                          {pieData.map((entry, i) => (
                            <Cell key={i} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-2 space-y-1.5 max-h-36 overflow-y-auto pr-2">
                      {pieData.map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                            <span className="text-gray-500 dark:text-gray-400 truncate">{item.name}</span>
                          </div>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 text-gray-300 dark:text-gray-600">
                    <FaChartPie className="text-3xl mb-2" />
                    <p className="text-sm">No content yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Category cards + Recent + Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Website Sections</h3>
                  <Link to="/admin/pages" className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">View all →</Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {DASHBOARD_SECTIONS.map((cat) => {
                    const Icon = cat.icon;
                    const count = categoryCounts[cat.id] || 0;
                    return (
                      <Link
                        key={cat.id}
                        to={`/admin/pages?category=${cat.id}`}
                        className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-200/80 dark:border-gray-800 p-4 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 transition-all group"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${cat.color}12` }}>
                            <Icon className="text-sm" style={{ color: cat.color }} />
                          </div>
                          <span className="text-xl font-bold text-gray-900 dark:text-white">{count}</span>
                        </div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors truncate">{cat.label}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                {/* Recent */}
                <div className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-200/80 dark:border-gray-800 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Recent Updates</h3>
                    <Link to="/admin/pages" className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">All →</Link>
                  </div>
                  <div className="divide-y divide-gray-50 dark:divide-gray-800">
                    {recentPages.length > 0 ? recentPages.slice(0, 5).map((page, idx) => (
                      <Link
                        key={idx}
                        to={`/admin/visual/${page.pageId}`}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <div className="w-7 h-7 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                          <FaFileAlt className="text-gray-400 dark:text-gray-500 text-[10px]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">{page.pageTitle}</p>
                          <p className="text-[10px] text-gray-400 dark:text-gray-600">{formatDate(page.updatedAt)}</p>
                        </div>
                      </Link>
                    )) : (
                      <div className="py-8 text-center text-sm text-gray-300 dark:text-gray-600">No pages yet</div>
                    )}
                  </div>
                </div>

                {/* Quick actions */}
                <div className="bg-white dark:bg-[#1a1a2e] rounded-xl border border-gray-200/80 dark:border-gray-800 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Quick Actions</h3>
                  </div>
                  <div className="p-3 space-y-1.5">
                    {[
                      { to: "/admin/pages", label: "New Page", icon: FaPlus, desc: "Create content" },
                      { to: "/admin/news", label: "Add News", icon: FaNewspaper, desc: "Publish article" },
                      { to: "/admin/popup-banner", label: "Popup Banner", icon: FaArrowUp, desc: "Manage popup" },
                      { to: "/admin/menu-manager", label: "Menu Manager", icon: FaEdit, desc: "Organise nav" },
                    ].map((a, i) => {
                      const AIcon = a.icon;
                      return (
                        <Link
                          key={i}
                          to={a.to}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                            <AIcon className="text-xs text-gray-500 dark:text-gray-400" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{a.label}</p>
                            <p className="text-[10px] text-gray-400 dark:text-gray-600">{a.desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                    <button
                      onClick={seedAllPages}
                      disabled={seeding}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group disabled:opacity-50 mt-1 border border-dashed border-gray-200 dark:border-gray-700"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/30 flex items-center justify-center group-hover:bg-red-100 dark:group-hover:bg-red-900/40 transition-colors">
                        <FaDatabase className="text-xs text-red-500 dark:text-red-400" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-medium text-red-600 dark:text-red-400">{seeding ? "Seeding..." : "Seed All Pages"}</p>
                        <p className="text-[10px] text-gray-400 dark:text-gray-600">Create missing DB entries</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
