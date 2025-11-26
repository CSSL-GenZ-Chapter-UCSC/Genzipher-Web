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
  return (
    <section className="flex relative w-screen h-screen overflow-hidden bg-[#140E02]">
      <h2
        className={`${inter.className} hidden md:block absolute left-[2%] top-10 z-30 text-white font-extrabold tracking-tight leading-[0.85] text-[8vw]`}
      >
        {text}
      </h2>
      <div className="my-auto flex relative md:static w-full h-[70%]">
        <div className="md:absolute ml-auto mr-[5%] md:m-0 right-[6%] top-1/2 z-30 md:-translate-y-1/2 w-[75%] h-full md:w-full  md:h-full md:flex md:items-center md:justify-center text-white py-[4%] pl-[20%] md:p-[4%] bg-[#D8CDB966] md:bg-inherit rounded-xl md:text-center">
          <div className="relative z-9999 md:w-1/2 md:ml-auto">
            <div className="hidden md:block text-[1rem] md:text-[2rem] mb-6 font-semibold tracking-wide uppercase">
              What to expect?
            </div>

            <p className="text-[1.3rem] opacity-90 mb-10">{subtext}</p>

            <div className="text-[1.15rem] leading-[1.85] tracking-wide uppercase">
              <div>DATE :</div>
              <div>TIME :</div>
              <div>VENUE : {venue}</div>
            </div>

            <div className="mt-10 md:mt-20 text-[0.9rem] md:text-[1.25rem] tracking-wide uppercase opacity-90">
              <span>{footer}</span>
            </div>
          </div>


        <div className=" absolute md:top-auto md:left-[10%] bottom-0 h-[25vh] md:h-[88vh] z-99 left-0">
          <div className="relative h-full translate-x-[-3%]">
            <Image
              src={img}
              alt={text}
              width={1600}
              height={2400}
              priority
              className="h-full w-auto md:h-1/2  object-contain object-bottom select-none"
              style={{ height: "100%", width: "auto" }}
            />
            <h2
              className={`${inter.className} block md:hidden absolute bottom-0 z-30 text-white font-extrabold tracking-tight leading-[0.85] text-[5vw] translate-x-[20%] `}
            >
              {text}
            </h2>
          </div>
        </div>
        </div>

      </div>
    </section>
  );
}
