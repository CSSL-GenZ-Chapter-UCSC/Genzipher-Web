

"use client";

import { useEffect, useMemo, useState,useRef } from "react";

type StatItem = {
  name: string;
  count: number;
};

function CardShell({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl h-full",
        "border border-[#D8CDB9]/15",
        "bg-gradient-to-br from-[#1C1507] via-[#120D03] to-[#0B0702]",
        "shadow-[0_0_0_1px_rgba(216,205,185,0.06),0_18px_60px_rgba(0,0,0,0.55)]",
        "transition-all duration-300 hover:border-[#D8CDB9]/30",
        className,
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_20%_10%,rgba(216,205,185,0.14),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_80%_90%,rgba(216,205,185,0.08),transparent_55%)]" />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

// Increased height from 210px to 260px for desktop
function FeaturedCard({ uni }: { uni: StatItem }) {
  return (
    <CardShell className="h-[170px] md:h-[260px]">
      <div className="h-full flex flex-col items-center justify-center px-6">
        <div className="text-[#D8CDB9] text-5xl md:text-6xl font-semibold leading-none">
          {uni.count}
        </div>

        <div className="w-full mt-5 md:mt-6 border-t border-[#D8CDB9]/15" />

        {/* Removed 'leading-relaxed' to prevent excessive spacing and ensured no clamping */}
        <div className="mt-4 text-center text-[#D8CDB9]/85 uppercase tracking-[0.28em] text-[10px] md:text-[14px] leading-tight">
          {uni.name}
        </div>
      </div>
    </CardShell>
  );
}

// Increased height from 120px to 160px and removed line-clamp-2
function SmallCard({ uni }: { uni: StatItem }) {
  return (
    <CardShell className="h-[110px] md:h-[160px] rounded-xl">
      <div className="h-full flex flex-col items-center justify-center px-4">
        <div className="text-[#D8CDB9] text-3xl md:text-4xl font-semibold leading-none">
          {uni.count}
        </div>

        <div className="w-full mt-3 border-t border-[#D8CDB9]/12" />

        {/* Removed 'line-clamp-2' so text can wrap to 3+ lines if necessary */}
        <div className="mt-2 text-center text-[#D8CDB9]/80 uppercase tracking-[0.24em] text-[11px] leading-snug">
          {uni.name}
        </div>
      </div>
    </CardShell>
  );
}

// ... rest of the components (MobileHorizontalCard, UniversityStats) remain unchanged

function MobileHorizontalCard({ uni }: { uni: StatItem }) {
  return (
    <CardShell className="rounded-xl">
      <div className="flex items-center justify-between px-6 py-5">
        <div className="text-[#D8CDB9] text-4xl font-semibold leading-none">
          {uni.count}
        </div>

        <div className="mx-5 h-10 w-px bg-[#D8CDB9]/15" />

        <div className="flex-1 text-[#D8CDB9]/85 uppercase tracking-[0.25em] text-[12px] leading-relaxed">
          {uni.name}
        </div>
      </div>
    </CardShell>
  );
}

