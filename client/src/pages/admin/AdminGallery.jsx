import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FaEdit,
  FaFileImage,
  FaPlus,
  FaSave,
  FaTags,
  FaTimes,
  FaTrash,
  FaUpload,
} from "react-icons/fa";
import AdminLayout from "../../components/admin/AdminLayout";
import apiClient from "../../utils/apiClient";
import { resolveUploadedAssetUrl } from "../../utils/uploadUrls";

const FALLBACK_CATEGORIES = [
  "Campus",
  "Events",
  "Labs",
  "Sports",
  "Cultural",
  "Other",
];
const OTHER_CATEGORY = "Other";

const normalizeName = (value) => String(value || "").trim();

const sortByOrder = (a, b) => {
  const orderA = Number.isFinite(Number(a?.order)) ? Number(a.order) : 0;
  const orderB = Number.isFinite(Number(b?.order)) ? Number(b.order) : 0;
  if (orderA !== orderB) return orderA - orderB;
  return String(a?.name || "").localeCompare(String(b?.name || ""));
};

const emptyCategoryForm = () => ({
  name: "",
  order: 0,
  isActive: true,
});

const AdminGallery = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [showImageForm, setShowImageForm] = useState(false);
  const [imageForm, setImageForm] = useState({
    title: "",
    category: FALLBACK_CATEGORIES[0],
    imageUrl: "",
    order: 0,
    isActive: true,
  });
  const [editingImageId, setEditingImageId] = useState(null);

  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [categoryForm, setCategoryForm] = useState(emptyCategoryForm());
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [submittingCategory, setSubmittingCategory] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deleteImageId, setDeleteImageId] = useState(null);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const fileInputRef = useRef(null);

  const authHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
  });

  const sortedCategories = useMemo(
    () => [...categories].sort(sortByOrder),
    [categories],
  );

  const configuredCategoryNames = useMemo(
    () =>
      sortedCategories
        .map((category) => normalizeName(category.name))
        .filter(Boolean),
    [sortedCategories],
  );

  const itemCategoryNames = useMemo(() => {
    const names = items
      .map((item) => normalizeName(item.category))
      .filter(Boolean);
    return Array.from(new Set(names));
  }, [items]);

  const orderedCategoryNames = useMemo(() => {
    const configuredLower = new Set(
      configuredCategoryNames.map((name) => name.toLowerCase()),
    );
    const extras = itemCategoryNames
      .filter((name) => !configuredLower.has(name.toLowerCase()))
      .sort((a, b) => a.localeCompare(b));
    return [...configuredCategoryNames, ...extras];
  }, [configuredCategoryNames, itemCategoryNames]);

  const defaultCategory = useMemo(() => {
    const firstActive = sortedCategories.find((category) => category.isActive);
    if (firstActive?.name) return firstActive.name;
    if (orderedCategoryNames.length > 0) return orderedCategoryNames[0];
    return FALLBACK_CATEGORIES[0];
  }, [sortedCategories, orderedCategoryNames]);

  const categoryOptions = useMemo(() => {
    const activeNames = sortedCategories
      .filter((category) => category.isActive)
      .map((category) => normalizeName(category.name))
      .filter(Boolean);
    const current = normalizeName(imageForm.category);
    const lowerSet = new Set(activeNames.map((name) => name.toLowerCase()));
    if (current && !lowerSet.has(current.toLowerCase())) {
      activeNames.push(current);
    }
    if (activeNames.length > 0) return activeNames;
    if (orderedCategoryNames.length > 0) return orderedCategoryNames;
    return FALLBACK_CATEGORIES;
  }, [sortedCategories, orderedCategoryNames, imageForm.category]);

  const filterTabs = useMemo(() => ["All", ...orderedCategoryNames], [orderedCategoryNames]);

  const categoryImageCountMap = useMemo(() => {
    const map = new Map();
    for (const item of items) {
      const key = normalizeName(item.category).toLowerCase();
      if (!key) continue;
      map.set(key, (map.get(key) || 0) + 1);
    }
    return map;
  }, [items]);

  const imageCountForCategory = (name) =>
    categoryImageCountMap.get(normalizeName(name).toLowerCase()) || 0;

  const emptyImageForm = (category = defaultCategory) => ({
    title: "",
    category,
    imageUrl: "",
    order: 0,
    isActive: true,
  });

  const fetchItems = async () => {
    try {
      setLoadingItems(true);
      const res = await apiClient.get("/gallery/admin/all", authHeader());
      setItems(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch {
      setError("Failed to load gallery images.");
    } finally {
      setLoadingItems(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const res = await apiClient.get("/gallery/categories/admin/all", authHeader());
      const list = Array.isArray(res.data?.data) ? res.data.data : [];
      setCategories(list);
    } catch {
      setCategories(
        FALLBACK_CATEGORIES.map((name, index) => ({
          _id: `fallback-${name.toLowerCase()}`,
          name,
          order: index,
          isActive: true,
          isFallback: true,
        })),
      );
      setError("Failed to load gallery categories. Showing fallback list.");
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!filterTabs.includes(filterCategory)) {
      setFilterCategory("All");
    }
  }, [filterTabs, filterCategory]);

  useEffect(() => {
    const current = normalizeName(imageForm.category).toLowerCase();
    const valid = categoryOptions.some(
      (category) => category.toLowerCase() === current,
    );
    if (!valid) {
      setImageForm((prev) => ({ ...prev, category: defaultCategory }));
    }
  }, [categoryOptions, defaultCategory, imageForm.category]);

  const handleImageUpload = async (file) => {
    if (!file) return;

    const fd = new FormData();
    fd.append("image", file);

    try {
      setUploading(true);
      setError("");
      const res = await apiClient.post("/upload/image", fd, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const uploadedUrl = res.data?.fileUrl || res.data?.url || "";
      if (!uploadedUrl) throw new Error("Upload URL missing.");
      setImageForm((currentForm) => ({ ...currentForm, imageUrl: uploadedUrl }));
    } catch {
      setError("Image upload failed. Please upload an image under 20MB.");
    } finally {
      setUploading(false);
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!normalizeName(imageForm.title) || !normalizeName(imageForm.imageUrl)) {
      setError("Title and image are required.");
      return;
    }

    const payload = {
      ...imageForm,
      title: normalizeName(imageForm.title),
      category: normalizeName(imageForm.category) || defaultCategory,
      imageUrl: normalizeName(imageForm.imageUrl),
      order: Number(imageForm.order) || 0,
      isActive: imageForm.isActive !== false,
    };

    try {
      if (editingImageId) {
        await apiClient.put(`/gallery/${editingImageId}`, payload, authHeader());
        setSuccess("Gallery image updated.");
      } else {
        await apiClient.post("/gallery", payload, authHeader());
        setSuccess("Gallery image added.");
      }

      await Promise.all([fetchItems(), fetchCategories()]);
      resetImageForm();
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed.");
    }
  };

  const handleImageEdit = (item) => {
    setImageForm({
      title: item.title || "",
      category: normalizeName(item.category) || defaultCategory,
      imageUrl: item.imageUrl || "",
      order: item.order ?? 0,
      isActive: item.isActive !== false,
    });
    setEditingImageId(item._id);
    setShowImageForm(true);
    setError("");
    setSuccess("");
  };

  const handleImageDelete = async (id) => {
    try {
      await apiClient.delete(`/gallery/${id}`, authHeader());
      setSuccess("Gallery image deleted.");
      setDeleteImageId(null);
      await fetchItems();
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed.");
      setDeleteImageId(null);
    }
  };

  const resetImageForm = () => {
    setImageForm(emptyImageForm());
    setEditingImageId(null);
    setShowImageForm(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openAddCategory = () => {
    setCategoryForm({
      ...emptyCategoryForm(),
      order: sortedCategories.length,
    });
    setEditingCategoryId(null);
    setShowCategoryForm(true);
    setError("");
    setSuccess("");
  };

  const openEditCategory = (category) => {
    setCategoryForm({
      name: category.name || "",
      order: category.order ?? 0,
      isActive: category.isActive !== false,
    });
    setEditingCategoryId(category._id);
    setShowCategoryForm(true);
    setError("");
    setSuccess("");
  };

  const resetCategoryForm = () => {
    setCategoryForm(emptyCategoryForm());
    setEditingCategoryId(null);
    setShowCategoryForm(false);
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const name = normalizeName(categoryForm.name);
    if (!name) {
      setError("Category name is required.");
      return;
    }

    const payload = {
      name,
      order: Number(categoryForm.order) || 0,
      isActive: categoryForm.isActive !== false,
    };

    try {
      setSubmittingCategory(true);
      if (editingCategoryId) {
        await apiClient.put(
          `/gallery/categories/${editingCategoryId}`,
          payload,
          authHeader(),
        );
        setSuccess("Category updated.");
      } else {
        await apiClient.post("/gallery/categories", payload, authHeader());
        setSuccess("Category created.");
      }
      await Promise.all([fetchCategories(), fetchItems()]);
      resetCategoryForm();
    } catch (err) {
      setError(err.response?.data?.message || "Category operation failed.");
    } finally {
      setSubmittingCategory(false);
    }
  };

  const handleCategoryDelete = async (id) => {
    try {
      await apiClient.delete(`/gallery/categories/${id}`, authHeader());
      setSuccess(`Category deleted. Related images moved to "${OTHER_CATEGORY}".`);
      setDeleteCategoryId(null);
      await Promise.all([fetchCategories(), fetchItems()]);
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed.");
      setDeleteCategoryId(null);
    }
  };

  const canDeleteCategory = (category) =>
    !category?.isFallback &&
    normalizeName(category?.name).toLowerCase() !== OTHER_CATEGORY.toLowerCase();

  const canEditCategory = (category) => !category?.isFallback;

  const filteredItems =
    filterCategory === "All"
      ? items
      : items.filter(
          (item) => normalizeName(item.category).toLowerCase() === filterCategory.toLowerCase(),
        );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              Gallery Images
            </h1>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Upload images and manage gallery categories from one place.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={openAddCategory}
              className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-transparent dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <FaTags /> Manage Categories
            </button>
            <button
              onClick={() => {
                resetImageForm();
                setShowImageForm(true);
              }}
              className="flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-2.5 font-medium text-white shadow-lg transition-colors hover:bg-cyan-700"
            >
              <FaPlus /> Add Image
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-300">
            {success}
          </div>
        )}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-[#1a1a2e]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
              Category Manager
            </h2>
            <button
              onClick={openAddCategory}
              className="flex items-center gap-2 rounded-lg bg-cyan-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan-700"
            >
              <FaPlus /> New Category
            </button>
          </div>

          {loadingCategories ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Loading categories...
            </p>
          ) : sortedCategories.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No categories found.
            </p>
          ) : (
            <div className="space-y-2">
              {sortedCategories.map((category) => (
                <div
                  key={category._id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-700"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                      {category.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Order {category.order ?? 0} | {imageCountForCategory(category.name)} images
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        category.isActive
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                          : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {category.isActive ? "Active" : "Hidden"}
                    </span>
                    <button
                      onClick={() => openEditCategory(category)}
                      disabled={!canEditCategory(category)}
                      className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40 dark:text-blue-400 dark:hover:bg-blue-900/30"
                      title={
                        canEditCategory(category)
                          ? "Edit Category"
                          : "Reload categories to edit"
                      }
                    >
                      <FaEdit size={12} />
                    </button>
                    <button
                      onClick={() => setDeleteCategoryId(category._id)}
                      disabled={!canDeleteCategory(category)}
                      className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-red-900/20"
                      title={
                        canDeleteCategory(category)
                          ? "Delete Category"
                          : `"${OTHER_CATEGORY}" cannot be deleted`
                      }
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {filterTabs.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                filterCategory === category
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loadingItems ? (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-[#1a1a2e]">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-cyan-500" />
            <p className="text-gray-500 dark:text-gray-400">Loading gallery items...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-[#1a1a2e]">
            <FaFileImage className="mx-auto mb-4 text-6xl text-gray-300 dark:text-gray-600" />
            <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-gray-200">
              No Gallery Images
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Add your first gallery image using the button above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems
              .slice()
              .sort((a, b) => {
                const orderA = Number.isFinite(Number(a?.order)) ? Number(a.order) : 0;
                const orderB = Number.isFinite(Number(b?.order)) ? Number(b.order) : 0;
                if (orderA !== orderB) return orderA - orderB;
                return String(a?.title || "").localeCompare(String(b?.title || ""));
              })
              .map((item) => (
                <div
                  key={item._id}
                  className="group rounded-xl border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-[#1a1a2e]"
                >
                  <div className="relative overflow-hidden rounded-lg border border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/50">
                    <img
                      src={resolveUploadedAssetUrl(item.imageUrl)}
                      alt={item.title}
                      className="h-44 w-full object-cover"
                    />
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="line-clamp-1 text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {item.title}
                      </p>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          item.isActive
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                            : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                        }`}
                      >
                        {item.isActive ? "Active" : "Hidden"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {item.category} | Order {item.order ?? 0}
                    </p>
                  </div>
                  <div className="mt-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => handleImageEdit(item)}
                      className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30"
                      title="Edit"
                    >
                      <FaEdit size={12} />
                    </button>
                    <button
                      onClick={() => setDeleteImageId(item._id)}
                      className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                      title="Delete"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {showImageForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-8 w-full max-w-xl rounded-2xl bg-white shadow-2xl dark:bg-[#1a1a2e]">
            <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                {editingImageId ? "Edit Gallery Image" : "Add Gallery Image"}
              </h2>
              <button
                onClick={resetImageForm}
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-gray-800"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleImageSubmit} className="space-y-5 p-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Image *
                </label>
                <div className="flex items-start gap-4">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800/50">
                    {imageForm.imageUrl ? (
                      <img
                        src={resolveUploadedAssetUrl(imageForm.imageUrl)}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <FaFileImage className="text-2xl text-gray-300 dark:text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                          fileInputRef.current.click();
                        }
                      }}
                      disabled={uploading}
                      className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
                    >
                      {uploading ? (
                        <span className="h-4 w-4 animate-spin rounded-full border-b-2 border-t-2 border-cyan-500" />
                      ) : (
                        <FaUpload />
                      )}
                      {uploading ? "Uploading..." : "Upload Image"}
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const selectedFile = e.target.files?.[0];
                        handleImageUpload(selectedFile);
                        e.target.value = "";
                      }}
                    />
                    <input
                      type="text"
                      inputMode="url"
                      placeholder="https://... or /uploads/images/..."
                      value={imageForm.imageUrl}
                      onChange={(e) =>
                        setImageForm((currentForm) => ({
                          ...currentForm,
                          imageUrl: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-cyan-500 dark:border-gray-600"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Title *
                </label>
                <input
                  type="text"
                  value={imageForm.title}
                  onChange={(e) =>
                    setImageForm((currentForm) => ({
                      ...currentForm,
                      title: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-cyan-500 dark:border-gray-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Category
                  </label>
                  <select
                    value={imageForm.category}
                    onChange={(e) =>
                      setImageForm((currentForm) => ({
                        ...currentForm,
                        category: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-cyan-500 dark:border-gray-600"
                  >
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={imageForm.order}
                    onChange={(e) =>
                      setImageForm((currentForm) => ({
                        ...currentForm,
                        order: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-cyan-500 dark:border-gray-600"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={imageForm.isActive}
                  onChange={(e) =>
                    setImageForm((currentForm) => ({
                      ...currentForm,
                      isActive: e.target.checked,
                    }))
                  }
                />
                Show this image on Gallery page
              </label>

              <div className="flex justify-end gap-3 border-t border-gray-200 pt-4 dark:border-gray-700">
                <button
                  type="button"
                  onClick={resetImageForm}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan-700"
                >
                  <FaSave />
                  {editingImageId ? "Update Image" : "Add Image"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCategoryForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-8 w-full max-w-lg rounded-2xl bg-white shadow-2xl dark:bg-[#1a1a2e]">
            <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                {editingCategoryId ? "Edit Category" : "Add Category"}
              </h2>
              <button
                onClick={resetCategoryForm}
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-gray-800"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleCategorySubmit} className="space-y-5 p-6">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={categoryForm.name}
                  onChange={(e) =>
                    setCategoryForm((currentForm) => ({
                      ...currentForm,
                      name: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-cyan-500 dark:border-gray-600"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Display Order
                </label>
                <input
                  type="number"
                  value={categoryForm.order}
                  onChange={(e) =>
                    setCategoryForm((currentForm) => ({
                      ...currentForm,
                      order: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-cyan-500 dark:border-gray-600"
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={categoryForm.isActive}
                  onChange={(e) =>
                    setCategoryForm((currentForm) => ({
                      ...currentForm,
                      isActive: e.target.checked,
                    }))
                  }
                />
                Show this category on the public Gallery tabs
              </label>

              <div className="flex justify-end gap-3 border-t border-gray-200 pt-4 dark:border-gray-700">
                <button
                  type="button"
                  onClick={resetCategoryForm}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingCategory}
                  className="flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan-700 disabled:opacity-60"
                >
                  <FaSave />
                  {editingCategoryId ? "Update Category" : "Add Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteImageId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#1a1a2e]">
            <h3 className="mb-2 text-lg font-bold text-gray-800 dark:text-gray-200">
              Delete Gallery Image?
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteImageId(null)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleImageDelete(deleteImageId)}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white transition-colors hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteCategoryId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#1a1a2e]">
            <h3 className="mb-2 text-lg font-bold text-gray-800 dark:text-gray-200">
              Delete Category?
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Images in this category will be moved to "{OTHER_CATEGORY}".
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteCategoryId(null)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleCategoryDelete(deleteCategoryId)}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white transition-colors hover:bg-red-700"
              >
                Delete Category
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminGallery;
