"use client";

import { useState, useEffect } from "react";
import TimerCard from "@/components/timerCard";
import { formatTime } from "@/utils/utils";

export default function CountDown() {
  const eventTimestamp = new Date("2025-12-25T00:00:00+05:30").getTime();

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
    <div className="countdown-timer-container">
      <div className="countdown-display">
         <div className="inner-content h-full w-full rounded-2xl md:rounded-[3rem] flex justify-center gap-2 md:gap-8 px-2 py-2  text-[#D8CDBB]  md:px-10 flex-nowrap items-center">
            <TimerCard value={days} label="DAYS" />
            <TimerCard value={hours} label="HOURS" />
            <TimerCard value={minutes} label="MINUTES" />
            <TimerCard value={seconds} label="SECONDS" />
          </div>
        </div>
    </div>
  );
}
