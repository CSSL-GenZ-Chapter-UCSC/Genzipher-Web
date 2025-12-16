"use client";

import { useEffect, useState } from "react";

type StatItem = {
  name: string;
  count: number;
};

export default function UniversityStats() {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();

        // Convert object to array and sort by count descending
        const formattedStats: StatItem[] = Object.entries(data)
          .map(([name, count]) => ({
            name,
            count: Number(count),
          }))
          .sort((a, b) => b.count - a.count);

        setStats(formattedStats);
      } catch (error) {
        console.error("Error loading stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-[#140E02] py-10 flex justify-center items-center text-[#D8CDB9] border-t border-[#D8CDB9]/10">
        <p className="animate-pulse">Loading Statistics...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#140E02] py-12 md:py-20 px-4 md:px-10 border-t border-[#D8CDB9]/10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-[#D8CDB9] mb-10 text-center uppercase tracking-widest">
          University Leaderboard
        </h2>

        {/* Grid Layout: 2 cols on mobile, 3 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((uni, index) => (
            <div
              key={uni.name}
              className="
                group
                relative 
                flex flex-col justify-between 
                bg-[#D8CDB9]/5 
                border border-[#D8CDB9]/10 
                p-6 
                hover:border-[#D8CDB9]/30 
                transition-all duration-300
              "
            >
              {/* Rank Number (Top Left) */}
              <div className="absolute top-4 left-4 text-[#D8CDB9]/20 text-xs font-mono">
                #{String(index + 1).padStart(2, "0")}
              </div>

              {/* Count (Big Number) */}
              <div className="flex justify-center items-center py-4">
                <span className="text-5xl md:text-6xl font-bold text-[#D8CDB9]">
                  {uni.count}
                </span>
              </div>

              {/* University Name (Bottom) */}
              <div className="text-center border-t border-[#D8CDB9]/10 pt-4 mt-2">
                <h3 className="text-[#D8CDB9] text-xs md:text-sm font-medium uppercase tracking-wider leading-relaxed">
                  {uni.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-[#D8CDB9]/40 text-xs uppercase tracking-widest">
            Live Registration Updates
          </p>
        </div>
      </div>
    </div>
  );
}