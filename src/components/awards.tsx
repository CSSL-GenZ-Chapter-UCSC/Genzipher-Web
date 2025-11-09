"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Award = {
  key: string;
  src: string;
  title: string;
  w: number;
  h: number;
  borderGradient: string;
};

export default function Awards() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const items: Award[] = [
    {
      key: "vision",
      src: "/assets/awards/vision_award.png",
      title: "THE FLAME OF VISION",
      w: 220,
      h: 334,
      borderGradient: "linear-gradient(180deg, #A89463 10.09%, #4C2900 84.75%)",
    },
    {
      key: "honor",
      src: "/assets/awards/honor_award.png",
      title: "THE GUARDIANS HONOR",
      w: 336,
      h: 511,
      borderGradient: "linear-gradient(180deg, #A78A4E 10.09%, #6B5528 84.75%)",
    },
    {
      key: "innovator",
      src: "/assets/awards/innovator_award.png",
      title: "THE DIVINE INNOVATOR",
      w: 220,
      h: 334,
      borderGradient: "linear-gradient(180deg, #643901 10.09%, #85652C 84.75%)",
    },
  ];

  const [order, setOrder] = useState<string[]>(items.map((i) => i.key));

  function onClickItem(originalIndex: number) {
    const current = [...order];
    const clickedKey = items[originalIndex].key;
    const pos = current.indexOf(clickedKey);

    let newOrder: string[] = current;
    if (pos === 0) {
      newOrder = [current[2], current[0], current[1]];
    } else if (pos === 1) {
      newOrder = current;
    } else if (pos === 2) {
      newOrder = [current[1], current[2], current[0]];
    }

    setOrder(newOrder);
  }

  return (
    // <section className="w-screen flex justify-center items-center bg-[#0F0D08] py-10 md:py-20 overflow-visible h-screen box-border">
    <section className="w-screen h-screen flex justify-center items-center bg-[#0F0D08] py-10 md:py-20 overflow-hidden min-h-[90vh] ">
      <div className="w-full h-full text-center px-4 md:px-6 box-border flex flex-col justify-center items-center">
        <div className="mb-8 h-[10%] flex justify-center items-center">
          <h2 className="text-[1.5rem] md:text-3xl text-[#E6D9B6]">
            {order[1] === "honor" ? (
              "EARN YOUR PRIZE"
            ) : (
              <>
                <span>Honoring the divine spirit of creation</span>
                <br />
                <span>and courage</span>
              </>
            )}
          </h2>
        </div>

        <div
          className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 mb-8 relative w-full max-w-[900px]"
          style={{
            minHeight: "clamp(380px, 55vh, 520px)", // keeps consistent height on all swaps
          }}
        >
          {order.map((key, displayIdx) => {
            const it = items.find((x) => x.key === key)!;
            const isCenter = displayIdx === 1;
            const baseWidth = isCenter ? 336 : 220;
            const baseHeight = isCenter ? 511 : 334;
            const mobileScale = 0.8;
            const aspect = baseWidth / baseHeight;
            const originalIndex = items.findIndex((x) => x.key === it.key);

            return (
              <button
                key={it.key}
                onClick={() => onClickItem(originalIndex)}
                className={`group relative flex items-center justify-center p-1.5 bg-transparent 
                    transition-all duration-700 ease-[cubic-bezier(0.45,1.45,0.8,1)]
                    focus:outline-none hover:scale-[1.02]`}
                style={{
                  flex: "0 1 auto",
                  width: isCenter ? "min(40vw, 340px)" : "min(25vw, 220px)",
                  aspectRatio: aspect.toString(), // locks proportions
                  transform: `scale(${isCenter ? 1 : 0.85}) translateY(${
                    isCenter ? "0" : "25px"
                  })`,
                  borderRadius: "50px",
                  background: `${it.borderGradient} padding-box, #000 border-box`,
                  backgroundClip: "padding-box, border-box",
                  boxShadow: isCenter
                    ? "0 8px 32px rgba(0,0,0,0.5)"
                    : "0 4px 16px rgba(0,0,0,0.25)",
                }}
              >
                <div
                  className="relative w-full h-full flex items-center justify-center rounded-[44px] overflow-hidden bg-[#0F0D08]"
                  style={{
                    padding: isCenter ? "28px" : "20px",
                  }}
                >
                  <Image
                    src={it.src}
                    alt={it.title}
                    fill
                    className="object-contain select-none transition-opacity duration-300"
                    onLoadingComplete={() => setIsLoading(false)}
                    sizes="(max-width: 768px) 40vw, 336px"
                    priority={isCenter}
                  />
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Link href='/register'>
          
          <button
            onClick={() => router.push("/prizes-2")}
            className="w-[173px] h-14 bg-[#C39613] neue-machina text-black font-bold rounded-md transition-all duration-300 ease-in-out hover:scale-105"
            style={{
              boxShadow:
                "0 0 20px rgba(195,150,19,0.4), 0 0 40px rgba(195,150,19,0.25), 0 0 60px rgba(195,150,19,0.15)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 25px rgba(195,150,19,0.7), 0 0 50px rgba(195,150,19,0.5), 0 0 80px rgba(195,150,19,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 20px rgba(195,150,19,0.4), 0 0 40px rgba(195,150,19,0.25), 0 0 60px rgba(195,150,19,0.15)";
            }}
          >
            REGISTER
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
