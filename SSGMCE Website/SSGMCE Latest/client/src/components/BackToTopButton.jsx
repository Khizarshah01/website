import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const VISIBILITY_THRESHOLD = 320;

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > VISIBILITY_THRESHOLD);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-5 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-ssgmce-blue text-white shadow-lg shadow-blue-900/20 transition-all duration-300 hover:-translate-y-1 hover:bg-ssgmce-dark-blue focus:outline-none focus:ring-2 focus:ring-ssgmce-orange focus:ring-offset-2 md:bottom-8 md:right-8 md:h-14 md:w-14 ${
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <FaArrowUp className="text-base md:text-lg" />
    </button>
  );
};

export default BackToTopButton;
