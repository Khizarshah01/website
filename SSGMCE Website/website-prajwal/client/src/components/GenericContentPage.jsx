import React, { useEffect, useState, useMemo, useRef } from "react";
import apiClient from "../utils/apiClient";
import GenericPage from "./GenericPage";
import PlacementSidebar from "./PlacementSidebar";
import AcademicsSidebar from "./AcademicsSidebar";
import IQACSidebar from "./IQACSidebar";
import AdmissionsSidebar from "./AdmissionsSidebar";
import FacilitiesSidebar from "./FacilitiesSidebar";
import LibrarySidebar from "./LibrarySidebar";
import HostelSidebar from "./HostelSidebar";
import SportsSidebar from "./SportsSidebar";
import OtherFacilitiesSidebar from "./OtherFacilitiesSidebar";
import ComputingSidebar from "./ComputingSidebar";
import ResearchSidebar from "./ResearchSidebar";
import DocumentsSidebar from "./DocumentsSidebar";
import AboutSidebar from "./AboutSidebar";
import EditableText from "./admin/EditableText";
import EditableImage from "./admin/EditableImage";
import EditableSection from "./admin/EditableSection";
import MarkdownEditor from "./admin/MarkdownEditor";
import { useEdit } from "../contexts/EditContext";
import {
  getErrorMessage,
  isNotFoundError,
  logUnexpectedError,
} from "../utils/apiErrors";
import {
  FaGraduationCap,
  FaHandshake,
  FaChartLine,
  FaHeart,
  FaQuoteLeft,
  FaQuoteRight,
} from "react-icons/fa";
import principalFallbackImage from "../assets/images/about/principal_c.png";
import inspirationFallbackImage from "../assets/images/about/chairman_c.jpeg";
import campusViewImage from "../assets/images/home/Campus-View.avif";

// Map pageId prefixes to their sidebar components
const SIDEBAR_MAP = {
  "placements-": PlacementSidebar,
  "academics-": AcademicsSidebar,
  "iqac-": IQACSidebar,
  "admissions-": AdmissionsSidebar,
  "facilities-library": LibrarySidebar,
  "facilities-hostels": HostelSidebar,
  "facilities-hostel-": HostelSidebar,
  "facilities-sports": SportsSidebar,
  "facilities-other": OtherFacilitiesSidebar,
  "facilities-computing": ComputingSidebar,
  "facilities-": FacilitiesSidebar,
  "research-": ResearchSidebar,
  "documents-": DocumentsSidebar,
  "about-": AboutSidebar,
};

const PAGE_CACHE_TTL_MS = 5 * 60 * 1000;
const pageDataCache = new Map();
const pageRequestCache = new Map();

const PREFETCH_GROUPS = {
  "about-": [
    "about-at-glance",
    "about-vision",
    "about-inspiration",
    "about-principal",
    "about-structure",
    "about-governing",
    "about-directors",
    "about-committees",
    "contact-us",
  ],
  "facilities-": [
    "facilities-administrative-office",
    "facilities-library",
    "facilities-library-about",
    "facilities-library-rules",
    "facilities-library-hours",
    "facilities-library-services",
    "facilities-library-facilities",
    "facilities-library-nptel",
    "facilities-library-nptel-faculty",
    "facilities-library-nptel-students",
    "facilities-library-coursera",
    "facilities-library-books",
    "facilities-library-staff",
    "facilities-computing",
    "facilities-hostels",
    "facilities-hostel-policy",
    "facilities-hostel-committee",
    "facilities-hostel-brochure",
    "facilities-hostel-anti-ragging",
    "facilities-hostel-minutes",
    "facilities-hostel-reports",
    "facilities-hostel-posters",
    "facilities-hostel-aicte",
    "facilities-hostel-notices",
    "facilities-hostel-fees",
    "facilities-hostel-accommodation",
    "facilities-hostel-admission",
    "facilities-hostel-feedback",
    "facilities-sports",
    "facilities-sports-about",
    "facilities-sports-council",
    "facilities-sports-indoor",
    "facilities-sports-outdoor",
    "facilities-sports-achievements",
    "facilities-sports-statistics",
    "facilities-sports-staff",
    "facilities-other",
  ],
};

const getStorageCacheKey = (pageId) =>
  `ssgmce-page-cache:${String(pageId || "").toLowerCase()}`;

const getCachedPageData = (pageId) => {
  const normalizedPageId = String(pageId || "").toLowerCase();
  if (!normalizedPageId) return null;

  const cached = pageDataCache.get(normalizedPageId);
  if (!cached) return null;

  if (Date.now() - cached.timestamp > PAGE_CACHE_TTL_MS) {
    pageDataCache.delete(normalizedPageId);
    return null;
  }

  return cached.data;
};

const setCachedPageData = (pageId, data) => {
  const normalizedPageId = String(pageId || "").toLowerCase();
  if (!normalizedPageId || !data) return;

  const entry = {
    data,
    timestamp: Date.now(),
  };
  pageDataCache.set(normalizedPageId, entry);

  try {
    sessionStorage.setItem(
      getStorageCacheKey(normalizedPageId),
      JSON.stringify(entry),
    );
  } catch {
    // Ignore storage quota/unavailable errors to avoid breaking page rendering.
  }
};

const readSessionCachedPageData = (pageId) => {
  const normalizedPageId = String(pageId || "").toLowerCase();
  if (!normalizedPageId) return null;

  try {
    const raw = sessionStorage.getItem(getStorageCacheKey(normalizedPageId));
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed?.timestamp || !parsed?.data) return null;

    if (Date.now() - parsed.timestamp > PAGE_CACHE_TTL_MS) {
      sessionStorage.removeItem(getStorageCacheKey(normalizedPageId));
      return null;
    }

    pageDataCache.set(normalizedPageId, parsed);
    return parsed.data;
  } catch {
    return null;
  }
};

const fetchPageById = async (pageId) => {
  const normalizedPageId = String(pageId || "").toLowerCase();
  if (!normalizedPageId) {
    throw new Error("Invalid page id");
  }

  if (pageRequestCache.has(normalizedPageId)) {
    return pageRequestCache.get(normalizedPageId);
  }

  const request = apiClient
    .get(`/pages/${normalizedPageId}`)
    .then((res) => {
      if (!res?.data?.success) {
        throw new Error(res?.data?.message || "Page not found");
      }
      return res.data.data;
    })
    .finally(() => {
      pageRequestCache.delete(normalizedPageId);
    });

  pageRequestCache.set(normalizedPageId, request);
  return request;
};

const getNeighborPrefetchIds = (pageId) => {
  const normalizedPageId = String(pageId || "").toLowerCase();
  const group = Object.entries(PREFETCH_GROUPS).find(([prefix]) =>
    normalizedPageId.startsWith(prefix),
  )?.[1];
  if (!group?.length) return [];

  const currentIdx = group.indexOf(normalizedPageId);
  if (currentIdx === -1) {
    return group.slice(0, 6);
  }

  const neighbors = [];
  for (let i = 1; i <= 4; i++) {
    if (group[currentIdx + i]) neighbors.push(group[currentIdx + i]);
  }
  for (let i = 1; i <= 2; i++) {
    if (group[currentIdx - i]) neighbors.push(group[currentIdx - i]);
  }
  return neighbors;
};

