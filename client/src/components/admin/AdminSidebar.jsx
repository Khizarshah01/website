import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import apiClient from "../../utils/apiClient";
import {
  FaHome, FaFileAlt, FaNewspaper, FaBullhorn, FaCalendarAlt,
  FaUserGraduate, FaBriefcase, FaUniversity, FaFileImage, FaChartLine,
  FaUsers, FaComments, FaCog, FaChevronLeft, FaChevronRight,
  FaGraduationCap, FaClipboardList, FaFlask, FaEye, FaBars,
  FaUserShield, FaHistory, FaCheckCircle,
} from "react-icons/fa";

const DEPT_TO_PAGEID = {
  CSE: "departments-cse", IT: "departments-it", MECH: "departments-mechanical",
  ELECTRICAL: "departments-electrical", ENTC: "departments-entc",
  MBA: "departments-mba", ASH: "departments-applied-sciences",
};

const AdminSidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const { isSuperAdmin, isCoordinator, userDepartment } = useAuth();
  const [pendingApprovalCount, setPendingApprovalCount] = useState(0);
  const coordDeptPagePath = isCoordinator
    ? `/admin/visual/${DEPT_TO_PAGEID[userDepartment] || ""}`
    : null;
  const superAdminOnly = (item) => ({ ...item, superAdminOnly: true });

  useEffect(() => {
    if (!isSuperAdmin) return undefined;

    let active = true;
    const loadApprovals = async () => {
      try {
        const res = await apiClient.get("/pages/approvals?status=pending&limit=100");
        if (active) {
          const items = Array.isArray(res.data?.data) ? res.data.data : [];
          setPendingApprovalCount(items.length);
        }
      } catch (_error) {
        if (active) {
          setPendingApprovalCount(0);
        }
      }
    };

    loadApprovals();
    const timer = window.setInterval(loadApprovals, 30000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [isSuperAdmin]);

  const allMenuItems = [
    { title: "Overview", items: [
      { name: "Dashboard", path: "/admin", icon: FaHome },
      superAdminOnly({ name: "Analytics", path: "/admin/analytics", icon: FaChartLine }),
    ]},
    { title: "Content", superAdminOnly: true, items: [
      { name: "Pages", path: "/admin/pages", icon: FaFileAlt },
      { name: "Homepage", path: "/admin/homepage", icon: FaHome },
      { name: "News & Updates", path: "/admin/news", icon: FaNewspaper },
      { name: "Notices", path: "/admin/notices", icon: FaBullhorn },
      { name: "Events", path: "/admin/events", icon: FaCalendarAlt },
      { name: "Gallery", path: "/admin/gallery", icon: FaFileImage },
      { name: "Popup Banner", path: "/admin/popup-banner", icon: FaEye },
      { name: "Menu Manager", path: "/admin/menu-manager", icon: FaBars },
    ]},
    { title: "Academic Management", items: [
      superAdminOnly({ name: "Departments", path: "/admin/departments", icon: FaUniversity }),
      ...(isCoordinator && coordDeptPagePath
        ? [{ name: "My Department", path: coordDeptPagePath, icon: FaUniversity }]
        : []),
      superAdminOnly({ name: "Academics Content", path: "/admin/academics", icon: FaFileAlt }),
      superAdminOnly({ name: "Faculty", path: "/admin/faculty", icon: FaUserGraduate }),
      superAdminOnly({ name: "Research", path: "/admin/research", icon: FaFlask }),
      superAdminOnly({ name: "IQAC", path: "/admin/iqac", icon: FaClipboardList }),
    ]},
    { title: "Students", superAdminOnly: true, items: [
      { name: "Placements", path: "/admin/placements", icon: FaBriefcase },
      { name: "Recruiters", path: "/admin/recruiters", icon: FaUsers },
      { name: "Alumni", path: "/admin/alumni", icon: FaUserGraduate },
      { name: "Testimonials", path: "/admin/testimonials", icon: FaComments },
    ]},
    { title: "Resources", superAdminOnly: true, items: [
      { name: "Documents", path: "/admin/documents", icon: FaFileImage },
      { name: "NIRF Data", path: "/admin/nirf", icon: FaGraduationCap },
    ]},
    { title: "System", items: [
      superAdminOnly({ name: "Change Approvals", path: "/admin/approvals", icon: FaCheckCircle, badge: pendingApprovalCount }),
      superAdminOnly({ name: "Coordinators", path: "/admin/coordinators", icon: FaUserShield }),
      superAdminOnly({ name: "Activity Log", path: "/admin/activity-log", icon: FaHistory }),
      { name: "Settings", path: "/admin/settings", icon: FaCog },
    ]},
  ];

  const menuItems = allMenuItems
    .filter((s) => !s.superAdminOnly || isSuperAdmin)
    .map((s) => ({ ...s, items: s.items.filter((i) => !i.superAdminOnly || isSuperAdmin) }))
    .filter((s) => s.items.length > 0);

  const isActive = (path) =>
    path === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(path);

  return (
    <aside
      className={`${collapsed ? "w-[72px]" : "w-[250px]"} bg-white dark:bg-[#1a1a2e] border-r border-gray-200/80 dark:border-gray-800 transition-all duration-300 flex flex-col h-screen select-none`}
    >
      {/* Brand */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gray-900 dark:bg-white flex items-center justify-center text-white dark:text-gray-900 font-bold text-sm">
              S
            </div>
            <span className="font-semibold text-gray-900 dark:text-white text-[15px] tracking-tight">SSGMCE</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`${collapsed ? "mx-auto" : ""} w-7 h-7 flex items-center justify-center rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
        >
          {collapsed ? <FaChevronRight className="text-xs" /> : <FaChevronLeft className="text-xs" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2.5 space-y-5">
        {menuItems.map((section, idx) => (
          <div key={idx}>
            {!collapsed && (
              <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-widest px-2.5 mb-1.5">
                {section.title}
              </p>
            )}
            {collapsed && idx > 0 && <div className="border-t border-gray-100 dark:border-gray-800 mb-2 mx-2" />}
            <ul className="space-y-0.5">
              {section.items.map((item, i) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <li key={i}>
                    <Link
                      to={item.path}
                      className={`relative flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-all ${
                        active
                          ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      }`}
                      title={collapsed ? item.name : ""}
                    >
                      <Icon
                        className={`text-sm flex-shrink-0 ${collapsed ? "mx-auto" : ""} ${
                          active ? "text-white dark:text-gray-900" : "text-gray-400 dark:text-gray-500"
                        }`}
                      />
                      {!collapsed && <span>{item.name}</span>}
                      {!collapsed && item.badge > 0 && (
                        <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                          {item.badge}
                        </span>
                      )}
                      {collapsed && item.badge > 0 && (
                        <span className="absolute right-2 top-1.5 h-2.5 w-2.5 rounded-full bg-red-500" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-3 border-t border-gray-100 dark:border-gray-800 flex-shrink-0">
          <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 px-3 py-2.5">
            <p className="text-[11px] text-gray-400 dark:text-gray-600">SSGMCE Admin v2.0</p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default AdminSidebar;
