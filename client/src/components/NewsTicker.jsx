import React from 'react';
import { Link } from 'react-router-dom';
import newGif from '../assets/images/home/new.gif';

const NewsTicker = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <Link
      to="/news"
      aria-label="Open news page"
      className="group block overflow-hidden border-t border-b border-white/6 bg-ssgmce-dark-blue/95 text-white"
    >
      <style>{`
        .news-wrap { display:flex; align-items:center; gap:1rem; }
        .news-badge { background: linear-gradient(90deg,#ff6b6b,#ff3b3b); }
        .news-track { display:inline-flex; align-items:center; gap:8rem; white-space:nowrap; animation: marquee 50s linear infinite; }
        .news-track:hover { animation-play-state: paused; }
        .news-item { display:inline-flex; align-items:center;flex-shrink:0; }
        .news-dot { width:12px; height:12px; border-radius:9999px; background:#ff3b3b; box-shadow:0 0 14px rgba(255,59,59,0.8); animation: blinkDot 1s ease-in-out infinite; flex-shrink:0; }
        .pulse-dot { width:10px; height:10px; border-radius:9999px; background: radial-gradient(circle, #ff6b6b 0%, #ff3b3b 60%); box-shadow:0 0 12px rgba(255,60,60,0.36); }
        .news-cta { background: rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.06); }
        @media (max-width: 640px) {
          .news-wrap { gap:0.65rem; }
          .news-track { gap:3rem; }
          .news-item { font-size:14px; }
          .news-dot { width:10px; height:10px; }
        }
        @keyframes blinkDot { 0%, 100% { opacity: 0.35; transform: scale(0.85); } 50% { opacity: 1; transform: scale(1); } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>

      <div className="w-full">
        <div className="news-wrap ">
          <div className="overflow-hidden items-center">
            <div className="news-track mt-2">
              {[...items, ...items].map((it, idx) => (
                <span key={idx} className="news-item text-base font-medium text-white/95">
                  <img src={newGif} alt="New" className="h-10 sm:h-14 w-auto object-contain " />
                  {it?.title || 'Latest update from SSGMCE'}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
};

export default NewsTicker;
