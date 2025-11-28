"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/hero";
import PartnerWithUs from "@/components/partnerWithUs";
import Awards from "@/components/awards";
import Footer from "@/components/footer";
import ContactUs from "@/components/contactUs";
import SplashScreen from "@/components/splashScreen";
import Image from "next/image";
import MobileSplash from "@/components/mobileSplash";

import About from "@/components/about";
import AboutMobile from "@/components/about.mobile"; // ✅ MOBILE VERSION
import RoundsSection
 from "@/components/roundsSection";
export default function Home() {
  // ✅ Detect mobile screen width
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update(); // run once at load
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <main
      className="
        w-screen h-screen
        overflow-y-auto overflow-x-hidden 
       snap-y snap-mandatory 
        bg-[#0f0d08] box-border
        scroll-smooth
      "
    >
      {/* DESKTOP SPLASH SCREEN */}
      <section
        id="home"
        className="snap-start h-screen overflow-hidden bg-black hidden md:block"
      >
        <SplashScreen />
      </section>

      {/* MOBILE SPLASH SCREEN (first-load animated) */}
      <MobileSplash />

      {/* HERO SECTION */}
      <section className="w-full h-full snap-start bg-[url('/assets/countdown-m-bg.webp')] bg-cover bg-center md:bg-none">
        <Hero />
      </section>

      {/* ABOUT SECTION (DESKTOP | MOBILE) */}
      <section className="relative w-screen snap-start bg-[#D8CDB9]" id="about">
        {isMobile ? <AboutMobile /> : <About />}
      </section>

      <section className="w-full h-full snap-start bg-[#140E02]">
        <RoundsSection />
      </section>

      {/* PARTNER SECTION */}
      <section className="w-full h-full snap-start">
        <PartnerWithUs />
      </section>

      {/* AWARDS SECTION */}
      <section className="w-full h-full snap-start">
        <Awards />
      </section>

      {/* DESKTOP CONTACT + FOOTER */}
      <section className="md:block hidden w-full snap-start" is="contact">
        <div className="flex flex-col justify-between bg-[#D8CDB9]">
          <ContactUs />
          <Footer />
        </div>
      </section>

      {/* MOBILE CONTACT */}
      <section className="block md:hidden w-full h-full snap-start">
        <ContactUs />
      </section>

      {/* MOBILE FOOTER */}
      <section className="flex md:hidden w-full h-[100vh] bg-[#D8CDB9] snap-start">
        <Footer />
      </section>
    </main>
  );
}
