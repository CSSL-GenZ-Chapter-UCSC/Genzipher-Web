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
        <div
          className="outer h-max w-full md:w-[90%] xl:w-1/2 mx-auto rounded-[1rem] md:rounded-[3rem] p-[2px]
                   bg-gradient-to-r from-[#C3840F] via-[#A76F0B] to-[#532E02]"
        >
          <div className="inner-content h-full w-full bg-[#211600] rounded-2xl md:rounded-[3rem] flex justify-center gap-2 px-2 py-2 md:px-10">
            <TimerCard value={days} label="Days" />
            <TimerCard value={hours} label="Hours" />
            <TimerCard value={minutes} label="Minutes" />
            <TimerCard value={seconds} label="Seconds" />
          </div>
        </div>
      </div>
    </div>
  );
}
