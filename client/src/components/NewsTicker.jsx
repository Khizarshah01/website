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
  className="group relative block overflow-hidden border-y border-white/10 bg-gradient-to-r from-[#0f2340] via-[#17365a] to-[#0f2340] py-3 text-white shadow-[0_14px_45px_rgba(10,20,35,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_60px_rgba(10,20,35,0.48)]"
  aria-label="Open news page"
>
  <style>{`
    @keyframes latestGlowPulse {
      0%, 100% {
        transform: scale(1);
        box-shadow: 0 0 0 rgba(255, 64, 64, 0), 0 0 0 rgba(255, 153, 51, 0);
      }
      50% {
        transform: scale(1.04);
        box-shadow: 0 0 24px rgba(255, 64, 64, 0.45), 0 0 18px rgba(255, 255, 255, 0.16);
      }
    }

    @keyframes newsShimmer {
      0% {
        transform: translateX(-180%) skewX(-18deg);
        opacity: 0;
      }
      15% {
        opacity: 0.12;
      }
      50% {
        opacity: 0.3;
      }
      100% {
        transform: translateX(240%) skewX(-18deg);
        opacity: 0;
      }
    }

    @keyframes titlePop {
      0% {
        opacity: 0;
        transform: translateY(10px) scale(0.985);
        filter: blur(2px);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0);
      }
    }

    @keyframes bgDrift {
      0%, 100% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
    }
  `}</style>

  {/* background */}
  <div
    className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_34%),radial-gradient(circle_at_right,rgba(255,60,60,0.16),transparent_28%),linear-gradient(90deg,rgba(255,255,255,0.03),rgba(255,255,255,0.00),rgba(255,255,255,0.03))] bg-[length:200%_200%] opacity-95"
    style={{ animation: "bgDrift 7s ease-in-out infinite" }}
  />
  <div
    className="absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.16)_45%,transparent_60%)]"
    style={{ animation: "newsShimmer 3.2s ease-in-out infinite" }}
  />

  {/* left accent */}
  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#ff3b3b] via-[#ff8a8a] to-[#ff3b3b]" />

  <div className="relative z-10 container mx-auto flex items-center gap-4 px-4">
    {/* Latest badge */}
    <div
      className="relative flex-shrink-0 overflow-hidden rounded-full border border-white/15 bg-gradient-to-r from-[#ff3b3b] via-[#ff5c5c] to-[#ff2f2f] px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.24em] text-white shadow-[0_0_26px_rgba(255,59,59,0.42)]"
      style={{ animation: "latestGlowPulse 1.8s ease-in-out infinite" }}
    >
      <span className="absolute inset-0 bg-white/18 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative">Latest</span>
    </div>

    {/* title */}
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-3">
        <span className="relative flex h-3.5 w-3.5 flex-shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-red-500 shadow-[0_0_18px_rgba(255,59,59,0.95)]" />
        </span>

        <span
          key={currentIndex}
          className="truncate text-sm font-semibold tracking-wide text-white/98 drop-shadow-[0_0_10px_rgba(255,255,255,0.12)] md:text-[15px]"
          style={{ animation: "titlePop 0.42s ease-out" }}
        >
          {items[currentIndex]?.title || "Welcome to SSGMCE"}
        </span>

        <span className="hidden rounded-full border border-red-300/30 bg-red-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-red-100 md:inline-flex">
          Hot
        </span>
      </div>
    </div>

    {/* CTA */}
    <span className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/88 transition-all duration-300 group-hover:bg-white/18 md:inline-flex">
      View News
      <svg
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  </div>
</Link>
  );
};

export default NewsTicker;
