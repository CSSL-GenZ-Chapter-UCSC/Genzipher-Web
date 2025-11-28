"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MobileSplash() {
  return (
    <section
      id="home"
      className={
        "w-full h-full snap-start bg-[url('/assets/images/splash/landing-6-mobile.webp')] bg-cover bg-center " +
        "bg-black/60 bg-blend-multiply flex items-center justify-center md:hidden"
      }
    >
      <div className="z-10 mx-auto mb-[15%] relative">
        {/* Glow behind the logo (animated via motion inside plain div to avoid typing issues) */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          <div className="w-[360px] h-40 rounded-full bg-yellow-400/10 blur-3xl" />
        </div>

        {/* Entrance (dramatic) + floating */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: [1.06, 0.98, 1] }}
            transition={{ duration: 0.55, ease: [0.2, 0.9, 0.2, 1] }}
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src="/assets/genzipher-text-logo-1.webp"
                alt="GenZipher Logo"
                width={720}
                height={266}
                loading="eager"
                decoding="sync"
                fetchPriority="high"
                className="mx-auto md:w-[60vw] h-auto block"
                style={{ display: "block" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
