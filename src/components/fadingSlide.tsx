"use client";

import { useInView } from "react-intersection-observer";
import Image from "next/image";
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
    <section
      ref={ref}
      className={`
        w-screen h-screen snap-start shrink-0
        transition-opacity duration-800 ease-in-out overflow-hidden
        ${inView ? "opacity-100" : "opacity-0"}
      `}
    >
      <Image
        src={`/assets/twerl${num}.png`}
        alt="Overlay"
        width={500}
        height={500}
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 object-contain z-999"
        style={{ height: "100%", width: "auto" }}
      />

      {children}
    </section>
  );
}
