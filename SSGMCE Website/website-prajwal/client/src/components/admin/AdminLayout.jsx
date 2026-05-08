import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../contexts/ThemeContext";
import { FaSignOutAlt, FaBell, FaSearch, FaMoon, FaSun } from "react-icons/fa";

const AdminLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notifRef = useRef(null);
  const userRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout, isSuperAdmin, isCoordinator, userDepartment } = useAuth();
  const { theme, setTheme } = useTheme();

  const displayName = user?.name || "Admin";
  const roleLabel = isCoordinator
    ? `${userDepartment} Coordinator`
    : isSuperAdmin
      ? "Super Admin"
      : "Administrator";
  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
      if (userRef.current && !userRef.current.contains(e.target)) setShowUserMenu(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9fb] dark:bg-[#0f0f23]">
      <AdminSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-[#1a1a2e] border-b border-gray-200/80 dark:border-gray-800 flex items-center justify-between px-6 flex-shrink-0 z-10">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-600 text-sm" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-gray-500/20 focus:border-gray-300 dark:focus:border-gray-600 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              title={theme === "dark" ? "Switch to light" : "Switch to dark"}
            >
              {theme === "dark" ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
            </button>

            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors relative"
              >
                <FaBell className="text-sm" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-[#1a1a2e]" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1a1a2e] rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Notifications</p>
                  </div>
                  <div className="p-3 text-center text-sm text-gray-400 dark:text-gray-500">No new notifications</div>
                </div>
              )}
            </div>

            <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mx-1" />

            {/* User */}
            <div className="relative" ref={userRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold ${
                    isCoordinator ? "bg-emerald-600" : "bg-gray-900 dark:bg-white dark:text-gray-900"
                  }`}
                >
                  {initials}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-tight">{displayName}</p>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-tight">{roleLabel}</p>
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1a1a2e] rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50 py-1">
                  <div className="px-4 py-2.5 border-b border-gray-100 dark:border-gray-800">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{displayName}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{roleLabel}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <FaSignOutAlt className="text-xs" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-[1400px] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
