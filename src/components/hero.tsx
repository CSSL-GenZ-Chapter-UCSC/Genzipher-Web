import Image from "next/image";
import CountDown from "@/components/countdown";
import Button from "@/components/button";
import Link from "next/link";
export default function Hero() {
  return (
    <div className="countdown-outer items-center justify-center text-center flex flex-col h-full gap-4 px-4 md:bg-[#211600] bg-[url('/assets/images/splash/landing-6-mobile.webp')] bg-cover bg-center
          bg-black/80 bg-blend-multiply">
      <div className="logo-outer w-full relative">
        <Image
          src="/assets/genzipher-text-logo-1.webp"
          alt="GenZipher Logo"
          width={964}
          height={356}
          className="mx-auto mb-15 md:mb-15 md:w-[60vw] h-auto"
        />
        <span className="absolute text-2xl md:text-4xl text-white top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2  w-[80%] md:w-full">
          Enter the Realm of Myths, Code Your Legend
        </span>
      </div>
      <div className="w-full">
        <div className="block md:hidden">
          <CountDown />
        </div>
      </div>
      {/* <div className="">
        <Link href="/register">
          <Button text="REGISTER" disabled={false}/>
        </Link>
      </div> */}
    </div>
  );
}
