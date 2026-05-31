"use client";

import React, { useState, useCallback } from "react";
import { Map, Info } from "lucide-react";
import HistoricalMap from "@/components/HistoricalMap";
import SidebarPanel from "@/components/SidebarPanel";
import TimeSlider from "@/components/TimeSlider";
import {
  EMPIRES_BY_YEAR,
  type EmpireData,
  type EraYear,
} from "@/data/worldHistoryData";

export default function ChronosAtlasPage() {
  const [activeYear, setActiveYear] = useState<EraYear>(100);
  const [selectedEmpire, setSelectedEmpire] = useState<EmpireData | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const activeEmpire = EMPIRES_BY_YEAR[activeYear];

  const handleYearChange = useCallback((year: EraYear) => {
    setActiveYear(year);
    setSelectedEmpire(null);
    setIsSidebarOpen(false);
    setShowHint(true);
  }, []);

  const handleEmpireClick = useCallback((empire: EmpireData) => {
    setSelectedEmpire(empire);
    setIsSidebarOpen(true);
    setShowHint(false);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setIsSidebarOpen(false);
    setSelectedEmpire(null);
  }, []);

  return (
    <main className="fixed inset-0 overflow-hidden bg-[#0D0C0A]">
      {/* ── Header Bar ──────────────────────────────────────── */}
      <header
        className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-3"
        style={{
          background:
            "linear-gradient(to bottom, rgba(13,12,10,0.95) 0%, rgba(13,12,10,0.0) 100%)",
          pointerEvents: "none",
        }}
      >
        <div className="flex items-center gap-3" style={{ pointerEvents: "auto" }}>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #8B6914, #D4AF37)",
              boxShadow: "0 0 16px rgba(212,175,55,0.4)",
            }}
          >
            <Map size={18} className="text-[#1A1814]" />
          </div>
          <div>
            <h1
              className="font-serif text-xl font-bold leading-none tracking-wide"
              style={{
                background: "linear-gradient(135deg, #D4AF37, #F4EBE1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ChronosAtlas
            </h1>
            <p className="text-[#D4AF37]/55 text-[10px] font-sans tracking-[0.22em] uppercase mt-0.5">
              Cartographer&apos;s Journal
            </p>
          </div>
        </div>

        {/* Era Pill */}
        <div
          className="hidden sm:flex items-center gap-2 rounded-full px-4 py-1.5"
          style={{
            background: `${activeEmpire.borderColor}33`,
            border: `1px solid ${activeEmpire.borderColor}66`,
            pointerEvents: "auto",
          }}
        >
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: activeEmpire.borderColor }}
          />
          <span className="font-serif text-[#F4EBE1] text-sm">{activeEmpire.name}</span>
        </div>
      </header>

      {/* ── Main Map Area ────────────────────────────────────── */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          right: isSidebarOpen ? "min(420px, 100vw)" : "0",
        }}
      >
        <HistoricalMap
          activeEmpire={activeEmpire}
          era={activeYear}
          onEmpireClick={handleEmpireClick}
        />
      </div>

      {/* ── Click Hint ───────────────────────────────────────── */}
      {showHint && (
        <div
          className="absolute top-20 left-1/2 -translate-x-1/2 z-30 
                     flex items-center gap-2 px-4 py-2 rounded-full
                     animate-bounce pointer-events-none"
          style={{
            background: "rgba(26,24,20,0.85)",
            border: "1px solid rgba(212,175,55,0.4)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Info size={13} className="text-[#D4AF37]" />
          <span className="text-[#F4EBE1]/80 text-xs font-sans">
            Click on the highlighted region to explore
          </span>
        </div>
      )}

      {/* ── Legend pill (bottom left) ───────────────────────── */}
      <div
        className="absolute bottom-32 left-4 z-30 rounded-lg px-4 py-3 flex flex-col gap-2"
        style={{
          background: "rgba(13,12,10,0.82)",
          border: "1px solid rgba(212,175,55,0.2)",
          backdropFilter: "blur(8px)",
        }}
      >
        <p className="text-[#D4AF37]/70 text-[9px] uppercase tracking-[0.2em] font-sans mb-0.5">
          Legend
        </p>
        {[
          { color: "#D4AF37", label: "Capital" },
          { color: "#F4EBE1", label: "Major City" },
          { color: "#E74C3C", label: "Rebellion Centre" },
          { color: "#8E44AD", label: "Exile Route" },
          { color: "#27AE60", label: "Sacred Site" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: item.color }}
            />
            <span className="text-[#F4EBE1]/65 text-[10px] font-sans">{item.label}</span>
          </div>
        ))}
      </div>

      {/* ── Sidebar Panel ────────────────────────────────────── */}
      <SidebarPanel
        empire={selectedEmpire}
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />

      {/* ── Time Slider ──────────────────────────────────────── */}
      <TimeSlider activeYear={activeYear} onYearChange={handleYearChange} />
    </main>
  );
}
