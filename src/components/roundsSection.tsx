"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const slides = [
  {
    num: 1,
    props: {
      img: "/assets/guy1.webp",
      text: "Introductory Session",
      subtext: "",
      date: "Dec 15", 
      venue: "Online",
      footer:
        "The GenZipher Introductory Session serves as the gateway to the competition, offering participants a clear understanding of the structure, rules, and expectations of the challenge ahead. This session provides essential insights into cybersecurity fundamentals, CTF methodologies, and effective problem solving strategies, ensuring that every contestant is well equipped before entering the competition.",
    },
  },
  {
    num: 2,
    props: {
      img: "/assets/lady1.webp",
      text: "Workshop 1",
      subtext: "",
      date: "Date: TBD", 
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
      date: "Date: TBD",
      venue: "Online",
      footer: "A Workshop on AI Agents",
    },
  },
  {
    num: 4,
    props: {
      img: "/assets/guy2.webp",
      text: "Initial Round",
      subtext: "8 hours",
      date: "Date: TBD",
      venue: "Online",
      footer:
        "Teams of 3–4 members will dive into an online selection round, where competitive programming and CTF challenges run side by side. Only the top 10 teams will advance to the grand finale.",
    },
  },

  {
    num: 5,
    props: {
      img: "/assets/guy3.webp",
      text: "Final Round",
      subtext: "24 hours",
      date: "Date: TBD",
      venue: "To be decided",
      footer:
        "The top 10 teams from Round 1 step into the ultimate challenge. In this grand finale, teams tackle a real world problem by completing the full product development cycle. The journey begins with a “pawning phase,” where teams decipher clues to uncover the development theme, setting the stage for innovative. Participants are free to use any tech stack, including AI-powered tools, to bring their ideas to life.",
    },
  },
];

const desktopLeadVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const desktopCardVariants = {
  hidden: (direction: number) => ({
    opacity: 0,
    y: 28,
    x: direction * 28,
    scale: 0.97,
  }),
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut", staggerChildren: 0.08 },
  },
};

