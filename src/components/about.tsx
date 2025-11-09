"use client";
import Image from "next/image";

export default function About() {

  return (
    <section className="relative w-screen h-screen bg-[#D8CDB9]">
      {/* Content Container */}
      <div className="relative h-full">
        {/* Logo */}
        <div style={{ position: 'absolute', left: '50px', top: '100px' }}>
          <Image
            src="/assets/genzipher-text-logo-1.png"
            alt="Genzipher"
            width={692}
            height={252.26}
            style={{ opacity: 1 }}
            priority
          />
        </div>

        {/* About Text */}
        <div style={{ width: '692px', height: '196px', opacity: 1 }}>
          <p className="text-[#383838] text-justify">
            textgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheretextgoesheret
          </p>
        </div>
      </div>
    </section>
  );
}
