import { useState, useEffect } from 'react';

const NewsTicker = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (items && items.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <div className="bg-ssgmce-blue text-white py-2.5 overflow-hidden">
      <div className="container mx-auto px-4 flex items-center">
        <div className="bg-ssgmce-orange px-3 py-1 rounded text-xs font-semibold mr-4 flex-shrink-0 uppercase tracking-wide">
          Latest
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="animate-fade-in">
            <span className="text-sm font-medium opacity-90">{items[currentIndex]?.title || 'Welcome to SSGMCE'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
