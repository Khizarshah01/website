import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FaCalendarAlt,
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
import { getErrorMessage, logUnexpectedError } from "../../utils/apiErrors";
import { resolveUploadedAssetUrl } from "../../utils/uploadUrls";
import {
  getUploadErrorMessage,
  uploadAsset,
} from "../../utils/uploadClient";

const FALLBACK_CATEGORIES = [
  "Technical",
  "Cultural",
  "Sports",
  "Workshop",
  "Seminar",
  "Conference",
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

const toDateTimeInputValue = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 16);
};

const formatDateTime = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString();
};

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [showEventForm, setShowEventForm] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    eventDate: "",
    endDate: "",
    location: "SSGMCE Campus",
    organizer: "",
    category: FALLBACK_CATEGORIES[0],
    image: "",
    registrationLink: "",
    isActive: true,
  });
  const [editingEventId, setEditingEventId] = useState(null);

  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [categoryForm, setCategoryForm] = useState(emptyCategoryForm());
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [submittingCategory, setSubmittingCategory] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deleteEventId, setDeleteEventId] = useState(null);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const fileInputRef = useRef(null);

  const authHeader = () => ({});

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

  const eventCategoryNames = useMemo(() => {
    const names = events.map((item) => normalizeName(item.category)).filter(Boolean);
    return Array.from(new Set(names));
  }, [events]);

  const orderedCategoryNames = useMemo(() => {
    const configuredLower = new Set(
      configuredCategoryNames.map((name) => name.toLowerCase()),
    );
    const extras = eventCategoryNames
      .filter((name) => !configuredLower.has(name.toLowerCase()))
      .sort((a, b) => a.localeCompare(b));
    return [...configuredCategoryNames, ...extras];
  }, [configuredCategoryNames, eventCategoryNames]);

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
    const current = normalizeName(eventForm.category);
    const lowerSet = new Set(activeNames.map((name) => name.toLowerCase()));
    if (current && !lowerSet.has(current.toLowerCase())) {
      activeNames.push(current);
    }
    if (activeNames.length > 0) return activeNames;
    if (orderedCategoryNames.length > 0) return orderedCategoryNames;
    return FALLBACK_CATEGORIES;
  }, [sortedCategories, orderedCategoryNames, eventForm.category]);

  const filterTabs = useMemo(() => ["All", ...orderedCategoryNames], [orderedCategoryNames]);

  const categoryEventCountMap = useMemo(() => {
    const map = new Map();
    for (const item of events) {
      const key = normalizeName(item.category).toLowerCase();
      if (!key) continue;
      map.set(key, (map.get(key) || 0) + 1);
    }
    return map;
  }, [events]);

  const eventCountForCategory = (name) =>
    categoryEventCountMap.get(normalizeName(name).toLowerCase()) || 0;

  const emptyEventForm = (category = defaultCategory) => ({
    title: "",
    description: "",
    eventDate: "",
    endDate: "",
    location: "SSGMCE Campus",
    organizer: "",
    category,
    image: "",
    registrationLink: "",
    isActive: true,
  });

  const fetchEvents = async () => {
    try {
      setLoadingEvents(true);
      const res = await apiClient.get("/events/admin/all", authHeader());
      const list = Array.isArray(res.data?.data)
        ? res.data.data
        : Array.isArray(res.data)
          ? res.data
          : [];
      setEvents(list);
      setError("");
    } catch (err) {
      logUnexpectedError("Error loading events:", err);
      setError(getErrorMessage(err, "Failed to load events."));
    } finally {
      setLoadingEvents(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const res = await apiClient.get("/events/categories/admin/all", authHeader());
      const list = Array.isArray(res.data?.data) ? res.data.data : [];
      setCategories(list);
    } catch (err) {
      logUnexpectedError("Error loading event categories:", err);
      setCategories(
        FALLBACK_CATEGORIES.map((name, index) => ({
          _id: `fallback-${name.toLowerCase()}`,
          name,
          order: index,
          isActive: true,
          isFallback: true,
        })),
      );
      setError(getErrorMessage(err, "Failed to load event categories. Showing fallback list."));
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!filterTabs.includes(filterCategory)) {
      setFilterCategory("All");
    }
  }, [filterTabs, filterCategory]);

  useEffect(() => {
    const current = normalizeName(eventForm.category).toLowerCase();
    const valid = categoryOptions.some((category) => category.toLowerCase() === current);
    if (!valid) {
      setEventForm((prev) => ({ ...prev, category: defaultCategory }));
    }
  }, [categoryOptions, defaultCategory, eventForm.category]);

  const handleEventImageUpload = async (file) => {
    if (!file) return;

    const fd = new FormData();
    fd.append("image", file);

    try {
      setUploading(true);
      setError("");
      const res = await uploadAsset({
        endpoint: "/upload/image",
        fieldName: "image",
        file,
      });
      const uploadedUrl = res.data?.fileUrl || res.data?.url || "";
      if (!uploadedUrl) throw new Error("Upload URL missing.");
      setEventForm((currentForm) => ({ ...currentForm, image: uploadedUrl }));
    } catch (err) {
      setError(getUploadErrorMessage(err, "Image upload failed."));
    } finally {
      setUploading(false);
    }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const title = normalizeName(eventForm.title);
    const description = normalizeName(eventForm.description);
    const startDate = eventForm.eventDate ? new Date(eventForm.eventDate) : null;
    const endDate = eventForm.endDate ? new Date(eventForm.endDate) : null;

    if (!title || !description || !startDate) {
      setError("Title, description, and start date are required.");
      return;
    }

    if (Number.isNaN(startDate.getTime())) {
      setError("Start date is invalid.");
      return;
    }

    if (endDate && Number.isNaN(endDate.getTime())) {
      setError("End date is invalid.");
      return;
    }

    if (endDate && endDate < startDate) {
      setError("End date must be after start date.");
      return;
    }

    const payload = {
      ...eventForm,
      title,
      description,
      eventDate: startDate,
      endDate: endDate || undefined,
      location: normalizeName(eventForm.location) || "SSGMCE Campus",
      organizer: normalizeName(eventForm.organizer),
      category: normalizeName(eventForm.category) || defaultCategory,
      image: normalizeName(eventForm.image),
      registrationLink: normalizeName(eventForm.registrationLink),
      isActive: eventForm.isActive !== false,
    };

    try {
      if (editingEventId) {
        await apiClient.put(`/events/${editingEventId}`, payload, authHeader());
        setSuccess("Event updated.");
      } else {
        await apiClient.post("/events", payload, authHeader());
        setSuccess("Event created.");
      }

      await Promise.all([fetchEvents(), fetchCategories()]);
      resetEventForm();
    } catch (err) {
      setError(getErrorMessage(err, "Failed to save event."));
    }
  };

  const handleEventEdit = (item) => {
    setEventForm({
      title: item.title || "",
      description: item.description || "",
      eventDate: toDateTimeInputValue(item.eventDate),
      endDate: toDateTimeInputValue(item.endDate),
      location: item.location || "SSGMCE Campus",
      organizer: item.organizer || "",
      category: normalizeName(item.category) || defaultCategory,
      image: item.image || "",
      registrationLink: item.registrationLink || "",
      isActive: item.isActive !== false,
    });
    setEditingEventId(item._id);
    setShowEventForm(true);
    setError("");
    setSuccess("");
  };

  const handleEventDelete = async (id) => {
    try {
      await apiClient.delete(`/events/${id}`, authHeader());
      setSuccess("Event deleted.");
      setDeleteEventId(null);
      await fetchEvents();
    } catch (err) {
      setError(getErrorMessage(err, "Failed to delete event."));
      setDeleteEventId(null);
    }
  };

  const resetEventForm = () => {
    setEventForm(emptyEventForm());
    setEditingEventId(null);
    setShowEventForm(false);
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
        await apiClient.put(`/events/categories/${editingCategoryId}`, payload, authHeader());
        setSuccess("Category updated.");
      } else {
        await apiClient.post("/events/categories", payload, authHeader());
        setSuccess("Category created.");
      }
      await Promise.all([fetchCategories(), fetchEvents()]);
      resetCategoryForm();
    } catch (err) {
      setError(getErrorMessage(err, "Category operation failed."));
    } finally {
      setSubmittingCategory(false);
    }
  };

  const handleCategoryDelete = async (id) => {
    try {
      await apiClient.delete(`/events/categories/${id}`, authHeader());
      setSuccess(`Category deleted. Related events moved to "${OTHER_CATEGORY}".`);
      setDeleteCategoryId(null);
      await Promise.all([fetchCategories(), fetchEvents()]);
    } catch (err) {
      setError(getErrorMessage(err, "Delete failed."));
      setDeleteCategoryId(null);
    }
  };

  const canDeleteCategory = (category) =>
    !category?.isFallback &&
    normalizeName(category?.name).toLowerCase() !== OTHER_CATEGORY.toLowerCase();

  const canEditCategory = (category) => !category?.isFallback;

  const filteredEvents =
    filterCategory === "All"
      ? events
      : events.filter(
          (item) => normalizeName(item.category).toLowerCase() === filterCategory.toLowerCase(),
        );

  const sortedFilteredEvents = useMemo(
    () =>
      [...filteredEvents].sort((a, b) => {
        const timeA = a?.eventDate ? new Date(a.eventDate).getTime() : 0;
        const timeB = b?.eventDate ? new Date(b.eventDate).getTime() : 0;
        if (timeA !== timeB) return timeB - timeA;
        return String(a?.title || "").localeCompare(String(b?.title || ""));
      }),
    [filteredEvents],
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              Events Management
            </h1>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Manage college events and event categories from one place.
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
                resetEventForm();
                setShowEventForm(true);
              }}
              className="flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-2.5 font-medium text-white shadow-lg transition-colors hover:bg-cyan-700"
            >
              <FaPlus /> Add Event
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
            <p className="text-sm text-gray-500 dark:text-gray-400">Loading categories...</p>
          ) : sortedCategories.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">No categories found.</p>
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
                      Order {category.order ?? 0} | {eventCountForCategory(category.name)} events
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
                      title={canEditCategory(category) ? "Edit Category" : "Reload categories to edit"}
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

        <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-[#1a1a2e]">
          {loadingEvents ? (
            <div className="p-12 text-center">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-cyan-500" />
              <p className="text-gray-500 dark:text-gray-400">Loading events...</p>
            </div>
          ) : sortedFilteredEvents.length === 0 ? (
            <div className="p-12 text-center">
              <FaCalendarAlt className="mx-auto mb-4 text-6xl text-gray-300 dark:text-gray-600" />
              <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-gray-200">
                No Events Found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Add your first event using the button above.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
                  <tr>
                    <th className="px-5 py-3 text-left font-semibold">Event</th>
                    <th className="px-5 py-3 text-left font-semibold">Category</th>
                    <th className="px-5 py-3 text-left font-semibold">Event Date</th>
                    <th className="px-5 py-3 text-left font-semibold">Status</th>
                    <th className="px-5 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {sortedFilteredEvents.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                      <td className="px-5 py-4">
                        <div className="flex items-start gap-3">
                          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
                            {item.image ? (
                              <img
                                src={resolveUploadedAssetUrl(item.image)}
                                alt={item.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-gray-300 dark:text-gray-600">
                                <FaFileImage />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-800 dark:text-gray-200">
                              {item.title}
                            </p>
                            <p className="mt-1 line-clamp-1 text-xs text-gray-500 dark:text-gray-400">
                              {item.description}
                            </p>
                            <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                              {item.location || "SSGMCE Campus"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">{item.category || "-"}</td>
                      <td className="px-5 py-4">
                        <p>{formatDateTime(item.eventDate)}</p>
                        {item.endDate ? (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Ends: {formatDateTime(item.endDate)}
                          </p>
                        ) : null}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            item.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {item.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleEventEdit(item)}
                            className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => setDeleteEventId(item._id)}
                            className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showEventForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-8 w-full max-w-3xl rounded-2xl bg-white shadow-2xl dark:bg-[#1a1a2e]">
            <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                {editingEventId ? "Edit Event" : "Add Event"}
              </h2>
              <button
                onClick={resetEventForm}
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-gray-800"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleEventSubmit} className="space-y-5 p-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Image
                </label>
                <div className="flex items-start gap-4">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800/50">
                    {eventForm.image ? (
                      <img
                        src={resolveUploadedAssetUrl(eventForm.image)}
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
                        handleEventImageUpload(selectedFile);
                        e.target.value = "";
                      }}
                    />
                    <input
                      type="text"
                      inputMode="url"
                      placeholder="https://... or /uploads/images/..."
                      value={eventForm.image}
                      onChange={(e) =>
                        setEventForm((currentForm) => ({
                          ...currentForm,
                          image: e.target.value,
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
                  value={eventForm.title}
                  onChange={(e) =>
                    setEventForm((currentForm) => ({
                      ...currentForm,
                      title: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-cyan-500 dark:border-gray-600"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Description *
                </label>
                <textarea
                  rows={4}
                  value={eventForm.description}
                  onChange={(e) =>
                    setEventForm((currentForm) => ({
                      ...currentForm,
                      description: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-cyan-500 dark:border-gray-600"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Start Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    value={eventForm.eventDate}
                    onChange={(e) =>
                      setEventForm((currentForm) => ({
                        ...currentForm,
                        eventDate: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-cyan-500 dark:border-gray-600"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    End Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={eventForm.endDate}
                    onChange={(e) =>
                      setEventForm((currentForm) => ({
                        ...currentForm,
                        endDate: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-cyan-500 dark:border-gray-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Category
                  </label>
                  <select
                    value={eventForm.category}
                    onChange={(e) =>
                      setEventForm((currentForm) => ({
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
                    Location
                  </label>
                  <input
                    type="text"
                    value={eventForm.location}
                    onChange={(e) =>
                      setEventForm((currentForm) => ({
                        ...currentForm,
                        location: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-cyan-500 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Organizer
                  </label>
                  <input
                    type="text"
                    value={eventForm.organizer}
                    onChange={(e) =>
                      setEventForm((currentForm) => ({
                        ...currentForm,
                        organizer: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-cyan-500 dark:border-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Registration Link
                </label>
                <input
                  type="url"
                  value={eventForm.registrationLink}
                  onChange={(e) =>
                    setEventForm((currentForm) => ({
                      ...currentForm,
                      registrationLink: e.target.value,
                    }))
                  }
                  placeholder="https://..."
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-cyan-500 dark:border-gray-600"
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={eventForm.isActive}
                  onChange={(e) =>
                    setEventForm((currentForm) => ({
                      ...currentForm,
                      isActive: e.target.checked,
                    }))
                  }
                />
                Show this event on the public Events page
              </label>

              <div className="flex justify-end gap-3 border-t border-gray-200 pt-4 dark:border-gray-700">
                <button
                  type="button"
                  onClick={resetEventForm}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan-700"
                >
                  <FaSave />
                  {editingEventId ? "Update Event" : "Add Event"}
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
                Show this category on the public Events filters
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

      {deleteEventId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#1a1a2e]">
            <h3 className="mb-2 text-lg font-bold text-gray-800 dark:text-gray-200">
              Delete Event?
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteEventId(null)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleEventDelete(deleteEventId)}
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
              Events in this category will be moved to "{OTHER_CATEGORY}".
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

export default AdminEvents;
