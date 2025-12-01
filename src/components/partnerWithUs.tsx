import Image from "next/image";
import Button from "@/components/button";
export default function PartnerWithUs() {
  return (
    <div className="flex md:flex-row items-center justify-between w-full h-screen bg-[#d8ccb4] px-3 md:pl-16 py-12 md:pr-[12%] md:gap-10 box-border">
      <div className="flex justify-center w-full md:w-1/2 box-border h-full">
        <Image
          src="/assets/lionguy.webp"
          alt="Partner With Us"
          width={700}
          height={900}
          priority
          className="object-contain h-auto w-full max-w-[700px]"
        />
      </div>

      <div className="flex flex-col w-[85%] h-full align-center justify-center items-center md:w-1/2 text-center md:text-left">
        <h2 className="text-[#5b3c00] text-[clamp(4vw,2vh,2vh)] lg:text-7xl mb-6 text-center">
          Forge the Future With Us
        </h2>

        <p className="text-[#2a1c00] text-[0.8rem] md:text-2xl leading-relaxed mb-8 w-full mx-auto md:mx-0 md:text-center">
          Join forces with visionaries and creators in a realm where innovation
          meets destiny. By partnering with us, you don't just sponsor an event
          — you become part of a divine alliance that shapes the future of
          technology and creativity. Let your brand stand beside gods of
          innovation, empowering bold ideas to rise, transform, and inspire the
          world.
        </p>

        <div>
          <Button text="PARTNER" />
        </div>
      </div>
    </div>
  );
}
