import Image from "next/image";
import CountDown from "@/components/countdown";
import RoundInfoView from "@/components/roundInfoView";
import FadingSlide from "@/components/fadingSlide";

export default function Home() {
  return (
    <main className="w-screen h-screen overflow-y-scroll snap-y snap-mandatory overflow-x-hidden">
      <FadingSlide>
        <div className="countdown-outer items-center justify-center text-center flex flex-col h-full gap-4 px-4">
          <div className="logo-outer w-full relative max-w-4xl">
            <Image
              src="/genzipher-text-logo-1.png"
              alt="GenZipher Logo"
              width={1000}
              height={1000}
              className="mx-auto mb-[15%] md:mb-4 w-full h-auto"
            />
            <span className="absolute text-2xl md:text-4xl text-white top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
              Enter the Realm of Myths, Code Your Legend
            </span>
          </div>

          <div className="countdown-outer w-full">
            <CountDown />
          </div>

          <div className="register-btn bg-gradient-to-r from-[#4C2901] via-[#C3840F] to-[#C3840F] text-[#D8CDB9] w-max rounded-md text-xl py-2 px-4 cursor-pointer">
            REGISTER
          </div>
        </div>
      </FadingSlide>

      <FadingSlide>
        <RoundInfoView
          img={"/guy1.png"}
          text="ROUND 1"
          footer="INFO ON ROUND 1"
        />
      </FadingSlide>

      <FadingSlide>
        <RoundInfoView
          img={"/lady1.png"}
          text="ROUND 2"
          footer="INFO ON ROUND 2" 
        />
      </FadingSlide>

      <FadingSlide>
        <RoundInfoView
          img={"/lady2.png"}
          text="ROUND 3"
          footer="INFO ON ROUND 3"
        />
      </FadingSlide>

      <FadingSlide>
        <RoundInfoView
          img={"/guy2.png"}
          text="ROUND 4"
          footer="INFO ON ROUND 4"
        />
      </FadingSlide>
    </main>
  );
}
