"use client";

import { motion } from "framer-motion";
import ParticlesOverlay from "@/components/ParticlesOverlay";

export default function SplashScreen() {
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Particles Effect */}
      <ParticlesOverlay count={20} />

      {/* Main Content Grid */}
      <div className="relative z-10 w-full h-full flex items-center justify-between max-w-[1920px] mx-auto pl-8 pr-0 lg:pl-16 lg:pr-0 xl:pl-24 xl:pr-0">
        
        {/* LEFT SIDE - GenZipher Logo */}
        <div className="flex-1 h-full flex items-center justify-center relative">
          <div className="relative max-w-[700px] w-full">
            {/* Logo with simple fade in only */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}>
              <img src="/assets/genzipher-text-logo-1.webp" alt="GenZipher Logo" className="w-full h-auto" loading="eager" fetchPriority="high" />
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
      <motion.div
      //@ts-ignore
        className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </section>
  );
}