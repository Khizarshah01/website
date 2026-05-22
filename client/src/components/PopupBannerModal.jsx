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
  const normalizedTitle = String(banner?.title || "").trim();
  const normalizedDescription = String(banner?.description || "").trim();
  const normalizedLinkUrl = String(banner?.linkUrl || "").trim();
  const hasTextContent = Boolean(
    normalizedTitle || normalizedDescription || normalizedLinkUrl,
  );
  const imageFrameClassName = "aspect-[16/10] w-full bg-slate-100 dark:bg-slate-900";
  const imageClassName = "block h-full w-full object-cover sm:object-contain";

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

  if (!banner || !isOpen || isAdminRoute) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/70 px-2 py-2 backdrop-blur-sm">
      <div className="relative flex max-h-[94vh] w-[min(92vw,560px)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={closeBanner}
          className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-lg bg-white/95 text-3xl text-slate-500 shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-900"
          aria-label="Close popup banner"
        >
          <FaTimes />
        </button>

        <div className={imageFrameClassName}>
          {normalizedLinkUrl ? (
            <a
              href={normalizedLinkUrl}
              target="_blank"
              rel="noreferrer"
              onClick={closeBanner}
              className="block h-full w-full"
            >
              <img
                src={imageUrl}
                alt={banner.title || "SSGMCE announcement banner"}
                className={imageClassName}
              />
            </a>
          ) : (
            <img
              src={imageUrl}
              alt={banner.title || "SSGMCE announcement banner"}
              className={imageClassName}
            />
          )}
        </div>

        {hasTextContent ? (
          <div className="max-h-[34vh] overflow-y-auto border-t border-slate-100 bg-white p-5 md:p-6">
            {normalizedTitle ? (
              <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
                {normalizedTitle}
              </h2>
            ) : null}
            {normalizedDescription ? (
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {normalizedDescription}
              </p>
            ) : null}

            {normalizedLinkUrl ? (
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={normalizedLinkUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-ssgmce-blue px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ssgmce-dark-blue"
                >
                  View Details <FaExternalLinkAlt className="text-xs" />
                </a>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PopupBannerModal;
