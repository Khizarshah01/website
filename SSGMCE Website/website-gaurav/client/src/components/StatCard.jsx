import { useEffect, useMemo, useRef, useState } from 'react';

const StatCard = ({ icon: Icon, number, label }) => {
  const cardRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);

  const { targetValue, suffix, canAnimate } = useMemo(() => {
    const value = String(number ?? '');
    const match = value.match(/^(\d+)(.*)$/);

    if (!match) {
      return { targetValue: 0, suffix: value, canAnimate: false };
    }

    return {
      targetValue: Number(match[1]),
      suffix: match[2] || '',
      canAnimate: true,
    };
  }, [number]);

  useEffect(() => {
    const currentCard = cardRef.current;

    if (!currentCard || !canAnimate) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(currentCard);

    return () => observer.disconnect();
  }, [canAnimate]);

  useEffect(() => {
    if (!hasAnimated || !canAnimate) {
      return undefined;
    }

    let animationFrame;
    const duration = 1700;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(Math.round(targetValue * easedProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [canAnimate, hasAnimated, targetValue]);

  const visibleNumber = canAnimate
    ? `${hasAnimated ? displayValue : 0}${suffix}`
    : number;

  return (
    <div ref={cardRef} className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md md:p-10">
      {Icon && (
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-ssgmce-blue/8 md:h-[4.5rem] md:w-[4.5rem]">
          <Icon className="text-2xl text-ssgmce-blue" />
        </div>
      )}
      <h3 className="mb-2 text-[1.5rem] font-bold text-gray-800 md:text-[1.8rem]">{visibleNumber}</h3>
      <p className="text-xs font-medium uppercase tracking-wide text-ssgmce-muted md:text-sm">{label}</p>
    </div>
  );
};

export default StatCard;
