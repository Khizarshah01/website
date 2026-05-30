import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import PageHeader from '../components/PageHeader';
import apiClient from "../utils/apiClient";
import { resolveUploadedAssetUrl } from "../utils/uploadUrls";

/* ─────────────────────── Gallery page ─────────────────────── */
const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryCategories, setGalleryCategories] = useState([]);
  const [categoryApiAvailable, setCategoryApiAvailable] = useState(false);
  const [loadingImages, setLoadingImages] = useState(true);

  /* Lightbox state */
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  /* ── Fetch gallery data from API ── */
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoadingImages(true);
        const [itemsResult, categoriesResult] = await Promise.allSettled([
          apiClient.get("/gallery"),
          apiClient.get("/gallery/categories"),
        ]);
        const itemData =
          itemsResult.status === "fulfilled" && Array.isArray(itemsResult.value.data?.data)
            ? itemsResult.value.data.data : [];
        const categoryData =
          categoriesResult.status === "fulfilled" && Array.isArray(categoriesResult.value.data?.data)
            ? categoriesResult.value.data.data : [];
        setGalleryItems(itemData);
        setGalleryCategories(categoryData);
        setCategoryApiAvailable(categoriesResult.status === "fulfilled");
      } catch {
        setGalleryItems([]);
        setGalleryCategories([]);
        setCategoryApiAvailable(false);
      } finally {
        setLoadingImages(false);
      }
    };
    fetchGalleryData();
  }, []);

  /* ── Fallback images ── */
  const fallbackGalleryImages = [
    { id: 1, category: "Campus", title: "College Main Building", url: "/gallery/photos/main-building.jpg", order: 1 },
    { id: 2, category: "Campus", title: "Central Library", url: "/gallery/photos/central-library.jpg", order: 2 },
    { id: 3, category: "Labs", title: "Computer Laboratory", url: "/gallery/photos/computer-lab.jpg", order: 3 },
    { id: 4, category: "Labs", title: "Engineering Workshop", url: "/gallery/photos/engineering-workshop.jpg", order: 4 },
    { id: 5, category: "Events", title: "Seminar Hall Events", url: "/gallery/photos/seminar-event.jpg", order: 5 },
    { id: 6, category: "Events", title: "Auditorium Programs", url: "/gallery/photos/auditorium-event.jpg", order: 6 },
    { id: 7, category: "Cultural", title: "Cultural Venue", url: "/gallery/photos/cultural-venue.jpg", order: 7 },
    { id: 8, category: "Cultural", title: "Campus Amphitheatre", url: "/gallery/photos/amphitheatre.jpg", order: 8 },
    { id: 9, category: "Sports", title: "Sports Ground", url: "/gallery/photos/sports-ground.jpg", order: 9 },
    { id: 10, category: "Sports", title: "Indoor Sports Facility", url: "/gallery/photos/indoor-sports.jpg", order: 10 },
    { id: 11, category: "Campus", title: "Auditorium", url: "/gallery/photos/auditorium.jpg", order: 11 },
    { id: 12, category: "Campus", title: "Seminar Hall", url: "/gallery/photos/seminar-hall.jpg", order: 12 },
  ];

  /* ── Normalize gallery images ── */
  const allImages = useMemo(() => {
    if (!Array.isArray(galleryItems) || galleryItems.length === 0) {
      return fallbackGalleryImages;
    }
    return galleryItems
      .filter((item) => item?.imageUrl)
      .map((item, index) => ({
        id: item._id || item.id || `gallery-item-${index}`,
        category: item.category || "Other",
        title: item.title || "Gallery Image",
        url: resolveUploadedAssetUrl(item.imageUrl),
        order: Number.isFinite(Number(item.order)) ? Number(item.order) : index,
      }))
      .sort((a, b) => a.order - b.order || String(a.title).localeCompare(String(b.title)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [galleryItems]);

  /* ── Categories ── */
  const categories = useMemo(() => {
    const sortedApiCategories = galleryCategories
      .map((category, index) => ({
        name: String(category?.name || "").trim(),
        order: Number.isFinite(Number(category?.order)) ? Number(category.order) : index,
      }))
      .filter((c) => c.name)
      .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
    const apiNames = [];
    const seen = new Set();
    for (const c of sortedApiCategories) {
      const lower = c.name.toLowerCase();
      if (seen.has(lower)) continue;
      seen.add(lower);
      apiNames.push(c.name);
    }
    const imageCategories = Array.from(
      new Set(allImages.map((img) => img.category).filter(Boolean)),
    );
    const finalCategories = categoryApiAvailable ? apiNames : imageCategories;
    return ["All", ...finalCategories];
  }, [categoryApiAvailable, galleryCategories, allImages]);

  useEffect(() => {
    if (!categories.includes(selectedCategory)) setSelectedCategory("All");
  }, [categories, selectedCategory]);

  /* ── Filtered images ── */
  const filteredImages = useMemo(() =>
    selectedCategory === "All"
      ? allImages
      : allImages.filter((img) => img.category === selectedCategory),
    [selectedCategory, allImages]
  );

  /* ── Split filtered images into 3 rows for the marquee ── */
  const [row1, row2, row3] = useMemo(() => {
    if (filteredImages.length === 0) return [[], [], []];
    const r1 = [], r2 = [], r3 = [];
    filteredImages.forEach((img, i) => {
      if (i % 3 === 0) r1.push(img);
      else if (i % 3 === 1) r2.push(img);
      else r3.push(img);
    });
    return [r1, r2, r3];
  }, [filteredImages]);

  /* ── Video gallery data ── */
  const galleryVideos = [
    { title: 'Campus Tour', src: '/gallery/videos/campus-tour.mp4', poster: '/gallery/posters/campus-tour.jpg' },
    { title: 'Infrastructure Overview', src: '/gallery/videos/infrastructure-overview.mp4', poster: '/gallery/posters/infrastructure-overview.jpg' },
    { title: 'Laboratory Tour', src: '/gallery/videos/lab-tour.mp4', poster: '/gallery/posters/lab-tour.jpg' },
    { title: 'Campus Life Highlights', src: '/gallery/videos/campus-life-highlights.mp4', poster: '/gallery/posters/campus-life-highlights.jpg' },
  ];

  /* ── Flat index from row/col for lightbox ── */
  const openLightbox = useCallback(
    (img) => {
      const idx = filteredImages.findIndex((i) => i.id === img.id);
      setLightboxIndex(idx >= 0 ? idx : 0);
      setLightboxOpen(true);
    },
    [filteredImages]
  );

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const goPrev = useCallback(
    () => setLightboxIndex((i) => (i - 1 + filteredImages.length) % filteredImages.length),
    [filteredImages.length]
  );
  const goNext = useCallback(
    () => setLightboxIndex((i) => (i + 1) % filteredImages.length),
    [filteredImages.length]
  );

  /* Keyboard navigation */
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxOpen, closeLightbox, goPrev, goNext]);

  return (
    <div className="animation-fade-in">
      <PageHeader
        title="Photo Gallery"
        subtitle="Glimpses of Campus Life"
      />

      {/* ── Category Filter ── */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${selectedCategory === category
                  ? 'bg-ssgmce-blue text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Marquee gallery section ── */}
      <section className="gallery-marquee-section">
        {/* <div className="gallery-marquee-heading-wrap">
          <h2 className="gallery-marquee-heading">Our Gallery</h2>
          <p className="gallery-marquee-subheading">
            Explore the vibrant life at SSGMCE through our photo collection
          </p>
        </div> */}

        {loadingImages ? (
          <div className="gallery-loading">
            <div className="gallery-loading-spinner" />
            <p>Loading gallery images…</p>
          </div>
        ) : (
          <div className="gallery-marquee-rows">
            <MarqueeRow images={row1} direction="left" speed={80} onImageClick={openLightbox} />
            <MarqueeRow images={row2} direction="right" speed={85 } onImageClick={openLightbox} />
            <MarqueeRow images={row3} direction="left" speed={80} onImageClick={openLightbox} />
          </div>
        )}
      </section>

      {/* ── Video Gallery Section ── */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-ssgmce-blue mb-12">Video Gallery</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {galleryVideos.map((video, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white">
                <div className="aspect-video bg-black">
                  <video controls preload="metadata" poster={video.poster} className="w-full h-full object-cover">
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="p-4 border-t border-gray-100">
                  <h3 className="text-ssgmce-blue font-bold text-lg">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Virtual Tour */}
      <section className="py-16 bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Virtual Campus Tour</h2>
          <p className="text-xl mb-8 text-ssgmce-light-blue max-w-3xl mx-auto">
            Take a 360° virtual tour of our beautiful campus and explore our facilities from anywhere
          </p>
          <button className="bg-ssgmce-orange hover:bg-ssgmce-light-orange text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 shadow-lg">
            Start Virtual Tour
          </button>
        </div>
      </section>

      {/* Download Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-ssgmce-blue mb-8">Download Resources</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: 'College Brochure', size: '2.5 MB', icon: '📄' },
              { title: 'Campus Map', size: '1.2 MB', icon: '🗺️' },
              { title: 'Prospectus 2024', size: '5.8 MB', icon: '📚' },
            ].map((resource, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                <div className="text-6xl mb-4">{resource.icon}</div>
                <h3 className="text-lg font-bold text-ssgmce-blue mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{resource.size}</p>
                <button className="bg-ssgmce-blue hover:bg-ssgmce-dark-blue text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200">
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── Lightbox modal (RBU-style) ── */}
      {lightboxOpen && filteredImages.length > 0 && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MarqueeRow – infinite horizontal scrolling row of images
   ═══════════════════════════════════════════════════════════════ */
function MarqueeRow({ images, direction = "left", speed = 70, onImageClick }) {
  const trackRef = useRef(null);

  // We duplicate the images so the scroll loops seamlessly
  const duplicated = useMemo(() => {
    if (!images.length) return [];
    // duplicate enough times to fill wide screens
    let copies = Math.max(4, Math.ceil(20 / images.length));
    // Ensure copies is an even number so that translating by -50% 
    // seamlessly loops exactly at a full repetition of the original images.
    if (copies % 2 !== 0) copies += 1;

    const result = [];
    for (let c = 0; c < copies; c++) {
      images.forEach((img, i) => result.push({ ...img, _key: `${c}-${i}` }));
    }
    return result;
  }, [images]);

  if (!images.length) return null;

  const animClass =
    direction === "left"
      ? "gallery-marquee-track-left"
      : "gallery-marquee-track-right";

  return (
    <div className="gallery-marquee-row">
      <div
        ref={trackRef}
        className={`gallery-marquee-track ${animClass}`}
        style={{ "--marquee-speed": `${speed}s` }}
      >
        {duplicated.map((img) => (
          <button
            key={img._key}
            className="gallery-marquee-item"
            onClick={() => onImageClick(img)}
            type="button"
            aria-label={`View ${img.title}`}
          >
            <img
              src={img.url}
              alt={img.title}
              loading="lazy"
              draggable="false"
            />
            <div className="gallery-marquee-item-overlay">
              <span>{img.title}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Lightbox – fullscreen photo viewer (RBU Nagpur style)
   ═══════════════════════════════════════════════════════════════ */
function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  const current = images[currentIndex];
  const total = images.length;
  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? onNext() : onPrev();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="gallery-lightbox-overlay"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Counter – top left */}
      <div className="gallery-lightbox-counter">
        {currentIndex + 1} / {total}
      </div>

      {/* Top-right controls */}
      <div className="gallery-lightbox-controls">
        {/* Close */}
        <button
          className="gallery-lightbox-btn gallery-lightbox-close"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Prev arrow */}
      <button
        className="gallery-lightbox-arrow gallery-lightbox-arrow-left"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous photo"
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Image */}
      <div className="gallery-lightbox-image-wrap" onClick={(e) => e.stopPropagation()}>
        <img
          src={current?.url}
          alt={current?.title || "Gallery photo"}
          className="gallery-lightbox-image"
          draggable="false"
        />
      </div>

      {/* Next arrow */}
      <button
        className="gallery-lightbox-arrow gallery-lightbox-arrow-right"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next photo"
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Bottom counter (large, like RBU) */}
      <div className="gallery-lightbox-bottom-count">
        {total}
      </div>
    </div>
  );
}

export default Gallery;
