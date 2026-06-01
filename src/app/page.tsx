"use client";

import React, { useState, useCallback } from "react";
import { Info } from "lucide-react";
import HistoricalMap from "@/components/HistoricalMap";
import SidebarPanel from "@/components/SidebarPanel";
import TimeSlider from "@/components/TimeSlider";
import EmpireNavSidebar from "@/components/EmpireNavSidebar";
import { ERAS, getEraByYear, type EmpireData, type EraYear } from "@/data/worldHistoryData";

export default function VisualHistoryPage() {
  const [activeYear, setActiveYear] = useState<EraYear>(-1350);
  const [selectedEmpire, setSelectedEmpire] = useState<EmpireData | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const activeEra = getEraByYear(activeYear);

  const handleYearChange = useCallback((year: EraYear) => {
    setActiveYear(year);
    setSelectedEmpire(null);
    setDetailOpen(false);
    setShowHint(true);
  }, []);

  const handleSelectEmpire = useCallback((empire: EmpireData) => {
    // If clicking empire from nav sidebar, also change era
    setActiveYear(empire.era);
    setSelectedEmpire(empire);
    setDetailOpen(true);
    setShowHint(false);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setDetailOpen(false);
    setSelectedEmpire(null);
  }, []);

  return (
    <main className="fixed inset-0 overflow-hidden" style={{ background: "#0D0C0A" }}>

      {/* ── Left Empire Navigator ─────────────────────────── */}
      <EmpireNavSidebar
        activeYear={activeYear}
        selectedEmpireId={selectedEmpire?.id ?? null}
        onSelectEmpire={handleSelectEmpire}
      />

      {/* ── Map area — positioned right of left sidebar ────── */}
      <div
        className="absolute top-0 bottom-0 transition-all duration-300"
        style={{
          left: "52px", // collapsed sidebar width; sidebar handles its own width
          right: detailOpen ? "min(420px, 92vw)" : "0",
        }}
      >
        <HistoricalMap
          era={activeEra}
          selectedEmpire={selectedEmpire}
          onEmpireClick={handleSelectEmpire}
        />
      </div>

      {/* ── Top header overlay ────────────────────────────── */}
      <div
        className="absolute top-0 z-30 flex items-center justify-between px-4 py-3 pointer-events-none"
        style={{
          left: "52px",
          right: "0",
          background: "linear-gradient(to bottom, rgba(13,12,10,0.92) 0%, transparent 100%)",
        }}
      >
        {/* Title */}
        <div>
          <h1
            className="font-serif text-lg font-bold leading-none"
            style={{
              background: "linear-gradient(135deg, #D4AF37, #F4EBE1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            تاریخ بصری
          </h1>
          <p className="text-[9px] font-sans tracking-[0.3em] uppercase mt-0.5" style={{ color: "rgba(212,175,55,0.55)" }}>
            Visual History
          </p>
        </div>

        {/* Active era pill */}
        {activeEra.empires.length > 0 && (
          <div
            className="hidden sm:flex items-center gap-2 rounded-full px-3 py-1.5 pointer-events-auto"
            style={{
              background: `${activeEra.empires[0].borderColor}25`,
              border: `1px solid ${activeEra.empires[0].borderColor}55`,
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: activeEra.empires[0].borderColor, boxShadow: `0 0 6px ${activeEra.empires[0].borderColor}` }}
            />
            <span className="text-xs font-sans" style={{ color: "#E8D9B5" }}>
              {activeEra.empires.length === 1
                ? activeEra.empires[0].name
                : `${activeEra.empires.length} Empires — ${activeEra.label}`}
            </span>
          </div>
        )}
      </div>

      {/* ── Click hint ────────────────────────────────────── */}
      {showHint && (
        <div
          className="absolute top-16 z-30 flex items-center gap-2 px-4 py-2 rounded-full pointer-events-none"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(26,24,20,0.88)",
            border: "1px solid rgba(212,175,55,0.35)",
            backdropFilter: "blur(8px)",
            animation: "hintBounce 2s ease-in-out infinite",
          }}
        >
          <Info size={12} style={{ color: "#D4AF37" }} />
          <span className="text-xs font-sans" style={{ color: "rgba(244,235,225,0.8)" }}>
            Click a region to explore · Use the left panel to switch empires
          </span>
        </div>
      )}

      {/* ── Map legend ────────────────────────────────────── */}
      <div
        className="absolute z-30 rounded-lg px-3 py-2.5 flex flex-col gap-1.5"
        style={{
          bottom: "130px",
          left: "62px",
          background: "rgba(13,12,10,0.82)",
          border: "1px solid rgba(212,175,55,0.18)",
          backdropFilter: "blur(10px)",
        }}
      >
        <p className="text-[9px] uppercase tracking-[0.2em] font-sans mb-0.5" style={{ color: "rgba(212,175,55,0.65)" }}>
          Legend
        </p>
        {[
          { color: "#D4AF37", label: "Capital" },
          { color: "#B8C4CC", label: "City" },
          { color: "#E74C3C", label: "Conflict" },
          { color: "#8E44AD", label: "Exile Route" },
          { color: "#27AE60", label: "Sacred Site" },
          { color: "#E67E22", label: "Temple" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
            <span className="text-[10px] font-sans" style={{ color: "rgba(244,235,225,0.6)" }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* ── Right detail panel ────────────────────────────── */}
      <SidebarPanel
        empire={selectedEmpire}
        isOpen={detailOpen}
        onClose={handleCloseDetail}
      />

      {/* ── Timeline ──────────────────────────────────────── */}
      <TimeSlider activeYear={activeYear} onYearChange={handleYearChange} />
    </main>
  );
}
