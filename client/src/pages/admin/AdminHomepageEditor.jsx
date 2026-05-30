import React, { useEffect, useMemo, useState } from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaImage,
  FaPlus,
  FaRedo,
  FaSave,
  FaTrash,
  FaVideo,
} from "react-icons/fa";
import AdminLayout from "../../components/admin/AdminLayout";
import { useAuth } from "../../hooks/useAuth";
import apiClient from "../../utils/apiClient";
import { resolveUploadedAssetUrl } from "../../utils/uploadUrls";
import {
  getUploadErrorMessage,
  uploadAsset,
} from "../../utils/uploadClient";

const DEFAULT_HOME_CONFIG = {
  hero: {
    videoUrl: "",
    heading: "",
    subheading: "",
  },
  accreditations: {
    items: [],
  },
  coreStrengths: {
    badge: "",
    heading: "",
    description: "",
    items: [],
  },
  welcome: {
    badge: "",
    heading: "",
    para1: "",
    para2: "",
    mainImageUrl: "",
    imageUrls: [],
    sideImageUrl: "",
    establishedYear: "",
    establishedLabel: "",
    floatingTitle: "",
    floatingText: "",
    historyTitle: "",
    historyText: "",
    growthTitle: "",
    growthText: "",
    ctaLabel: "",
    ctaLink: "",
  },
  whyChooseUs: {
    badge: "",
    heading: "",
    description: "",
    items: [],
  },
  stats: {
    heading: "",
    description: "",
    items: [],
  },
  leadership: {
    eyebrow: "",
    heading: "",
    description: "",
    ctaLabel: "",
    ctaLink: "",
  },
  newsEvents: {
    newsTitle: "",
    newsLinkLabel: "",
    newsLink: "",
    newsCount: 4,
    eventsTitle: "",
    eventsLinkLabel: "",
    eventsLink: "",
    eventsCount: 3,
  },
  studentCorner: {
    eyebrow: "",
    heading: "",
    items: [],
  },
  alumni: {
    eyebrow: "",
    heading: "",
  },
  recruiters: {
    eyebrow: "",
    heading: "",
    description: "",
  },
  leadershipCards: [],
};

const deepClone = (value) => JSON.parse(JSON.stringify(value));

const mergeWithDefaults = (defaults, incoming) => {
  if (Array.isArray(defaults)) {
    return Array.isArray(incoming) ? incoming : deepClone(defaults);
  }

  if (
    defaults &&
    typeof defaults === "object" &&
    !Array.isArray(defaults)
  ) {
    const source =
      incoming && typeof incoming === "object" && !Array.isArray(incoming)
        ? incoming
        : {};
    const merged = { ...source };

    Object.keys(defaults).forEach((key) => {
      merged[key] = mergeWithDefaults(defaults[key], source[key]);
    });

    return merged;
  }

  return incoming === undefined || incoming === null ? defaults : incoming;
};

const parsePath = (path) =>
  String(path || "")
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .filter(Boolean);

const getAtPath = (obj, path) => {
  const tokens = parsePath(path);
  return tokens.reduce((acc, token) => (acc == null ? undefined : acc[token]), obj);
};

const setAtPath = (obj, path, value) => {
  const tokens = parsePath(path);
  if (!tokens.length) return;

  let cursor = obj;
  for (let index = 0; index < tokens.length - 1; index += 1) {
    const key = tokens[index];
    const nextKey = tokens[index + 1];

    if (cursor[key] == null || typeof cursor[key] !== "object") {
      cursor[key] = /^\d+$/.test(nextKey) ? [] : {};
    }

    cursor = cursor[key];
  }

  cursor[tokens[tokens.length - 1]] = value;
};

const inputClassName =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

const textareaClassName = `${inputClassName} min-h-[96px]`;

const Section = ({ title, description, children }) => (
  <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      {description ? (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      ) : null}
    </div>
    <div className="space-y-3">{children}</div>
  </section>
);

const Field = ({ label, value, onChange, type = "text", placeholder = "" }) => (
  <label className="block">
    <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
      {label}
    </span>
    <input
      type={type}
      value={value ?? ""}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className={inputClassName}
    />
  </label>
);

