"use client";

import { useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: "800",
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RoundInfoView({
  text,
  venue,
  subtext,
  footer,
  img,
}: {
  text: string;
  footer: string;
  venue: string;
  subtext: string;
  img: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
  <div
  className={`
    fixed inset-0 z-[99999] flex items-center justify-center md:hidden
    transition-opacity duration-300 ease-out
    ${open ? "opacity-100 pointer-events-auto bg-black/60 backdrop-blur-sm" : "opacity-0 pointer-events-none bg-black/0"}
  `}
>
  <div
    className={`
      bg-[#140E02] text-white w-[85%] max-h-[70%]
      p-6 rounded-2xl overflow-y-auto border border-white/20
      transform 
      transition-all duration-300 
      ease-[cubic-bezier(0.16,1,0.3,1)]
      ${open 
        ? "opacity-100 scale-100 translate-y-0" 
        : "opacity-0 scale-90 translate-y-4"
      }
    `}
  >
    <h3 className="text-2xl font-bold mb-4">More Info</h3>

    <p className="text-[1.1rem] leading-relaxed opacity-90 whitespace-pre-line">
      {footer}
    </p>

    <button
      onClick={() => setOpen(false)}
      className="mt-6 w-full py-3 text-lg bg-white/20 rounded-xl border border-white/30"
    >
      Close
    </button>
  </div>
</div>


      <section className="flex relative w-screen h-screen overflow-hidden bg-[#140E02]">
        <h2
          className={`${inter.className} hidden md:block absolute left-[2%] top-10 z-30 text-white font-extrabold tracking-tight leading-[0.85] text-[8vw]`}
        >
          {text}
        </h2>

        <div className="my-auto flex relative md:static w-full h-[40%]">
          <div className="md:absolute ml-auto mr-[5%] md:m-0 right-[6%] top-1/2 z-30 md:-translate-y-1/2 w-[75%] h-full md:w-full md:h-full md:flex md:items-center md:justify-center text-white py-[4%] pl-[20%] pr-[5%] md:p-[4%] bg-[#D8CDB966] md:bg-inherit rounded-xl md:text-center">
            <div className="relative z-9999 md:w-1/2 md:ml-auto flex flex-col justify-between h-full md:h-auto md:block ">
              <div className="hidden md:block text-[1rem] md:text-[2rem] mb-6 font-semibold tracking-wide uppercase">
                What to expect?
              </div>

              <p className="text-[1.3rem] opacity-90 mb-10">{subtext}</p>

              <div className="text-[1.15rem] leading-[1.85] tracking-wide uppercase">
                <div>DATE :</div>
                <div>TIME :</div>
                <div>VENUE : {venue}</div>
              </div>

              <button
                onClick={() => setOpen(true)}
                className="md:hidden mt-6 bg-white/20 py-2 px-4 rounded-xl border border-white/40 text-[1.1rem]"
              >
                Read More
              </button>
            </div>

            <div className="absolute md:top-auto md:left-[10%] bottom-0 h-[25vh] md:h-[88vh] z-99 left-0">
              <div className="relative h-full translate-x-[-3%]">
                <Image
                  src={img}
                  alt={text}
                  width={1600}
                  height={2400}
                  priority
                  className="h-full w-auto md:h-1/2 object-contain object-bottom select-none"
                  style={{ height: "100%", width: "auto" }}
                />

                <h2
                  className={`${inter.className} block md:hidden absolute bottom-0 z-30 text-white font-extrabold tracking-tight leading-[0.85] text-[5vw] translate-x-[20%]`}
                >
                  {text}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
