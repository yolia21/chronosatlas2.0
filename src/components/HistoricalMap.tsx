"use client";

import dynamic from "next/dynamic";
import type { EmpireData, EraData } from "@/data/worldHistoryData";

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#0D0C0A]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 border-4 border-[#D4AF37]/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-transparent border-t-[#D4AF37] rounded-full animate-spin" />
        </div>
        <p className="font-serif text-[#D4AF37] text-lg tracking-widest animate-pulse">
          Loading atlas…
        </p>
      </div>
    </div>
  ),
});

interface HistoricalMapProps {
  era: EraData;
  selectedEmpire: EmpireData | null;
  onEmpireClick: (empire: EmpireData) => void;
}

export default function HistoricalMap(props: HistoricalMapProps) {
  return <MapComponent {...props} />;
}