const desktopImageVariants = {
  hidden: { opacity: 0.85, y: 12, scale: 1.05 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const mobileLeadVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const mobileCardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const mobileImageVariants = {
  hidden: { scale: 1.08, y: 10 },
  show: {
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function RoundsSection() {
  const [index, setIndex] = useState(0);
  const [expandedMobile, setExpandedMobile] = useState<number | null>(null);

  const goToIndex = (target: number) => {
    const lastIndex = slides.length - 1;
    const clamped = Math.min(Math.max(target, 0), lastIndex);
    setIndex(clamped);
  };

  const safeIndex = Math.min(Math.max(index, 0), slides.length - 1);
  if (!slides[safeIndex]) return null;

  return (
    <section
      className="relative w-full bg-[#140E02] pb-14 md:p-0 overflow-hidden"
      id="timeline"
    >
      {/* desktop version */}
      <div className="relative hidden md:flex flex-col items-center overflow-visible">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-10 h-72 w-72 bg-[#d8cdb9]/10 blur-3xl" />
          <div className="absolute right-[-120px] bottom-0 h-96 w-96 bg-[#d8cdb9]/12 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/10 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-6xl xl:max-w-7xl px-10 xl:px-14 py-14 flex flex-col gap-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.65 }}
            variants={desktopLeadVariants}
            //@ts-ignore
            className="text-center space-y-2"
          >
            <p className="text-xs uppercase tracking-[0.32em] text-[#D8CDB9]">
              The journey
            </p>
            <h3 className="text-[2.6rem] font-semibold text-white leading-tight">
              Follow the mythical path to the finale
            </h3>
            <p className="text-base text-[#e9dfca]/80">
              Scroll to drift through each phase or click a card to jump ahead.
            </p>
          </motion.div>

          <div className="relative flex flex-col gap-10 pb-8">
            <div className="pointer-events-none absolute left-1/2 top-2 bottom-2 -translate-x-1/2 w-px bg-gradient-to-b from-[#F2D8A1]/50 via-[#F2D8A1]/15 to-[#F2D8A1]/0" />

            {slides.map((s, i) => {
              const isLeft = i % 2 === 0;
              const isActive = i === safeIndex;
              const hasSubtext = Boolean(s.props.subtext?.trim());

              return (
                <motion.div
                  key={s.num}
                  variants={desktopCardVariants}
                  custom={isLeft ? -1 : 1}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, amount: 0.35, margin: "-10% 0px" }}
                  //@ts-ignore

                  className={`relative flex items-center gap-6 ${
                    isLeft ? "" : "flex-row-reverse"
                  }`}
                >
                  <div className="w-[46%]">
                    <button
                      onClick={() => goToIndex(i)}
                      className={`group block w-full text-left rounded-3xl border bg-gradient-to-br from-[#1d1406] via-[#120c03] to-[#1a1205] shadow-[0_30px_90px_-60px_rgba(0,0,0,0.95)] p-6 transition hover:border-white/20 hover:shadow-[0_32px_110px_-70px_rgba(0,0,0,0.9)] ${
                        isActive ? "border-[#F2D8A1]/40" : "border-white/10"
                      }`}
                    >
                      <motion.div
                        //@ts-ignore

                        className="relative h-52 rounded-2xl overflow-hidden border border-white/10"
                        variants={desktopImageVariants}
                      >
                        <Image
                          src={s.props.img}
                          alt={s.props.text}
                          fill
                          sizes="40vw"
                          className="object-contain object-top transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0b03] via-[#0f0b03]/70 to-transparent" />
                        <div className="absolute right-3 top-3 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#F2D8A1]">
                          {s.props.venue}
                        </div>
                      </motion.div>

                      <div className="mt-5 space-y-3">
                        {/* Desktop Metadata Row */}
                        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.26em] text-[#F2D8A1]/80">
                          {/* <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">
                            Phase {s.num.toString().padStart(2, "0")}
                          </span>
                           */}
                          {/* --- Date Added Here (Desktop) --- */}
                          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">
                            {s.props.date}
                          </span>

                          {hasSubtext ? (
                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                              {s.props.subtext}
                            </span>
                          ) : null}
                        </div>

                        <h4 className="text-2xl font-semibold text-white">
                          {s.props.text}
                        </h4>

                        <p className="text-base text-[#E8DEC7]/85 leading-relaxed">
                          {s.props.footer}
                        </p>
                      </div>
                    </button>
                  </div>

                  <div className="relative w-10 flex items-center justify-center">
                    <div
                      className={`absolute top-1/2 h-0.5 w-12 -translate-y-1/2 ${
                        isActive
                          ? "bg-gradient-to-r from-transparent via-[#F2D8A1] to-transparent"
                          : "bg-gradient-to-r from-transparent via-[#F2D8A1]/60 to-transparent"
                      }`}
                    />
                    <div
                      className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full border bg-[#140E02] shadow-[0_10px_40px_-18px_rgba(0,0,0,0.95)] ${
                        isActive ? "border-[#F2D8A1]" : "border-[#F2D8A1]/60"
                      }`}
                    >
                      <span
                        className={`h-2.5 w-2.5 rounded-full bg-gradient-to-b from-[#F2D8A1] to-[#b89c6f] ${
                          isActive
                            ? "scale-110 shadow-[0_0_0_8px_rgba(242,216,161,0.08)]"
                            : ""
                        }`}
                      />
                    </div>
                  </div>

                  <div className="w-[46%]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* mobile version */}
      <div className="relative block md:hidden w-full overflow-visible bg-[#140E02]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-10 top-6 w-52 h-52 bg-[#d8cdb9]/15 blur-3xl" />
          <div className="absolute right-[-40px] bottom-6 w-64 h-64 bg-[#d8cdb9]/12 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/8 to-transparent" />
        </div>

        <div className="relative w-full px-5 pt-14 md:pb-24 space-y-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.6 }}
            variants={mobileLeadVariants}
            //@ts-ignore

            className="space-y-3 text-center"
          >
            <p className="text-xs uppercase tracking-[0.32em] text-[#D8CDB9]">
              The journey
            </p>
            <h3 className="text-3xl font-semibold text-white leading-tight">
              Follow the mythic path to the finale
            </h3>
            <p className="text-base text-[#e9dfca]/80">
              Every stop raises the stakes. Glance the highlights, then open a
              phase to see what awaits your team.
            </p>
          </motion.div>

          <div className="relative pt-4">
            <div className="absolute left-[26px] top-8 bottom-10 w-px bg-gradient-to-b from-[#F2D8A1] via-[#F2D8A1]/40 to-transparent" />

            <div className="space-y-9">
              {slides.map((s, i) => {
                const isLast = i === slides.length - 1;
                const isOpen = expandedMobile === i;
                const hasSubtext = Boolean(s.props.subtext?.trim());

                const summary = s.props.subtext?.trim()
                  ? s.props.subtext
                  : `${s.props.footer.slice(0, 118)}${
                      s.props.footer.length > 118 ? "…" : ""
                    }`;

                return (
                  <motion.article
                    key={s.num}
                    //@ts-ignore

                    className="relative pl-12"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.35, margin: "-10% 0px" }}
                    variants={mobileCardVariants}
                  >
                    <div className="absolute left-[2px] top-[14px] flex flex-col items-center h-[calc(100%-10px)]">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-b from-[#F2D8A1] to-[#b89c6f] text-[#140E02] font-bold flex items-center justify-center shadow-[0_12px_40px_-18px_rgba(0,0,0,0.9)]">
                        {s.num.toString().padStart(2, "0")}
                      </div>
                      {!isLast && (
                        <div className="flex-1 w-px bg-gradient-to-b from-[#F2D8A1]/80 via-[#F2D8A1]/25 to-transparent" />
                      )}
                    </div>

                    <div className="rounded-2xl border border-[#D8CDB9]/25 bg-gradient-to-br from-[#1d1406] via-[#120c03] to-[#1a1205] shadow-[0_25px_80px_-55px_rgba(0,0,0,0.95)] overflow-hidden">
                      <motion.div
                        //@ts-ignore

                        className="relative h-48 overflow-hidden"
                        variants={mobileImageVariants}
                      >
                        <Image
                          src={s.props.img}
                          alt={s.props.text}
                          fill
                          priority
                          sizes="100vw"
                          className="object-cover object-top"
                        />
                        {/* <div className="absolute inset-0 bg-gradient-to-t from-[#0f0b03] via-transparent to-white/5" /> */}
                        <div className="absolute right-3 top-3 px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] rounded-full border border-white/20 bg-white/10 text-[#F2D8A1]">
                          {s.props.venue}
                        </div>
                      </motion.div>

                      <div className="p-5 space-y-3">
                        {/* Mobile Metadata Row */}
                        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#F2D8A1]/80">
                          {/* <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[0.62rem]">
                            Phase {s.num}
                          </span> */}
                          
                          {/* --- Date Added Here (Mobile) --- */}
                          <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[0.62rem]">
                            {s.props.date}
                          </span>
                        </div>

                        <h4 className="text-2xl font-semibold text-white leading-tight">
                          {s.props.text}
                        </h4>
                        {hasSubtext ? (
                          <p className="text-[#E8DEC7]/85 leading-relaxed">
                            {summary}
                          </p>
                        ) : null}

                        <button
                          onClick={() =>
                            setExpandedMobile((prev) => (prev === i ? null : i))
                          }
                          className="group mt-2 flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-[#F2D8A1] transition duration-200 hover:border-white/30 hover:bg-white/10"
                        >
                          <span className="tracking-[0.18em] uppercase text-xs">
                            {isOpen ? "Hide brief" : "Reveal mission"}
                          </span>
                          <span
                            className={`text-lg transition-transform duration-200 ${
                              isOpen ? "rotate-45" : ""
                            }`}
                          >
                            +
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.p
                              key="detail"
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 6 }}
                              transition={{ duration: 0.22, ease: "easeOut" }}
                              //@ts-ignore

                              className="mt-3 rounded-xl border border-white/10 bg-white/5 p-4 text-base text-[#f5ead7] leading-relaxed"
                            >
                              {s.props.footer}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}