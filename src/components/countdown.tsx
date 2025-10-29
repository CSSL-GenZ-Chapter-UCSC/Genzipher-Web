"use client";

import { useState, useEffect } from "react";

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

  const formatDate = (date) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    const timerCard = (value, label) => (
      <div className="text-[1rem] md:text-[2rem] timer-item flex flex-col items-center justify-center text-[#D7CEBB] w-[25%] aspect-square">
        <div
          className="aspect-square md:text-[6rem] text-[2rem] box bg-[#D8CDBB] p-1 text-[#211600] md:rounded-[3rem] rounded-[1rem]"
          style={{ lineHeight: "normal" }}
        >
          {value.toString().padStart(2, "0")}
        </div>
        {label}
      </div>
    );

    return (
      <div className="countdown-display">
        <div
          className="outer h-max w-full  md:w-1/2 mx-auto rounded-[1rem] md:rounded-[3rem] p-[2px] 
                   bg-gradient-to-r from-[#C3840F] via-[#A76F0B] to-[#532E02]"
        >
          <div className="inner-content h-full w-full bg-[#211600] rounded-[1rem] md:rounded-[3rem] flex justify-center gap-2 px-10 py-2">
            {timerCard(days, "Days")}
            {timerCard(hours, "Hours")}
            {timerCard(minutes, "Minutes")}
            {timerCard(seconds, "Seconds")}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="countdown-timer-container">{formatTime(timeRemaining)}</div>
  );
}
