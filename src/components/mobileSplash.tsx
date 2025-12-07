"use client";

import React from "react";
import { motion } from "framer-motion";
import CountDown from "./countdown";
import Link from "next/link";
import Button from "./button";

export default function MobileSplash() {
  return (
    <section
      id="home"
      className={
        "w-full h-full snap-start bg-[url('/assets/images/splash/landing.webp')] bg-cover bg-center " +
        "bg-black/50 bg-blend-multiply flex items-center justify-center md:hidden overflow-hidden relative"
      }
    >
      {/* Floating particles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => {
          const left = `${Math.random() * 100}%`;
          const top = `${Math.random() * 100}%`;
          const randX = Math.random() * 20 - 10;
          const dur = 3 + Math.random() * 2;
          const d = Math.random() * 2;
          return (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{ left, top }}
            >
              <motion.div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 9999,
                  backgroundColor: "rgba(245,158,11,0.4)",
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, randX, 0],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: dur,
                  delay: d,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* CENTERED LOGO CONTAINER */}
      <div className="z-10 relative w-full flex justify-center">
        <div className="relative">
          {/* Preload the image in the background ASAP */}
          <link
            rel="preload"
            as="image"
            href="/assets/genzipher-text-logo-1.webp"
          />

          {/* Simple fade + scale entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            style={{ position: 'relative' , display: 'flex', flexDirection: 'column', alignItems: 'center'}}
          >
            <img
              src="/assets/genzipher-text-logo-1.webp"
              alt="GenZipher Logo"
              width={720}
              height={266}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="mx-auto w-[85vw] max-w-[720px] h-auto block relative"
              style={{
                display: "block",
              }}
            />


              {/* <h2 className="text-[#D8CDB9] text-[1rem] bottom-[-0.5rem] absolute">Decoding the Future of Innovation</h2> */}
            
          </motion.div>

          {/* Sparkle accents around logo */}
          {[
            { x: -40, y: -20, delay: 1.2 },
            { x: 40, y: -30, delay: 1.4 },
            { x: -50, y: 20, delay: 1.6 },
            { x: 45, y: 25, delay: 1.8 },
          ].map((pos, i) => (
            <div
              key={i}
              className="absolute z-30 pointer-events-none"
              style={{
                left: `calc(50% + ${pos.x}%)`,
                top: `calc(50% + ${pos.y}%)`,
              }}
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 1.5,
                  delay: pos.delay,
                  ease: "easeOut",
                }}
                style={{ display: "inline-block" }}
              >
                <div className="w-2 h-2 bg-yellow-300 rounded-full blur-[1px]" />
                <div className="absolute inset-0">
                  <motion.div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 9999,
                      backgroundColor: "#FDE68A",
                    }}
                    animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM COUNTDOWN CONTAINER (Absolute position) */}
      <div className="absolute bottom-[20%] left-0 right-0 z-20 flex flex-col items-center gap-2">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          //@ts-ignore
          className="text-center font-serif text-[#8f7e68] tracking-[0.15em] text-xs drop-shadow-md"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)",
          }}
        >
          Registrations closing in:
        </motion.h2>

        <div className="w-full flex justify-center px-6">
          <CountDown />
        </div>

        <Link href="/register">
          <div
            className={`bg-gradient-to-r from-[#4C2901] via-[#C3840F] to-[#C3840F] text-[#D8CDB9] w-max rounded-md text-[1em] py-2 px-4 cursor-pointer `}
          >
            Register
          </div>
        </Link>
      </div>

      {/* Bottom fade edge for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black/30 to-transparent z-5 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </section>
  );
}
