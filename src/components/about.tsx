"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./button";
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from "framer-motion";

export default function About({ scrollContainer }: { scrollContainer?: React.RefObject<any> }) {
    const containerRef = useRef < HTMLDivElement > (null);

    const { scrollYProgress } = useScroll({
                    //@ts-ignore

        target: containerRef,
        container: scrollContainer,
        offset: ["start start", "end end"],
        layoutEffect: false
    });


    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Parallax effect: Image scrolls down as user scrolls
    const imageY = useTransform(smoothProgress, [0, 1], ["0%", "-50%"]);

    // Image horizontal movement: starts from center (-25%), moves to right (0%)
    // const imageX = useTransform(scrollYProgress, [0, 0.1, 1], ["50%", "0%",  "0%"]);
    const imageX = useTransform(smoothProgress, [0, 1], ["0%", "0%"]);

    // Vertical scroll transform for GenZipher section
    // Starts from top (-50%) and slides down to center (0%) during fade in (0-10%)
    // Stays at 0% (10-40%), slides out to top (40-60%)
    const genZipherY = useTransform(smoothProgress, [0, 0.1, 0.4, 0.6], ["-50%", "0%", "0%", "-100%"]);

    // Vertical scroll transform for CSSL section
    // Starts off-screen bottom (0-40%), slides in (40-60%), stays centered (60-100%)
    const csslY = useTransform(smoothProgress, [0, 0.4, 0.6, 1], ["100%", "100%", "0%", "0%"]);

    // Opacity animations for sections
    // GenZipher: fade in (0-10%), stay visible (10-40%), fade out during slide (40-60%)
    const genZipherOpacity = useTransform(smoothProgress, [0, 0.1, 0.4, 0.6], [0, 1, 1, 0]);

    // CSSL: fade in during slide (40-60%), stay visible (60-95%), slight fade at end (95-100%)
    const csslOpacity = useTransform(smoothProgress, [0.4, 0.6, 0.95, 1], [0, 1, 1, 0.95]);

    return (
        <div className="w-full bg-[#D8CDB9]">

            {/* Wrapper for Section 1 & 2 (Parallax Part) - Creates scroll space */}
            <section ref={containerRef} className="w-full h-[300vh] flex flex-col bg-[#D8CDB9]">

                {/* Sticky Container - Stays in viewport while user scrolls */}
                <div className="h-screen w-full sticky top-0 overflow-hidden hidden md:flex md:flex-row">

                    {/* Left Side - Horizontal Scrolling Text Container */}
                    <div className="w-1/2 h-full overflow-hidden relative">
                        {/* Section 1: GenZipher */}
                        <motion.div
                            style={{ y: genZipherY }}
                    //@ts-ignore

                            className="absolute w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 will-change-transform transform-gpu"
                        >
                            <motion.div
                                style={{ opacity: genZipherOpacity }}
                    //@ts-ignore

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
                        </motion.div>

                        {/* Section 2: CSSL */}
                        <motion.div
                            style={{ y: csslY }}
                    //@ts-ignore

                            className="absolute w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 will-change-transform transform-gpu"
                        >
                            <motion.div
                                style={{ opacity: csslOpacity }}
                    //@ts-ignore

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
                        </motion.div>
                    </div>

                    {/* Right Side - Parallax Image Container */}
                    <div className="w-1/2 h-full overflow-hidden">
                        <motion.div
                            style={{ y: imageY, x: imageX }}
                    //@ts-ignore

                            className="relative w-full h-[200%] will-change-transform transform-gpu"
                        >
                            <Image
                                src="/assets/queen.webp"
                                alt="Genzipher Character"
                                fill
                                className="object-contain object-top"
                                priority
                            />
                        </motion.div>
                    </div>

                </div>
            </section>

            {/* Section 3 - About Hackathon with Left Image */}
      {/* Section 3 - About Hackathon with Left Image */}
            <section
                id="about-section-3"
                className="relative w-full h-screen bg-[#D8CDB9] overflow-hidden z-20"
            >
                {/* Left-side image - ANIMATED */}
                {/* CHANGED: hidden lg:block -> hidden md:block (Shows image on tablet/intermediate screens) */}
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    //@ts-ignore
                    className="absolute top-0 left-0 md:left-0 lg:left-30 bottom-0 z-20 w-1/3 md:w-1/2 lg:w-1/4 overflow-hidden hidden md:block"
                >
                    <Image
                        src="/assets/lionguy.webp"
                        alt="Hackathon Character"
                        fill
                        className="object-contain scale-90"
                        style={{
                            objectPosition: "left center",
                        }}
                        priority
                    />
                </motion.div>

                {/* Right content container (paragraph + button) - ANIMATED */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
                    //@ts-ignore
                    // CHANGED: w-full lg:w-1/2 -> w-full md:w-1/2 (Restricts text width on tablets so it doesn't overlap the image)
                    className="absolute z-10 flex flex-col items-center justify-center top-1/2 -translate-y-1/2 right-4 md:right-8 lg:right-32 w-full md:w-1/2 lg:w-1/2 px-4 md:px-8 lg:px-0"
                >
                    {/* Paragraph */}
                    <p className="text-[#383838] text-lg md:text-xl lg:text-[30px] leading-relaxed text-left wrap-break-word">
                        Don't miss your chance to become a digital hero! Step into the epic world of GenZipher! The signature hackathon adventure of the CSSL GenZ Chapter of UCSC. Assemble your team, decode mythic clues, and create solutions that could leave a lasting impact. Claim your place in this legendary quest today! 
                    </p>

                    {/* Register Button */}
                    {/* <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        //@ts-ignore
                        className="mt-5 md:mt-8"
                    >
                        <Link href="/register">
                            <Button text="REGISTER" disabled={false}/>
                        </Link>
                    </motion.div> */}
                </motion.div>
            </section>
        </div>
    );
}