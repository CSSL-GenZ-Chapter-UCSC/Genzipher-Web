import Image from "next/image";
import Button from "@/components/button";
export default function PartnerWithUs() {
  return (
    <section className="flex md:flex-row items-center justify-between w-full min-h-screen bg-[#d8ccb4] px-3 md:px-16 py-12 md:gap-10">
      <div className="flex justify-center w-full md:w-1/2">
        <Image
          src="/assets/lionguy.png"
          alt="Partner With Us"
          width={700}
          height={900}
          priority
          className="object-contain h-auto w-full max-w-[550px]"
        />
      </div>

      <div className="flex flex-col w-[85%] md:w-1/2 text-center md:text-left">
        <h2 className="text-[#5b3c00] text-4xl md:text-5xl font-bold mb-6 font-[serif]">
          Forge the Future With Us
        </h2>

        <p className="text-[#2a1c00] text-[1rem] md:text-xl leading-relaxed mb-8 max-w-xl mx-auto md:mx-0">
          Join forces with visionaries and creators in a realm where innovation
          meets destiny. By partnering with us, you don’t just sponsor an event
          — you become part of a divine alliance that shapes the future of
          technology and creativity. Let your brand stand beside gods of
          innovation, empowering bold ideas to rise, transform, and inspire the
          world.
        </p>

        <div>
          <Button text="PARTNER" />
        </div>
      </div>
    </section>
  );
}
