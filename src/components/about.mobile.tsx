"use client";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";

export default function AboutMobile() {
  const s1 = useInView<HTMLDivElement>();
  const s2 = useInView<HTMLDivElement>();
  const s3 = useInView<HTMLDivElement>();

  return (
    <div className="min-h-screen w-full snap-y">
      {/* Top wrapper with background image only for sections 1 & 2 */}
      <div
        className="w-full bg-center bg-cover"
        style={{ backgroundImage: "url('/assets/mobile-about.webp')" }}
      >
        {/* Inline animation styles (if not in globals.css) */}
        <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-slide {
          opacity: 0;
          animation: fadeSlide 0.8s ease-out forwards;
        }

        @keyframes pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .pop:hover {
          animation: pop 0.3s ease-out;
        }
      `}</style>

        <div className="max-w-xl mx-auto py-8 px-4 space-y-8 snap-y">
          {/* SECTION 1 */}
          <section
            ref={s1.ref}
            className={`bg-black/60 rounded-lg p-4 backdrop-blur-sm snap-start ${s1.inView ? 'fade-slide' : ''}`}
            style={{ animationDelay: "0s" }}
          >
            <div className="flex justify-center mb-3">
              <Image
                src="/assets/genzipher-text-logo-1.webp"
                alt="Genzipher"
                width={240}
                height={90}
                priority
              />
            </div>

            <p className="text-[15px] text-[#D8CDB9] leading-relaxed text-justify">
              <p>
              Step into the world of the gods with GenZipher, the signature
              hackathon by the CSSL GenZ Chapter of UCSC. This year, we fuse
              ancient Greek mythology with modern innovation, challenging
              participants to conquer challenges that test the limits of
              creativity and skill. 
              </p>
              <p className="pt-4">
              GenZipher combines the power of AI assisted
              development, security focused challenges, and real world problem
              solving. Competitors go on a CTF style knowledge hunt, deciphering
              mythic clues and digital riddles to unveil the core development
              theme. Once revealed, teams rise to the challenge, creating
              innovative solutions that fit the real world. GenZipher is more
              than just a competition, it’s a quest just like the ones of the
              mythical heroes, where the competitors go on a digital adventure
              for an impactful solution.
              </p>
            </p>
          </section>

          {/* SECTION 2 */}
          <section
            ref={s2.ref}
            className={`bg-black/60 rounded-lg p-4 backdrop-blur-sm snap-start ${s2.inView ? 'fade-slide' : ''}`}
            style={{ animationDelay: "0.15s" }}
          >
            <div className="flex justify-center mb-3">
              <Image
                src="/assets/CSSL-logo.webp"
                alt="CSSL"
                width={160}
                height={80}
                priority
              />
            </div>

            <p className="text-[15px] text-[#D8CDB9] leading-relaxed text-justify">
              <p>
              The Computer Society of Sri Lanka (CSSL) is the professional body
              representing IT professionals in the country. To nurture the next
              generation of leaders, the CSSL GenZ Chapter was established as a
              youth-focused initiative, empowering undergraduates through direct
              engagement with industry experts. 
              </p>
              <p className="pt-4">
              Established by the University of
              Colombo School of Computing (UCSC), The CSSL GenZ Chapter of UCSC
              stands as an initiative dedicated to empowering the next
              generation of IT professionals. As a proud extension of the
              Computer Society of Sri Lanka (CSSL), our chapter serves as a
              place for innovation and continuous learning.
              </p>
            </p>
          </section>
        </div>
      </div>

      {/* SECTION 3 - independent solid background with compact layout */}
      <section
        ref={s3.ref}
        className={`w-full flex flex-col justify-start pt-12 snap-start ${s3.inView ? 'fade-slide' : ''}`}
        style={{
          backgroundColor: "#D8CDB9",
          minHeight: "100vh",
          animationDelay: "0.3s",
        }}
        data-reveal
      >
        {/* Content (text + image) side by side */}
        <div className="flex items-center mb-6 px-4">
          {/* Left text area */}
          <div className="flex-1">
            <p className="text-[15px] text-[#140E02] leading-relaxed text-justify">
              Don’t miss your chance to become a digital hero! Step into the
              epic world of GenZipher! Register now to join the signature
              hackathon adventure of the CSSL GenZ Chapter of UCSC. Assemble
              your team, decode mythic clues, and create solutions that could
              leave a lasting impact. Claim your place in this legendary quest
              today! Register now!
            </p>
          </div>

          {/* Right — cropped half of queen.png */}
          <div className="w-2/5 h-110 relative overflow-hidden shrink-0 -mr-4">
            <Image
              src="/assets/queen.webp"
              alt="Warrior"
              fill
              className="object-cover scale-100"
              style={{ objectPosition: "left center" }}
              priority
            />
          </div>
        </div>

        {/* Register button - centered and close to content */}
        <div className="flex justify-center">
          <Link href="/register">
            <div
              className="bg-linear-to-r from-[#4C2901] via-[#C3840F] to-[#C3840F]
                         text-[#D8CDB9] rounded-md text-[14px] py-2 px-6
                         shadow-lg shadow-black/40 pop cursor-pointer"
            >
              REGISTER
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
