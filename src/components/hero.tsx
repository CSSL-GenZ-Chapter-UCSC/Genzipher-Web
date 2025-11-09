import Image from "next/image";
import CountDown from "@/components/countdown";
import Button from "@/components/button";
import Link from "next/link";
export default function Hero() {
  return (
    <div className="countdown-outer items-center justify-center text-center flex flex-col h-full gap-4 px-4 md:bg-[#211600]">
      <div className="logo-outer w-full relative">
        <Image
          src="/assets/genzipher-text-logo-1.png"
          alt="GenZipher Logo"
          width={964}
          height={356}
          className="mx-auto mb-[15%] md:mb-4 md:w-[60vw] h-auto"
        />
        <span className="absolute text-2xl md:text-4xl text-white top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2  w-[80%]  md:w-full">
          Enter the Realm of Myths, Code Your Legend
        </span>
      </div>
      <div className="w-full">
        <CountDown />
      </div>
      <div className="md:mt-6">
        <Link href="/register">
          <Button text="REGISTER" />
        </Link>
      </div>
    </div>
  );
}
