"use client";

import { useEffect, useState, useRef, useCallback, useLayoutEffect } from "react";
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
    const mainRef = useRef<HTMLElement>(null);

    const setRef = useCallback((node: HTMLElement | null) => {
        if (node) mainRef.current = node;
    }, []);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const update = () => setIsMobile(window.innerWidth < 768);
        update(); // run once at load
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    useEffect(() => {
        // Tell the browser to stop trying to restore scroll position
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        // Force scroll to top on a fresh reload
        if (mainRef.current) {
            mainRef.current.scrollTo(0, 0);
        }
    }, []);


    useLayoutEffect(() => {
        // disable browser scroll restore
        if ("scrollRestoration" in history) {
            history.scrollRestoration = "manual";
        }

        // wait until layout + async content settles
        setTimeout(() => {
            mainRef.current?.scrollTo({ top: 0, behavior: "auto" });
        }, 50);
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
            <section className="w-full h-max  bg-[#140E02]"  id="university-stats">
                <UniversityStats />
            </section>

            {/* AWARDS SECTION */}
            <section className="w-full h-max">
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
