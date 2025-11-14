"use client";
import Link from "next/link";
import Image from "next/image";
import Button from "./button";
export default function About() {
  return (
    <div className="w-full">
      {/* First Section - Genzipher */}
      <section 
        id="about-section-1"
        className="relative w-full h-screen bg-[#D8CDB9] overflow-hidden"
      >
        {/* Left content container (logo + paragraph) */}
        <div className="absolute z-10 flex flex-col w-full max-w-[692px] top-8 md:top-12 left-4 md:left-12 px-4 md:px-0">
          {/* Logo */}
          <div className="w-full mb-4">
            <Image
              src="/assets/genzipher-text-logo-1.png"
              alt="Genzipher"
              width={692}
              height={252}
              priority
              className="w-full h-auto"
            />
          </div>

          {/* Paragraph */}
          <p className="text-[#383838] text-base md:text-lg lg:text-xl leading-tight text-justify break-words">
            Step into the world of the gods with GenZipher, the signature hackathon by the CSSL GenZ Chapter of UCSC.
            This year, we fuse ancient Greek mythology with modern innovation, challenging participants to conquer challenges that test the limits of creativity and skill.
            GenZipher combines the power of AI assisted development, security focused challenges, and real world problem solving. Competitors go on a CTF style knowledge hunt, deciphering mythic clues and digital riddles to unveil the core development theme. Once revealed, teams rise to the challenge, creating innovative solutions that fit the real world.
            GenZipher is more than just a competition, it's a quest just like the ones of the mythical heroes, where the competitors go on a digital adventure for an impactful solution.
          </p>
        </div>

        {/* Right-side image */}
        <div 
          className="absolute top-0 -right-24 md:-right-48 lg:-right-72 bottom-0 z-20 w-1/2 md:w-[52%] overflow-hidden hidden sm:block"
        >
          <Image
            src="/assets/queen.png"
            alt="Genzipher Character"
            fill
            className="object-cover scale-105 md:scale-110"
            style={{
              objectPosition: "85% 0%",
            }}
            priority
          />
        </div>
      </section>

      {/* Second Section - CSSL */}
      <section 
        id="about-section-2"
        className="relative w-full h-screen bg-[#D8CDB9] overflow-hidden"
      >
        {/* Left content container (logo + paragraph) */}
        <div className="absolute z-10 flex flex-col items-center w-full max-w-[692px] top-6 md:top-12 left-4 md:left-12 px-4 md:px-0 gap-4">
          {/* Logo */}
          <Image
            src="/assets/CSSL-logo2.png"
            alt="CSSL"
            width={207}
            height={207}
            priority
            className="w-32 md:w-40 lg:w-52 h-auto"
          />

          {/* Paragraph */}
          <p className="text-[#383838] text-base md:text-lg lg:text-[22px] leading-tight text-justify break-words">
            The Computer Society of Sri Lanka (CSSL) is the professional body representing IT professionals in the country. To nurture the next generation of leaders, the CSSL GenZ Chapter was established as a youth-focused initiative, empowering undergraduates through direct engagement with industry experts. Established by the University of Colombo School of Computing (UCSC), The CSSL GenZ Chapter of UCSC stands as an initiative dedicated to empowering the next generation of IT professionals. As a proud extension of the Computer Society of Sri Lanka (CSSL), our chapter serves as a place for innovation and continuous learning. 
          </p>
        </div>

        {/* Right-side image - Bottom half of queen.png */}
        <div 
          className="absolute top-0 -right-24 md:-right-48 lg:-right-72 bottom-0 z-20 w-1/2 md:w-[65%] overflow-hidden hidden sm:block"
        >
          <Image
            src="/assets/queen.png"
            alt="CSSL Character"
            fill
            className="object-cover"
            style={{
              objectPosition: "85% 65%",
            }}
            priority
          />
        </div>
      </section>

      {/* Third Section - About Hackathon with Left Image */}
      <section
        id="about-section-3"
        className="relative w-full h-screen bg-[#D8CDB9] overflow-hidden"
      >
        {/* Left-side image */}
        <div 
          className="absolute top-0 left-0 md:left-8 lg:left-30 bottom-0 z-20 w-1/4 overflow-hidden hidden lg:block"
        >
          <Image
            src="/assets/queen.png"
            alt="Hackathon Character"
            fill
            className="object-cover scale-90"
            style={{
              objectPosition: "left center",
            }}
            priority
          />
        </div>

        {/* Right content container (paragraph + button) */}
        <div className="absolute z-10 flex flex-col items-center justify-center top-1/2 -translate-y-1/2 right-4 md:right-16 lg:right-32 w-full lg:w-1/2 px-4 md:px-8 lg:px-0">
          {/* Paragraph */}
          <p className="text-[#383838] text-lg md:text-2xl lg:text-[30px] leading-relaxed text-left break-words">
            Don't miss your chance to become a digital hero! Step into the epic world of GenZipher! Register now to join the signature hackathon adventure of the CSSL GenZ Chapter of UCSC. Assemble your team, decode mythic clues, and create solutions that could leave a lasting impact. Claim your place in this legendary quest today! Register now!
          </p>

          {/* Register Button */}
          <div className="mt-5 md:mt-8">
            <Link href="/register">
              <Button text="REGISTER" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
