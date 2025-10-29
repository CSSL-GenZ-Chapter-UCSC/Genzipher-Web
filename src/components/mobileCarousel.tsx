"use client";

import { useEffect, useRef, useState } from "react";

export default function MobileCarousel({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  const pages = Array.isArray(children) ? children : [children];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const w = el.clientWidth || 1;
        setIdx(Math.round(el.scrollLeft / w));
        ticking = false;
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (i: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div
        ref={containerRef}
        className="
          flex w-screen h-screen overflow-x-auto overflow-y-hidden
          snap-x snap-mandatory scroll-smooth touch-pan-x
          no-scrollbar
        "
        style={{ scrollSnapStop: "always" }}
      >
        {pages.map((child, i) => {
          const active = idx === i;
          return (
            <section
              key={i}
              className={`
                w-screen h-screen shrink-0 snap-center
                transition-all duration-300 ease-in-out
                ${active ? "opacity-100" : "opacity-60"}
              `}
              style={{
                transform: active ? "scale(1)" : "scale(0.97)",
              }}
            >
              {child}
            </section>
          );
        })}
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2 z-50">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition-colors
              ${idx === i ? "bg-white/90" : "bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}
