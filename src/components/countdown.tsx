"use client";

import { useState, useEffect } from "react";
import TimerCard from "@/components/timerCard";
import { formatTime } from "@/utils/utils";

export default function CountDown() {
  const eventTimestamp = new Date("2026-02-07T08:00:00+05:30").getTime();

  const [serverOffset, setServerOffset] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    async function fetchServerTime() {
      try {
        const res = await fetch(
          "https://timeapi.io/api/timezone/zone?timeZone=Asia/Colombo",
          { cache: "no-store" }
        );

        const data = await res.json();

        // API returns: "currentLocalTime": "2025-12-01T11:03:21.8588142"
        const serverTime = new Date(data.currentLocalTime).getTime();
        const deviceTime = Date.now();

        // Offset = how much the device clock differs from real Colombo time
        setServerOffset(serverTime - deviceTime);
      } catch (error) {
        console.error("Failed to fetch timezone time, falling back to device time.");
        setServerOffset(0);
      }
    }

    fetchServerTime();

  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const correctedNow = Date.now() + serverOffset;
      const remaining = eventTimestamp - correctedNow;

      setTimeRemaining(remaining > 0 ? remaining : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [serverOffset]);

  const { days, hours, minutes, seconds } = formatTime(timeRemaining);

  return (
    <div className="countdown-timer-container flex justify-center w-full relative z-[9999]">
      <div className="countdown-display w-full flex justify-center">
         <div className="inner-content h-full w-full max-w-[420px] sm:max-w-[460px] md:max-w-none rounded-xl md:rounded-[3rem] flex justify-center gap-3 md:gap-7 lg:gap-9 px-3 py-2 md:px-10 md:py-4 text-[#D8CDBB] flex-nowrap items-center">
            <TimerCard value={days} label="DAYS" />
            <TimerCard value={hours} label="HOURS" />
            <TimerCard value={minutes} label="MINUTES" />
            <TimerCard value={seconds} label="SECONDS" />
          </div>
        </div>
    </div>
  );
}
