"use client";

import dynamic from "next/dynamic";
import type { EmpireData, EraYear } from "@/data/worldHistoryData";

// Dynamic import prevents Leaflet SSR errors (window is undefined on server)
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#F4EBE1]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
        <p className="font-serif text-[#2C2A29] text-lg tracking-widest animate-pulse">
          Loading atlas…
        </p>
      </div>
    </div>
  ),
});

interface HistoricalMapProps {
  activeEmpire: EmpireData;
  era: EraYear;
  onEmpireClick: (empire: EmpireData) => void;
}

export default function HistoricalMap({ activeEmpire, era, onEmpireClick }: HistoricalMapProps) {
  return (
    <MapComponent activeEmpire={activeEmpire} era={era} onEmpireClick={onEmpireClick} />
  );
}
