"use client";

import { motion } from "framer-motion";
import ParticlesOverlay from "@/components/ParticlesOverlay";
import CountDown from "./countdown";
import Link from "next/link";
import Button from "./button";
export default function SplashScreen() {
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Particles Effect */}
      <ParticlesOverlay count={100} />

      {/* Main Content Grid */}
      <div className="relative z-10 w-full h-full flex items-center justify-between max-w-[1920px] mx-auto pl-8 pr-0 lg:pl-16 lg:pr-0 xl:pl-24 xl:pr-0">
        
        {/* LEFT SIDE - GenZipher Logo + Countdown (stacked) */}
        <div className="flex-1 h-full flex items-center justify-center relative">
          <div className="relative max-w-[760px] w-[88%] flex flex-col items-center justify-center h-full py-6">
            {/* Logo with simple fade in only; nudge up slightly for balance */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              style={{ width: '100%', transform: 'translateY(-1rem)' }}
            >
              <img src="/assets/genzipher-text-logo-1.webp" alt="GenZipher Logo" className="w-full h-auto" loading="eager" fetchPriority="high" />
            </motion.div>

            {/* Added Text: Registrations closing in */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              //@ts-ignore
              className="mt-2 mb-2 md:mt-1.5 md:mb-1 text-center font-serif text-white/40 tracking-[0.2em] text-lg sm:text-xl md:translate-y-[60%] md:transform"
              style={{
                WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)",
                maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)",
              }}
            >
              Registrations closing in:
            </motion.p>

            {/* Countdown placed in-flow below the text */}
            <div className="mt-4 w-full">
              <CountDown />
            </div>

                        {/* Register Button */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        //@ts-ignore
                        className="mt-5 md:mt-8"
                    >
                        <Link href="/register">
                            <Button text="REGISTER" disabled={false}/>
                        </Link>
                    </motion.div>
          </div>
        </div>

        {/* RIGHT SIDE - Goddess Image */}
        <div className="flex-1 h-full flex items-end justify-end relative pr-0">
          {/* Goddess Image - flush to the right with vintage blend */}
          <div className="relative w-auto">
            <div className="block">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
                <img src="/assets/images/splash/landing.webp" alt="Greek Goddess" className="h-[100vh] w-auto object-cover block" loading="eager" fetchPriority="high" style={{ mixBlendMode: "multiply" }} />
              </motion.div>
            </div>

            {/* Left-side gradient to blend photo into black background */}
            <div aria-hidden="true" className="absolute top-0 bottom-0 left-0 w-48 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0))" }} />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/50 to-transparent pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </section>
  );
}
