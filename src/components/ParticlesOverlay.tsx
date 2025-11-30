"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ParticlesOverlay({ count = 14 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {[...Array(count)].map((_, i) => {
        const left = `${Math.random() * 100}%`;
        const top = `${Math.random() * 100}%`;
        const randX = Math.random() * 20 - 10;
        const dur = 3 + Math.random() * 2;
        const d = Math.random() * 2;

        return (
          <div key={i} className="absolute w-1 h-1 rounded-full" style={{ left, top }}>
            <motion.div
              style={{ width: "100%", height: "100%", borderRadius: 9999, backgroundColor: "rgba(245,158,11,0.35)" }}
              animate={{ y: [0, -30, 0], x: [0, randX, 0], opacity: [0, 0.8, 0], scale: [0, 1.5, 0] }}
              transition={{ duration: dur, delay: d, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        );
      })}

      {/* A few sparkles */}
      {[{ x: -45, y: -18, delay: 1.2 }, { x: 40, y: -28, delay: 1.4 }, { x: -50, y: 18, delay: 1.6 }].map((pos, idx) => (
        <div key={idx} className="absolute z-10" style={{ left: `calc(50% + ${pos.x}%)`, top: `calc(50% + ${pos.y}%)` }}>
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }} transition={{ duration: 1.5, delay: pos.delay, ease: "easeOut" }} style={{ display: "inline-block" }}>
            <div className="w-2 h-2 bg-yellow-300 rounded-full blur-sm" />
            <div className="absolute inset-0">
              <motion.div style={{ width: "100%", height: "100%", borderRadius: 9999, backgroundColor: "#FDE68A" }} animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }} transition={{ duration: 0.6, repeat: Infinity }} />
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
