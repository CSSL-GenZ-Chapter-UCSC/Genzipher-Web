import Image from "next/image";

export default function RoundInfoView({
  text,
  footer,
  img,
}: {
  text: string;
  footer: string;
  img: string;
}) {
  return (
    <section className="relative w-screen min-h-screen overflow-hidden bg-[#0f0d08]">
      <h1 className="absolute left-[2%] top-10 z-30 text-white font-extrabold tracking-tight leading-[0.85] text-[12vw]">
        {text}
      </h1>
      <div className="absolute left-[2%] bottom-0 h-[40vh] md:h-[88vh] z-99">
        <div className="relative h-full translate-x-[-3%]">
          <Image
            src={img}
            alt={text}
            width={1600}
            height={2400}
            priority
            className="h-full w-auto object-contain object-bottom select-none"
            style={{ height: "100%", width: "auto" }}
          />
          <Image
            src="/twerl.png"
            alt="Overlay"
            width={1600}
            height={2400}
            className="pointer-events-none absolute inset-0 h-full w-auto object-contain object-bottom -z-10 opacity-70 translate-x-[6%] translate-y-[6%] scale-110"
            style={{ height: "100%", width: "auto" }}
          />
        </div>
      </div>

      <div className="absolute right-[6%] top-1/2 z-30 -translate-y-1/2 w-[60%] md:w-[36%] text-white p-[4%] bg-[#D8CDB966] md:bg-inherit rounded-xl">
        <div className="text-[2rem] mb-6 font-semibold tracking-wide uppercase">
          What to expect?
        </div>

        <p className="text-[1.3rem] opacity-90 mb-10">
          You will be given 4 hours …..
        </p>

        <div className="text-[1.15rem] leading-[1.85] tracking-wide uppercase">
          <div>DATE :</div>
          <div>TIME :</div>
          <div>VENUE :</div>
        </div>

        <div className="mt-20 text-[1.25rem] tracking-wide uppercase opacity-90">
          {footer}
        </div>
      </div>
    </section>
  );
}
