import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    <Link
      to="/news"
      className="block overflow-hidden bg-ssgmce-blue py-2.5 text-white transition-colors hover:bg-[#23456f]"
      aria-label="Open news page"
    >
      <style>{`
        @keyframes latestGlowPulse {
          0%, 100% {
            box-shadow: 0 0 0 rgba(255, 255, 255, 0), 0 0 0 rgba(255, 153, 51, 0);
            filter: brightness(1);
          }
          50% {
            box-shadow: 0 0 18px rgba(255, 255, 255, 0.22), 0 0 24px rgba(255, 153, 51, 0.38);
            filter: brightness(1.12);
          }
        }

        @keyframes latestShineSweep {
          0% {
            transform: translateX(-160%) skewX(-18deg);
            opacity: 0;
          }
          20% {
            opacity: 0.15;
          }
          55% {
            opacity: 0.45;
          }
          100% {
            transform: translateX(220%) skewX(-18deg);
            opacity: 0;
          }
        }
      `}</style>
      <div className="container mx-auto flex items-center px-4">
        <div
          className="relative mr-4 flex-shrink-0 overflow-hidden rounded bg-ssgmce-orange px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white"
          style={{ animation: "latestGlowPulse 2.2s ease-in-out infinite" }}
        >
          <span
            className="pointer-events-none absolute inset-y-0 left-[-35%] w-8 bg-white/45 blur-[1px]"
            style={{ animation: "latestShineSweep 2.4s ease-in-out infinite" }}
          />
          Latest
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="animate-fade-in">
            <span className="text-sm font-medium opacity-90">{items[currentIndex]?.title || 'Welcome to SSGMCE'}</span>
          </div>
        </div>
        <span className="ml-4 hidden text-xs font-semibold uppercase tracking-[0.14em] text-white/80 md:inline">
          View News
        </span>
      </div>
    </Link>
  );
};

export default NewsTicker;
