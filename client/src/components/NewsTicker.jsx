import React from 'react';
import { Link } from 'react-router-dom';
import newVideo from '../assets/images/home/New.webm';

const NewsTicker = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <Link
      to="/news"
      aria-label="Open news page"
      className="group block overflow-hidden border-t border-b border-white/6 bg-ssgmce-dark-blue/95 py-2.5 text-white sm:py-3"
    >
      <style>{`
        .news-wrap { display:flex; align-items:center; gap:1rem; }
        .news-badge { background: linear-gradient(90deg,#ff6b6b,#ff3b3b); }
        .news-track { display:inline-flex; align-items:center; gap:10rem; white-space:nowrap; animation: marquee 50s linear infinite; }
        .news-track:hover { animation-play-state: paused; }
        .news-item { display:inline-flex; align-items:center; gap:0.5rem; }
        .news-dot { width:12px; height:12px; border-radius:9999px; background:#ff3b3b; box-shadow:0 0 14px rgba(255,59,59,0.8); animation: blinkDot 1s ease-in-out infinite; flex-shrink:0; }
        .pulse-dot { width:10px; height:10px; border-radius:9999px; background: radial-gradient(circle, #ff6b6b 0%, #ff3b3b 60%); box-shadow:0 0 12px rgba(255,60,60,0.36); }
        .news-cta { background: rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.06); }
        @media (max-width: 640px) {
          .news-wrap { gap:0.65rem; }
          .news-track { gap:1.15rem; }
          .news-item { font-size:14px; }
          .news-dot { width:10px; height:10px; }
        }
        @keyframes blinkDot { 0%, 100% { opacity: 0.35; transform: scale(0.85); } 50% { opacity: 1; transform: scale(1); } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>

      <div className="w-full ">
        <div className="news-wrap">
          {/* <div className="flex items-center gap-2 flex-shrink-0 sm:gap-3">
            <div className="hidden h-10 w-1 rounded bg-ssgmce-dark-blue/70 mr-2 sm:block" />
            <div className="inline-flex items-center justify-center rounded-full px-2 py-1 text-[10px] font-semibold tracking-wide news-badge text-white shadow-sm sm:px-3 sm:py-1 sm:text-xs">
              <svg className="mr-1.5 h-3 w-3 sm:mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M3 10v4h3l7 5V5L6 10H3z" fill="rgba(255,255,255,0.95)" />
                <path d="M21 8a3 3 0 010 8" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              LATEST
            </div>
          </div> */}

          <div className="min-w-0 flex-1 flex items-center gap-4">
            {/* <div className="flex items-center gap-3 flex-shrink-0 sm:hidden">
              <video src={newVideo} autoPlay loop muted playsInline className="h-6 w-auto object-contain" />
            </div> */}

            <div className="overflow-hidden items-center mt-2 ">
              <div className="news-track">
                {[...items, ...items].map((it, idx) => (
                  <span key={idx} className="news-item text-base font-medium text-white/95">
                    <video src={newVideo} autoPlay loop muted playsInline className="h-14 w-auto object-contain flex-shrink-0" />
                    {it?.title || 'Latest update from SSGMCE'}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* <div className="hidden flex-shrink-0 sm:block">
            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold text-white news-cta transition-transform group-hover:translate-x-1">
              View News
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </span>
          </div> */}
        </div>
      </div>
    </Link>
  );
};

export default NewsTicker;
