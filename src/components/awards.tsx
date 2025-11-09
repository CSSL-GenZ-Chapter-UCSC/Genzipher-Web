"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

// Types
interface Award {
  key: string;
  src: string;
  title: string;
  w: number; // intrinsic ratio width
  h: number; // intrinsic ratio height
  borderGradient: string; // CSS gradient for the faux border
}

export default function Awards() {
  const items: Award[] = [
    {
      key: "vision",
      src: "/assets/awards/vision_award.png",
      title: "THE FLAME OF VISION",
      w: 220,
      h: 334,
      borderGradient: "linear-gradient(180deg, #A89463 10.09%, #4C2900 84.75%)",
    },
    {
      key: "honor",
      src: "/assets/awards/honor_award.png",
      title: "THE GUARDIANS HONOR",
      w: 336,
      h: 511,
      borderGradient: "linear-gradient(180deg, #A78A4E 10.09%, #6B5528 84.75%)",
    },
    {
      key: "innovator",
      src: "/assets/awards/innovator_award.png",
      title: "THE DIVINE INNOVATOR",
      w: 220,
      h: 334,
      borderGradient: "linear-gradient(180deg, #643901 10.09%, #85652C 84.75%)",
    },
  ];

  const [order, setOrder] = useState<string[]>(items.map((i) => i.key));

  function onClickItem(originalIndex: number) {
    const current = [...order];
    const clickedKey = items[originalIndex].key;
    const pos = current.indexOf(clickedKey);

    if (pos === 0) setOrder([current[2], current[0], current[1]]);
    else if (pos === 2) setOrder([current[1], current[2], current[0]]);
  }

  return (
    <section className="h-full w-full overflow-hidden bg-[#0F0D08]">
      <div className="h-full mx-auto w-full max-w-6xl px-4 md:px-6 grid grid-rows-[auto_0.5fr_auto] items-center">

        <header className="py-4 md:py-6 text-center h-[20vh] flex items-center justify-center">

          <h2 className="text-2xl md:text-3xl leading-tight text-[#E6D9B6]">
            {order[1] === "honor" ? (
              "EARN YOUR PRIZE"
            ) : (
              <>
                <span>Honoring the divine spirit of creation</span>
                <br />
                <span>and courage</span>
              </>
            )}
          </h2>
        </header>

        {/* Cards row */}
        <div
          // CSS vars provide fluid sizing without magic numbers; responsive overrides per breakpoint
          className="min-h-0 flex items-center md:justify-center gap-3 md:gap-10 overflow-x-hidden md:overflow-visible px-2 md:px-0
                     [--card-w-center:clamp(9rem,38vw,15rem)] md:[--card-w-center:clamp(14rem,28vw,21rem)]
                     [--card-w-side:clamp(7.5rem,26vw,12rem)] md:[--card-w-side:clamp(10rem,20vw,14rem)]"
        >
          {order.map((key, displayIdx) => {
            const it = items.find((x) => x.key === key)!;
            const isCenter = displayIdx === 1;
            const originalIndex = items.findIndex((x) => x.key === it.key);

            return (
              <button
                key={it.key}
                onClick={() => onClickItem(originalIndex)}
                aria-label={`Show ${it.title}`}
                className={[
                  isCenter ? "basis-[var(--card-w-center)]" : "basis-[var(--card-w-side)]",
                  "min-w-0 relative p-[2px] rounded-[44px] transition-transform duration-500 ease-[cubic-bezier(0.45,1.45,0.8,1)] will-change-transform",
                  // Only offset side cards on md+ so mobile doesn't grow vertically
                  isCenter ? "scale-100" : "md:translate-y-4 md:scale-95",
                  "hover:scale-100 focus:outline-none",
                ].join(" ")}
                style={{ background: it.borderGradient, aspectRatio: `${it.w}/${it.h}` }}
              >
                <div className="rounded-[42px] bg-[#0F0D08] overflow-hidden w-full h-full">
                  <div className="relative w-full h-full">
                    <Image
                      src={it.src}
                      alt={it.title}
                      fill
                      className="object-contain select-none transition-opacity duration-300"
                      priority={isCenter}
                      sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 60vw"
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <footer className="py-4 flex justify-center">
          <Link href="/register" className="inline-block group">
            <span className="inline-flex items-center justify-center w-[10.8rem] h-14 bg-[#C39613] font-bold rounded-md text-black transition-shadow duration-300 shadow-[0_0_20px_rgba(195,150,19,0.4),0_0_40px_rgba(195,150,19,0.25),0_0_60px_rgba(195,150,19,0.15)] hover:shadow-[0_0_25px_rgba(195,150,19,0.7),0_0_50px_rgba(195,150,19,0.5),0_0_80px_rgba(195,150,19,0.3)]">
              REGISTER
            </span>
          </Link>
        </footer>
      </div>
    </section>
  );
}
