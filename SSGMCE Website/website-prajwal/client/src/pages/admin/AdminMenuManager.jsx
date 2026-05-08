import React, { useEffect, useState } from "react";
import apiClient from "../../utils/apiClient";
import AdminLayout from "../../components/admin/AdminLayout";
import { isAcademicsWebsiteRoute } from "../../constants/academicsPages";
import { getErrorMessage, logUnexpectedError } from "../../utils/apiErrors";
import {
  FaBars,
  FaSave,
  FaEye,
  FaEyeSlash,
  FaArrowUp,
  FaArrowDown,
  FaEdit,
} from "react-icons/fa";

const isLegacyAcademicsPage = (page) =>
  (page.category || "").toLowerCase() === "academics" &&
  !isAcademicsWebsiteRoute(page.route);

const sanitizeMenuStructure = (structure = {}) => ({
  ...structure,
  academics: (structure.academics || []).filter((page) =>
    isAcademicsWebsiteRoute(page.route),
  ),
});

const AdminMenuManager = () => {
  const [pages, setPages] = useState([]);
  const [menuStructure, setMenuStructure] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [selectedPage, setSelectedPage] = useState(null);
  const [editForm, setEditForm] = useState({
    parentMenu: "none",
    menuLabel: "",
    menuOrder: 0,
    showInMenu: true,
  });

  const menuCategories = [
    { value: "none", label: "No Menu (Standalone Page)" },
    { value: "about", label: "About Us" },
    { value: "academics", label: "Academics" },
    { value: "facilities", label: "Facilities" },
    { value: "admissions", label: "Admissions" },
    { value: "research", label: "Research & Innovation" },
    { value: "placements", label: "Placements & Training" },
    { value: "student-corner", label: "Student Corner" },
    { value: "iqac", label: "IQAC" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [pagesRes, menuRes] = await Promise.all([
        apiClient.get("/pages"),
        apiClient.get("/pages/menu-structure"),
      ]);

      if (pagesRes.data.success) {
        setPages(
          (pagesRes.data.data || []).filter(
            (page) => !isLegacyAcademicsPage(page),
          ),
        );
      }
      if (menuRes.data.success) {
        setMenuStructure(sanitizeMenuStructure(menuRes.data.data));
      }
      setError("");
    } catch (error) {
      logUnexpectedError("Error fetching data:", error);
      setError(getErrorMessage(error, "Failed to load menu manager data"));
    } finally {
      setLoading(false);
    }
  };

  const handleEditPage = (page) => {
    setSelectedPage(page);
    setEditForm({
      parentMenu: page.parentMenu || "none",
      menuLabel: page.menuLabel || "",
      menuOrder: page.menuOrder || 0,
      showInMenu: page.showInMenu !== false,
    });
  };

  const handleSave = async () => {
    if (!selectedPage) return;

    setSaving(true);
    try {
      const response = await apiClient.put(`/pages/${selectedPage.pageId}`, {
        ...selectedPage,
        ...editForm,
      });

      if (response.data.success) {
        alert("Menu settings updated successfully!");
        setSelectedPage(null);
        fetchData();
      }
    } catch (error) {
      console.error("Error updating page:", error);
      alert("Failed to update menu settings");
    } finally {
      setSaving(false);
    }
  };

  const movePageOrder = async (page, direction) => {
    const newOrder = direction === "up" ? page.menuOrder - 1 : page.menuOrder + 1;
    
    try {
      await apiClient.put(`/pages/${page.pageId}`, {
        ...page,
        menuOrder: newOrder,
      });
      fetchData();
    } catch (error) {
      console.error("Error updating page order:", error);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-gray-500 dark:text-gray-400 animate-pulse text-lg">Loading...</div>
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
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Menu Manager</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Organize pages into navigation menus and dropdowns
          </p>
        </div>

        {/* Edit Modal */}
        {selectedPage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-2xl max-w-lg w-full">
              <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  Edit Menu Settings: {selectedPage.pageTitle}
                </h2>
              </div>

              <div className="p-6 space-y-4">
                {/* Parent Menu */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Parent Menu
                  </label>
                  <select
                    value={editForm.parentMenu}
                    onChange={(e) =>
                      setEditForm({ ...editForm, parentMenu: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-[#003366]"
                  >
                    {menuCategories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Select which dropdown menu this page appears under
                  </p>
                </div>

                {/* Menu Label */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Menu Label (optional)
                  </label>
                  <input
                    type="text"
                    value={editForm.menuLabel}
                    onChange={(e) =>
                      setEditForm({ ...editForm, menuLabel: e.target.value })
                    }
                    placeholder={selectedPage.pageTitle}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-[#003366]"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Custom label for menu (leave empty to use page title)
                  </p>
                </div>

                {/* Menu Order */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Menu Order
                  </label>
                  <input
                    type="number"
                    value={editForm.menuOrder}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        menuOrder: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-[#003366]"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Lower numbers appear first
                  </p>
                </div>

                {/* Show in Menu */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <input
                    type="checkbox"
                    id="showInMenu"
                    checked={editForm.showInMenu}
                    onChange={(e) =>
                      setEditForm({ ...editForm, showInMenu: e.target.checked })
                    }
                    className="w-5 h-5 text-[#003366] border-gray-300 dark:border-gray-600 rounded focus:ring-[#003366]"
                  />
                  <label htmlFor="showInMenu" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Show in Navigation Menu
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#003366] text-white rounded-lg hover:bg-[#004080] transition-colors disabled:opacity-50"
                  >
                    <FaSave /> {saving ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={() => setSelectedPage(null)}
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Menu Structure View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {menuCategories.map((category) => {
            const categoryPages =
              menuStructure[category.value]?.sort((a, b) => a.order - b.order) || [];

            return (
              <div
                key={category.value}
                className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#003366] bg-opacity-10 rounded-lg flex items-center justify-center">
                    <FaBars className="text-[#003366]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200">{category.label}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {categoryPages.length} page(s)
                    </p>
                  </div>
                </div>

                <div className="p-4">
                  {categoryPages.length === 0 ? (
                    <p className="text-gray-400 dark:text-gray-500 text-sm text-center py-8">
                      No pages in this menu
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {categoryPages.map((page) => {
                        const fullPage = pages.find((p) => p.pageId === page.pageId);
                        if (!fullPage) return null;

                        return (
                          <div
                            key={page.pageId}
                            className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg group"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-mono text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                {page.order}
                              </span>
                              <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                                  {page.title}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{page.route}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => movePageOrder(fullPage, "up")}
                                className="p-1.5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 rounded transition-colors"
                                title="Move up"
                              >
                                <FaArrowUp size={12} />
                              </button>
                              <button
                                onClick={() => movePageOrder(fullPage, "down")}
                                className="p-1.5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 rounded transition-colors"
                                title="Move down"
                              >
                                <FaArrowDown size={12} />
                              </button>
                              <button
                                onClick={() => handleEditPage(fullPage)}
                                className="p-1.5 text-[#003366] hover:bg-[#003366] hover:bg-opacity-10 rounded transition-colors"
                                title="Edit menu settings"
                              >
                                <FaEdit size={12} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* All Pages List */}
        <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">All Pages</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Click edit to assign pages to menus
            </p>
          </div>

          <div className="p-4">
            <div className="space-y-2">
              {pages.map((page) => (
                <div
                  key={page.pageId}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {page.showInMenu !== false ? (
                      <FaEye className="text-green-600 dark:text-green-400" />
                    ) : (
                      <FaEyeSlash className="text-gray-400 dark:text-gray-500" />
                    )}
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">{page.pageTitle}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {page.route} •{" "}
                        {menuCategories.find((c) => c.value === page.parentMenu)?.label ||
                          "No Menu"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleEditPage(page)}
                    className="px-3 py-1.5 bg-[#FF9900] text-white rounded-lg text-sm font-medium hover:bg-[#FF8800] transition-colors"
                  >
                    <FaEdit className="inline mr-1" /> Edit Menu
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMenuManager;
