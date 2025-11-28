"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

export default function FadingSlide({
  num,
  children,
}: {
  num: number;
  children: React.ReactNode;
}) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  return (
    // This section is just a "scroll spacer" – one viewport tall
    <section
      ref={ref}
      className="
        relative
        w-screen h-screen
        snap-start shrink-0
      "
    >
      {/* This is the actual visible slide, pinned to the viewport */}
      <motion.div
        //@ts-ignore
        className="fixed inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          pointerEvents: inView ? "auto" : "none", // only active slide is interactive
        }}
      >
        <Image
          src={`/assets/twerl${num}.webp`}
          alt="Overlay"
          width={500}
          height={500}
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 object-contain z-50"
          style={{ height: "100%", width: "auto" }}
        />

        {children}
      </motion.div>
    </section>
  );
}