/* ─── IQAC Accordion helper ─── */
const IQACAccordion = ({
  items,
  defaultOpen,
  renderHeader,
  renderContent,
  getKey,
}) => {
  const [expanded, setExpanded] = useState(defaultOpen);
  return (
    <div className="space-y-2">
      {items.map((item) => {
        const key = getKey(item);
        const isOpen = expanded === key;
        return (
          <div
            key={key}
            className="border border-gray-100 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setExpanded(isOpen ? null : key)}
              className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${isOpen ? "bg-ssgmce-blue/5" : "hover:bg-gray-50"}`}
            >
              {renderHeader(item, isOpen)}
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isOpen && (
              <div className="px-4 pb-3 pt-1">{renderContent(item)}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

/* ─── Video Gallery helper ─── */
const VideoGallery = ({ videos, channelUrl }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [playingId, setPlayingId] = useState(null);
  const categories = [...new Set(videos.map((v) => v.category))];
  const filtered =
    activeCategory === "All"
      ? videos
      : videos.filter((v) => v.category === activeCategory);

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              activeCategory === cat
                ? "bg-ssgmce-blue text-white"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* Video Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map((video) => (
          <div
            key={video.youtubeId}
            className="border border-gray-100 rounded-lg overflow-hidden group"
          >
            <div className="relative aspect-video bg-gray-100">
              {playingId === video.youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                  title={video.title}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : (
                <button
                  onClick={() => setPlayingId(video.youtubeId)}
                  className="absolute inset-0 w-full h-full cursor-pointer"
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-ssgmce-blue ml-0.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </button>
              )}
            </div>
            <div className="p-3">
              <span className="text-[10px] font-medium text-ssgmce-orange bg-ssgmce-orange/10 px-1.5 py-0.5 rounded">
                {video.category}
              </span>
              <p className="text-sm text-gray-700 font-medium mt-1 leading-snug">
                {video.title}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Channel Link */}
      {channelUrl && (
        <div className="text-center mt-6">
          <a
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-ssgmce-blue/20 text-sm font-medium text-ssgmce-blue hover:bg-ssgmce-blue/5 transition-colors"
          >
            View More on YouTube ↗
          </a>
        </div>
      )}
    </div>
  );
};

const IMAGE_PROBE_TIMEOUT_MS = 3500;

const ImageWithFallback = ({ src, fallbackSrc, alt, className }) => {
  const safeFallback = fallbackSrc || src || "";
  const [currentSrc, setCurrentSrc] = useState(safeFallback);

  useEffect(() => {
    let isCancelled = false;
    setCurrentSrc(safeFallback);

    if (!src) return undefined;

    const probe = new Image();
    const timeoutId = setTimeout(() => {
      if (!isCancelled) {
        setCurrentSrc(safeFallback);
      }
    }, IMAGE_PROBE_TIMEOUT_MS);

    probe.onload = () => {
      if (isCancelled) return;
      clearTimeout(timeoutId);
      setCurrentSrc(src);
    };

    probe.onerror = () => {
      if (isCancelled) return;
      clearTimeout(timeoutId);
      setCurrentSrc(safeFallback);
    };

    probe.src = src;

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [src, safeFallback]);

  return (
    <img
      src={currentSrc || safeFallback}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setCurrentSrc(safeFallback)}
    />
  );
};

const GenericContentPage = ({ pageId }) => {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const lastAutoScrolledPageRef = useRef(null);
  const [isPrincipalMessageExpanded, setIsPrincipalMessageExpanded] =
    useState(false);
  const [isGlanceIntroExpanded, setIsGlanceIntroExpanded] = useState(false);
  const { isEditing, data, updateData, addSection } = useEdit(); // Use data from context if editing
  const hasEditSections = Boolean(isEditing && Array.isArray(data?.sections));

  // Use live data from context if available/editing, otherwise fetched page
  const displayPage = isEditing && data && data.sections ? data : page;
  const sections = Array.isArray(displayPage?.sections)
    ? displayPage.sections
    : [];
  const admissionsThemePages = useMemo(
    () =>
      new Set([
        "admissions-brochure",
        "admissions-ug",
        "admissions-pg",
        "admissions-dse",
        "admissions-mba",
        "admissions-phd",
        "admissions-fees",
      ]),
    [],
  );
  const isAdmissionsThemePage = admissionsThemePages.has(pageId);
  // About pages use the same visual treatment as generic pages (e.g. Placements).
  const isAboutThemePage = false;
  const isFacilitiesChildPage =
    pageId?.startsWith("facilities-") &&
    !pageId?.startsWith("facilities-admin-office-") &&
    pageId !== "facilities-administrative-office";

  useEffect(() => {
    // When rendered inside VisualPageEditor the data is already loaded into
    // EditContext — skip the redundant network request to avoid a double
    // fetch (and a double error in the console if the server is momentarily
    // unavailable).
    if (hasEditSections) {
      setLoading(false);
      return;
    }

    const normalizedPageId = String(pageId || "").toLowerCase();
    const memoryCached = normalizedPageId
      ? getCachedPageData(normalizedPageId)
      : null;
    const storageCached = normalizedPageId
      ? readSessionCachedPageData(normalizedPageId)
      : null;
    const cachedPage = memoryCached || storageCached;

    if (cachedPage) {
      setPage((prevPage) => {
        if (
          prevPage &&
          prevPage.pageId === cachedPage.pageId &&
          String(prevPage.updatedAt || "") ===
            String(cachedPage.updatedAt || "")
        ) {
          return prevPage;
        }
        return cachedPage;
      });
      setError(null);
      setLoading(false);
    }

    let isActive = true;

    const fetchPageData = async (backgroundRefresh = false) => {
      try {
        if (!backgroundRefresh) {
          setLoading(true);
        }
        const fetchedPage = await fetchPageById(normalizedPageId);
        if (!isActive) return;
        setPage((prevPage) => {
          if (
            prevPage &&
            prevPage.pageId === fetchedPage.pageId &&
            String(prevPage.updatedAt || "") ===
              String(fetchedPage.updatedAt || "")
          ) {
            return prevPage;
          }
          return fetchedPage;
        });
        setCachedPageData(normalizedPageId, fetchedPage);
        setError(null);
      } catch (err) {
        if (!isActive) return;
        logUnexpectedError("[GenericContentPage] Error:", err);
        if (!cachedPage) {
          setError(
            isNotFoundError(err) ? "Page not found" : getErrorMessage(err),
          );
        }
      } finally {
        if (!backgroundRefresh && isActive) {
          setLoading(false);
        }
      }
    };

    if (normalizedPageId) {
      fetchPageData(Boolean(cachedPage));
    }

    return () => {
      isActive = false;
    };
  }, [pageId, isEditing, hasEditSections]);

  // Prefetch nearest sibling pages in the same group to speed up next navigation.
  useEffect(() => {
    if (!pageId || isEditing) return;
    const prefetchIds = getNeighborPrefetchIds(pageId);
    if (!prefetchIds.length) return;

    let cancelled = false;
    const runPrefetch = async () => {
      for (const prefetchPageId of prefetchIds) {
        if (cancelled) return;
        if (getCachedPageData(prefetchPageId)) continue;
        try {
          const pageData = await fetchPageById(prefetchPageId);
          if (!cancelled) {
            setCachedPageData(prefetchPageId, pageData);
          }
        } catch {
          // Best-effort prefetch only.
        }
      }
    };

    const timer = setTimeout(runPrefetch, 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [pageId, isEditing]);

  useEffect(() => {
    setIsPrincipalMessageExpanded(false);
    setIsGlanceIntroExpanded(false);
  }, [pageId]);

  useEffect(() => {
    if (!isFacilitiesChildPage || loading || error || !displayPage) return;
    if (typeof window === "undefined") return;
    if (window.location.hash) return;
    if (lastAutoScrolledPageRef.current === pageId) return;

    const firstSection = document.querySelector(".page-section");
    if (!firstSection) return;

    // Keep section heading visible below sticky navbar.
    const headerOffset = 100;
    const targetTop =
      firstSection.getBoundingClientRect().top +
      window.pageYOffset -
      headerOffset;

    window.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });
    lastAutoScrolledPageRef.current = pageId;
  }, [displayPage, error, isFacilitiesChildPage, loading, pageId]);

  // Auto-select sidebar based on pageId prefix (longer prefixes checked first)
  const sidebar = useMemo(() => {
    if (!pageId) return null;
    const sortedPrefixes = Object.keys(SIDEBAR_MAP).sort(
      (a, b) => b.length - a.length,
    );
    for (const prefix of sortedPrefixes) {
      if (pageId.startsWith(prefix)) {
        const SidebarComponent = SIDEBAR_MAP[prefix];
        // Pass sections to sidebar to allow for in-page navigation (sub-menus)
        return <SidebarComponent sections={displayPage?.sections} />;
      }
    }
    return null;
  }, [pageId, displayPage]);

  const sortedSectionsWithIndex = useMemo(
    () =>
      sections
        .map((section, originalIndex) => ({ section, originalIndex }))
        .sort((a, b) => a.section.order - b.section.order),
    [sections],
  );

  const parsePrincipalCaption = (caption = "") => {
    const parts = String(caption || "")
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);

    return {
      name: parts[0] || "Dr. S. B. Somani",
      role: parts[1] || "Principal",
      org:
        parts.slice(2).join(", ") ||
        "Shri Sant Gajanan Maharaj College of Engineering, Shegaon",
    };
  };

  const parseInspirationCaption = (caption = "", alt = "") => {
    const source = String(caption || alt || "").trim();
    const name =
      source.split("(")[0].split("—")[0].split("-")[0].trim() ||
      "Late Shri. Shivshankarbhau Patil";

    const knownAsMatch = source.match(/\(([^)]+)\)/);
    const knownAs = knownAsMatch?.[1]?.trim() || "Popularly known as Bhausaheb";

    const roleMatch = source.match(/—\s*([^]+)$/);
    const role = roleMatch?.[1]?.trim() || "Founder & Visionary";

    return { name, knownAs, role };
  };

  const getSectionByPriority = (sectionIds = [], fallbackType = null) => {
    const normalizedIds = sectionIds.map((id) => String(id).toLowerCase());

    const byId = sortedSectionsWithIndex.find(({ section }) =>
      normalizedIds.includes(String(section?.sectionId || "").toLowerCase()),
    );
    if (byId) return byId;

    if (!fallbackType) return null;

    return (
      sortedSectionsWithIndex.find(
        ({ section }) =>
          String(section?.type || "").toLowerCase() === fallbackType,
      ) || null
    );
  };

  const getBestTextSection = (sectionIds = []) => {
    const normalizedIds = sectionIds.map((id) => String(id).toLowerCase());

    const byId = sortedSectionsWithIndex.find(({ section }) =>
      normalizedIds.includes(String(section?.sectionId || "").toLowerCase()),
    );
    if (byId) return byId;

    const textCandidates = sortedSectionsWithIndex.filter(({ section }) =>
      ["markdown", "richtext", "text"].includes(
        String(section?.type || "").toLowerCase(),
      ),
    );
    if (!textCandidates.length) return null;

    return textCandidates
      .map((candidate) => ({
        ...candidate,
        score: String(candidate?.section?.content?.text || "")
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim().length,
      }))
      .sort((a, b) => b.score - a.score)[0];
  };

  const normalizeAboutHeading = (id, pageTitle) => {
    const normalized = String(pageTitle || "").trim();
    if (id === "about-inspiration" && /^inspiration$/i.test(normalized)) {
      return "Our Inspiration";
    }
    if (
      id === "about-principal" &&
      /principal'?s?\s*message/i.test(normalized)
    ) {
      return "Principal Speaks";
    }
    return (
      normalized ||
      (id === "about-inspiration" ? "Our Inspiration" : "Principal Speaks")
    );
  };

  const parseFounderIdentityFromText = (text = "") => {
    const plainText = String(text || "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\*/g, "")
      .replace(/\s+/g, " ")
      .trim();

    if (!/shivshankarbhau\s+patil/i.test(plainText)) return null;

    return {
      name: "Late Shri. Shivshankarbhau Patil",
      knownAs: /known as bhausaheb/i.test(plainText)
        ? "Popularly known as Bhausaheb"
        : "Popularly known as Bhausaheb",
      role: "Founder & Visionary",
    };
  };

  const GOVERNING_TABLE_FALLBACK_MARKDOWN = `**Shri Sant Gajanan Maharaj College of Engineering, Shegaon**

Constituted By **All India Council for Technical Education, New Delhi**

| Sr.No. | Name of the persons on the Body | Category | Capacity on Body |
|--------|--------------------------------|----------|-----------------|
| 1 | Shri Nilkanth Shivshankar Patil | Chairman of Shri Gajanan Shikshan Sanstha | Chairman (Ex-officio) |
| 2 | Shri Kishor Trikamdas Tank | Shri Gajanan Shikshan Sanstha | Member |
| 3 | Shri Ashok Trimbakrao Deshmukh | Shri Gajanan Shikshan Sanstha | Member |
| 4 | Shri Jay Kishor Tank | Shri Gajanan Shikshan Sanstha | Member |
| 5 | Shri Ramkrushna Nilkanth Patil | Shri Gajanan Shikshan Sanstha | Member |
| 6 | Prof. Dr. A. M. Mahalle | Nominee of Sant Gadge Baba Amravati University, Amravati | Member |
| 7 | Dr. Vinod Mohitkar | Director of Technical Education (Nominee of the State Govt.) | Member (Ex-Officio) |
| 8 | Shri Vikas Chandra Rastogi | Nominated by the State Government | Member |
| 9 | Dr. Sunil Bhikamchand Somani | Principal / Head of the Institute | Member Secretary |
| 10 | Dr. Ram Shankarrao Dhekekar | Faculty member nominated from regular staff at the level of Professor | Member |
| 11 | Dr. Anjali Uday Jawadekar | Faculty member nominated from regular staff at the level of Associate Professor | Member |`;

  const stripMarkdownInline = (value = "") =>
    String(value || "")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/__([^_]+)__/g, "$1")
      .replace(/_([^_]+)_/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\\\|/g, "|")
      .replace(/\s+/g, " ")
      .trim();

  const parsePipeRow = (line = "") =>
    String(line || "")
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => stripMarkdownInline(cell));

  const parseFirstMarkdownTable = (text = "") => {
    const lines = String(text || "").split(/\r?\n/);
    const separatorRegex = /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/;

    let headerIndex = -1;
    let separatorIndex = -1;

    for (let i = 1; i < lines.length; i += 1) {
      if (separatorRegex.test(lines[i]) && lines[i - 1].includes("|")) {
        headerIndex = i - 1;
        separatorIndex = i;
        break;
      }
    }

    if (headerIndex < 0) return null;

    let rowEnd = separatorIndex + 1;
    while (
      rowEnd < lines.length &&
      lines[rowEnd].trim() &&
      lines[rowEnd].includes("|")
    ) {
      rowEnd += 1;
    }

    const headers = parsePipeRow(lines[headerIndex]);
    const rows = lines
      .slice(separatorIndex + 1, rowEnd)
      .map((rowLine) => parsePipeRow(rowLine))
      .filter((row) => row.length > 0)
      .map((row) => {
        if (row.length < headers.length) {
          return [...row, ...Array(headers.length - row.length).fill("")];
        }
        return row.slice(0, headers.length);
      });

    return {
      preTable: lines.slice(0, headerIndex).join("\n").trim(),
      postTable: lines.slice(rowEnd).join("\n").trim(),
      headers,
      rows,
    };
  };

  const parseQuickFactItemsFromMarkdown = (text = "") => {
    const parsedTable = parseFirstMarkdownTable(text);
    if (parsedTable?.rows?.length) {
      return parsedTable.rows
        .map((row) => ({
          label: stripMarkdownInline(row[0] || ""),
          value: stripMarkdownInline(row[1] || ""),
        }))
        .filter((item) => item.label && item.value);
    }

    const lines = String(text || "").split(/\r?\n/);
    return lines
      .map((line) =>
        line
          .trim()
          .replace(/^[-*+]\s+/, "")
          .replace(/^\d+\.\s+/, ""),
      )
      .map((line) => line.match(/^(.+?)\s*:\s*(.+)$/))
      .filter(Boolean)
      .map((match) => ({
        label: stripMarkdownInline(match?.[1] || ""),
        value: stripMarkdownInline(match?.[2] || ""),
      }))
      .filter((item) => item.label && item.value);
  };

  const toQuickFactsMarkdownTable = (items = []) => {
    const normalizedItems = (Array.isArray(items) ? items : [])
      .map((item) => ({
        label: String(item?.label || "")
          .replace(/\|/g, "\\|")
          .trim(),
        value: String(item?.value || "")
          .replace(/\|/g, "\\|")
          .trim(),
      }))
      .filter((item) => item.label && item.value);

    if (!normalizedItems.length) return "";

    return [
      "| Parameter | Details |",
      "|---|---|",
      ...normalizedItems.map((item) => `| ${item.label} | ${item.value} |`),
    ].join("\n");
  };

  const extractGoverningHeaderLines = (preTable = "") => {
    const baseLines = String(preTable || "")
      .split(/\r?\n/)
      .map((line) => stripMarkdownInline(line))
      .filter(Boolean);

    if (!baseLines.length) {
      return [
        "SHRI SANT GAJANAN MAHARAJ COLLEGE OF ENGINEERING, SHEGAON",
        "Constituted By",
        "ALL INDIA COUNCIL FOR TECHNICAL EDUCATION, NEW DELHI",
      ];
    }

    if (baseLines.length >= 3) return baseLines.slice(0, 3);

    if (baseLines.length === 2) {
      const match = baseLines[1].match(/^(Constituted By)\s*(.*)$/i);
      if (match) {
        return [
          baseLines[0],
          "Constituted By",
          match[2] || "ALL INDIA COUNCIL FOR TECHNICAL EDUCATION, NEW DELHI",
        ];
      }
      return [baseLines[0], "Constituted By", baseLines[1]];
    }

    return [
      baseLines[0],
      "Constituted By",
      "ALL INDIA COUNCIL FOR TECHNICAL EDUCATION, NEW DELHI",
    ];
  };

  const renderAboutGlancePage = () => {
    const glanceHeading = String(
      displayPage.pageTitle || "SSGMCE At A Glance",
    ).trim();
    const fallbackGlanceImage = campusViewImage;
    const usedSectionIndexes = new Set();

    const findSectionByIds = (ids = []) => {
      const normalizedIds = ids.map((id) => String(id || "").toLowerCase());
      return (
        sortedSectionsWithIndex.find(({ section }) =>
          normalizedIds.includes(
            String(section?.sectionId || "").toLowerCase(),
          ),
        ) || null
      );
    };

    const findSectionByTitle = (pattern) =>
      sortedSectionsWithIndex.find(({ section }) =>
        pattern.test(String(section?.title || "")),
      ) || null;

    const findSectionByType = (type) =>
      sortedSectionsWithIndex.find(
        ({ section }) => String(section?.type || "").toLowerCase() === type,
      ) || null;

    const introMeta =
      findSectionByIds(["about-ssgmce", "about-intro", "intro"]) ||
      findSectionByTitle(/about|glance|overview/i) ||
      getBestTextSection([]);

    const campusImageMeta =
      findSectionByIds(["campus-image", "campus-photo", "image"]) ||
      findSectionByTitle(/campus image|campus photo/i) ||
      findSectionByType("image");

    const quickStatsMeta =
      findSectionByIds(["quick-statistics", "quick-facts", "stats"]) ||
      findSectionByTitle(/quick\s*statistics|quick\s*facts/i) ||
      findSectionByType("stats");

    const infrastructureMeta =
      findSectionByIds(["infrastructure-highlights", "infrastructure"]) ||
      findSectionByTitle(/infrastructure/i);

    const journeyMeta =
      findSectionByIds(["our-journey", "history-milestones"]) ||
      findSectionByTitle(/journey|milestone|history/i);

    const recognitionsMeta =
      findSectionByIds(["recognitions-accreditations", "recognitions"]) ||
      findSectionByTitle(/recognition|accreditation/i);

    const placementMeta =
      findSectionByIds(["placements-overview", "placement-highlights"]) ||
      findSectionByTitle(/placement/i);

    const markUsed = (meta) => {
      if (meta?.originalIndex !== undefined) {
        usedSectionIndexes.add(meta.originalIndex);
      }
    };

    [
      introMeta,
      campusImageMeta,
      quickStatsMeta,
      infrastructureMeta,
      journeyMeta,
      recognitionsMeta,
      placementMeta,
    ].forEach(markUsed);

    const extractQuickStatItems = (meta) => {
      if (!meta?.section) return [];

      const section = meta.section;
      const markdownStats = parseQuickFactItemsFromMarkdown(
        section.content?.text || "",
      );
      if (markdownStats.length) {
        return markdownStats;
      }

      if (section.type === "stats" && Array.isArray(section.content?.stats)) {
        return section.content.stats
          .map((item) => ({
            label: String(item?.label || "").trim(),
            value: String(item?.value || "").trim(),
          }))
          .filter((item) => item.label && item.value);
      }

      return [];
    };

    const quickStatItems = extractQuickStatItems(quickStatsMeta);
    const quickFactsMarkdownValue =
      String(quickStatsMeta?.section?.content?.text || "").trim() ||
      toQuickFactsMarkdownTable(quickStatItems);

    const renderSectionContent = (meta) => {
      if (!meta?.section) return null;

      const section = meta.section;
      const pathPrefix = `sections[${meta.originalIndex}]`;

      if (section.type === "markdown") {
        return (
          <MarkdownEditor
            value={section.content?.text}
            path={`${pathPrefix}.content.text`}
            className="leading-7"
          />
        );
      }

      if (section.type === "richtext") {
        return (
          <EditableText
            value={section.content?.text}
            path={`${pathPrefix}.content.text`}
            richText={true}
            multiline={true}
          />
        );
      }

      if (section.type === "text") {
        return (
          <EditableText
            value={section.content?.text}
            path={`${pathPrefix}.content.text`}
            multiline={true}
          />
        );
      }

      if (section.type === "list") {
        const items = Array.isArray(section.content?.items)
          ? section.content.items
          : [];
        return (
          <ul className="space-y-2">
            {items.map((item, itemIdx) => (
              <li
                key={`${item}-${itemIdx}`}
                className="flex items-start gap-2 text-gray-700"
              >
                <span className="mt-2 inline-block h-2 w-2 rounded-full bg-ssgmce-orange flex-shrink-0" />
                <EditableText
                  value={item}
                  path={`${pathPrefix}.content.items[${itemIdx}]`}
                  element="span"
                />
              </li>
            ))}
          </ul>
        );
      }

      if (section.type === "cards" && Array.isArray(section.content?.cards)) {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {section.content.cards.map((card, cardIdx) => (
              <div
                key={`${card?.title || "card"}-${cardIdx}`}
                className="rounded-lg border border-gray-200 bg-white px-4 py-3"
              >
                <h4 className="font-semibold text-gray-900">{card?.title}</h4>
                {card?.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {card.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        );
      }

      if (
        section.type === "timeline" &&
        Array.isArray(section.content?.events)
      ) {
        return (
          <div className="relative border-l border-gray-300 ml-3 space-y-4">
            {section.content.events.map((event, eventIdx) => (
              <div
                key={`${event?.year || "event"}-${eventIdx}`}
                className="relative pl-6"
              >
                <span className="absolute -left-[6px] top-2 h-2.5 w-2.5 rounded-full bg-ssgmce-orange border border-white" />
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <p className="text-sm font-semibold text-ssgmce-blue">
                    {event?.year}
                  </p>
                  <p className="font-medium text-gray-800">{event?.title}</p>
                  {event?.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
      }

      if (section.type === "stats" && Array.isArray(section.content?.stats)) {
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {section.content.stats.map((item, statIdx) => (
              <div
                key={`${item?.label || "stat"}-${statIdx}`}
                className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3"
              >
                <p className="text-xl font-bold text-ssgmce-blue">
                  {item?.value}
                </p>
                <p className="text-sm text-gray-600 mt-1">{item?.label}</p>
              </div>
            ))}
          </div>
        );
      }

      return null;
    };

    const renderInfoBlock = (meta, fallbackTitle) => {
      if (!meta?.section) return null;
      return (
        <EditableSection
          index={meta.originalIndex}
          title={meta.section.type}
          sectionContent={meta.section.content}
          contentPath={`sections[${meta.originalIndex}].content`}
        >
          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-xl font-bold text-ssgmce-blue mb-3 pb-2 border-b border-gray-100">
              {meta.section.title || fallbackTitle}
            </h3>
            <div className="text-gray-700">{renderSectionContent(meta)}</div>
          </section>
        </EditableSection>
      );
    };

    const campusImageUrl = String(
      campusImageMeta?.section?.content?.url || "",
    ).trim();
    const campusImageAlt =
      campusImageMeta?.section?.content?.alt || "SSGMCE Campus";
    const campusCaption = campusImageMeta?.section?.content?.caption || "";
    const shouldForceCampusFallback =
      !campusImageUrl ||
      /chairman|principal|shivshankar|somani|chairman_c|principal_c/i.test(
        campusImageUrl,
      );
    const resolvedCampusImageUrl = shouldForceCampusFallback
      ? fallbackGlanceImage
      : campusImageUrl;
    const introTextLength = String(introMeta?.section?.content?.text || "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim().length;
    const shouldShowIntroReadMore = introTextLength > 520;

    const remainingSections = sortedSectionsWithIndex.filter(
      ({ originalIndex }) => !usedSectionIndexes.has(originalIndex),
    );

    return (
      <GenericPage
        title={displayPage.pageTitle}
        showInnerTitle={false}
        contentClassName="max-w-none text-gray-700"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {sidebar && (
            <div className="lg:w-1/4 flex-shrink-0">
              <div className="sticky top-24">{sidebar}</div>
            </div>
          )}

          <div className={sidebar ? "lg:w-3/4" : "w-full"}>
            <div className="mb-6 border-l-4 border-ssgmce-orange pl-4">
              <h2 className="text-3xl font-bold text-ssgmce-blue">
                {glanceHeading}
              </h2>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-6 items-stretch">
              <div className="xl:col-span-7">
                {introMeta && (
                  <EditableSection
                    index={introMeta.originalIndex}
                    title={introMeta.section.type}
                    sectionContent={introMeta.section.content}
                    contentPath={`sections[${introMeta.originalIndex}].content`}
                  >
                    <section className="h-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col">
                      <h3 className="text-2xl font-bold text-ssgmce-blue mb-4 pb-2 border-b border-gray-100">
                        {introMeta.section.title || "About SSGMCE"}
                      </h3>
                      <div
                        className={`prose max-w-none text-gray-700 leading-7 relative ${
                          shouldShowIntroReadMore && !isGlanceIntroExpanded
                            ? "max-h-[280px] overflow-hidden"
                            : ""
                        }`}
                      >
                        {renderSectionContent(introMeta)}
                        {shouldShowIntroReadMore && !isGlanceIntroExpanded && (
                          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/95 to-transparent" />
                        )}
                      </div>
                      {shouldShowIntroReadMore && (
                        <div className="mt-4">
                          <button
                            type="button"
                            onClick={() =>
                              setIsGlanceIntroExpanded((previous) => !previous)
                            }
                            className="inline-flex items-center rounded-md border border-ssgmce-blue/30 px-4 py-2 text-sm font-semibold text-ssgmce-blue transition-colors hover:bg-ssgmce-blue hover:text-white"
                          >
                            {isGlanceIntroExpanded ? "Read Less" : "Read More"}
                          </button>
                        </div>
                      )}
                    </section>
                  </EditableSection>
                )}
              </div>

              <div className="xl:col-span-5">
                {campusImageMeta ? (
                  <EditableSection
                    index={campusImageMeta.originalIndex}
                    title={campusImageMeta.section.type}
                    sectionContent={campusImageMeta.section.content}
                    contentPath={`sections[${campusImageMeta.originalIndex}].content`}
                  >
                    <section className="h-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                      <h3 className="text-xl font-bold text-ssgmce-blue mb-4 pb-2 border-b border-gray-100">
                        {campusImageMeta.section.title || "Campus Image"}
                      </h3>
                      {isEditing ? (
                        <EditableImage
                          src={resolvedCampusImageUrl}
                          onSave={(newUrl) =>
                            updateData(
                              `sections[${campusImageMeta.originalIndex}].content.url`,
                              newUrl,
                            )
                          }
                          className="w-full aspect-[16/10] rounded-lg object-cover border border-gray-100"
                          alt={campusImageAlt}
                        />
                      ) : campusImageUrl || resolvedCampusImageUrl ? (
                        <ImageWithFallback
                          src={resolvedCampusImageUrl}
                          fallbackSrc={fallbackGlanceImage}
                          alt={campusImageAlt}
                          className="w-full aspect-[16/10] rounded-lg object-cover border border-gray-100"
                        />
                      ) : (
                        <div className="w-full aspect-[16/10] rounded-lg border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-sm text-gray-500">
                          Campus image not available
                        </div>
                      )}
                      {isEditing ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                          <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                              Alt Text
                            </label>
                            <EditableText
                              value={campusImageAlt}
                              path={`sections[${campusImageMeta.originalIndex}].content.alt`}
                              className="mt-1 text-sm text-gray-700"
                              element="p"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                              Caption
                            </label>
                            <EditableText
                              value={campusCaption}
                              path={`sections[${campusImageMeta.originalIndex}].content.caption`}
                              className="mt-1 text-sm text-gray-700 italic"
                              element="p"
                            />
                          </div>
                        </div>
                      ) : campusCaption ? (
                        <p className="text-sm text-gray-500 italic text-center mt-3">
                          <EditableText
                            value={campusCaption}
                            path={`sections[${campusImageMeta.originalIndex}].content.caption`}
                            element="span"
                          />
                        </p>
                      ) : null}
                    </section>
                  </EditableSection>
                ) : (
                  <section className="h-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <h3 className="text-xl font-bold text-ssgmce-blue mb-4 pb-2 border-b border-gray-100">
                      Campus Image
                    </h3>
                    <ImageWithFallback
                      src={fallbackGlanceImage}
                      fallbackSrc={fallbackGlanceImage}
                      alt="SSGMCE Campus"
                      className="w-full aspect-[16/10] rounded-lg object-cover border border-gray-100"
                    />
                  </section>
                )}
              </div>
            </div>

            {quickStatsMeta && (
              <EditableSection
                index={quickStatsMeta.originalIndex}
                title={quickStatsMeta.section.type}
                sectionContent={quickStatsMeta.section.content}
                contentPath={`sections[${quickStatsMeta.originalIndex}].content`}
              >
                <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm mb-6">
                  <h3 className="text-xl font-bold text-ssgmce-blue mb-4 pb-2 border-b border-gray-100">
                    {quickStatsMeta.section.title || "Quick Statistics"}
                  </h3>
                  <MarkdownEditor
                    value={quickFactsMarkdownValue}
                    path={
                      isEditing
                        ? `sections[${quickStatsMeta.originalIndex}].content.text`
                        : undefined
                    }
                    className="leading-7"
                  />
                </section>
              </EditableSection>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
              {renderInfoBlock(infrastructureMeta, "Infrastructure Highlights")}
              {renderInfoBlock(
                recognitionsMeta,
                "Recognitions & Accreditations",
              )}
            </div>

            <div className="grid grid-cols-1 gap-6">
              {renderInfoBlock(journeyMeta, "Our Journey")}
              {renderInfoBlock(placementMeta, "Placement Highlights")}
            </div>

            {remainingSections.length > 0 && (
              <div className="space-y-6 mt-6">
                {remainingSections.map(({ section, originalIndex }) => (
                  <EditableSection
                    key={section.sectionId}
                    index={originalIndex}
                    title={section.type}
                    sectionContent={section.content}
                    contentPath={`sections[${originalIndex}].content`}
                  >
                    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                      {section.title ? (
                        <h3 className="text-xl font-bold text-ssgmce-blue mb-4 pb-2 border-b border-gray-100">
                          {section.title}
                        </h3>
                      ) : null}
                      <div className="text-gray-700">
                        {section.type === "markdown" ? (
                          <MarkdownEditor
                            value={section.content?.text}
                            path={`sections[${originalIndex}].content.text`}
                            className="leading-7"
                          />
                        ) : (
                          renderSectionContent({ section, originalIndex }) || (
                            <p className="text-sm text-gray-500">
                              This section type is not rendered in this layout
                              yet.
                            </p>
                          )
                        )}
                      </div>
                    </section>
                  </EditableSection>
                ))}
              </div>
            )}
          </div>
        </div>
      </GenericPage>
    );
  };

  const renderAboutVisionPage = () => {
    const visionHeading = String(
      displayPage.pageTitle || "Vision-Mission, Core Values & Goals",
    ).trim();

    const visionMeta =
      getSectionByPriority(["vision", "our-vision"], "markdown") ||
      getBestTextSection(["vision"]);
    const missionMeta =
      getSectionByPriority(["mission", "our-mission"], "markdown") || null;
    const coreValuesMeta =
      getSectionByPriority(["core-values", "values"], "markdown") || null;
    const goalsMeta =
      getSectionByPriority(["goals", "our-goals"], "markdown") || null;

    const usedSectionIndexes = new Set(
      [visionMeta, missionMeta, coreValuesMeta, goalsMeta]
        .filter(Boolean)
        .map((meta) => meta.originalIndex),
    );

    const remainingSections = sortedSectionsWithIndex.filter(
      ({ originalIndex }) => !usedSectionIndexes.has(originalIndex),
    );

    const renderVisionSectionBody = (meta, bodyClassName = "leading-7") => {
      if (!meta?.section) return null;
      const section = meta.section;
      const contentPath = `sections[${meta.originalIndex}].content`;

      if (section.type === "markdown") {
        return (
          <MarkdownEditor
            value={section.content?.text}
            path={`${contentPath}.text`}
            className={bodyClassName}
          />
        );
      }

      if (section.type === "richtext") {
        return (
          <EditableText
            value={section.content?.text}
            path={`${contentPath}.text`}
            richText={true}
            multiline={true}
          />
        );
      }

      if (section.type === "text") {
        return (
          <EditableText
            value={section.content?.text}
            path={`${contentPath}.text`}
            multiline={true}
          />
        );
      }

      if (section.type === "list") {
        const items = Array.isArray(section.content?.items)
          ? section.content.items
          : [];
        return (
          <ul className="space-y-3 text-gray-700">
            {items.map((item, itemIdx) => (
              <li key={`${item}-${itemIdx}`} className="flex gap-3">
                <span className="mt-2 inline-block h-2 w-2 rounded-full bg-ssgmce-orange flex-shrink-0" />
                <EditableText
                  value={item}
                  path={`${contentPath}.items[${itemIdx}]`}
                  element="span"
                />
              </li>
            ))}
          </ul>
        );
      }

      if (section.type === "cards") {
        const cards = Array.isArray(section.content?.cards)
          ? section.content.cards
          : [];
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cards.map((card, cardIdx) => (
              <div
                key={`${card?.title || "card"}-${cardIdx}`}
                className="rounded-lg border border-gray-200 bg-gray-50 p-4"
              >
                <h4 className="text-base font-semibold text-gray-900">
                  {card?.title}
                </h4>
                {card?.description ? (
                  <p className="text-sm text-gray-600 mt-1">
                    {card.description}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        );
      }

      return (
        <p className="text-sm text-gray-500">
          This section type is not rendered in this layout yet.
        </p>
      );
    };

    const renderVisionSectionCard = (
      meta,
      fallbackTitle,
      {
        sectionClassName = "",
        bodyClassName = "leading-7",
        headerClassName = "text-2xl font-bold text-ssgmce-blue",
      } = {},
    ) => {
      if (!meta?.section) return null;
      const section = meta.section;
      return (
        <EditableSection
          key={section.sectionId}
          index={meta.originalIndex}
          title={section.type}
          sectionContent={section.content}
          contentPath={`sections[${meta.originalIndex}].content`}
        >
          <section
            id={section.sectionId}
            className={`rounded-xl border border-gray-200 bg-white p-6 shadow-sm ${sectionClassName}`}
          >
            <h3
              className={`${headerClassName} mb-4 pb-2 border-b border-gray-100`}
            >
              {section.title || fallbackTitle}
            </h3>
            <div className="text-gray-700">
              {renderVisionSectionBody(meta, bodyClassName)}
            </div>
          </section>
        </EditableSection>
      );
    };

    return (
      <GenericPage
        title={displayPage.pageTitle}
        showInnerTitle={false}
        contentClassName="max-w-none text-gray-700"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {sidebar && (
            <div className="lg:w-1/4 flex-shrink-0">
              <div className="sticky top-24">{sidebar}</div>
            </div>
          )}

          <div className={sidebar ? "lg:w-3/4" : "w-full"}>
            <div className="mb-6 border-l-4 border-ssgmce-orange pl-4">
              <h2 className="text-3xl font-bold text-ssgmce-blue">
                {visionHeading}
              </h2>
            </div>

            <div>
              {renderVisionSectionCard(visionMeta, "Our Vision", {
                bodyClassName: "text-lg leading-8",
              })}
            </div>

            <div className="mt-6">
              {renderVisionSectionCard(missionMeta, "Our Mission", {
                bodyClassName: "leading-8",
              })}
            </div>

            <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
              {renderVisionSectionCard(coreValuesMeta, "Core Values", {
                sectionClassName: "h-full",
                bodyClassName: "leading-7",
              })}
              {renderVisionSectionCard(goalsMeta, "Our Goals", {
                sectionClassName: "h-full",
                bodyClassName: "leading-7",
              })}
            </div>

            {remainingSections.length > 0 && (
              <div className="space-y-6 mt-6">
                {remainingSections.map(({ section, originalIndex }) => (
                  <EditableSection
                    key={section.sectionId}
                    index={originalIndex}
                    title={section.type}
                    sectionContent={section.content}
                    contentPath={`sections[${originalIndex}].content`}
                  >
                    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                      {section.title ? (
                        <h3 className="text-xl font-bold text-ssgmce-blue mb-4 pb-2 border-b border-gray-100">
                          {section.title}
                        </h3>
                      ) : null}
                      <div className="text-gray-700">
                        {renderVisionSectionBody(
                          { section, originalIndex },
                          "leading-7",
                        )}
                      </div>
                    </section>
                  </EditableSection>
                ))}
              </div>
            )}
          </div>
        </div>
      </GenericPage>
    );
  };

  const renderAboutGoverningPage = () => {
    const governingHeading = String(
      displayPage.pageTitle || "Governing Body",
    ).trim();
    const governingMeta =
      getBestTextSection(["governing-intro", "governing-body", "intro"]) ||
      null;
    const governingText = String(governingMeta?.section?.content?.text || "");
    const parsedTableFromContent = parseFirstMarkdownTable(governingText);
    const parsedTable =
      parsedTableFromContent ||
      parseFirstMarkdownTable(GOVERNING_TABLE_FALLBACK_MARKDOWN);
    const headingLines = extractGoverningHeaderLines(
      parsedTable?.preTable || "",
    );
    const trailingParagraphs = String(parsedTableFromContent?.postTable || "")
      .split(/\n{2,}/)
      .map((paragraph) => stripMarkdownInline(paragraph))
      .filter(Boolean);

    return (
      <GenericPage
        title={displayPage.pageTitle}
        showInnerTitle={false}
        contentClassName="max-w-none text-gray-700"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {sidebar && (
            <div className="lg:w-1/4 flex-shrink-0">
              <div className="sticky top-24">{sidebar}</div>
            </div>
          )}

          <div className={sidebar ? "lg:w-3/4" : "w-full"}>
            <div className="mb-5 border-l-4 border-ssgmce-orange pl-4">
              <h3 className="text-3xl font-bold text-ssgmce-blue">
                {governingHeading}
              </h3>
            </div>

            {governingMeta && (
              <EditableSection
                index={governingMeta.originalIndex}
                title={governingMeta.section.type}
                sectionContent={governingMeta.section.content}
                contentPath={`sections[${governingMeta.originalIndex}].content`}
              >
                {isEditing || !parsedTable ? (
                  <MarkdownEditor
                    value={governingMeta.section.content.text}
                    path={`sections[${governingMeta.originalIndex}].content.text`}
                    className="leading-7"
                  />
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-2 text-center">
                      <p className="text-lg md:text-xl font-bold uppercase tracking-wide text-ssgmce-blue">
                        {headingLines[0]}
                      </p>
                      <p className="text-xl font-semibold text-gray-700">
                        {headingLines[1]}
                      </p>
                      <p className="text-lg md:text-xl font-bold uppercase tracking-wide text-ssgmce-blue">
                        {headingLines[2]}
                      </p>
                    </div>

                    <div className="overflow-x-auto border border-[#ff7d7d]">
                      <table className="w-full min-w-[780px] table-fixed border-collapse">
                        <colgroup>
                          <col style={{ width: "7%" }} />
                          <col style={{ width: "27%" }} />
                          <col style={{ width: "42%" }} />
                          <col style={{ width: "24%" }} />
                        </colgroup>
                        <thead className="bg-[#efe686]">
                          <tr>
                            {parsedTable.headers.map((header, index) => (
                              <th
                                key={`${header}-${index}`}
                                className="border border-[#ff7d7d] px-3 py-3 text-center text-[15px] font-semibold text-[#d93b3b] whitespace-normal break-words"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {parsedTable.rows.map((row, rowIndex) => (
                            <tr key={`governing-row-${rowIndex}`}>
                              {row.map((cell, cellIndex) => (
                                <td
                                  key={`governing-cell-${rowIndex}-${cellIndex}`}
                                  className={`border border-[#ff7d7d] px-4 py-3 text-[15px] leading-relaxed text-[#2f57d6] whitespace-normal break-words ${
                                    cellIndex === 0
                                      ? "text-center font-medium"
                                      : ""
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {trailingParagraphs.length > 0 && (
                      <div className="space-y-2">
                        {trailingParagraphs.map((paragraph, index) => (
                          <p
                            key={`governing-tail-${index}`}
                            className="text-gray-700 leading-relaxed"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </EditableSection>
            )}
          </div>
        </div>
      </GenericPage>
    );
  };

  const renderAboutPrincipalPage = () => {
    const principalHeading = normalizeAboutHeading(
      "about-principal",
      displayPage.pageTitle,
    );

    const principalImageMeta =
      getSectionByPriority(["principal-photo", "principal-image"], "image") ||
      null;

    const principalMessageMeta =
      getBestTextSection(["principal-message", "message"]) || null;

    const focusMeta =
      getSectionByPriority([
        "leadership-focus",
        "leadership-focus-areas",
        "focus-areas",
      ]) || null;

    const principalMessageText = String(
      principalMessageMeta?.section?.content?.text || "",
    );
    const principalMessageLength = principalMessageText
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim().length;
    const shouldShowPrincipalReadMore =
      !isEditing && principalMessageLength > 700;

    const principalImage = principalImageMeta?.section?.content?.url || "";
    const principalAlt =
      principalImageMeta?.section?.content?.alt || "Principal SSGMCE";
    const principalCaption = parsePrincipalCaption(
      principalImageMeta?.section?.content?.caption,
    );

    const focusCards = Array.isArray(focusMeta?.section?.content?.cards)
      ? focusMeta.section.content.cards
      : [];
    const focusMarkdownItems = String(focusMeta?.section?.content?.text || "")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => /^([-*]\s+|\d+\.\s+)/.test(line))
      .map((line) =>
        stripMarkdownInline(line.replace(/^([-*]\s+|\d+\.\s+)/, "")),
      )
      .filter(Boolean);
    const focusListItems = Array.isArray(focusMeta?.section?.content?.items)
      ? focusMeta.section.content.items
          .map((item) => stripMarkdownInline(item))
          .filter(Boolean)
      : [];

    const defaultHighlights = [
      "Quality Education Since 1983",
      "Industry-Academia Collaboration",
      "Excellent Placement Records",
      "Value-Based Education",
    ];

    const highlights =
      focusCards.length > 0
        ? focusCards.map((card) => card.title).filter(Boolean)
        : focusMarkdownItems.length > 0
          ? focusMarkdownItems
          : focusListItems.length > 0
            ? focusListItems
            : defaultHighlights;

    const highlightIcons = [FaGraduationCap, FaHandshake, FaChartLine, FaHeart];

    return (
      <GenericPage
        title={displayPage.pageTitle}
        showInnerTitle={false}
        contentClassName="max-w-none text-gray-700"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {sidebar && (
            <div className="lg:w-1/4 flex-shrink-0">
              <div className="sticky top-24">{sidebar}</div>
            </div>
          )}

          <div className={sidebar ? "lg:w-3/4" : "w-full"}>
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              <div className="xl:col-span-4">
                {principalImageMeta && (
                  <EditableSection
                    index={principalImageMeta.originalIndex}
                    title={principalImageMeta.section.type}
                    sectionContent={principalImageMeta.section.content}
                    contentPath={`sections[${principalImageMeta.originalIndex}].content`}
                  >
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                      {isEditing ? (
                        <EditableImage
                          path={`sections[${principalImageMeta.originalIndex}].content.url`}
                          className="w-full aspect-[4/5] object-cover rounded-xl border border-gray-100"
                          alt={principalAlt}
                        />
                      ) : (
                        <ImageWithFallback
                          src={principalImage}
                          fallbackSrc={principalFallbackImage}
                          alt={principalAlt}
                          className="w-full aspect-[4/5] object-cover rounded-xl border border-gray-100"
                        />
                      )}
                    </div>
                  </EditableSection>
                )}

                <div className="text-center mt-5">
                  <h3 className="text-2xl font-bold text-ssgmce-blue">
                    {principalCaption.name}
                  </h3>
                  <p className="text-ssgmce-orange font-semibold mt-1">
                    {principalCaption.role}
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    {principalCaption.org}
                  </p>
                </div>

                {focusMeta ? (
                  <EditableSection
                    index={focusMeta.originalIndex}
                    title={focusMeta.section.type}
                    sectionContent={focusMeta.section.content}
                    contentPath={`sections[${focusMeta.originalIndex}].content`}
                  >
                    <div className="mt-6">
                      {isEditing && focusMeta.section.type === "markdown" ? (
                        <div className="mb-4">
                          <MarkdownEditor
                            value={focusMeta.section.content?.text}
                            path={`sections[${focusMeta.originalIndex}].content.text`}
                            className="leading-7"
                          />
                        </div>
                      ) : null}

                      <div className="space-y-3">
                        {highlights.slice(0, 4).map((item, idx) => {
                          const Icon = highlightIcons[idx] || FaGraduationCap;
                          return (
                            <div
                              key={`${item}-${idx}`}
                              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3"
                            >
                              <Icon className="text-ssgmce-orange text-sm flex-shrink-0" />
                              <span className="text-sm font-medium text-gray-700">
                                {item}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </EditableSection>
                ) : (
                  <div className="space-y-3 mt-6">
                    {highlights.slice(0, 4).map((item, idx) => {
                      const Icon = highlightIcons[idx] || FaGraduationCap;
                      return (
                        <div
                          key={`${item}-${idx}`}
                          className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3"
                        >
                          <Icon className="text-ssgmce-orange text-sm flex-shrink-0" />
                          <span className="text-sm font-medium text-gray-700">
                            {item}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="xl:col-span-8">
                <div className="mb-5 border-l-4 border-ssgmce-orange pl-4">
                  <h3 className="text-3xl font-bold text-ssgmce-blue">
                    {principalHeading}
                  </h3>
                </div>

                <FaQuoteLeft className="text-3xl text-ssgmce-orange/30 mb-4" />

                {principalMessageMeta && (
                  <EditableSection
                    index={principalMessageMeta.originalIndex}
                    title={principalMessageMeta.section.type}
                    sectionContent={principalMessageMeta.section.content}
                    contentPath={`sections[${principalMessageMeta.originalIndex}].content`}
                  >
                    <div
                      className={`prose max-w-none text-gray-700 leading-relaxed relative ${
                        shouldShowPrincipalReadMore &&
                        !isPrincipalMessageExpanded
                          ? "max-h-[420px] overflow-hidden"
                          : ""
                      }`}
                    >
                      {principalMessageMeta.section.type === "markdown" ? (
                        <MarkdownEditor
                          value={principalMessageMeta.section.content.text}
                          path={`sections[${principalMessageMeta.originalIndex}].content.text`}
                          className="leading-7"
                        />
                      ) : (
                        <EditableText
                          value={principalMessageMeta.section.content.text}
                          path={`sections[${principalMessageMeta.originalIndex}].content.text`}
                          richText={true}
                          multiline={true}
                        />
                      )}
                      {shouldShowPrincipalReadMore &&
                        !isPrincipalMessageExpanded && (
                          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/95 to-transparent" />
                        )}
                    </div>
                  </EditableSection>
                )}

                {shouldShowPrincipalReadMore && (
                  <div className="mb-2">
                    <button
                      type="button"
                      onClick={() =>
                        setIsPrincipalMessageExpanded((previous) => !previous)
                      }
                      className="inline-flex items-center rounded-md border border-ssgmce-blue/30 px-4 py-2 text-sm font-semibold text-ssgmce-blue transition-colors hover:bg-ssgmce-blue hover:text-white"
                    >
                      {isPrincipalMessageExpanded ? "Read Less" : "Read More"}
                    </button>
                  </div>
                )}

                <FaQuoteRight className="text-3xl text-ssgmce-orange/30 mt-4 mb-4" />

                <div className="rounded-xl border-l-4 border-ssgmce-orange bg-orange-50/50 px-5 py-4 mb-4">
                  <p className="italic text-gray-800 font-medium">
                    I take this opportunity to extend my heartiest wishes to all
                    students to achieve success in their future endeavours.
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-2xl font-bold text-ssgmce-blue">
                    {principalCaption.name}
                  </p>
                  <p className="text-ssgmce-orange font-semibold">
                    {principalCaption.role}, SSGMCE, Shegaon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GenericPage>
    );
  };

  const renderAboutInspirationPage = () => {
    const inspirationHeading = normalizeAboutHeading(
      "about-inspiration",
      displayPage.pageTitle,
    );

    const founderImageMeta =
      getSectionByPriority(["founder-photo", "image"], "image") || null;

    const founderMessageMeta =
      getBestTextSection(["founder-message", "message", "intro"]) || null;

    const founderImage = founderImageMeta?.section?.content?.url || "";
    const founderAlt =
      founderImageMeta?.section?.content?.alt || "Our Inspiration";
    const founderCaption = parseInspirationCaption(
      founderImageMeta?.section?.content?.caption,
      founderAlt,
    );
    const founderFromMessage = parseFounderIdentityFromText(
      founderMessageMeta?.section?.content?.text,
    );
    const resolvedFounder =
      founderFromMessage && /sant gajanan maharaj/i.test(founderCaption.name)
        ? founderFromMessage
        : founderCaption;

    return (
      <GenericPage
        title={displayPage.pageTitle}
        showInnerTitle={false}
        contentClassName="max-w-none text-gray-700"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {sidebar && (
            <div className="lg:w-1/4 flex-shrink-0">
              <div className="sticky top-24">{sidebar}</div>
            </div>
          )}

          <div className={sidebar ? "lg:w-3/4" : "w-full"}>
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              <div className="xl:col-span-4">
                {founderImageMeta && (
                  <EditableSection
                    index={founderImageMeta.originalIndex}
                    title={founderImageMeta.section.type}
                    sectionContent={founderImageMeta.section.content}
                    contentPath={`sections[${founderImageMeta.originalIndex}].content`}
                  >
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3">
                      {isEditing ? (
                        <EditableImage
                          path={`sections[${founderImageMeta.originalIndex}].content.url`}
                          className="w-full aspect-[4/5] object-cover rounded-xl border border-gray-100"
                          alt={founderAlt}
                        />
                      ) : (
                        <ImageWithFallback
                          src={founderImage}
                          fallbackSrc={inspirationFallbackImage}
                          alt={founderAlt}
                          className="w-full aspect-[4/5] object-cover rounded-xl border border-gray-100"
                        />
                      )}
                    </div>
                  </EditableSection>
                )}

                <div className="text-center mt-5">
                  <h3 className="text-2xl md:text-3xl font-bold leading-tight text-ssgmce-blue">
                    {resolvedFounder.name}
                  </h3>
                  <p className="text-ssgmce-orange font-semibold mt-2">
                    {resolvedFounder.knownAs}
                  </p>
                  <p className="text-gray-500 text-xl mt-1">
                    {resolvedFounder.role}
                  </p>
                </div>
              </div>

              <div className="xl:col-span-8">
                <div className="mb-5 border-l-4 border-ssgmce-orange pl-4">
                  <h3 className="text-3xl font-bold text-ssgmce-blue">
                    {inspirationHeading}
                  </h3>
                </div>

                <FaQuoteLeft className="text-3xl text-ssgmce-orange/30 mb-4" />

                {founderMessageMeta && (
                  <EditableSection
                    index={founderMessageMeta.originalIndex}
                    title={founderMessageMeta.section.type}
                    sectionContent={founderMessageMeta.section.content}
                    contentPath={`sections[${founderMessageMeta.originalIndex}].content`}
                  >
                    <div className="prose max-w-none text-gray-700 leading-relaxed">
                      {founderMessageMeta.section.type === "markdown" ? (
                        <MarkdownEditor
                          value={founderMessageMeta.section.content.text}
                          path={`sections[${founderMessageMeta.originalIndex}].content.text`}
                          className="leading-8"
                        />
                      ) : (
                        <EditableText
                          value={founderMessageMeta.section.content.text}
                          path={`sections[${founderMessageMeta.originalIndex}].content.text`}
                          richText={true}
                          multiline={true}
                        />
                      )}
                    </div>
                  </EditableSection>
                )}

                <FaQuoteRight className="text-3xl text-ssgmce-orange/30 mt-3 mb-4" />
              </div>
            </div>
          </div>
        </div>
      </GenericPage>
    );
  };

  if (loading && !displayPage) {
    return (
      <GenericPage
        title="Loading..."
        sidebar={sidebar}
        variant={isAboutThemePage ? "about" : "default"}
      >
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ssgmce-orange"></div>
        </div>
      </GenericPage>
    );
  }

  if (error || !displayPage) {
    return (
      <GenericPage
        title="Page Not Found"
        sidebar={sidebar}
        variant={isAboutThemePage ? "about" : "default"}
      >
        <div className="text-center text-red-500 p-8">
          {error || "Content not available."}
        </div>
      </GenericPage>
    );
  }

  if (pageId === "about-principal") {
    return renderAboutPrincipalPage();
  }

  if (pageId === "about-inspiration") {
    return renderAboutInspirationPage();
  }

  if (pageId === "about-at-glance") {
    return renderAboutGlancePage();
  }

  if (pageId === "about-vision") {
    return renderAboutVisionPage();
  }

  if (pageId === "about-governing" || pageId === "about-governing-body") {
    return renderAboutGoverningPage();
  }

  return (
    <GenericPage
      title={displayPage.pageTitle}
      variant={isAboutThemePage ? "about" : "default"}
    >
      <div
        className={`flex flex-col lg:flex-row ${isAboutThemePage ? "gap-6 lg:gap-10" : "gap-8"} ${sidebar ? "" : "justify-center"}`}
      >
        {/* Sidebar */}
        {sidebar && (
          <div
            className={
              isAboutThemePage
                ? "lg:w-[300px] flex-shrink-0"
                : "lg:w-1/4 flex-shrink-0"
            }
          >
            <div className="sticky top-24">{sidebar}</div>
          </div>
        )}

        {/* Main Content */}
        <div className={sidebar ? "lg:w-3/4" : "w-full"}>
          {/* Page Title - Editable */}
          {isEditing ? (
            <div className="mb-4">
              <label className="text-xs text-gray-400">Page Title</label>
              <EditableText
                path="pageTitle"
                element="h1"
                className={
                  isAboutThemePage
                    ? "text-3xl font-semibold text-slate-900 border-b border-slate-200 pb-2 mb-4"
                    : "text-3xl font-bold text-gray-900 border-b pb-2 mb-4"
                }
              />
            </div>
          ) : null}

          <div
            className={
              isAdmissionsThemePage || isAboutThemePage
                ? "space-y-6"
                : "space-y-8"
            }
          >
            {sections
              .sort((a, b) => a.order - b.order)
              .map((section, index) => (
                <EditableSection
                  key={section.sectionId}
                  index={index}
                  title={section.type}
                  sectionContent={section.content}
                  contentPath={`sections[${index}].content`}
                >
                  <div
                    className={`page-section ${
                      isAdmissionsThemePage
                        ? "rounded-xl border border-gray-200 bg-white/95 p-5 shadow-sm"
                        : isAboutThemePage
                          ? "rounded-xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm"
                          : ""
                    }`}
                    id={section.sectionId}
                  >
                    {/* Section Title */}
                    {section.title &&
                      section.title !== "Intro" &&
                      section.title !== displayPage.pageTitle && (
                        <EditableText
                          value={section.title}
                          path={`sections[${index}].title`}
                          element="h3"
                          className={
                            isAdmissionsThemePage
                              ? "text-xl md:text-2xl font-semibold text-ssgmce-blue mb-4 pb-2 border-b border-gray-200"
                              : isAboutThemePage
                                ? "text-xl md:text-2xl font-semibold text-slate-900 mb-4 pb-3 border-b border-slate-200"
                                : "text-2xl font-bold text-ssgmce-orange mb-4 pb-2 border-b border-gray-200"
                          }
                        />
                      )}

                    {/* Text Section */}
                    {section.type === "text" && (
                      <div
                        className={`prose max-w-none text-gray-700 whitespace-pre-wrap ${
                          isAdmissionsThemePage || isAboutThemePage
                            ? "leading-7"
                            : ""
                        }`}
                      >
                        <EditableText
                          value={section.content.text}
                          path={`sections[${index}].content.text`}
                          multiline={true}
                        />
                      </div>
                    )}

                    {/* RichText Section - uses markdown editor for facilities pages, WYSIWYG elsewhere */}
                    {section.type === "richtext" &&
                      (pageId?.startsWith("facilities-") ? (
                        <MarkdownEditor
                          value={section.content.text}
                          path={`sections[${index}].content.text`}
                          className={
                            isAdmissionsThemePage || isAboutThemePage
                              ? "leading-7"
                              : ""
                          }
                        />
                      ) : (
                        <div
                          className={`prose max-w-none text-gray-700 ${
                            isAdmissionsThemePage || isAboutThemePage
                              ? "leading-7"
                              : ""
                          }`}
                        >
                          <EditableText
                            value={section.content.text}
                            path={`sections[${index}].content.text`}
                            richText={true}
                            multiline={true}
                          />
                        </div>
                      ))}

                    {/* Markdown Section - clean textarea editor with preview */}
                    {section.type === "markdown" && (
                      <MarkdownEditor
                        value={section.content.text}
                        path={`sections[${index}].content.text`}
                        className={
                          isAdmissionsThemePage || isAboutThemePage
                            ? "leading-7"
                            : ""
                        }
                      />
                    )}

                    {/* Stats Section */}
                    {section.type === "stats" && section.content.stats && (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {section.content.stats.map((stat, idx) => (
                          <div
                            key={idx}
                            className={`rounded-lg p-4 text-center ${
                              isAdmissionsThemePage
                                ? "bg-gray-50 border border-gray-200 shadow-sm"
                                : isAboutThemePage
                                  ? "bg-slate-50 border border-slate-200 shadow-sm"
                                  : `bg-white shadow border-t-4 ${stat.color === "orange" ? "border-ssgmce-orange" : "border-ssgmce-blue"}`
                            }`}
                          >
                            <div
                              className={`text-2xl font-bold ${stat.color === "orange" ? "text-ssgmce-orange" : "text-ssgmce-blue"}`}
                            >
                              {stat.value}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Timeline Section */}
                    {section.type === "timeline" && section.content.events && (
                      <div
                        className={`relative ${
                          isAdmissionsThemePage
                            ? "border-l border-gray-300 ml-3 space-y-4"
                            : isAboutThemePage
                              ? "border-l border-slate-300 ml-3 space-y-5"
                              : "border-l-2 border-ssgmce-blue ml-4 space-y-6"
                        }`}
                      >
                        {section.content.events.map((event, idx) => (
                          <div
                            key={idx}
                            className={`relative ${
                              isAdmissionsThemePage || isAboutThemePage
                                ? "pl-6"
                                : "pl-8"
                            }`}
                          >
                            <div
                              className={`absolute rounded-full top-2 ${
                                isAdmissionsThemePage
                                  ? "-left-[6px] h-2.5 w-2.5 bg-ssgmce-blue border border-white"
                                  : isAboutThemePage
                                    ? "-left-[6px] h-2.5 w-2.5 bg-slate-500 border border-white"
                                    : "-left-[9px] w-4 h-4 bg-ssgmce-orange border-2 border-white shadow"
                              }`}
                            ></div>
                            <div
                              className={
                                isAdmissionsThemePage
                                  ? "rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                                  : isAboutThemePage
                                    ? "rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-sm"
                                    : "bg-gray-50 rounded-lg p-4 shadow-sm"
                              }
                            >
                              <span
                                className={`text-sm font-semibold ${
                                  isAdmissionsThemePage
                                    ? "text-gray-500 uppercase tracking-wide"
                                    : isAboutThemePage
                                      ? "text-slate-500 uppercase tracking-wide"
                                      : "text-ssgmce-blue"
                                }`}
                              >
                                {event.year}
                              </span>
                              <h4
                                className={`text-gray-900 ${
                                  isAdmissionsThemePage
                                    ? "font-semibold mt-1"
                                    : isAboutThemePage
                                      ? "font-semibold mt-1"
                                      : "font-semibold"
                                }`}
                              >
                                {event.title}
                              </h4>
                              {event.description && (
                                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                  {event.description}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Cards Section */}
                    {section.type === "cards" && section.content.cards && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {section.content.cards.map((card, idx) => (
                          <div
                            key={idx}
                            className={`rounded-lg p-5 ${
                              isAdmissionsThemePage
                                ? "bg-white border border-gray-200 shadow-sm"
                                : isAboutThemePage
                                  ? "bg-white border border-slate-200 shadow-sm"
                                  : `bg-white rounded-lg shadow p-5 border-l-4 ${card.color === "orange" ? "border-ssgmce-orange" : "border-ssgmce-blue"}`
                            }`}
                          >
                            <h4 className="font-bold text-gray-900 mb-1">
                              {card.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {card.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Table Section (structured - admissions, research etc. that aren't yet in markdown) */}
                    {section.type === "table" &&
                      section.content.headers &&
                      section.content.rows && (
                        <div className="overflow-x-auto rounded-xl border border-gray-200">
                          <table className="min-w-full divide-y divide-gray-200 bg-white">
                            <thead
                              className={
                                isAdmissionsThemePage || isAboutThemePage
                                  ? "bg-gray-100 text-gray-800"
                                  : "bg-ssgmce-blue text-white"
                              }
                            >
                              <tr>
                                {section.content.headers.map((h, hIdx) => (
                                  <th
                                    key={hIdx}
                                    className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap"
                                  >
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {section.content.rows.map((row, rIdx) => (
                                <tr
                                  key={rIdx}
                                  className={
                                    rIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                  }
                                >
                                  {row.map((cell, cIdx) => (
                                    <td
                                      key={cIdx}
                                      className="px-4 py-3 text-sm text-gray-700 align-top"
                                    >
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {isEditing && (
                            <p className="mt-2 text-xs text-gray-400 italic">
                              To edit this table, convert the section to
                              Markdown type in the database.
                            </p>
                          )}
                        </div>
                      )}

                    {/* Accordion Section */}
                    {section.type === "accordion" && section.content.items && (
                      <div className="space-y-2">
                        {section.content.items.map((item, idx) => (
                          <details
                            key={idx}
                            className={`border rounded-lg group ${
                              isAdmissionsThemePage
                                ? "bg-white border-gray-200 shadow-sm"
                                : isAboutThemePage
                                  ? "bg-white border-slate-200 shadow-sm"
                                  : "bg-white border rounded-lg shadow-sm"
                            }`}
                          >
                            <summary className="px-4 py-3 cursor-pointer font-medium text-gray-900 hover:bg-gray-50 list-none flex justify-between items-center">
                              {item.title}
                              <span className="text-gray-400 group-open:rotate-180 transition-transform">
                                v
                              </span>
                            </summary>
                            <div className="px-4 py-3 text-gray-700 border-t text-sm">
                              {item.html ? (
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: item.html,
                                  }}
                                />
                              ) : (
                                item.content
                              )}
                            </div>
                          </details>
                        ))}
                      </div>
                    )}

                    {/* PDF Section */}
                    {section.type === "pdf" && section.content.url && (
                      <div className="my-4">
                        <a
                          href={section.content.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 rounded-md bg-ssgmce-blue text-white font-medium hover:bg-blue-800 transition"
                        >
                          {section.content.label || "View PDF Document"}
                        </a>
                      </div>
                    )}

                    {/* List Section */}
                    {section.type === "list" && (
                      <ul
                        className={
                          isAdmissionsThemePage || isAboutThemePage
                            ? "space-y-2"
                            : "list-disc pl-6 space-y-2 text-gray-700"
                        }
                      >
                        {section.content.items?.map((item, idx) => (
                          <li
                            key={idx}
                            className={
                              isAdmissionsThemePage || isAboutThemePage
                                ? "flex items-start gap-2 text-gray-700 leading-relaxed"
                                : ""
                            }
                          >
                            {isAdmissionsThemePage || isAboutThemePage ? (
                              <span
                                className={`mt-2 inline-block h-2 w-2 rounded-full flex-shrink-0 ${
                                  isAboutThemePage
                                    ? "bg-slate-500"
                                    : "bg-ssgmce-blue"
                                }`}
                              ></span>
                            ) : null}
                            <EditableText
                              value={item}
                              path={`sections[${index}].content.items[${idx}]`}
                              element="span"
                            />
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Image Section */}
                    {section.type === "image" && (
                      <figure className="my-6">
                        <EditableImage
                          value={section.content.url}
                          path={`sections[${index}].content.url`}
                          className="rounded-lg max-w-full h-auto shadow-md mx-auto"
                          alt={section.content.alt || section.title}
                        />
                        {section.content.caption && (
                          <figcaption className="text-sm text-gray-500 mt-2 text-center italic">
                            <EditableText
                              value={section.content.caption}
                              path={`sections[${index}].content.caption`}
                              element="span"
                            />
                          </figcaption>
                        )}
                      </figure>
                    )}

                    {/* Link Section */}
                    {section.type === "link" && (
                      <div className="my-4">
                        <EditableText
                          value={section.content.url}
                          path={`sections[${index}].content.url`}
                          className={
                            isAdmissionsThemePage
                              ? "inline-flex items-center rounded-md bg-blue-50 text-ssgmce-blue px-3 py-2 hover:bg-blue-100 font-medium transition"
                              : isAboutThemePage
                                ? "inline-flex items-center rounded-md bg-slate-100 text-slate-800 px-3 py-2 hover:bg-slate-200 font-medium transition"
                                : "text-blue-600 hover:text-blue-800 underline font-medium block"
                          }
                        />
                      </div>
                    )}

                    {/* IQAC Compact Stats */}
                    {section.type === "iqac-stats" && section.content.stats && (
                      <div className="flex items-center gap-6 mb-2">
                        {section.content.stats.map((stat, idx) => (
                          <React.Fragment key={idx}>
                            {idx > 0 && (
                              <div className="w-px h-8 bg-gray-200" />
                            )}
                            <div className="text-center">
                              <span
                                className={`block text-2xl font-bold ${idx % 2 === 0 ? "text-ssgmce-blue" : "text-ssgmce-orange"}`}
                              >
                                {stat.value}
                              </span>
                              <span className="text-xs text-gray-400">
                                {stat.label}
                              </span>
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    )}

                    {/* Meeting Records Accordion */}
                    {section.type === "meeting-records" &&
                      section.content.records && (
                        <IQACAccordion
                          items={section.content.records}
                          defaultOpen={section.content.records[0]?.year}
                          renderHeader={(item, isOpen) => (
                            <div className="flex items-center gap-3">
                              <span
                                className={`text-sm font-semibold ${isOpen ? "text-ssgmce-blue" : "text-gray-700"}`}
                              >
                                {item.year}
                              </span>
                              <span className="text-xs text-gray-400">
                                {item.meetings.length} meeting
                                {item.meetings.length !== 1 ? "s" : ""}
                              </span>
                            </div>
                          )}
                          renderContent={(item) => (
                            <div className="grid sm:grid-cols-2 gap-2">
                              {item.meetings.map((m) => (
                                <a
                                  key={m.label}
                                  href={m.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-3 p-2.5 rounded border border-gray-50 hover:border-ssgmce-orange/40 hover:bg-ssgmce-orange/5 transition-colors group"
                                >
                                  <span className="text-xs font-semibold text-ssgmce-blue bg-ssgmce-blue/5 px-2 py-0.5 rounded">
                                    {m.label}
                                  </span>
                                  {m.date && (
                                    <span className="text-xs text-gray-400">
                                      {m.date}
                                    </span>
                                  )}
                                  <span className="ml-auto text-xs text-gray-400 group-hover:text-ssgmce-blue transition-colors">
                                    PDF ↗
                                  </span>
                                </a>
                              ))}
                            </div>
                          )}
                          getKey={(item) => item.year}
                        />
                      )}

                    {/* Year Reports Accordion (AQAR) */}
                    {section.type === "year-reports" &&
                      section.content.reports && (
                        <IQACAccordion
                          items={section.content.reports}
                          defaultOpen={section.content.reports[0]?.year}
                          renderHeader={(item, isOpen) => (
                            <div className="flex items-center gap-3">
                              <span
                                className={`text-sm font-semibold ${isOpen ? "text-ssgmce-blue" : "text-gray-700"}`}
                              >
                                {item.year}
                              </span>
                              {item.subtitle && (
                                <span className="text-xs text-gray-400">
                                  {item.subtitle}
                                </span>
                              )}
                            </div>
                          )}
                          renderContent={(item) => (
                            <div className="space-y-3">
                              <div className="flex flex-wrap gap-2">
                                {item.links?.map((link, i) => (
                                  <a
                                    key={i}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-ssgmce-blue/20 text-xs font-medium text-ssgmce-blue hover:bg-ssgmce-blue/5 transition-colors"
                                  >
                                    {link.label} ↗
                                  </a>
                                ))}
                              </div>
                              {item.criteria && (
                                <div>
                                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                                    Criterion-wise Details
                                  </p>
                                  <div className="grid sm:grid-cols-2 gap-1.5">
                                    {item.criteria.map((c, i) => (
                                      <a
                                        key={i}
                                        href={c.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 p-2 rounded border border-gray-50 hover:border-ssgmce-orange/40 hover:bg-ssgmce-orange/5 transition-colors group text-xs"
                                      >
                                        <span className="font-semibold text-ssgmce-blue bg-ssgmce-blue/5 px-1.5 py-0.5 rounded">
                                          {c.num}
                                        </span>
                                        <span className="text-gray-600 group-hover:text-ssgmce-blue transition-colors">
                                          {c.title}
                                        </span>
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                          getKey={(item) => item.year}
                        />
                      )}

                    {/* NAAC Criteria Accordion */}
                    {section.type === "naac-criteria" &&
                      section.content.criteria && (
                        <IQACAccordion
                          items={section.content.criteria}
                          defaultOpen={section.content.criteria[0]?.num}
                          renderHeader={(item, isOpen) => (
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-bold text-white bg-ssgmce-blue w-6 h-6 rounded flex items-center justify-center flex-shrink-0">
                                {item.num}
                              </span>
                              <span
                                className={`text-sm font-semibold ${isOpen ? "text-ssgmce-blue" : "text-gray-700"}`}
                              >
                                {item.title}
                              </span>
                              <span className="text-xs text-gray-400">
                                {item.indicators.length} indicators
                              </span>
                            </div>
                          )}
                          renderContent={(item) => (
                            <div className="space-y-1.5">
                              {item.indicators.map((ind) => (
                                <div
                                  key={ind.id}
                                  className="flex items-start gap-3 p-2.5 rounded border border-gray-50 text-xs"
                                >
                                  <span className="font-mono font-semibold text-ssgmce-blue bg-ssgmce-blue/5 px-1.5 py-0.5 rounded whitespace-nowrap">
                                    {ind.id}
                                  </span>
                                  <span
                                    className={`px-1.5 py-0.5 rounded text-[10px] font-medium flex-shrink-0 ${ind.type === "QlM" ? "bg-ssgmce-orange/10 text-ssgmce-orange" : "bg-ssgmce-blue/10 text-ssgmce-blue"}`}
                                  >
                                    {ind.type}
                                  </span>
                                  <span className="text-gray-600 leading-relaxed">
                                    {ind.desc}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                          getKey={(item) => item.num}
                        />
                      )}

                    {/* Video Gallery */}
                    {section.type === "video-gallery" &&
                      section.content.videos && (
                        <VideoGallery
                          videos={section.content.videos}
                          channelUrl={section.content.channelUrl}
                        />
                      )}

                    {/* Document Grid */}
                    {section.type === "document-grid" &&
                      section.content.documents && (
                        <div
                          className={`grid ${section.content.columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"} gap-2`}
                        >
                          {section.content.documents.map((doc, idx) => (
                            <a
                              key={idx}
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-ssgmce-orange/40 hover:bg-ssgmce-orange/5 transition-colors group text-sm"
                            >
                              {doc.year && (
                                <span className="text-xs font-semibold text-ssgmce-blue bg-ssgmce-blue/5 px-2 py-1 rounded">
                                  {doc.year}
                                </span>
                              )}
                              <span className="text-gray-600 group-hover:text-ssgmce-blue transition-colors">
                                {doc.label || "View PDF ↗"}
                              </span>
                              {!doc.label && (
                                <span className="ml-auto text-xs text-gray-400 group-hover:text-ssgmce-blue">
                                  ↗
                                </span>
                              )}
                            </a>
                          ))}
                        </div>
                      )}

                    {/* Process Steps */}
                    {section.type === "process-steps" &&
                      section.content.steps && (
                        <div className="space-y-2">
                          {section.content.steps.map((step, i) => (
                            <div key={i} className="flex gap-3 items-start">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ssgmce-blue/5 text-ssgmce-blue text-[11px] font-bold flex items-center justify-center mt-0.5">
                                {i + 1}
                              </span>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {step}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                    {/* Info Cards (title + description) */}
                    {section.type === "info-cards" && section.content.items && (
                      <div
                        className={`grid ${section.content.columns === 1 ? "grid-cols-1" : "sm:grid-cols-2"} gap-3`}
                      >
                        {section.content.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-lg border border-gray-100"
                          >
                            <p className="text-sm font-semibold text-gray-800">
                              {item.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {item.description}
                            </p>
                            {item.ownership && (
                              <p className="text-[10px] text-ssgmce-blue mt-2 font-medium">
                                {item.ownership} · {item.timeFrame}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </EditableSection>
              ))}

            {!sections.length && (
              <p className="text-gray-500 italic text-center py-8">
                {isEditing
                  ? "No content. Add sections via dashboard."
                  : "No content details available."}
              </p>
            )}

            {/* Add Markdown Section button for facility pages in edit mode */}
            {isEditing && pageId?.startsWith("facilities-") && (
              <div className="flex justify-center py-6">
                <button
                  onClick={() => {
                    const order = sections.length + 1;
                    addSection({
                      sectionId: `section-${Date.now()}`,
                      title: "New Section",
                      type: "markdown",
                      order,
                      isVisible: true,
                      content: { text: "" },
                    });
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 border-dashed border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-colors text-sm font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add Markdown Section
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </GenericPage>
  );
};

export default GenericContentPage;
