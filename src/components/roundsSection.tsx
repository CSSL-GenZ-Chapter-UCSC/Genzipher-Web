"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import RoundInfoView from "@/components/roundInfoView";
import FadingSlide from "@/components/fadingSlide";
import MobileCarousel from "@/components/mobileCarousel";

const slides = [
  {
    num: 1,
    props: {
      img: "/assets/guy1.webp",
      text: "First Round",
      subtext: "You will be given 8 hours",
      venue: "Online",
      footer:
        "Teams of 3–4 members will dive into an online selection round, where competitive programming and CTF challenges run side by side. Only the top 10 teams will advance to the grand finale.",
    },
  },
  {
    num: 2,
    props: {
      img: "/assets/lady1.webp",
      text: "Workshop 1",
      subtext: "",
      venue: "Online",
      footer: "A Workshop on CTF",
    },
  },
  {
    num: 3,
    props: {
      img: "/assets/lady2.webp",
      text: "Workshop 2",
      subtext: "",
      venue: "Online",
      footer: "A Workshop on AI Agents",
    },
  },
  {
    num: 4,
    props: {
      img: "/assets/guy2.webp",
      text: "Final Round",
      subtext: "You will be given 24 hours",
      venue: "To be decided",
      footer:
        "The top 10 teams from Round 1 step into the ultimate challenge, each consisting of 3–4 members. In this grand finale, teams tackle a real world problem by completing the full product development cycle. The journey begins with a “pawning phase,” where teams decipher clues to uncover the development theme, setting the stage for innovative. Participants are free to use any tech stack, including AI-powered tools, to bring their ideas to life.",
    },
  },
];

const fade = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function RoundsSection() {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(
    null,
  );

  const indexRef = useRef(0);
  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const scrollCooldownRef = useRef(false);
  const cooldownTimeoutRef = useRef<number | null>(null);

  const startCooldown = (ms = 650) => {
    scrollCooldownRef.current = true;
    if (cooldownTimeoutRef.current !== null) {
      window.clearTimeout(cooldownTimeoutRef.current);
    }
    cooldownTimeoutRef.current = window.setTimeout(() => {
      scrollCooldownRef.current = false;
    }, ms);
  };

  useEffect(() => {
    return () => {
      if (cooldownTimeoutRef.current !== null) {
        window.clearTimeout(cooldownTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const main = document.querySelector("main");
    if (main instanceof HTMLElement) {
      setScrollContainer(main);
    }
  }, []);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollCooldownRef.current) {
      e.preventDefault();
      return;
    }

    if (animating) {
      e.preventDefault();
      return;
    }

    const delta = e.deltaY;

    if (Math.abs(delta) < 15) return;

    const goingDown = delta > 0;
    const goingUp = delta < 0;

    const currentIndex = indexRef.current;
    const lastIndex = slides.length - 1;

    const isFirst = currentIndex === 0;
    const isLast = currentIndex === lastIndex;

    if (isFirst && goingUp && scrollContainer) {
      e.preventDefault();
      scrollContainer.scrollBy({
        top: -window.innerHeight,
        behavior: "smooth",
      });
      startCooldown(); // prevent overshooting
      return;
    }

    if (isLast && goingDown && scrollContainer) {
      e.preventDefault();
      scrollContainer.scrollBy({
        top: window.innerHeight,
        behavior: "smooth",
      });
      startCooldown();
      return;
    }

    if (goingDown && !isLast) {
      e.preventDefault();
      const nextIndex = Math.min(currentIndex + 1, lastIndex);
      indexRef.current = nextIndex;
      setAnimating(true);
      setIndex(nextIndex);
      startCooldown();
    } else if (goingUp && !isFirst) {
      e.preventDefault();
      const nextIndex = Math.max(currentIndex - 1, 0);
      indexRef.current = nextIndex;
      setAnimating(true);
      setIndex(nextIndex);
      startCooldown();
    }
  };

  const safeIndex = Math.min(Math.max(index, 0), slides.length - 1);
  const current = slides[safeIndex];
  if (!current) return null;

  return (
    <section
      className="w-full h-screen snap-start bg-[#140E02]"
      id="timeline"
    >
      <div
        className="hidden md:block h-full overflow-hidden"
        onWheel={handleWheel}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={safeIndex}
            variants={fade}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full h-full"
            onAnimationComplete={() => setAnimating(false)}
          >
            <FadingSlide num={current.num}>
              <RoundInfoView {...current.props} />
            </FadingSlide>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="block md:hidden h-full">
        <MobileCarousel>
          {slides.map((s, i) => (
            <RoundInfoView key={i} {...s.props} />
          ))}
        </MobileCarousel>
      </div>
    </section>
  );
}
