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
    <div className="relative w-full" style={{ aspectRatio: '7/9' }}>
      {/* Container for flip cards */}
      <div className="relative w-full h-full" style={{ perspective: '1000px' }}>
        {/* Top half - static */}
        <div 
          className="absolute top-0 left-0 w-full h-1/2 bg-[#140E02] md:rounded-t-[1rem] rounded-t-[0.5rem] border-[1px] border-b-0 border-[#736E63] overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-[200%] flex items-center justify-center">
            <span className="text-white neue-machina-clock font-light md:text-[4rem] text-[1.75rem] leading-none">
              {currentDigit}
            </span>
          </div>
        </div>

        {/* Bottom half - static */}
        <div 
          className="absolute bottom-0 left-0 w-full h-1/2 bg-[#140E02] md:rounded-b-[1rem] rounded-b-[0.5rem] border-[1px] border-t-0 border-[#736E63] overflow-hidden"
        >
          <div className="absolute top-[-100%] left-0 w-full h-[200%] flex items-center justify-center">
            <span className="text-white neue-machina-clock font-light md:text-[4rem] text-[1.75rem] leading-none">
              {currentDigit}
            </span>
          </div>
        </div>

        {/* Flipping top half */}
        {isFlipping && (
          <div 
            className="absolute top-0 left-0 w-full h-1/2 origin-bottom"
            style={{
              animation: 'flipTop 0.3s ease-in-out',
              transformStyle: 'preserve-3d',
              zIndex: 10
            }}
          >
            <div className="w-full h-full bg-[#140E02] md:rounded-t-[1rem] rounded-t-[0.5rem] border-[1px] border-b-0 border-[#736E63] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[200%] flex items-center justify-center">
                <span className="text-white neue-machina-clock font-light md:text-[4rem] text-[1.75rem] leading-none">
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
              animation: 'flipBottom 0.3s ease-in-out',
              transformStyle: 'preserve-3d',
              zIndex: 5
            }}
          >
            <div className="w-full h-full bg-[#140E02] md:rounded-b-[1rem] rounded-b-[0.5rem] border-[1px] border-t-0 border-[#736E63] overflow-hidden">
              <div className="absolute top-[-100%] left-0 w-full h-[200%] flex items-center justify-center">
                <span className="text-white neue-machina-clock font-light md:text-[4rem] text-[1.75rem] leading-none">
                  {nextDigit}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Center divider line */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#211600] z-20 transform -translate-y-1/2" />
      </div>
    </div>
  );
}


export default function TimerCard({ value, label }: { value: number; label: string }) {
  const formatted = value.toString().padStart(2, '0');
  const firstDigit = formatted[0];
  const secondDigit = formatted[1];

  return (
    <div className="text-[0.875rem] md:text-[1.7rem] timer-item flex flex-col items-center justify-start text-[#D7CEBB]">
      <div className="flex gap-1 md:gap-2 w-full max-w-[100px] md:max-w-[320px]">
        <div className="flex-1 min-w-[38px] md:min-w-[55px]">
          <SingleDigitFlip digit={firstDigit} />
        </div>
        <div className="flex-1 min-w-[38px] md:min-w-[55px]">
          <SingleDigitFlip digit={secondDigit} />
        </div>
      </div>

      <div
        className="mt-1.5 md:mt-2 neue-machina font-extrabold text-base md:text-xl px-2 py-1 rounded-md inline-block bg-clip-text text-transparent"
        style={{
          background: 'linear-gradient(0deg, rgba(217, 207, 187, 0.42) -13.33%, rgba(115, 110, 99, 0.42) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {label}
      </div>
    </div>
  );
}