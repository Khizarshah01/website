import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { resolveUploadedAssetUrl } from '../utils/uploadUrls';

const ImageCarousel = ({ images, alt = "Image", className = "", autoPlayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter out empty URLs
  const validImages = Array.isArray(images) ? images.filter(img => typeof img === 'string' && img.trim() !== '') : [];

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  if (validImages.length === 0) return null;
  if (validImages.length === 1) {
    return <img src={resolveUploadedAssetUrl(validImages[0])} alt={alt} className={className} />;
  }

  return (
    <div className={`relative overflow-hidden group ${className}`}>
      <img
        src={resolveUploadedAssetUrl(validImages[currentIndex])}
        alt={`${alt} ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-opacity duration-500"
      />

      {/* Controls */}
      <button
        onClick={goPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/80 hover:bg-white text-gray-800 rounded-full shadow transition-colors"
      >
        <FaChevronLeft className="text-sm text-[#727272]" />
      </button>
      <button
        onClick={goNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/80 hover:bg-white text-gray-800 rounded-full shadow transition-colors"
      >
        <FaChevronRight className="text-sm text-[#727272]" />
      </button>
    </div>


  );
};

export default ImageCarousel;
