"use client";

import React, { useState, useCallback } from "react";
import { Menu, Info } from "lucide-react";
import HistoricalMap from "@/components/HistoricalMap";
import SidebarPanel from "@/components/SidebarPanel";
import TimeSlider from "@/components/TimeSlider";
import EmpireNavSidebar from "@/components/EmpireNavSidebar";
import { getEraByYear, type EmpireData, type EraYear } from "@/data/worldHistoryData";

export default function VisualHistoryPage() {
  const [activeYear, setActiveYear] = useState<EraYear>(-1350);
  const [selectedEmpire, setSelectedEmpire] = useState<EmpireData | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const activeEra = getEraByYear(activeYear);

  const handleYearChange = useCallback((year: EraYear) => {
    setActiveYear(year);
    setSelectedEmpire(null);
    setDetailOpen(false);
    setShowHint(true);
  }, []);

  const handleSelectEmpire = useCallback((empire: EmpireData) => {
    setActiveYear(empire.era);
    setSelectedEmpire(empire);
    setDetailOpen(true);
    setNavOpen(false);
    setShowHint(false);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setDetailOpen(false);
    setSelectedEmpire(null);
  }, []);

  return (
    <main className="fixed inset-0 overflow-hidden" style={{ background: "#0D0C0A" }}>

      {/* ── Full-screen map — always fills entire viewport ─── */}
      <div className="absolute inset-0">
        <HistoricalMap
          era={activeEra}
          selectedEmpire={selectedEmpire}
          onEmpireClick={handleSelectEmpire}
        />
      </div>

      {/* ── Top header bar ─────────────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 z-30 flex items-center gap-3 px-4 py-3"
        style={{
          background: "linear-gradient(to bottom, rgba(13,12,10,0.94) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      >
        {/* Hamburger menu button */}
        <button
          onClick={() => setNavOpen(true)}
          className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0 transition-all duration-200 active:scale-95"
          style={{
            background: "rgba(212,175,55,0.12)",
            border: "1px solid rgba(212,175,55,0.3)",
            color: "#D4AF37",
            pointerEvents: "auto",
          }}
          aria-label="Open empire navigation"
        >
          <Menu size={18} />
        </button>

        {/* App title */}
        <div style={{ pointerEvents: "none" }}>
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
          <p
            className="text-[9px] font-sans tracking-[0.3em] uppercase mt-0.5"
            style={{ color: "rgba(212,175,55,0.5)" }}
          >
            Visual History
          </p>
        </div>

        {/* Active era badge */}
        <div className="flex-1 flex justify-end" style={{ pointerEvents: "none" }}>
          {activeEra.empires.length > 0 && (
            <div
              className="hidden sm:flex items-center gap-2 rounded-full px-3 py-1.5"
              style={{
                background: `${activeEra.empires[0].borderColor}22`,
                border: `1px solid ${activeEra.empires[0].borderColor}44`,
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: activeEra.empires[0].borderColor,
                  boxShadow: `0 0 5px ${activeEra.empires[0].borderColor}`,
                }}
              />
              <span className="text-xs font-sans" style={{ color: "#D4C490" }}>
                {activeEra.empires.length === 1
                  ? activeEra.empires[0].name
                  : `${activeEra.empires.length} Empires · ${activeEra.label}`}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Click hint ────────────────────────────────────── */}
      {showHint && !navOpen && !detailOpen && (
        <div
          className="absolute z-20 flex items-center gap-2 px-4 py-2 rounded-full pointer-events-none"
          style={{
            top: "72px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(20,18,14,0.88)",
            border: "1px solid rgba(212,175,55,0.3)",
            backdropFilter: "blur(8px)",
            animation: "hintBounce 2.2s ease-in-out infinite",
            whiteSpace: "nowrap",
          }}
        >
          <Info size={12} style={{ color: "#D4AF37" }} />
          <span className="text-xs font-sans" style={{ color: "rgba(244,235,225,0.8)" }}>
            Click a region to explore · Use ☰ to switch empires
          </span>
        </div>
      )}

      {/* ── Map legend ────────────────────────────────────── */}
      <div
        className="absolute z-20 rounded-xl px-3 py-3 flex flex-col gap-1.5"
        style={{
          bottom: "130px",
          left: "16px",
          background: "rgba(13,12,10,0.85)",
          border: "1px solid rgba(212,175,55,0.15)",
          backdropFilter: "blur(12px)",
        }}
      >
        <p
          className="text-[9px] uppercase tracking-[0.22em] font-sans mb-1"
          style={{ color: "rgba(212,175,55,0.6)" }}
        >
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
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: item.color }}
            />
            <span className="text-[10px] font-sans" style={{ color: "rgba(244,235,225,0.55)" }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Left empire navigation drawer ─────────────────── */}
      <EmpireNavSidebar
        isOpen={navOpen}
        onClose={() => setNavOpen(false)}
        activeYear={activeYear}
        selectedEmpireId={selectedEmpire?.id ?? null}
        onSelectEmpire={handleSelectEmpire}
      />

      {/* ── Right detail panel ────────────────────────────── */}
      <SidebarPanel
        empire={selectedEmpire}
        isOpen={detailOpen}
        onClose={handleCloseDetail}
      />

      {/* ── Bottom timeline ───────────────────────────────── */}
      <TimeSlider activeYear={activeYear} onYearChange={handleYearChange} />
    </main>
  );
}
