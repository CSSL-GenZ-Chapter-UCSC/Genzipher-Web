"use client";

import React, { useState, useEffect, useRef } from "react";
import NextImage from "next/image";

export default function SplashScreen() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const images = [
    "/assets/images/splash/Landing 1.png",
    "/assets/images/splash/Landing 2.png",
    "/assets/images/splash/Landing 3.png",
    "/assets/images/splash/Landing 4.png",
    "/assets/images/splash/Landing 5.png",
    "/assets/images/splash/Landing 6.png",
    "/assets/images/splash/Landing 6.png",
  ];

  // Scroll listener — now reads from the local scroll container
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const el = containerRef.current;
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      const progress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
      setScrollProgress(progress);
    };

    const el = containerRef.current;
    el?.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);

  const getCurrentImageIndex = () =>
    Math.min(Math.floor(scrollProgress * (images.length)), images.length - 1);

  const getImageStyle = (index: number) => {
    const progress = scrollProgress * (images.length - 1);
    const imageProgress = progress - index;
    // Make the final scene zoom in more toward the center (throne is in the middle)
    const lastIndex = images.length - 1;
    // stronger zoom for the final scene for a dramatic effect
    const focalMultiplier = index === lastIndex ? 1.0 : 0.35;
    // smooth scale curve
    let scale = 1 + Math.max(0, 1 - Math.abs(imageProgress)) * focalMultiplier;
    const opacity = Math.max(0, 1 - Math.abs(imageProgress));
    return {
      transform: `scale(${scale})`,
      opacity,
      zIndex: index === getCurrentImageIndex() ? 10 : 1,
      // For the final image, zoom toward the center to focus on the throne
      transformOrigin: index === lastIndex ? "center center" : "center center",
      transition: 'transform 850ms cubic-bezier(.2,.9,.2,1), opacity 650ms ease',
    } as React.CSSProperties;
  };

  return (
    <div
      ref={containerRef}
      className="relative h-screen overflow-y-scroll no-scrollbar bg-black"
    >
      {/* The tall scrollable inner layer */}
      <div className="relative h-[600vh]">
        {/* Sticky viewport area */}
        <div className="sticky top-0 h-screen w-full overflow-hidden select-none">
          {images.map((src, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-all duration-700 ease-out"
              style={getImageStyle(index)}
            >
              <NextImage
                src={src}
                alt={`Scene ${index + 1}`}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}

          {/* Centered logo that fades in as user reaches the last scene */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            {/* compute opacity based on scroll progress nearing the last scene */}
            {/* Fade in over the last ~0.5 step of the scroll */}
            {(() => {
              const progress = scrollProgress * (images.length - 1);
              const lastIndex = images.length - 1;
              const fadeStart = lastIndex - 0.5; // begin fading when progress crosses this
              const logoOpacity = Math.max(0, Math.min(1, (progress - fadeStart) / 0.5));
              // subtle scale for logo: from 0.96 -> 1.06 as it fades in
              const minScale = 0.96;
              const maxScale = 1.06;
              const logoScale = minScale + (maxScale - minScale) * logoOpacity;
              return (
                <NextImage
                  src="/assets/genzipher-text-logo-1.png"
                  alt="Genzipher"
                  width={692}
                  height={252}
                  style={{
                    opacity: logoOpacity,
                    transform: `scale(${logoScale})`,
                    transition: 'opacity 900ms ease, transform 900ms cubic-bezier(.2,.9,.2,1)'
                  }}
                  priority
                />
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
