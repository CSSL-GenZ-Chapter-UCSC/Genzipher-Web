"use client";

import { useState, useEffect } from 'react';

function SingleDigitFlip({ digit }: { digit: string }) {
  const [currentDigit, setCurrentDigit] = useState(digit);
  const [nextDigit, setNextDigit] = useState(digit);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (digit !== currentDigit) {
      setNextDigit(digit);
      setIsFlipping(true);

      const timer = setTimeout(() => {
        setCurrentDigit(digit);
        setIsFlipping(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [digit, currentDigit]);

  return (
    <div className="relative w-full" style={{ aspectRatio: "7/9" }}>
      {/* Container for flip cards */}
      <div className="relative w-full h-full" style={{ perspective: "1000px" }}>
        {/* Top half - static */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-[#140E02] md:rounded-t-[1rem] rounded-t-[0.5rem] border-[1px] border-b-0 border-[#736E63] overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-[200%] flex items-center justify-center translate-y-[0.2rem] md:translate-y-[0.45rem]"
          
          >
            <span
              className="
                text-white neue-machina-clock font-light 
                md:text-[4.5rem] text-[1.5rem]
                leading-none flex items-center justify-center
              "
            >
              {currentDigit}
            </span>
          </div>
        </div>

        {/* Bottom half - static */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#140E02] md:rounded-b-[1rem] rounded-b-[0.5rem] border-[1px] border-t-0 border-[#736E63] overflow-hidden">
          <div
            className="absolute top-[-100%] left-0 w-full h-[200%] flex items-center justify-center translate-y-[0.2rem] md:translate-y-[0.45rem]"
          
          >
            <span
              className="
                text-white neue-machina-clock font-light 
                md:text-[4.5rem] text-[1.5rem]
                leading-none flex items-center justify-center
              "
            >
              {currentDigit}
            </span>
          </div>
        </div>

        {/* Flipping top half */}
        {isFlipping && (
          <div
            className="absolute top-0 left-0 w-full h-1/2 origin-bottom"
            style={{
              animation: "flipTop 0.3s ease-in-out",
              transformStyle: "preserve-3d",
              zIndex: 10,
            }}
          >
            <div className="w-full h-full bg-[#140E02] md:rounded-t-[1rem] rounded-t-[0.5rem] border-[1px] border-b-0 border-[#736E63] overflow-hidden">
              <div
                className="absolute top-0 left-0 w-full h-[200%] flex items-center justify-center"
                style={{ transform: "translateY(8%)" }}
              >
              <span
                className="
                  text-white neue-machina-clock font-light 
                  md:text-[4.5rem] text-[1.5rem]
                  leading-none flex items-center justify-center
                "
              >
                  {currentDigit}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Flipping bottom half */}
        {isFlipping && (
          <div
            className="absolute bottom-0 left-0 w-full h-1/2 origin-top"
            style={{
              animation: "flipBottom 0.3s ease-in-out",
              transformStyle: "preserve-3d",
              zIndex: 5,
            }}
          >
            <div className="w-full h-full bg-[#140E02] md:rounded-b-[1rem] rounded-b-[0.5rem] border-[1px] border-t-0 border-[#736E63] overflow-hidden">
              <div
                className="absolute top-[-100%] left-0 w-full h-[200%] flex items-center justify-center"
                style={{ transform: "translateY(8%)" }}
              >
              <span
                className="
                  text-white neue-machina-clock font-light 
                  md:text-[4.5rem] text-[1.5rem]
                  leading-none flex items-center justify-center
                "
              >
                  {nextDigit}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Center divider line */}
        <div
          className="absolute top-1/2 left-0 w-full h-[1px] z-20 transform -translate-y-1/2 bg-gradient-to-r from-[#c5a36e] via-[#d9c39a] to-[#c5a36e] opacity-85"
        />
      </div>
    </div>
  );
}


export default function TimerCard({ value, label }: { value: number; label: string }) {
  const formatted = value.toString().padStart(2, "0");
  const firstDigit = formatted[0];
  const secondDigit = formatted[1];

  return (
    <div className="text-[0.75rem] md:text-[1.1rem] timer-item flex flex-col items-center justify-start text-[#D7CEBB]">
      <div className="flex gap-2 md:gap-3 w-full max-w-[90px] md:max-w-[170px] lg:max-w-[200px]">
        <div className="flex-1 min-w-[32px] md:min-w-[72px] lg:min-w-[82px]">
          <SingleDigitFlip digit={firstDigit} />
        </div>
        <div className="flex-1 min-w-[32px] md:min-w-[72px] lg:min-w-[82px]">
          <SingleDigitFlip digit={secondDigit} />
        </div>
      </div>

      <div
        className="mt-1 md:mt-2 neue-machina font-extrabold text-[0.75rem] md:text-[1.05rem] lg:text-[1.15rem] px-2 py-1 rounded-md inline-block bg-clip-text text-transparent"
        style={{
          background:
            "linear-gradient(0deg, rgba(217, 207, 187, 0.42) -13.33%, rgba(115, 110, 99, 0.42) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {label}
      </div>
    </div>
  );
}
