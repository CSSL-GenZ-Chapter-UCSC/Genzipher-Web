"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import PartnerWithUs from "@/components/partnerWithUs";
import Awards from "@/components/awards";
import Footer from "@/components/footer";
import ContactUs from "@/components/contactUs";
import SplashScreen from "@/components/splashScreen";
import Image from "next/image";
import MobileSplash from "@/components/mobileSplash";
import About from "@/components/about";
import AboutMobile from "@/components/about.mobile"; 
import RoundsSection
    from "@/components/roundsSection";
import UniversityStats from "@/components/universityStats";
export default function Home() {
    // Ref for the scroll container (main)
    const mainRef = useRef < HTMLElement > (null);
    const [, setRefState] = useState({}); // Force re-render when ref is set

    const setRef = useCallback((node: HTMLElement | null) => {
        mainRef.current = node;
        if (node) setRefState({});
    }, []);

    const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update(); // run once at load
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <main
      ref={setRef}
      className="
        relative
        w-screen h-screen
        overflow-y-auto overflow-x-hidden 
       
        bg-[#0f0d08] box-border
      "
        >
            {/* DESKTOP SPLASH SCREEN */}
            <section
                id="home"
                className="h-screen overflow-hidden bg-black hidden md:block"
            >
                <SplashScreen />
            </section>

            {/* MOBILE SPLASH SCREEN (first-load animated) */}
            <MobileSplash />

            {/* ABOUT SECTION (DESKTOP | MOBILE) */}
            <section className="relative w-screen  bg-[#D8CDB9]" id="about">
                {isMobile ? <AboutMobile /> : <About scrollContainer={mainRef} />}
            </section>

            <section className="w-full h-max  bg-[#140E02]">
                <RoundsSection />
            </section>
            {/* UNIVERSITY STATS SECTION */}
            {/* <section className="w-full h-max  bg-[#140E02]">
                <UniversityStats />
            </section> */}

            {/* AWARDS SECTION */}
            <section className="w-full h-full">
                <Awards />
            </section>

            {/* DESKTOP CONTACT + FOOTER */}
            <section className="md:block hidden w-full" is="contact">
                <div className="flex flex-col justify-between bg-[#D8CDB9]">
                    <ContactUs />
                    <Footer />
                </div>
            </section>

            {/* MOBILE CONTACT */}
            <section className="block md:hidden w-full h-full">
                <ContactUs />
            </section>

            {/* MOBILE FOOTER */}
            <section className="flex md:hidden w-full h-[100vh] bg-[#D8CDB9]">
                <Footer />
            </section>
        </main>
    );
}
