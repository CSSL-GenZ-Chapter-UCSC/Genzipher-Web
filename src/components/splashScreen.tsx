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
    let scale = 1 + Math.max(0, 1 - Math.abs(imageProgress)) * 0.3;
    const opacity = Math.max(0, 1 - Math.abs(imageProgress));
    return {
      transform: `scale(${scale})`,
      opacity,
      zIndex: index === getCurrentImageIndex() ? 10 : 1,
    };
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
              className="absolute inset-0 transition-all duration-300 ease-out"
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
        </div>
      </div>
    </div>
  );
}
