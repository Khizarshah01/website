import { useEffect, useMemo, useState } from "react";
import PageHeader from '../components/PageHeader';
import apiClient from "../utils/apiClient";
import { resolveUploadedAssetUrl } from "../utils/uploadUrls";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryCategories, setGalleryCategories] = useState([]);
  const [categoryApiAvailable, setCategoryApiAvailable] = useState(false);
  const [loadingImages, setLoadingImages] = useState(true);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoadingImages(true);
        const [itemsResult, categoriesResult] = await Promise.allSettled([
          apiClient.get("/gallery"),
          apiClient.get("/gallery/categories"),
        ]);

        const itemData =
          itemsResult.status === "fulfilled" &&
          Array.isArray(itemsResult.value.data?.data)
            ? itemsResult.value.data.data
            : [];
        const categoryData =
          categoriesResult.status === "fulfilled" &&
          Array.isArray(categoriesResult.value.data?.data)
            ? categoriesResult.value.data.data
            : [];
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

  const normalizedGalleryImages = useMemo(() => {
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
  }, [galleryItems]);

  const categories = useMemo(() => {
    const sortedApiCategories = galleryCategories
      .map((category, index) => ({
        name: String(category?.name || "").trim(),
        order: Number.isFinite(Number(category?.order))
          ? Number(category.order)
          : index,
      }))
      .filter((category) => category.name)
      .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));

    const apiNames = [];
    const seenApiNames = new Set();
    for (const category of sortedApiCategories) {
      const lower = category.name.toLowerCase();
      if (seenApiNames.has(lower)) continue;
      seenApiNames.add(lower);
      apiNames.push(category.name);
    }

    const imageCategories = Array.from(
      new Set(normalizedGalleryImages.map((img) => img.category).filter(Boolean)),
    );
    const finalCategories = categoryApiAvailable ? apiNames : imageCategories;
    return ["All", ...finalCategories];
  }, [categoryApiAvailable, galleryCategories, normalizedGalleryImages]);

  useEffect(() => {
    if (!categories.includes(selectedCategory)) {
      setSelectedCategory("All");
    }
  }, [categories, selectedCategory]);

  const galleryVideos = [
    {
      title: 'Campus Tour',
      src: '/gallery/videos/campus-tour.mp4',
      poster: '/gallery/posters/campus-tour.jpg',
    },
    {
      title: 'Infrastructure Overview',
      src: '/gallery/videos/infrastructure-overview.mp4',
      poster: '/gallery/posters/infrastructure-overview.jpg',
    },
    {
      title: 'Laboratory Tour',
      src: '/gallery/videos/lab-tour.mp4',
      poster: '/gallery/posters/lab-tour.jpg',
    },
    {
      title: 'Campus Life Highlights',
      src: '/gallery/videos/campus-life-highlights.mp4',
      poster: '/gallery/posters/campus-life-highlights.jpg',
    },
  ];

  const filteredImages =
    selectedCategory === "All"
      ? normalizedGalleryImages
      : normalizedGalleryImages.filter((img) => img.category === selectedCategory);

  return (
    <div className="animation-fade-in">
      <PageHeader 
        title="Photo Gallery" 
        subtitle="Glimpses of Campus Life" 
      />

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
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

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loadingImages ? (
            <div className="text-center text-gray-500">Loading gallery images...</div>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <div 
                key={image.id}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="bg-ssgmce-orange px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block">
                      {image.category}
                    </span>
                    <h3 className="text-xl font-bold">{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Video Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-ssgmce-blue mb-12">Video Gallery</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {galleryVideos.map((video, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white">
                <div className="aspect-video bg-black">
                  <video
                    controls
                    preload="metadata"
                    poster={video.poster}
                    className="w-full h-full object-cover"
                  >
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
    </div>
  );
};

export default Gallery;