const TextareaField = ({ label, value, onChange, placeholder = "" }) => (
  <label className="block">
    <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
      {label}
    </span>
    <textarea
      value={value ?? ""}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className={textareaClassName}
    />
  </label>
);

const AdminHomepageEditor = () => {
  const { isCoordinator } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pageData, setPageData] = useState(null);
  const [config, setConfig] = useState(DEFAULT_HOME_CONFIG);
  const [initialConfig, setInitialConfig] = useState(DEFAULT_HOME_CONFIG);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploadingPaths, setUploadingPaths] = useState({});

  const dirty = useMemo(
    () => JSON.stringify(config) !== JSON.stringify(initialConfig),
    [config, initialConfig],
  );

  const setField = (path, value) => {
    setConfig((previous) => {
      const next = deepClone(previous);
      setAtPath(next, path, value);
      return next;
    });
  };

  const addArrayItem = (path, template) => {
    setConfig((previous) => {
      const next = deepClone(previous);
      const list = getAtPath(next, path);
      if (!Array.isArray(list)) {
        setAtPath(next, path, [template]);
        return next;
      }
      list.push(template);
      return next;
    });
  };

  const removeArrayItem = (path, index) => {
    setConfig((previous) => {
      const next = deepClone(previous);
      const list = getAtPath(next, path);
      if (!Array.isArray(list)) return previous;
      list.splice(index, 1);
      return next;
    });
  };

  const moveArrayItem = (path, index, direction) => {
    setConfig((previous) => {
      const next = deepClone(previous);
      const list = getAtPath(next, path);
      if (!Array.isArray(list)) return previous;

      const target = index + direction;
      if (target < 0 || target >= list.length) return previous;

      const temp = list[index];
      list[index] = list[target];
      list[target] = temp;
      return next;
    });
  };

  const uploadImage = async (path, file) => {
    if (!file) return;

    try {
      setUploadingPaths((prev) => ({ ...prev, [path]: true }));
      setError("");
      const response = await uploadAsset({
        endpoint: "/upload/image",
        fieldName: "image",
        file,
      });
      const uploadedUrl =
        response.data?.fileUrl || response.data?.url || response.data?.data?.fileUrl || "";

      if (!uploadedUrl) {
        throw new Error("Upload response did not include a file URL.");
      }

      setField(path, uploadedUrl);
    } catch (error) {
      setError(getUploadErrorMessage(error, "Image upload failed."));
    } finally {
      setUploadingPaths((prev) => {
        const next = { ...prev };
        delete next[path];
        return next;
      });
    }
  };

  const uploadMultipleImages = async (path, files) => {
    if (!files || files.length === 0) return;
    try {
      setUploadingPaths((prev) => ({ ...prev, [path]: true }));
      setError("");
      
      const newUrls = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const response = await uploadAsset({
          endpoint: "/upload/image",
          fieldName: "image",
          file,
        });
        const uploadedUrl =
          response.data?.fileUrl || response.data?.url || response.data?.data?.fileUrl || "";
        if (uploadedUrl) newUrls.push(uploadedUrl);
      }
      
      setConfig((previous) => {
        const next = deepClone(previous);
        const currentList = getAtPath(next, path) || [];
        const newList = Array.isArray(currentList) ? [...currentList, ...newUrls] : newUrls;
        setAtPath(next, path, newList);
        return next;
      });
    } catch (uploadErr) {
      setError(getUploadErrorMessage(uploadErr, "Multiple image upload failed."));
    } finally {
      setUploadingPaths((prev) => {
        const next = { ...prev };
        delete next[path];
        return next;
      });
    }
  };

  const getHomeConfigSection = (page) => {
    const sections = Array.isArray(page?.sections) ? page.sections : [];
    return sections.find((section) => section?.sectionId === "home-config") || null;
  };

  const loadPage = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await apiClient.get("/pages/home");
      const fetchedPage = response.data?.data;
      const homeSection = getHomeConfigSection(fetchedPage);
      const incomingConfig = homeSection?.content?.config || {};
      const merged = mergeWithDefaults(DEFAULT_HOME_CONFIG, incomingConfig);

      setPageData(fetchedPage || null);
      setConfig(merged);
      setInitialConfig(deepClone(merged));
    } catch (_error) {
      setError("Failed to load homepage configuration.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPage();
  }, []);

  const ensureHomeConfigSection = (sections = []) => {
    const existingIndex = sections.findIndex(
      (section) => section?.sectionId === "home-config",
    );

    if (existingIndex >= 0) {
      const updated = deepClone(sections);
      const previousContent = updated[existingIndex]?.content || {};
      updated[existingIndex] = {
        ...updated[existingIndex],
        type: "info-cards",
        content: {
          ...previousContent,
          config,
        },
      };
      return updated;
    }

    return [
      ...sections,
      {
        sectionId: "home-config",
        title: "Homepage Configuration",
        type: "info-cards",
        order: sections.length + 1,
        isVisible: true,
        content: {
          note: "Edit this JSON to control homepage content blocks.",
          items: [
            {
              title: "How to edit",
              description:
                "Use the Homepage Editor form to update text, media, links, and section settings.",
            },
          ],
          config,
        },
      },
    ];
  };

  const saveConfig = async () => {
    if (!pageData) return;

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const sections = ensureHomeConfigSection(
        Array.isArray(pageData.sections) ? pageData.sections : [],
      );

      const response = await apiClient.put("/pages/home", { sections });

      const nextInitial = deepClone(config);
      setPageData((prev) => ({ ...(prev || {}), sections }));
      setInitialConfig(nextInitial);
      if (response?.data?.approvalPending) {
        setSuccess(
          "Changes submitted for SuperAdmin approval. They will appear on homepage only after approval.",
        );
      } else {
        setSuccess("Homepage content saved successfully and is now live.");
      }
    } catch (saveError) {
      setError(
        saveError?.response?.data?.message ||
          saveError?.response?.data?.error ||
          "Failed to save homepage configuration.",
      );
    } finally {
      setSaving(false);
    }
  };

  const resetChanges = () => {
    setConfig(deepClone(initialConfig));
    setSuccess("");
    setError("");
  };

  const accreditationItems = config?.accreditations?.items || [];
  const coreStrengthItems = config?.coreStrengths?.items || [];
  const whyChooseItems = config?.whyChooseUs?.items || [];
  const statsItems = config?.stats?.items || [];
  const studentCornerItems = config?.studentCorner?.items || [];
  const leadershipCards = config?.leadershipCards || [];

  if (loading) {
    return (
      <AdminLayout>
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-blue-600" />
          <p className="text-sm text-gray-500">Loading homepage editor...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 pb-28">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Homepage Editor</h1>
            <p className="mt-1 text-sm text-gray-500">
              Click-to-edit homepage blocks, upload images, and reorder repeating items.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadPage}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
            >
              <FaRedo /> Reload
            </button>
            <button
              type="button"
              onClick={resetChanges}
              disabled={!dirty || saving}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={saveConfig}
              disabled={!dirty || saving}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              <FaSave /> {saving ? "Saving..." : "Save Homepage"}
            </button>
          </div>
        </div>

        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        ) : null}

        {isCoordinator ? (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Coordinator mode is enabled. Your Save submits changes for SuperAdmin approval first.
          </div>
        ) : null}

        <Section title="Hero" description="Top hero video and headline text.">
          <div className="grid gap-3 md:grid-cols-2">
            <Field
              label="Heading"
              value={config.hero.heading}
              onChange={(value) => setField("hero.heading", value)}
            />
            <Field
              label="Subheading"
              value={config.hero.subheading}
              onChange={(value) => setField("hero.subheading", value)}
            />
          </div>
          <Field
            label="Video URL"
            value={config.hero.videoUrl}
            onChange={(value) => setField("hero.videoUrl", value)}
            placeholder="/uploads/home/hero-video.mp4"
          />
          <p className="text-xs text-gray-500">
            <FaVideo className="mr-1 inline" /> Set a public video URL. Leave blank to use built-in fallback video.
          </p>
        </Section>

        <Section title="Accreditations" description="Logos and labels under the hero section.">
          <div className="space-y-3">
            {accreditationItems.map((item, index) => {
              const basePath = `accreditations.items[${index}]`;
              const logoPath = `${basePath}.logoUrl`;
              const logoValue = getAtPath(config, logoPath);
              return (
                <div key={`${item?.label || "accreditation"}-${index}`} className="rounded-lg border border-gray-200 p-3">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-800">Item {index + 1}</p>
                    <div className="flex items-center gap-1">
                      <button type="button" onClick={() => moveArrayItem("accreditations.items", index, -1)} className="rounded border px-2 py-1 text-xs" disabled={index === 0}><FaArrowUp /></button>
                      <button type="button" onClick={() => moveArrayItem("accreditations.items", index, 1)} className="rounded border px-2 py-1 text-xs" disabled={index === accreditationItems.length - 1}><FaArrowDown /></button>
                      <button type="button" onClick={() => removeArrayItem("accreditations.items", index)} className="rounded border border-red-300 px-2 py-1 text-xs text-red-600"><FaTrash /></button>
                    </div>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <Field label="Label" value={item?.label || ""} onChange={(value) => setField(`${basePath}.label`, value)} />
                    <Field label="Description" value={item?.desc || ""} onChange={(value) => setField(`${basePath}.desc`, value)} />
                    <Field label="Logo Alt" value={item?.logoAlt || ""} onChange={(value) => setField(`${basePath}.logoAlt`, value)} />
                    <Field label="Logo URL" value={logoValue || ""} onChange={(value) => setField(logoPath, value)} />
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => uploadImage(logoPath, event.target.files?.[0])}
                      className="text-xs"
                    />
                    {uploadingPaths[logoPath] ? <span className="text-xs text-blue-600">Uploading...</span> : null}
                    {logoValue ? (
                      <img src={resolveUploadedAssetUrl(logoValue)} alt="logo" className="ml-auto h-10 w-auto rounded border" />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => addArrayItem("accreditations.items", { label: "", desc: "", logoUrl: "", logoAlt: "" })}
            className="inline-flex items-center gap-2 rounded-lg border border-blue-300 px-3 py-2 text-sm font-semibold text-blue-700"
          >
            <FaPlus /> Add Accreditation
          </button>
        </Section>

        <Section title="Core Strengths" description="Intro text and three feature cards.">
          <div className="grid gap-3 md:grid-cols-3">
            <Field label="Badge" value={config.coreStrengths.badge} onChange={(value) => setField("coreStrengths.badge", value)} />
            <Field label="Heading" value={config.coreStrengths.heading} onChange={(value) => setField("coreStrengths.heading", value)} />
            <Field label="Description" value={config.coreStrengths.description} onChange={(value) => setField("coreStrengths.description", value)} />
          </div>
          <div className="space-y-3">
            {coreStrengthItems.map((item, index) => {
              const basePath = `coreStrengths.items[${index}]`;
              return (
                <div key={`${item?.title || "core"}-${index}`} className="rounded-lg border border-gray-200 p-3">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-800">Card {index + 1}</p>
                    <div className="flex items-center gap-1">
                      <button type="button" onClick={() => moveArrayItem("coreStrengths.items", index, -1)} className="rounded border px-2 py-1 text-xs" disabled={index === 0}><FaArrowUp /></button>
                      <button type="button" onClick={() => moveArrayItem("coreStrengths.items", index, 1)} className="rounded border px-2 py-1 text-xs" disabled={index === coreStrengthItems.length - 1}><FaArrowDown /></button>
                      <button type="button" onClick={() => removeArrayItem("coreStrengths.items", index)} className="rounded border border-red-300 px-2 py-1 text-xs text-red-600"><FaTrash /></button>
                    </div>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <Field label="Kicker" value={item?.kicker || ""} onChange={(value) => setField(`${basePath}.kicker`, value)} />
                    <Field label="Title" value={item?.title || ""} onChange={(value) => setField(`${basePath}.title`, value)} />
                    <TextareaField label="Text" value={item?.text || ""} onChange={(value) => setField(`${basePath}.text`, value)} />
                    <Field label="Link" value={item?.link || ""} onChange={(value) => setField(`${basePath}.link`, value)} />
                    <Field label="Link Label" value={item?.linkLabel || ""} onChange={(value) => setField(`${basePath}.linkLabel`, value)} />
                  </div>
                </div>
              );
            })}
          </div>
          <button type="button" onClick={() => addArrayItem("coreStrengths.items", { kicker: "", title: "", text: "", link: "", linkLabel: "" })} className="inline-flex items-center gap-2 rounded-lg border border-blue-300 px-3 py-2 text-sm font-semibold text-blue-700"><FaPlus /> Add Card</button>
        </Section>

        <Section title="Welcome Section" description="Main introduction area with two images.">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Badge" value={config.welcome.badge} onChange={(value) => setField("welcome.badge", value)} />
            <Field label="Heading" value={config.welcome.heading} onChange={(value) => setField("welcome.heading", value)} />
            <TextareaField label="Paragraph 1" value={config.welcome.para1} onChange={(value) => setField("welcome.para1", value)} />
            <TextareaField label="Paragraph 2" value={config.welcome.para2} onChange={(value) => setField("welcome.para2", value)} />
            <Field label="CTA Label" value={config.welcome.ctaLabel} onChange={(value) => setField("welcome.ctaLabel", value)} />
            <Field label="CTA Link" value={config.welcome.ctaLink} onChange={(value) => setField("welcome.ctaLink", value)} />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="block rounded-lg border border-gray-200 p-3 md:col-span-2">
              <span className="mb-1 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-gray-500">
                Upload Main Images (Carousel)
                {uploadingPaths["welcome.imageUrls"] ? <span className="text-blue-600 normal-case">Uploading...</span> : null}
              </span>
              <input type="file" multiple accept="image/*" onChange={(event) => uploadMultipleImages("welcome.imageUrls", event.target.files)} className="mb-2 w-full text-xs" />
              {config.welcome.imageUrls && config.welcome.imageUrls.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-2">
                  {config.welcome.imageUrls.map((imgUrl, i) => (
                    <div key={i} className="relative group">
                      <img src={resolveUploadedAssetUrl(imgUrl)} alt="carousel" className="h-20 w-32 rounded border object-cover" />
                      <button 
                        type="button" 
                        onClick={() => removeArrayItem("welcome.imageUrls", i)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400">No carousel images uploaded yet.</p>
              )}
            </label>
          </div>
        </Section>

        <Section title="Why Choose Us" description="Three highlight cards with image, text, and link.">
          <div className="grid gap-3 md:grid-cols-3">
            <Field label="Badge" value={config.whyChooseUs.badge} onChange={(value) => setField("whyChooseUs.badge", value)} />
            <Field label="Heading" value={config.whyChooseUs.heading} onChange={(value) => setField("whyChooseUs.heading", value)} />
            <Field label="Description" value={config.whyChooseUs.description} onChange={(value) => setField("whyChooseUs.description", value)} />
          </div>
          <div className="space-y-3">
            {whyChooseItems.map((item, index) => {
              const basePath = `whyChooseUs.items[${index}]`;
              const imagePath = `${basePath}.imageUrl`;
              const imageValue = getAtPath(config, imagePath);
              return (
                <div key={`${item?.title || "why"}-${index}`} className="rounded-lg border border-gray-200 p-3">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-800">Card {index + 1}</p>
                    <div className="flex items-center gap-1">
                      <button type="button" onClick={() => moveArrayItem("whyChooseUs.items", index, -1)} className="rounded border px-2 py-1 text-xs" disabled={index === 0}><FaArrowUp /></button>
                      <button type="button" onClick={() => moveArrayItem("whyChooseUs.items", index, 1)} className="rounded border px-2 py-1 text-xs" disabled={index === whyChooseItems.length - 1}><FaArrowDown /></button>
                      <button type="button" onClick={() => removeArrayItem("whyChooseUs.items", index)} className="rounded border border-red-300 px-2 py-1 text-xs text-red-600"><FaTrash /></button>
                    </div>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <Field label="Title" value={item?.title || ""} onChange={(value) => setField(`${basePath}.title`, value)} />
                    <Field label="Link" value={item?.link || ""} onChange={(value) => setField(`${basePath}.link`, value)} />
                    <TextareaField label="Text" value={item?.text || ""} onChange={(value) => setField(`${basePath}.text`, value)} />
                    <Field label="Image URL" value={imageValue || ""} onChange={(value) => setField(imagePath, value)} />
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <input type="file" accept="image/*" onChange={(event) => uploadImage(imagePath, event.target.files?.[0])} className="text-xs" />
                    {uploadingPaths[imagePath] ? <span className="text-xs text-blue-600">Uploading...</span> : null}
                    {imageValue ? <img src={resolveUploadedAssetUrl(imageValue)} alt="why" className="ml-auto h-12 w-20 rounded border object-cover" /> : null}
                  </div>
                </div>
              );
            })}
          </div>
          <button type="button" onClick={() => addArrayItem("whyChooseUs.items", { title: "", text: "", imageUrl: "", link: "" })} className="inline-flex items-center gap-2 rounded-lg border border-blue-300 px-3 py-2 text-sm font-semibold text-blue-700"><FaPlus /> Add Card</button>
        </Section>

        <Section title="Stats" description="Numbers section heading and stat items.">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Heading" value={config.stats.heading} onChange={(value) => setField("stats.heading", value)} />
            <Field label="Description" value={config.stats.description} onChange={(value) => setField("stats.description", value)} />
          </div>
          <div className="space-y-3">
            {statsItems.map((item, index) => {
              const basePath = `stats.items[${index}]`;
              return (
                <div key={`${item?.label || "stat"}-${index}`} className="flex flex-wrap items-end gap-2 rounded-lg border border-gray-200 p-3">
                  <div className="flex-1 min-w-[160px]"><Field label="Number" value={item?.number || ""} onChange={(value) => setField(`${basePath}.number`, value)} /></div>
                  <div className="flex-1 min-w-[180px]"><Field label="Label" value={item?.label || ""} onChange={(value) => setField(`${basePath}.label`, value)} /></div>
                  <button type="button" onClick={() => moveArrayItem("stats.items", index, -1)} className="rounded border px-2 py-2 text-xs" disabled={index === 0}><FaArrowUp /></button>
                  <button type="button" onClick={() => moveArrayItem("stats.items", index, 1)} className="rounded border px-2 py-2 text-xs" disabled={index === statsItems.length - 1}><FaArrowDown /></button>
                  <button type="button" onClick={() => removeArrayItem("stats.items", index)} className="rounded border border-red-300 px-2 py-2 text-xs text-red-600"><FaTrash /></button>
                </div>
              );
            })}
          </div>
          <button type="button" onClick={() => addArrayItem("stats.items", { number: "", label: "" })} className="inline-flex items-center gap-2 rounded-lg border border-blue-300 px-3 py-2 text-sm font-semibold text-blue-700"><FaPlus /> Add Stat</button>
        </Section>

        <Section title="News and Events" description="Section labels, links, and visible counts.">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="News Title" value={config.newsEvents.newsTitle} onChange={(value) => setField("newsEvents.newsTitle", value)} />
            <Field label="News Link Label" value={config.newsEvents.newsLinkLabel} onChange={(value) => setField("newsEvents.newsLinkLabel", value)} />
            <Field label="News Link" value={config.newsEvents.newsLink} onChange={(value) => setField("newsEvents.newsLink", value)} />
            <Field label="News Count" type="number" value={config.newsEvents.newsCount} onChange={(value) => setField("newsEvents.newsCount", Number(value) || 1)} />
            <Field label="Events Title" value={config.newsEvents.eventsTitle} onChange={(value) => setField("newsEvents.eventsTitle", value)} />
            <Field label="Events Link Label" value={config.newsEvents.eventsLinkLabel} onChange={(value) => setField("newsEvents.eventsLinkLabel", value)} />
            <Field label="Events Link" value={config.newsEvents.eventsLink} onChange={(value) => setField("newsEvents.eventsLink", value)} />
            <Field label="Events Count" type="number" value={config.newsEvents.eventsCount} onChange={(value) => setField("newsEvents.eventsCount", Number(value) || 1)} />
          </div>
        </Section>

        <Section title="Student Corner" description="Tabs in the Student's Corner panel.">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Eyebrow" value={config.studentCorner.eyebrow} onChange={(value) => setField("studentCorner.eyebrow", value)} />
            <Field label="Heading" value={config.studentCorner.heading} onChange={(value) => setField("studentCorner.heading", value)} />
          </div>
          <div className="space-y-3">
            {studentCornerItems.map((item, index) => {
              const basePath = `studentCorner.items[${index}]`;
              const imagePath = `${basePath}.imageUrl`;
              const imageValue = getAtPath(config, imagePath);
              return (
                <div key={`${item?.id || "student"}-${index}`} className="rounded-lg border border-gray-200 p-3">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-800">Item {index + 1}</p>
                    <div className="flex items-center gap-1">
                      <button type="button" onClick={() => moveArrayItem("studentCorner.items", index, -1)} className="rounded border px-2 py-1 text-xs" disabled={index === 0}><FaArrowUp /></button>
                      <button type="button" onClick={() => moveArrayItem("studentCorner.items", index, 1)} className="rounded border px-2 py-1 text-xs" disabled={index === studentCornerItems.length - 1}><FaArrowDown /></button>
                      <button type="button" onClick={() => removeArrayItem("studentCorner.items", index)} className="rounded border border-red-300 px-2 py-1 text-xs text-red-600"><FaTrash /></button>
                    </div>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <Field label="ID" value={item?.id || ""} onChange={(value) => setField(`${basePath}.id`, value)} />
                    <Field label="Title" value={item?.title || ""} onChange={(value) => setField(`${basePath}.title`, value)} />
                    <TextareaField label="Text" value={item?.text || ""} onChange={(value) => setField(`${basePath}.text`, value)} />
                    <Field label="Image URL" value={imageValue || ""} onChange={(value) => setField(imagePath, value)} />
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <input type="file" accept="image/*" onChange={(event) => uploadImage(imagePath, event.target.files?.[0])} className="text-xs" />
                    {uploadingPaths[imagePath] ? <span className="text-xs text-blue-600">Uploading...</span> : null}
                    {imageValue ? <img src={resolveUploadedAssetUrl(imageValue)} alt="student" className="ml-auto h-12 w-20 rounded border object-cover" /> : null}
                  </div>
                </div>
              );
            })}
          </div>
          <button type="button" onClick={() => addArrayItem("studentCorner.items", { id: "", title: "", text: "", imageUrl: "" })} className="inline-flex items-center gap-2 rounded-lg border border-blue-300 px-3 py-2 text-sm font-semibold text-blue-700"><FaPlus /> Add Student Item</button>
        </Section>

        <Section title="Leadership Header" description="Heading and CTA above faculty carousel.">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Eyebrow" value={config.leadership.eyebrow} onChange={(value) => setField("leadership.eyebrow", value)} />
            <Field label="Heading" value={config.leadership.heading} onChange={(value) => setField("leadership.heading", value)} />
            <TextareaField label="Description" value={config.leadership.description} onChange={(value) => setField("leadership.description", value)} />
            <Field label="CTA Label" value={config.leadership.ctaLabel} onChange={(value) => setField("leadership.ctaLabel", value)} />
            <Field label="CTA Link" value={config.leadership.ctaLink} onChange={(value) => setField("leadership.ctaLink", value)} />
          </div>
        </Section>

        <Section title="Leadership Cards" description="People shown in the leadership carousel.">
          <div className="space-y-3">
            {leadershipCards.map((card, index) => {
              const basePath = `leadershipCards[${index}]`;
              const imagePath = `${basePath}.imageUrl`;
              const imageValue = getAtPath(config, imagePath);
              return (
                <div key={`${card?.id || "lead"}-${index}`} className="rounded-lg border border-gray-200 p-3">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-800">Card {index + 1}</p>
                    <div className="flex items-center gap-1">
                      <button type="button" onClick={() => moveArrayItem("leadershipCards", index, -1)} className="rounded border px-2 py-1 text-xs" disabled={index === 0}><FaArrowUp /></button>
                      <button type="button" onClick={() => moveArrayItem("leadershipCards", index, 1)} className="rounded border px-2 py-1 text-xs" disabled={index === leadershipCards.length - 1}><FaArrowDown /></button>
                      <button type="button" onClick={() => removeArrayItem("leadershipCards", index)} className="rounded border border-red-300 px-2 py-1 text-xs text-red-600"><FaTrash /></button>
                    </div>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <Field label="ID" value={card?.id || ""} onChange={(value) => setField(`${basePath}.id`, value)} />
                    <Field label="Name" value={card?.name || ""} onChange={(value) => setField(`${basePath}.name`, value)} />
                    <Field label="Designation" value={card?.designation || ""} onChange={(value) => setField(`${basePath}.designation`, value)} />
                    <Field label="Department" value={card?.department || ""} onChange={(value) => setField(`${basePath}.department`, value)} />
                    <Field label="Email" value={card?.email || ""} onChange={(value) => setField(`${basePath}.email`, value)} />
                    <Field label="Profile Link" value={card?.link || ""} onChange={(value) => setField(`${basePath}.link`, value)} />
                    <Field label="Accent Class" value={card?.accentClass || ""} onChange={(value) => setField(`${basePath}.accentClass`, value)} />
                    <Field label="Image URL" value={imageValue || ""} onChange={(value) => setField(imagePath, value)} />
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <input type="file" accept="image/*" onChange={(event) => uploadImage(imagePath, event.target.files?.[0])} className="text-xs" />
                    {uploadingPaths[imagePath] ? <span className="text-xs text-blue-600">Uploading...</span> : null}
                    {imageValue ? <img src={resolveUploadedAssetUrl(imageValue)} alt="leadership" className="ml-auto h-12 w-20 rounded border object-cover" /> : null}
                  </div>
                </div>
              );
            })}
          </div>
          <button type="button" onClick={() => addArrayItem("leadershipCards", { id: "", name: "", designation: "", department: "", email: "", imageUrl: "", accentClass: "bg-gray-200", link: "/faculty" })} className="inline-flex items-center gap-2 rounded-lg border border-blue-300 px-3 py-2 text-sm font-semibold text-blue-700"><FaPlus /> Add Leadership Card</button>
        </Section>

        <Section title="Recruiters and Alumni Text" description="Headings only. Logo and alumni details are managed in dedicated modules.">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Alumni Eyebrow" value={config.alumni.eyebrow} onChange={(value) => setField("alumni.eyebrow", value)} />
            <Field label="Alumni Heading" value={config.alumni.heading} onChange={(value) => setField("alumni.heading", value)} />
            <Field label="Recruiters Eyebrow" value={config.recruiters.eyebrow} onChange={(value) => setField("recruiters.eyebrow", value)} />
            <Field label="Recruiters Heading" value={config.recruiters.heading} onChange={(value) => setField("recruiters.heading", value)} />
            <TextareaField label="Recruiters Description" value={config.recruiters.description} onChange={(value) => setField("recruiters.description", value)} />
          </div>
        </Section>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
          <p className="font-semibold">How this saves</p>
          <p className="mt-1">
            {"This form writes into home-config > content.config of the home page, using the same CMS storage already consumed by the public homepage."}
          </p>
        </div>

        <div className="sticky bottom-4 z-20">
          <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
            <p className="text-sm font-medium text-gray-700">
              {dirty
                ? "You have unsaved homepage changes."
                : "No unsaved changes."}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={resetChanges}
                disabled={!dirty || saving}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={saveConfig}
                disabled={saving || !dirty}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
              >
                <FaSave /> {saving ? "Saving..." : "Save Homepage"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminHomepageEditor;
