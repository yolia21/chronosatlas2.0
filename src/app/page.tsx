"use client";

import React, { useState, useCallback } from "react";
import HistoricalMap from "@/components/HistoricalMap";
import SidebarPanel from "@/components/SidebarPanel";
import TimeSlider from "@/components/TimeSlider";
import EmpireNavSidebar from "@/components/EmpireNavSidebar";
import { getEraByYear, type EmpireData, type EraYear } from "@/data/worldHistoryData";

// ─── Inline style constants ───────────────────────────────────────────────────
const GOLD = "#D4AF37";
const DARK = "rgba(16,14,11,0.93)";
const BORDER = "1px solid rgba(212,175,55,0.38)";

export default function VisualHistoryPage() {
  const [activeYear, setActiveYear] = useState<EraYear>(100);
  const [selectedEmpire, setSelectedEmpire] = useState<EmpireData | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const activeEra = getEraByYear(activeYear);

  const handleYearChange = useCallback((year: EraYear) => {
    setActiveYear(year);
    setSelectedEmpire(null);
    setDetailOpen(false);
  }, []);

  const handleSelectEmpire = useCallback((empire: EmpireData) => {
    setActiveYear(empire.era);
    setSelectedEmpire(empire);
    setDetailOpen(true);
    setNavOpen(false);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setDetailOpen(false);
    setSelectedEmpire(null);
  }, []);

  return (
    <>
      {/* ── Full-screen map — base layer ──────────────────── */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <HistoricalMap
          era={activeEra}
          selectedEmpire={selectedEmpire}
          onEmpireClick={handleSelectEmpire}
        />
      </div>

      {/* ══════════════════════════════════════════════════
          HAMBURGER BUTTON — always on screen, always gold
      ══════════════════════════════════════════════════ */}
      <button
        onClick={() => setNavOpen((p) => !p)}
        aria-label="Open empire navigation"
        style={{
          position: "fixed",
          top: "16px",
          left: "16px",
          zIndex: 9999,           // highest possible
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: navOpen ? "rgba(212,175,55,0.3)" : DARK,
          border: BORDER,
          boxShadow: "0 4px 20px rgba(0,0,0,0.65)",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
          padding: 0,
          outline: "none",
        }}
      >
        <span style={{ display: "block", width: "22px", height: "2.5px", background: GOLD, borderRadius: "2px" }} />
        <span style={{ display: "block", width: "22px", height: "2.5px", background: GOLD, borderRadius: "2px" }} />
        <span style={{ display: "block", width: "16px", height: "2.5px", background: GOLD, borderRadius: "2px", alignSelf: "flex-start", marginLeft: "3px" }} />
      </button>

      {/* ── App title (centre top) ─────────────────────── */}
      <div
        style={{
          position: "fixed",
          top: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9998,
          pointerEvents: "none",
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            padding: "8px 20px",
            borderRadius: "999px",
            background: DARK,
            border: BORDER,
            boxShadow: "0 4px 20px rgba(0,0,0,0.55)",
            backdropFilter: "blur(10px)",
          }}
        >
          <p style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: "17px", fontWeight: 700, color: GOLD }}>
            تاریخ بصری
          </p>
          <p style={{ margin: "2px 0 0", fontFamily: "Arial, sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(212,175,55,0.55)" }}>
            Visual History
          </p>
        </div>
      </div>

      {/* ── Active era badge (top right) ───────────────── */}
      {activeEra.empires.length > 0 && (
        <div
          style={{
            position: "fixed",
            top: "16px",
            right: "16px",
            zIndex: 9998,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 14px",
            borderRadius: "999px",
            background: DARK,
            border: BORDER,
            boxShadow: "0 4px 14px rgba(0,0,0,0.5)",
            backdropFilter: "blur(10px)",
            pointerEvents: "none",
          }}
        >
          <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: activeEra.empires[0].borderColor, boxShadow: `0 0 6px ${activeEra.empires[0].borderColor}` }} />
          <span style={{ fontFamily: "Arial, sans-serif", fontSize: "11px", color: "#E8D8A0" }}>
            {activeEra.empires.length === 1
              ? activeEra.empires[0].name
              : `${activeEra.empires.length} empires · ${activeEra.label}`}
          </span>
        </div>
      )}

      {/* ── Map legend (bottom left, above timeline) ───── */}
      <div
        style={{
          position: "fixed",
          bottom: "140px",
          left: "16px",
          zIndex: 9998,
          borderRadius: "12px",
          padding: "12px 14px",
          background: DARK,
          border: BORDER,
          boxShadow: "0 4px 20px rgba(0,0,0,0.55)",
          backdropFilter: "blur(12px)",
        }}
      >
        <p style={{ margin: "0 0 8px", fontFamily: "Arial, sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(212,175,55,0.55)" }}>
          Legend
        </p>
        {[
          { color: GOLD,      label: "Capital" },
          { color: "#B8C4CC", label: "City" },
          { color: "#E74C3C", label: "Conflict" },
          { color: "#8E44AD", label: "Exile Route" },
          { color: "#27AE60", label: "Sacred Site" },
          { color: "#E67E22", label: "Temple" },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
            <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: item.color, flexShrink: 0 }} />
            <span style={{ fontFamily: "Arial, sans-serif", fontSize: "10px", color: "rgba(244,235,225,0.6)" }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* ── Left empire navigation drawer ─────────────── */}
      <EmpireNavSidebar
        isOpen={navOpen}
        onClose={() => setNavOpen(false)}
        activeYear={activeYear}
        selectedEmpireId={selectedEmpire?.id ?? null}
        onSelectEmpire={handleSelectEmpire}
      />

      {/* ── Right detail panel ────────────────────────── */}
      <SidebarPanel
        empire={selectedEmpire}
        isOpen={detailOpen}
        onClose={handleCloseDetail}
      />

      {/* ── Bottom timeline ───────────────────────────── */}
      <TimeSlider activeYear={activeYear} onYearChange={handleYearChange} />
    </>
  );
}
