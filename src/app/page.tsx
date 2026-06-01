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

      {/* ══════════════════════════════════════════════════════
          ALWAYS-VISIBLE HAMBURGER BUTTON — z-index 60, solid bg
          Never hidden, never covered, always top-left
      ══════════════════════════════════════════════════════ */}
      <button
        onClick={() => setNavOpen((p) => !p)}
        aria-label="Open empire navigation menu"
        style={{
          position: "fixed",
          top: "14px",
          left: "14px",
          zIndex: 60,
          width: "44px",
          height: "44px",
          borderRadius: "10px",
          background: navOpen
            ? "rgba(212,175,55,0.25)"
            : "rgba(20,18,14,0.92)",
          border: "1.5px solid rgba(212,175,55,0.45)",
          color: "#D4AF37",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 2px 16px rgba(0,0,0,0.55)",
          backdropFilter: "blur(10px)",
          transition: "background 0.2s, transform 0.15s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
        }}
      >
        {/* Three lines — always drawn manually so they never disappear */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <div style={{ width: "20px", height: "2px", background: "#D4AF37", borderRadius: "2px" }} />
          <div style={{ width: "20px", height: "2px", background: "#D4AF37", borderRadius: "2px" }} />
          <div style={{ width: "14px", height: "2px", background: "#D4AF37", borderRadius: "2px" }} />
        </div>
      </button>

      {/* ── App title — top centre ─────────────────────────── */}
      <div
        style={{
          position: "fixed",
          top: "14px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 30,
          pointerEvents: "none",
          textAlign: "center",
        }}
      >
        <h1
          className="font-serif font-bold"
          style={{
            fontSize: "18px",
            lineHeight: 1,
            background: "linear-gradient(135deg, #D4AF37, #F4EBE1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          تاریخ بصری
        </h1>
        <p
          className="font-sans"
          style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(212,175,55,0.45)", marginTop: "3px" }}
        >
          Visual History
        </p>
      </div>

      {/* ── Active era badge — top right ───────────────────── */}
      {activeEra.empires.length > 0 && (
        <div
          style={{
            position: "fixed",
            top: "14px",
            right: "14px",
            zIndex: 30,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            borderRadius: "999px",
            background: `${activeEra.empires[0].borderColor}22`,
            border: `1px solid ${activeEra.empires[0].borderColor}44`,
            backdropFilter: "blur(10px)",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: activeEra.empires[0].borderColor,
              boxShadow: `0 0 6px ${activeEra.empires[0].borderColor}`,
            }}
          />
          <span className="font-sans" style={{ fontSize: "11px", color: "#D4C490" }}>
            {activeEra.empires.length === 1
              ? activeEra.empires[0].name
              : `${activeEra.empires.length} empires · ${activeEra.label}`}
          </span>
        </div>
      )}

      {/* ── Full-screen map ────────────────────────────────── */}
      <div className="absolute inset-0">
        <HistoricalMap
          era={activeEra}
          selectedEmpire={selectedEmpire}
          onEmpireClick={handleSelectEmpire}
        />
      </div>

      {/* ── Click hint ────────────────────────────────────── */}
      {showHint && !navOpen && !detailOpen && (
        <div
          style={{
            position: "fixed",
            top: "72px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 25,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 18px",
            borderRadius: "999px",
            background: "rgba(20,18,14,0.88)",
            border: "1px solid rgba(212,175,55,0.28)",
            backdropFilter: "blur(8px)",
            whiteSpace: "nowrap",
            animation: "hintBounce 2.2s ease-in-out infinite",
          }}
        >
          <Info size={12} color="#D4AF37" />
          <span className="font-sans" style={{ fontSize: "11px", color: "rgba(244,235,225,0.8)" }}>
            Click ☰ to browse empires · Click any region on the map to explore
          </span>
        </div>
      )}

      {/* ── Map legend ────────────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          bottom: "130px",
          left: "14px",
          zIndex: 25,
          borderRadius: "12px",
          padding: "12px 14px",
          background: "rgba(13,12,10,0.86)",
          border: "1px solid rgba(212,175,55,0.14)",
          backdropFilter: "blur(12px)",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        <p className="font-sans" style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(212,175,55,0.55)", marginBottom: "2px" }}>
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
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: item.color, flexShrink: 0 }} />
            <span className="font-sans" style={{ fontSize: "10px", color: "rgba(244,235,225,0.55)" }}>{item.label}</span>
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
