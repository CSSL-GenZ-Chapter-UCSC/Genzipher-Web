"use client";

import { useEffect, useState } from "react";

import RoundInfoView from "@/components/roundInfoView";
import FadingSlide from "@/components/fadingSlide";
import MobileCarousel from "@/components/mobileCarousel";
import Hero from "@/components/hero";
import PartnerWithUs from "@/components/partnerWithUs";
import Awards from "@/components/awards";
import Footer from "@/components/footer";
import ContactUs from "@/components/contactUs";
import SplashScreen from "@/components/splashScreen";
import Image from "next/image";

import About from "@/components/about";
import AboutMobile from "@/components/about.mobile"; // ✅ MOBILE VERSION


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
        w-screen h-[100svh] 
        overflow-y-auto overflow-x-hidden 
        md:snap-y md:snap-mandatory 
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

      {/* MOBILE SPLASH SCREEN */}
      <section
        className="
          w-full h-full md:snap-start 
          bg-[url('/assets/images/splash/landing-6-mobile.webp')] bg-cover bg-center
          bg-black/60 bg-blend-multiply flex items-center justify-center md:hidden
        "
      >
        <Image
          src="/assets/genzipher-text-logo-1.webp"
          alt="GenZipher Logo"
          width={964}
          height={356}
          className="mx-auto mb-[15%] md:mb-4 md:w-[60vw] h-auto"
        />
      </section>

      {/* HERO SECTION */}
      <section className="w-full h-full md:snap-start bg-[url('/assets/countdown-m-bg.webp')] bg-cover bg-center md:bg-none">
        <Hero />
      </section>

      {/* ABOUT SECTION (DESKTOP | MOBILE) */}
      <section className="relative w-screen md:snap-start bg-[#D8CDB9]">
        {isMobile ? <AboutMobile /> : <About />}
      </section>

      {/* ROUNDS SECTION */}
      <section className="w-full h-full md:snap-start bg-[#140E02]">
        {/* DESKTOP SLIDES */}
        <div
          className="hidden md:block h-full overflow-x-hidden overflow-y-auto snap-y snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {[1, 2, 3, 4].map((num) => (
            <FadingSlide key={num} num={num}>
              <RoundInfoView
                img={`/assets/${["guy1", "lady1", "lady2", "guy2"][num - 1]}.webp`}
                text={`ROUND ${num}`}
                footer={`INFO ON ROUND ${num}`}
              />
            </FadingSlide>
          ))}
        </div>

        {/* MOBILE CAROUSEL */}
        <div className="block md:hidden h-full">
          <MobileCarousel>
            <RoundInfoView img="/assets/guy1.webp" text="ROUND 1" footer="INFO ON ROUND 1" />
            <RoundInfoView img="/assets/lady1.webp" text="ROUND 2" footer="INFO ON ROUND 2" />
            <RoundInfoView img="/assets/lady2.webp" text="ROUND 3" footer="INFO ON ROUND 3" />
            <RoundInfoView img="/assets/guy2.webp" text="ROUND 4" footer="INFO ON ROUND 4" />
          </MobileCarousel>
        </div>
      </section>

      {/* PARTNER SECTION */}
      <section className="w-full h-full md:snap-start">
        <PartnerWithUs />
      </section>

      {/* AWARDS SECTION */}
      <section className="w-full h-full md:snap-start">
        <Awards />
      </section>

      {/* DESKTOP CONTACT + FOOTER */}
      <section className="md:block hidden w-full h-full md:snap-start">
        <div className="flex flex-col justify-between h-full bg-[#D8CDB9]">
          <ContactUs />
          <Footer />
        </div>
      </section>

      {/* MOBILE CONTACT */}
      <section className="block md:hidden w-full h-full">
        <ContactUs />
      </section>

      {/* MOBILE FOOTER */}
      <section className="flex md:hidden w-full h-full bg-[#D8CDB9]">
        <Footer />
      </section>

    </main>
  );
}
