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

      {/* MOBILE SPLASH SCREEN */}
      <section
      id="home"
        className="
          w-full h-full snap-start 
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
      <section className="w-full h-full snap-start bg-[url('/assets/countdown-m-bg.webp')] bg-cover bg-center md:bg-none">
        <Hero />
      </section>

      {/* ABOUT SECTION (DESKTOP | MOBILE) */}
      <section className="relative w-screen snap-start bg-[#D8CDB9]" id="about">
        {isMobile ? <AboutMobile /> : <About />}
      </section>

      {/* ROUNDS SECTION */}
      <section className="w-full h-full snap-start bg-[#140E02]" id="timeline">
        {/* DESKTOP SLIDES */}
        <div
          className="hidden md:block h-full overflow-x-hidden overflow-y-auto snap-y snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          <FadingSlide key={1} num={1}>
            <RoundInfoView
              img={`/assets/guy1.webp`}
              text={`First Round`}
              subtext="You will be given 8 hours"
              venue="Online"
              footer="Teams of 3–4 members will dive into an online selection round, where competitive programming and CTF challenges run side by side. Only the top 10 teams will advance to the grand finale."
            />
          </FadingSlide>

          <FadingSlide key={2} num={2}>
            <RoundInfoView
              img={`/assets/lady1.webp`}
              text={`Workshop 1`}
              footer={`CTF`}
              venue="Online"
              subtext=""
            />
          </FadingSlide>

          <FadingSlide key={3} num={1}>
            <RoundInfoView
              img={`/assets/lady2.webp`}
              text={`Workshop 2`}
              footer={`AI Agents`}
              venue="Online"
              subtext=""
            />
          </FadingSlide>

          <FadingSlide key={4} num={1}>
            <RoundInfoView
              img={`/assets/guy2.webp`}
              text={`Final Round`}
              footer={`The top 10 teams from Round 1 step into the ultimate challenge, each consisting of 3–4 members. In this grand finale, teams tackle a real world problem by completing the full product development cycle. The journey begins with a “pawning phase,” where teams decipher clues to uncover the development theme, setting the stage for innovative. Participants are free to use any tech stack, including AI-powered tools, to bring their ideas to life.`}
              venue="To be decided"
              subtext="You will be given 24 hours"
            />
          </FadingSlide>
        </div>

        {/* MOBILE CAROUSEL */}
        <div className="block md:hidden h-full">
          <MobileCarousel>
            <RoundInfoView
              img={`/assets/guy1.webp`}
              text={`First Round`}
              subtext="You will be given 8 hours"
              venue="Online"
              footer="Teams of 3–4 members will dive into an online selection round, where competitive programming and CTF challenges run side by side. Only the top 10 teams will advance to the grand finale."
            />

            <RoundInfoView
              img={`/assets/lady1.webp`}
              text={`Workshop 1`}
              footer={`A Workshop on CTF`}
              venue="Online"
              subtext="You will be given 8 hours"
            />

            <RoundInfoView
              img={`/assets/lady2.webp`}
              text={`Workshop 2`}
              footer={`A Workshop on AI Agents`}
              venue="Online"
              subtext="You will be given 8 hours"
            />
            <RoundInfoView
              img={`/assets/guy2.webp`}
              text={`Final Round`}
              footer={`The top 10 teams from Round 1 step into the ultimate challenge, each consisting of 3–4 members. In this grand finale, teams tackle a real world problem by completing the full product development cycle. The journey begins with a “pawning phase,” where teams decipher clues to uncover the development theme, setting the stage for innovative. Participants are free to use any tech stack, including AI-powered tools, to bring their ideas to life.`}
              venue="To be decided"
              subtext="You will be given 24 hours"
            />
          </MobileCarousel>
        </div>
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
