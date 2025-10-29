import Image from "next/image";
import CountDown from "@/components/countdown";
import Button from "@/components/button";
export default function Hero() {
  return (
    <div className="countdown-outer items-center justify-center text-center flex flex-col h-full gap-4 px-4 bg-[#211600]">
      <div className="logo-outer w-full relative max-w-4xl mx-auto">
        <Image
          src="/assets/genzipher-text-logo-1.png"
          alt="GenZipher Logo"
          width={1000}
          height={1000}
          className="mx-auto mb-[15%] md:mb-4 w-full h-auto"
        />
        <span className="absolute text-2xl md:text-4xl text-white top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
          Enter the Realm of Myths, Code Your Legend
        </span>
      </div>
      <div className="w-full">
        <CountDown />
      </div>
    
      <Button text="REGISTER" />
    </div>
  );
}