export default function UniversityStats() {
   const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);
  const fetchedRef = useRef(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // 1) Observe when this section is near view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Find the scrollable main container (your <main> has overflow-y-auto)
    const scrollRoot = el.closest("main"); // works because UniversityStats is inside <main>

    // If for some reason we can’t find it, fallback to viewport
    const rootEl = scrollRoot instanceof HTMLElement ? scrollRoot : null;

    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.isIntersecting) {
          setShouldFetch(true);
          obs.disconnect();
        }
      },
      {
        root: rootEl,
        rootMargin: "700px 0px", // start fetching before user reaches it
        threshold: 0.01,
      }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // 2) Fetch only once, only when near
  useEffect(() => {
    if (!shouldFetch) return;
    if (fetchedRef.current) return;

    fetchedRef.current = true;
    setLoading(true);

    (async () => {
      try {
        const res = await fetch("/api/stats", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        const formatted: StatItem[] = Object.entries(data)
          .map(([name, count]) => ({ name, count: Number(count) }))
          .sort((a, b) => b.count - a.count);

        setStats(formatted);
      } catch (err) {
        console.error("Error loading stats:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [shouldFetch]);

  const top3 = useMemo(() => stats.slice(0, 3), [stats]);
  const rest = useMemo(() => stats.slice(3), [stats]);

  // IMPORTANT: keep a stable placeholder height BEFORE fetch
  // so page height doesn't drastically change on reload.
  const placeholder = (
    <div className="w-full bg-[#140E02] py-12 md:py-20 px-4 md:px-10 border-t border-[#D8CDB9]/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-[#D8CDB9]/90 uppercase tracking-[0.35em] text-xl md:text-2xl font-semibold">
            Registered Participants Across Universities
          </h2>
          <span className="text-[#D8CDB9]/90 uppercase tracking-[0.35em] text-[0.7rem] md:text-[1rem] font-semibold">
            Where Are Our Coders From?
          </span>
        </div>

        <div className="text-center text-[#D8CDB9]/60">
          {loading ? (
            <p className="animate-pulse">Loading Statistics...</p>
          ) : (
            <p>…</p>
          )}
        </div>

        {/* reserve space to avoid layout jump */}
        <div className="h-[420px] md:h-[340px]" />
      </div>
    </div>
  );

  // Before we even decide to fetch, render placeholder + attach ref
  if (!shouldFetch) {
    return <div ref={containerRef}>{placeholder}</div>;
  }

  // While fetching, keep placeholder (so same height)
  if (loading && !stats.length) {
    return <div ref={containerRef}>{placeholder}</div>;
  }

  if (!stats.length) {
    return (
      <div ref={containerRef} className="w-full bg-[#140E02] py-12 md:py-20 px-4 md:px-10 border-t border-[#D8CDB9]/10">
        <div className="max-w-7xl mx-auto text-center text-[#D8CDB9]/60">
          No university stats yet.
        </div>
      </div>
    );
  }


  return (
    <div ref={containerRef} className="w-full bg-[#140E02] py-12 md:py-20 px-4 md:px-10 border-t border-[#D8CDB9]/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-[#D8CDB9]/90 uppercase tracking-[0.35em] text-xl md:text-2xl font-semibold">
             Registered Participants Across Universities
          </h2>
          <span className="text-[#D8CDB9]/90 uppercase tracking-[0.35em] text-[0.7rem] md:text-[1rem] font-semibold">
            Where Are Our Coders From?
          </span>
        </div>

        {/* MOBILE (matches stacked horizontal cards + list card vibe) */}
        <div className="md:hidden space-y-4">
          {top3.map((uni) => (
            <MobileHorizontalCard key={uni.name} uni={uni} />
          ))}

          {rest.length > 0 && (
            <CardShell className="rounded-xl">
              <div className="px-4 py-3">
                <div className="max-h-[260px] overflow-y-auto">
                  {rest.map((uni, idx) => (
                    <div key={uni.name} className="flex items-center">
                      <div className="w-16 text-[#D8CDB9] text-lg font-semibold py-3">
                        {uni.count}
                      </div>
                      <div className="flex-1 py-3 border-b border-[#D8CDB9]/10">
                        <div className="text-[#D8CDB9]/85 uppercase tracking-[0.22em] text-[11px] leading-relaxed">
                          {uni.name}
                        </div>
                      </div>
                      {idx === rest.length - 1 ? null : (
                        <div className="absolute left-0 right-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardShell>
          )}
        </div>

        {/* DESKTOP/TABLET (matches 3 big cards + smaller grid) */}
        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-6">
            {top3.map((uni) => (
              <FeaturedCard key={uni.name} uni={uni} />
            ))}
          </div>

          {rest.length > 0 && (
            <div className="mt-6">
              <div className="grid grid-cols-4 lg:grid-cols-6 gap-4">
                {rest.map((uni) => (
                  <SmallCard key={uni.name} uni={uni} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-10 md:mt-12">
          <p className="text-[#D8CDB9]/90 text-xs md:text-[1rem] uppercase tracking-widest">
            Still haven’t registered ? Register now and carry your university’s name forward
          </p>
        </div>
      </div>
    </div>
  );
}
