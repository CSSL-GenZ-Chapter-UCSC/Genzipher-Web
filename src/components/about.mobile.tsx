"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AboutMobile() {
    const containerRef = useRef < any > (null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Parallax: Background is 120% height. Scan from top to bottom.
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-16.66%"]);

    return (
        <div className="w-full bg-[#D8CDB9]">

            {/* Wrapper for Section 1 & 2 (Parallax Part) */}
            <div ref={containerRef} className="relative">

                {/* Sticky Background Image */}
                <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
                    <motion.div style={{ y: bgY }} className="absolute inset-0 w-full h-[120%]">
                        <Image
                            src="/assets/mobile-about.webp"
                            alt="Background"
                            fill
                            className="object-cover"
                            style={{ objectPosition: "center top" }}
                            priority
                        />
                    </motion.div>
                </div>

                {/* Scrolling Content */}
                <div className="relative z-10 -mt-[100vh]">

                    {/* SECTION 1 */}
                    <section className="min-h-screen flex items-center justify-center p-4 snap-start">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: false, amount: 0.3 }}
                            className="bg-black/60 rounded-lg p-6 backdrop-blur-sm max-w-lg w-full"
                        >
                            <div className="flex justify-center mb-4">
                                <Image
                                    src="/assets/genzipher-text-logo-1.webp"
                                    alt="Genzipher"
                                    width={240}
                                    height={90}
                                    priority
                                />
                            </div>

                            <div className="text-[15px] text-[#D8CDB9] leading-relaxed text-justify space-y-4">
                                <p>
                                    Step into the world of the gods with GenZipher, the signature
                                    hackathon by the CSSL GenZ Chapter of UCSC. This year, we fuse
                                    ancient Greek mythology with modern innovation, challenging
                                    participants to conquer challenges that test the limits of
                                    creativity and skill.
                                </p>
                                <p>
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
                            </div>
                        </motion.div>
                    </section>

                    {/* SECTION 2 */}
                    <section className="min-h-screen flex items-center justify-center p-4 snap-start">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: false, amount: 0.3 }}
                            className="bg-black/60 rounded-lg p-6 backdrop-blur-sm max-w-lg w-full"
                        >
                            <div className="flex justify-center mb-4">
                                <Image
                                    src="/assets/CSSL-logo.webp"
                                    alt="CSSL"
                                    width={160}
                                    height={80}
                                    priority
                                />
                            </div>

                            <div className="text-[15px] text-[#D8CDB9] leading-relaxed text-justify space-y-4">
                                <p>
                                    The Computer Society of Sri Lanka (CSSL) is the professional body
                                    representing IT professionals in the country. To nurture the next
                                    generation of leaders, the CSSL GenZ Chapter was established as a
                                    youth-focused initiative, empowering undergraduates through direct
                                    engagement with industry experts.
                                </p>
                                <p>
                                    Established by the University of
                                    Colombo School of Computing (UCSC), The CSSL GenZ Chapter of UCSC
                                    stands as an initiative dedicated to empowering the next
                                    generation of IT professionals. As a proud extension of the
                                    Computer Society of Sri Lanka (CSSL), our chapter serves as a
                                    place for innovation and continuous learning.
                                </p>
                            </div>
                        </motion.div>
                    </section>

                </div>
            </div>

            {/* SECTION 3 - independent solid background */}
            <section
                className="w-full flex flex-col justify-start pt-12 snap-start relative z-20 bg-[#D8CDB9] min-h-screen"
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col h-full"
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
                    <div className="flex justify-center pb-10">
                        <Link href="/register">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-linear-to-r from-[#4C2901] via-[#C3840F] to-[#C3840F]
                           text-[#D8CDB9] rounded-md text-[14px] py-2 px-6
                           shadow-lg shadow-black/40 cursor-pointer"
                            >
                                REGISTER
                            </motion.div>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
