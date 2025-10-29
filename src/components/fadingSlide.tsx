"use client";

import { useInView } from "react-intersection-observer";

export default function FadingSlide({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView({
    threshold: 0.5, 
    triggerOnce: false,
  });

  return (
    <section
      ref={ref}
      className={`
        w-screen h-screen snap-start shrink-0
        transition-opacity duration-800 ease-in-out
        ${inView ? "opacity-100" : "opacity-0"}
      `}
    >
      {children}
    </section>
  );
}