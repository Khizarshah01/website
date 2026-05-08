import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaTimes, FaExternalLinkAlt } from "react-icons/fa";
import apiClient from "../utils/apiClient";
import { resolveUploadedAssetUrl } from "../utils/uploadUrls";

const getStorage = (frequency) => {
  if (frequency === "always") return null;
  return frequency === "once-per-day" ? localStorage : sessionStorage;
};

const PopupBannerModal = () => {
  const location = useLocation();
  const [banner, setBanner] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [imageLayout, setImageLayout] = useState("landscape");

  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdminRoute) return undefined;

    let isMounted = true;

    apiClient
      .get("/popup-banners/active")
      .then((response) => {
        const activeBanner = response.data?.data;
        if (!isMounted || !activeBanner) return;

        const storage = getStorage(activeBanner.displayFrequency);
        const storageKey = `popup-banner-${activeBanner._id}`;
        const todayKey = new Date().toISOString().slice(0, 10);
        const storedValue = storage?.getItem(storageKey);

        if (
          activeBanner.displayFrequency === "once-per-session" &&
          storedValue === "shown"
        ) {
          return;
        }

        if (
          activeBanner.displayFrequency === "once-per-day" &&
          storedValue === todayKey
        ) {
          return;
        }

        setBanner(activeBanner);
        setImageLayout("landscape");
        setIsOpen(true);
      })
      .catch(() => {
        setBanner(null);
        setIsOpen(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isAdminRoute]);

  const imageUrl = useMemo(
    () => resolveUploadedAssetUrl(banner?.imageUrl || ""),
    [banner?.imageUrl],
  );
  const hasTextContent = Boolean(banner?.title || banner?.description || banner?.linkUrl);

  const closeBanner = () => {
    if (banner) {
      const storage = getStorage(banner.displayFrequency);
      const storageKey = `popup-banner-${banner._id}`;
      if (storage) {
        storage.setItem(
          storageKey,
          banner.displayFrequency === "once-per-day"
            ? new Date().toISOString().slice(0, 10)
            : "shown",
        );
      }
    }
    setIsOpen(false);
  };

  const handleImageLoad = (event) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    setImageLayout(naturalHeight > naturalWidth ? "portrait" : "landscape");
  };

  const imageClassName =
    imageLayout === "portrait"
      ? "block w-[min(92vw,620px)] max-w-none bg-transparent"
      : "block max-h-[94vh] max-w-[94vw] bg-transparent object-contain";

  if (!banner || !isOpen || isAdminRoute) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/70 px-2 py-2 backdrop-blur-sm">
      <div className="relative max-h-[96vh] max-w-[96vw] overflow-y-auto rounded bg-transparent shadow-2xl">
        <button
          type="button"
          onClick={closeBanner}
          className="absolute right-3 top-3 z-10 flex h-12 w-12 items-center justify-center rounded bg-white/95 text-3xl text-slate-500 shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-900"
          aria-label="Close popup banner"
        >
          <FaTimes />
        </button>

        {banner.linkUrl ? (
          <a href={banner.linkUrl} target="_blank" rel="noreferrer" onClick={closeBanner}>
            <img
              src={imageUrl}
              alt={banner.title || "SSGMCE announcement banner"}
              onLoad={handleImageLoad}
              className={imageClassName}
            />
          </a>
        ) : (
          <img
            src={imageUrl}
            alt={banner.title || "SSGMCE announcement banner"}
            onLoad={handleImageLoad}
            className={imageClassName}
          />
        )}

        {hasTextContent ? (
          <div className="bg-white p-5 md:p-6">
            {banner.title ? (
              <h2 className="text-2xl font-bold text-slate-900">{banner.title}</h2>
            ) : null}
            {banner.description ? (
              <p className="mt-2 text-sm leading-6 text-slate-600">{banner.description}</p>
            ) : null}

            <div className="mt-5 flex flex-wrap gap-3">
              {banner.linkUrl ? (
                <a
                  href={banner.linkUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-ssgmce-blue px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ssgmce-dark-blue"
                >
                  View Details <FaExternalLinkAlt className="text-xs" />
                </a>
              ) : null}
              <button
                type="button"
                onClick={closeBanner}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PopupBannerModal;
