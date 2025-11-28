"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./button";
import { motion, useScroll, useTransform } from "framer-motion";

export default function About({ scrollContainer }: { scrollContainer?: React.RefObject<any> }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        container: scrollContainer,
        offset: ["start start", "end end"],
        layoutEffect: false
    });

    // Parallax effect: Image is 1.7x viewport height (170vh).
    // As the section scrolls through the viewport, move the image from 0% to -41%
    // This makes the bottom half of the image visible when scrolling ends.
    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-41%"]);

    return (
        <div className="w-full bg-[#D8CDB9]">

            {/* Wrapper for Section 1 & 2 (Parallax Part) */}
            <div ref={containerRef} className="relative h-[170vh]">

                {/* Sticky Image Container (Right Side) */}
                <div className="sticky top-0 h-screen w-full overflow-hidden hidden md:block">
                    <div className="absolute right-0 top-0 w-1/2 h-full pt-12">
                        <motion.div 
                            style={{ y: imageY }} 
                            className="relative w-full h-[170%] will-change-transform transform-gpu"
                        >
                            <Image
                                src="/assets/queen.webp"
                                alt="Genzipher Character"
                                fill
                                className="object-contain"
                                style={{
                                    objectPosition: "center top",
                                }}
                                priority
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Scrolling Content (Left Side) */}
                <div className="absolute top-0 left-0 w-full h-full flex pointer-events-none">
                    {/* Left Column (Text) - Pointer events auto to allow interaction */}
                    <div className="w-full md:w-1/2 pointer-events-auto">

                        {/* Section 1: GenZipher */}
                        <section className="h-[85vh] flex flex-col justify-center px-8 md:px-16 lg:px-24">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: false, amount: 0.5 }}
                                className="flex flex-col gap-6"
                            >
                                <div className="w-full max-w-[500px]">
                                    <Image
                                        src="/assets/genzipher-text-logo-1.webp"
                                        alt="Genzipher"
                                        width={692}
                                        height={252}
                                        className="w-full h-auto"
                                        priority
                                    />
                                </div>
                                <p className="text-[#383838] text-base md:text-lg lg:text-xl leading-relaxed text-justify">
                                    Step into the world of the gods with GenZipher, the signature hackathon by the CSSL GenZ Chapter of UCSC.
                                    This year, we fuse ancient Greek mythology with modern innovation, challenging participants to conquer challenges that test the limits of creativity and skill.
                                    GenZipher combines the power of AI assisted development, security focused challenges, and real world problem solving. Competitors go on a CTF style knowledge hunt, deciphering mythic clues and digital riddles to unveil the core development theme. Once revealed, teams rise to the challenge, creating innovative solutions that fit the real world.
                                    GenZipher is more than just a competition, it's a quest just like the ones of the mythical heroes, where the competitors go on a digital adventure for an impactful solution.
                                </p>
                            </motion.div>
                        </section>

                        {/* Section 2: CSSL */}
                        <section className="h-[85vh] flex flex-col justify-center px-8 md:px-16 lg:px-24">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: false, amount: 0.5 }}
                                className="flex flex-col gap-6 items-start"
                            >
                                <div className="w-32 md:w-40 lg:w-52">
                                    <Image
                                        src="/assets/CSSL-logo2.webp"
                                        alt="CSSL"
                                        width={207}
                                        height={207}
                                        className="w-full h-auto"
                                        priority
                                    />
                                </div>
                                <p className="text-[#383838] text-base md:text-lg lg:text-[22px] leading-relaxed text-justify">
                                    The Computer Society of Sri Lanka (CSSL) is the professional body representing IT professionals in the country. To nurture the next generation of leaders, the CSSL GenZ Chapter was established as a youth-focused initiative, empowering undergraduates through direct engagement with industry experts. Established by the University of Colombo School of Computing (UCSC), The CSSL GenZ Chapter of UCSC stands as an initiative dedicated to empowering the next generation of IT professionals. As a proud extension of the Computer Society of Sri Lanka (CSSL), our chapter serves as a place for innovation and continuous learning.
                                </p>
                            </motion.div>
                        </section>

                    </div>
                </div>
            </div>

            {/* Section 3 - About Hackathon with Left Image */}
            <section
                id="about-section-3"
                className="relative w-full h-screen bg-[#D8CDB9] overflow-hidden z-20"
            >
                {/* Left-side image */}
                <div
                    className="absolute top-0 left-0 md:left-8 lg:left-30 bottom-0 z-20 w-1/4 overflow-hidden hidden lg:block"
                >
                    <Image
                        src="/assets/queen.webp"
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
