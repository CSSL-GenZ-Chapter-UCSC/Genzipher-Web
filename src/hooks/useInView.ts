// src/hooks/useInView.ts
'use client'
import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement = HTMLElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true); // one-way reveal
    }, options ?? { threshold: 0.35 });

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}
