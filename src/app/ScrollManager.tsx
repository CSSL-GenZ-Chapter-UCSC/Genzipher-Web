"use client";

import { useEffect } from "react";

export default function ScrollManager() {
  useEffect(() => {
    // Disable browser scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Force scroll containers to top on hard reload
    const onLoad = () => {
      requestAnimationFrame(() => {
        // reset window scroll
        window.scrollTo(0, 0);

        // reset ALL scrollable containers (important for mobile)
        document
          .querySelectorAll<HTMLElement>("[data-scroll-container]")
          .forEach((el) => {
            el.scrollTop = 0;
          });
      });
    };

    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return null;
}
