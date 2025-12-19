"use client";

import Image from "next/image";
import { useMemo, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Button from "./button";

interface Award {
  key: string;
  src: string;
  title: string;
  prize: string;
  borderGradient: string;
}

export default function Awards() {
  const items: Award[] = useMemo(
    () => [
      {
        key: "vision",
        src: "/assets/awards/bronze_cup.webp",
        title: "THE FLAME OF VISION",
        prize: "Rs. 20,000",
        borderGradient:
          "linear-gradient(180deg, #A89463 10.09%, #4C2900 84.75%)",
      },
      {
        key: "honor",
        src: "/assets/awards/gold_cup.webp",
        title: "THE GUARDIANS HONOR",
        prize: "Rs. 50,000",
        borderGradient:
          "linear-gradient(180deg, #A78A4E 10.09%, #6B5528 84.75%)",
      },
      {
        key: "innovator",
        src: "/assets/awards/silver_cup.webp",
        title: "THE DIVINE INNOVATOR",
        prize: "Rs. 30,000",
        borderGradient:
          "linear-gradient(180deg, #643901 10.09%, #85652C 84.75%)",
      },
    ],
    []
  );

  const [order, setOrder] = useState<string[]>(items.map((i) => i.key));

  function onClickItem(originalIndex: number) {
    const current = [...order];
    const clickedKey = items[originalIndex].key;
    const pos = current.indexOf(clickedKey);

    // Keep the "featured" (center) interaction like the original:
    if (pos === 0) setOrder([current[2], current[0], current[1]]);
    else if (pos === 2) setOrder([current[1], current[2], current[0]]);
  }

  const containerRef = useRef<HTMLDivElement | null>(null);
          //@ts-ignore

  const isInView = useInView(containerRef, {
    margin: "-10% 0px -10% 0px",
    amount: 0.25,
  });

  useEffect(() => {
  // Only on mobile
  if (typeof window === "undefined") return;
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  if (!isMobile) return;

  // Default focus = middle card (your Rs. 50,000 one)
  const defaultKey = items[1].key; // "honor" in your current items order

  const el = containerRef.current?.querySelector(
    `[data-award-key="${defaultKey}"]`
  ) as HTMLElement | null;

  // Wait a tick so layout/snap widths are ready
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    });
  });
}, [items]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0F0D08]">
      {/* subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_40%,rgba(168,148,99,0.10),rgba(0,0,0,0)_60%)]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 md:px-8 min-h-screen flex flex-col items-center">
        {/* Header */}
        <header className="w-full pt-14 md:pt-20 pb-8 md:pb-12 text-center">
          <div>
              <h2 className="text-[2rem] md:text-[3.25rem] leading-tight text-[#E6D9B6]">
            Prize pool
          </h2>
       <div className="mt-4 text-[#E6D9B6]/80 text-sm md:text-lg uppercase tracking-widest px-[10%] text-center block">
  Step into the battle and claim what’s yours.
</div>
          </div>
        

          {/* Mobile UX hint */}
          <p className="mt-3 text-sm text-[#E6D9B6]/60 md:hidden">
            Swipe to view 
          </p>
        </header>

        {/* Awards row */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          //@ts-ignore
          className="relative z-10 w-full flex items-center md:justify-center justify-start
                     gap-5 md:gap-14
                     overflow-x-auto md:overflow-visible
                     px-2 md:px-0 pb-2
                     snap-x snap-mandatory
                     [-webkit-overflow-scrolling:touch]
                     [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
                     [--card-w:clamp(10.5rem,70vw,14rem)]
                     md:[--card-w:clamp(18rem,23vw,23rem)]"
        >
          {order.map((key, displayIdx) => {
            const it = items.find((x) => x.key === key)!;
            const isCenter = displayIdx === 1;
            const originalIndex = items.findIndex((x) => x.key === it.key);

            return (
              <button
                key={it.key}
                data-award-key={it.key}
                onClick={() => onClickItem(originalIndex)}
                aria-label={`Focus ${it.title}`}
                className={[
                  "group relative shrink-0 snap-center",
                  "w-[var(--card-w)]",
                  "p-0.5 rounded-[44px] focus:outline-none",
                  "focus-visible:ring-2 focus-visible:ring-[#A89463]/60 focus-visible:ring-offset-0",
                  "transition-transform duration-300 ease-out transform-gpu",
                  "md:hover:scale-[1.03] md:hover:-translate-y-1",
                  !isCenter ? "md:translate-y-5" : "",
                ].join(" ")}
                // style={{ background: it.borderGradient }}
              >
                {/* Inner card */}
                <div className="rounded-[42px]  overflow-hidden w-full h-full">
                  {/* Card layout matching original: image + bottom pill */}
                  <div
                    className={[
                      "w-full h-full flex flex-col",
                      "pt-6 md:pt-8",
                      "px-5 md:px-6",
                      "pb-5 md:pb-6",
                    ].join(" ")}
                    style={{
                      // tall rounded card like original
                      aspectRatio: "3 / 4.2",
                    }}
                  >
                    {/* Image */}
                    <motion.div
                      layout
                      animate={{
                        scale: isCenter ? 1.02 : 0.965,
                        y: isCenter ? 0 : 10,
                        opacity: isCenter ? 1 : 0.9,
                      }}
                      transition={{ duration: 0.45, ease: [0.2, 0.9, 0.2, 1] }}
          //@ts-ignore

                      className="relative flex-1 w-full"
                    >
                      <Image
                        src={it.src}
                        alt={it.title}
                        fill
                        className="object-contain select-none"
                        priority={isCenter}
                        sizes="(min-width: 1024px) 24vw, (min-width: 768px) 30vw, 75vw"
                      />
                    </motion.div>

                    {/* Prize pill (consistent sizing, no “50,000 looks smaller”) */}
                    <div className="mt-4 flex justify-center">
                      <div
                        className={[
                          "inline-flex items-center justify-center",
                          "rounded-full border border-[#A89463]/35",
                          "bg-[#0B0A07]/70 backdrop-blur-sm",
                          "text-[#E6D9B6] whitespace-nowrap tabular-nums tracking-wide",
                          "shadow-[0_0_0_1px_rgba(168,148,99,0.18),0_14px_40px_rgba(0,0,0,0.65)]",
                          // responsive sizing
                          "px-6 py-2.5 md:px-8 md:py-3.5",
                          "text-[1rem] md:text-[1.25rem]",
                          // equal visual weight across all prizes
                          "min-w-[10.5rem] md:min-w-[12.5rem]",
                          // tiny hover glow (desktop only)
                          "md:group-hover:shadow-[0_0_0_1px_rgba(168,148,99,0.25),0_18px_55px_rgba(0,0,0,0.75)]",
                        ].join(" ")}
                      >
                        <span className="opacity-95">{it.prize}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* subtle center emphasis like original */}
                {isCenter && (
                  <div className="pointer-events-none absolute -inset-6 rounded-[52px] bg-[radial-gradient(60%_55%_at_50%_50%,rgba(168,148,99,0.18),rgba(0,0,0,0)_70%)]" />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* CTA */}
        <footer className="w-full flex  flex-col  items-center justify-center pt-10 md:pt-14 pb-12 md:pb-16">
          <Link href="/register" className="inline-block group">
            <Button text="REGISTER" disabled={false} />
          </Link>
          <span className="text-[#E6D9B6]/70 md:text-[#E6D9B6]/50 text-[0.7rem] md:text-lg uppercase tracking-widest mt-5">Register today. The rewards are waiting</span>

        </footer>
      </div>
    </section>
  );
}
