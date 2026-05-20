import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StarburstBadge = ({ size = 64, className = '' }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
  >
    <defs>
      <linearGradient id="sb-grad" x1="0" x2="1">
        <stop offset="0%" stopColor="#ffb3b3" />
        <stop offset="40%" stopColor="#ff6b6b" />
        <stop offset="70%" stopColor="#ff2b2b" />
        <stop offset="100%" stopColor="#e60000" />
      </linearGradient>

      <radialGradient id="sb-shine" cx="30%" cy="30%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
        <stop offset="35%" stopColor="rgba(255,255,255,0.28)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </radialGradient>

      <filter id="glow">
        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

        <filter id="outerGlow">
          <feGaussianBlur stdDeviation="14" result="outerBlur" />
          <feMerge>
            <feMergeNode in="outerBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <radialGradient id="halo-grad" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#ff4b4b" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#ff1a1a" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ff1a1a" stopOpacity="0" />
        </radialGradient>

      <mask id="shine-mask">
        <rect x="0" y="0" width="120" height="120" fill="white" />
        <rect x="-60" y="0" width="40" height="120" fill="black">
          <animate attributeName="x" from="-60" to="140" dur="2.6s" repeatCount="indefinite" />
        </rect>
      </mask>
    </defs>

    <g transform="translate(60,60)" style={{ transformOrigin: '60px 60px' }}>
      {/* outer blurred glow */}
      <path
        d="M0 -48 L10 -18 L40 -12 L16 6 L26 36 L0 18 L-26 36 L-16 6 L-40 -12 L-10 -18 Z"
        fill="#ff2b2b"
        opacity="0.6"
        filter="url(#outerGlow)"
        style={{ transformOrigin: '60px 60px', animation: 'glowPulse 1.8s ease-in-out infinite' }}
      />

      {/* halo behind */}
      <circle cx="0" cy="0" r="40" fill="url(#halo-grad)" opacity="0.22" style={{ animation: 'haloPulse 1.9s ease-in-out infinite' }} />

      <path
        d="M0 -48 L10 -18 L40 -12 L16 6 L26 36 L0 18 L-26 36 L-16 6 L-40 -12 L-10 -18 Z"
        fill="url(#sb-grad)"
        stroke="#b21a1a"
        strokeWidth="2"
        filter="url(#glow)"
        style={{ animation: 'blinkRed 1.2s ease-in-out infinite' }}
      />

      <circle cx="0" cy="0" r="16" fill="url(#sb-shine)" style={{ animation: 'starPulse 1.7s ease-in-out infinite' }} />
    </g>

    <g mask="url(#shine-mask)">
      <rect x="0" y="0" width="120" height="120" fill="url(#sb-grad)" opacity="0.06" />
    </g>

    <text x="60" y="74" textAnchor="middle" fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial" fontWeight="900" fontSize="20" fill="#fff" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.45)' }}>New</text>
  </svg>
);

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
        box-shadow: 0 0 0 rgba(230, 0, 0, 0), 0 0 0 rgba(255, 80, 80, 0);
      }
      50% {
        transform: scale(1.06);
        box-shadow: 0 0 34px rgba(230, 0, 0, 0.75), 0 0 22px rgba(255, 120, 120, 0.22);
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

    /* starburst animations */
    @keyframes starRotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes starPulse {
      0% { transform: scale(0.92); opacity: 0.92; }
      50% { transform: scale(1.06); opacity: 1; }
      100% { transform: scale(0.92); opacity: 0.92; }
    }

    @keyframes glowPulse {
      0% { transform: scale(1.04); opacity: 0.5; }
      50% { transform: scale(1.12); opacity: 0.9; }
      100% { transform: scale(1.04); opacity: 0.5; }
    }

    @keyframes haloPulse {
      0% { transform: scale(0.96); opacity: 0.12; }
      50% { transform: scale(1.06); opacity: 0.28; }
      100% { transform: scale(0.96); opacity: 0.12; }
    }

    @keyframes blinkRed {
      0% { filter: drop-shadow(0 0 4px rgba(230,20,20,0.5)); opacity: 0.88; }
      50% { filter: drop-shadow(0 0 18px rgba(230,0,0,0.95)); opacity: 1; }
      100% { filter: drop-shadow(0 0 4px rgba(230,20,20,0.5)); opacity: 0.88; }
    }
  `}</style>

  {/* background */}
  <div
    className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,80,80,0.24),transparent_34%),radial-gradient(circle_at_right,rgba(255,40,40,0.26),transparent_28%),linear-gradient(90deg,rgba(255,255,255,0.03),rgba(255,255,255,0.00),rgba(255,255,255,0.03))] bg-[length:200%_200%] opacity-98"
    style={{ animation: "bgDrift 7s ease-in-out infinite" }}
  />
  <div
    className="absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.16)_45%,transparent_60%)]"
    style={{ animation: "newsShimmer 3.2s ease-in-out infinite" }}
  />

  {/* left accent */}
  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#ff1a1a] via-[#ff3b3b] to-[#ff1a1a]" />

  <div className="relative z-10 container mx-auto flex items-center gap-4 px-4">
    {/* Latest badge + starburst */}
    <div className="relative flex-shrink-0 flex items-center gap-3">
      <StarburstBadge size={64} className="flex-shrink-0 -ml-1" />

      <div
        className="relative overflow-hidden rounded-full border border-white/15 bg-gradient-to-r from-[#ff3b3b] via-[#ff5c5c] to-[#ff2f2f] px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.24em] text-white shadow-[0_0_26px_rgba(255,59,59,0.42)]"
        style={{ animation: "latestGlowPulse 1.8s ease-in-out infinite", boxShadow: '0 0 34px rgba(255,45,45,0.7)' }}
      >
        <span className="absolute inset-0 bg-white/18 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="relative">Latest</span>
      </div>
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
