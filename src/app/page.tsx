import RoundInfoView from "@/components/roundInfoView";
import FadingSlide from "@/components/fadingSlide";
import MobileCarousel from "@/components/mobileCarousel";
import Hero from "@/components/hero";
import PartnerWithUs from "@/components/partnerWithUs";
import Awards from "@/components/awards";
import Footer from "@/components/footer";
import ContactUs from "@/components/contactUs";
import SplashScreen from "@/components/splashScreen";
import About from "@/components/about";
import Register from "@/components/createForm";
import Image from "next/image";
// <section id="home" className="min-h-screen">
//   <SplashScreen />
// </section>
export default function Home() {
  return (
    <main className="w-screen h-[100svh] overflow-y-auto overflow-x-hidden snap-y snap-mandatory bg-[#0f0d08] box-border">
      <section
        id="home"
        className="snap-start h-screen overflow-hidden bg-black hidden md:block"
      >
        <SplashScreen />
      </section>

      <section
        className="w-screen h-[100svh] snap-start md:hidden
  bg-[url('/assets/images/splash/landing-6.png')] bg-cover bg-center
  bg-black/60 bg-blend-multiply flex items-center justify-center"
      >
        <Image
          src="/assets/genzipher-text-logo-1.png"
          alt="GenZipher Logo"
          width={964}
          height={356}
          className="mx-auto mb-[15%] md:mb-4 md:w-[60vw] h-auto"
        />
      </section>

      <section className="w-screen h-[100svh] snap-start bg-[url('/assets/countdown-m-bg.webp')] bg-cover bg-center md:bg-none ">
        <Hero />
      </section>

      <section className="w-screen h-[100svh] snap-start bg-[#140E02]">
        <div className="hidden md:block h-[100svh] overflow-x-hidden overflow-y-auto snap-y snap-mandatory">
          <FadingSlide num={1}>
            <RoundInfoView
              img="/assets/guy1.png"
              text="ROUND 1"
              footer="INFO ON ROUND 1"
            />
          </FadingSlide>
          <FadingSlide num={2}>
            <RoundInfoView
              img="/assets/lady1.png"
              text="ROUND 2"
              footer="INFO ON ROUND 2"
            />
          </FadingSlide>
          <FadingSlide num={3}>
            <RoundInfoView
              img="/assets/lady2.png"
              text="ROUND 3"
              footer="INFO ON ROUND 3"
            />
          </FadingSlide>
          <FadingSlide num={4}>
            <RoundInfoView
              img="/assets/guy2.png"
              text="ROUND 4"
              footer="INFO ON ROUND 4"
            />
          </FadingSlide>
        </div>

        <div className="block md:hidden h-[100svh]">
          <MobileCarousel>
            <RoundInfoView
              img="/assets/guy1.png"
              text="ROUND 1"
              footer="INFO ON ROUND 1"
            />
            <RoundInfoView
              img="/assets/lady1.png"
              text="ROUND 2"
              footer="INFO ON ROUND 2"
            />
            <RoundInfoView
              img="/assets/lady2.png"
              text="ROUND 3"
              footer="INFO ON ROUND 3"
            />
            <RoundInfoView
              img="/assets/guy2.png"
              text="ROUND 4"
              footer="INFO ON ROUND 4"
            />
          </MobileCarousel>
        </div>
      </section>

      <section className="w-screen h-[100svh] snap-start">
        <PartnerWithUs />
      </section>

      {/* Awards section inserted between partner/footer and round info */}
      <section className="w-screen h-svh snap-start">
        <Awards />
      </section>

      <section className="md:block hidden w-screen h-[100svh]  snap-start">
        <div className="flex flex-col justify-between h-full bg-[#D8CDB9]">
          <ContactUs />
          <Footer />
        </div>
      </section>

      <section className="block md:hidden w-screen h-[100svh]  snap-start">
        <ContactUs />
      </section>

      <section className="flex md:hidden w-screen h-[100svh]  snap-start bg-[#D8CDB9] ">
        <Footer />
      </section>
    </main>
  );
}
