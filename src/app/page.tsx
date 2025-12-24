"use client";

import { useEffect, useState, useRef, useCallback, useLayoutEffect } from "react";
import Awards from "@/components/awards";
import Footer from "@/components/footer";
import ContactUs from "@/components/contactUs";
import SplashScreen from "@/components/splashScreen";
import MobileSplash from "@/components/mobileSplash";
import About from "@/components/about";
import AboutMobile from "@/components/about.mobile";
import RoundsSection from "@/components/roundsSection";
import UniversityStats from "@/components/universityStats";

export default function Home() {
    const mainRef = useRef<HTMLElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    const setRef = useCallback((node: HTMLElement | null) => {
        if (node) mainRef.current = node;
    }, []);

    useEffect(() => {
        const update = () => setIsMobile(window.innerWidth < 768);
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    // Single effect to handle scroll restoration
    useLayoutEffect(() => {
        // Disable browser scroll restore
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        // Force scroll to top immediately
        if (mainRef.current && !isInitialized) {
            mainRef.current.scrollTop = 0;
            // Use requestAnimationFrame to ensure it happens after layout
            requestAnimationFrame(() => {
                if (mainRef.current) {
                    mainRef.current.scrollTop = 0;
                }
            });
            setIsInitialized(true);
        }
    }, [isInitialized]);

    // Optional: Debug logging to track scroll behavior
    useEffect(() => {
        const handleScroll = () => {
            if (mainRef.current?.scrollTop! > 0 && !isInitialized) {
                //@ts-ignore
                console.log("Unwanted scroll detected:", mainRef.current.scrollTop);
                console.log("Active element:", document.activeElement);
            }
        };
        
        const ref = mainRef.current;
        ref?.addEventListener('scroll', handleScroll);
        return () => ref?.removeEventListener('scroll', handleScroll);
    }, [isInitialized]);

    return (
        <main
            ref={setRef}
            className="
                relative
                w-screen h-screen
                overflow-y-auto overflow-x-hidden 
                bg-[#0f0d08] box-border
                [overflow-anchor:none]
            "
        >
            {/* DESKTOP SPLASH SCREEN */}
            <section
                id="home"
                className="h-screen overflow-hidden bg-black hidden md:block"
            >
                <SplashScreen />
            </section>

            {/* MOBILE SPLASH SCREEN */}
            <MobileSplash />

            {/* ABOUT SECTION */}
            <section className="relative w-screen bg-[#D8CDB9]" id="about">
                {isMobile ? <AboutMobile /> : <About scrollContainer={mainRef} />}
            </section>

            {/* ROUNDS SECTION */}
            <section className="w-full h-max bg-[#140E02]">
                <RoundsSection />
            </section>

            {/* UNIVERSITY STATS SECTION */}
            <section className="w-full h-max bg-[#140E02]" id="university-stats">
                <UniversityStats />
            </section>

            {/* AWARDS SECTION */}
            <section className="w-full h-max">
                <Awards />
            </section>

            {/* DESKTOP CONTACT + FOOTER */}
            <section className="md:block hidden w-full" id="contact">
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