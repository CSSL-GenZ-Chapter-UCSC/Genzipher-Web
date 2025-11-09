"use client";

import { useState, useEffect } from "react";
import TimerCard from "@/components/timerCard";
import { formatTime } from "@/utils/utils";

export default function CountDown() {
  const [eventDate, setEventDate] = useState(Date.now() + 100000);
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    setCountdownStarted(true);
    console.log(Date.now() + 60000);
  }, []);

  useEffect(() => {
    if (countdownStarted && eventDate) {
      const countdownInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const eventTime = new Date(eventDate).getTime();
        let remainingTime = eventTime - currentTime;

        if (remainingTime <= 0) {
          remainingTime = 0;
          clearInterval(countdownInterval);
        }

        setTimeRemaining(remainingTime);
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [countdownStarted, eventDate, timeRemaining]);

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
