"use client";

import React from "react";
import { ERAS, formatYear, type EraYear } from "@/data/worldHistoryData";

const GOLD = "#D4AF37";
const DARK = "rgba(14,12,9,0.97)";

interface TimeSliderProps {
  activeYear: EraYear;
  onYearChange: (year: EraYear) => void;
}

export default function TimeSlider({ activeYear, onYearChange }: TimeSliderProps) {
  const activeIndex = ERAS.findIndex((e) => e.year === activeYear);
  const activeEra = ERAS[activeIndex];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9990,
        background: DARK,
        borderTop: "1px solid rgba(212,175,55,0.28)",
        boxShadow: "0 -4px 30px rgba(0,0,0,0.6)",
      }}
    >
      {/* Label row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px 6px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
          </svg>
          <span style={{ fontFamily: "Arial, sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(212,175,55,0.65)" }}>
            Timeline
          </span>
        </div>
        <div style={{ textAlign: "right" }}>
          <span style={{ fontFamily: "Georgia, serif", fontSize: "16px", fontWeight: 700, color: GOLD }}>
            {formatYear(activeYear)}
          </span>
          {activeEra && (
            <p style={{ margin: "2px 0 0", fontFamily: "Arial, sans-serif", fontSize: "10px", color: "rgba(244,235,225,0.5)" }}>
              {activeEra.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Era cards */}
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "4px",
          padding: "4px 8px 12px",
          scrollbarWidth: "none",
        }}
      >
        {ERAS.map((era, idx) => {
          const isActive = era.year === activeYear;
          const isPast = idx < activeIndex;

          return (
            <button
              key={era.year}
              onClick={() => onYearChange(era.year)}
              aria-pressed={isActive}
              style={{
                flexShrink: 0,
                minWidth: "88px",
                padding: "8px 10px",
                borderRadius: "10px",
                border: isActive
                  ? `1px solid rgba(212,175,55,0.6)`
                  : `1px solid rgba(212,175,55,0.12)`,
                background: isActive
                  ? "linear-gradient(135deg, rgba(212,175,55,0.22), rgba(212,175,55,0.08))"
                  : isPast
                  ? "rgba(212,175,55,0.05)"
                  : "rgba(255,255,255,0.02)",
                boxShadow: isActive ? "0 0 16px rgba(212,175,55,0.18)" : "none",
                cursor: "pointer",
                outline: "none",
                textAlign: "center",
                transition: "background 0.2s, border-color 0.2s",
              }}
            >
              {/* Year label */}
              <p
                style={{
                  margin: 0,
                  fontFamily: "Georgia, serif",
                  fontSize: "13px",
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? GOLD : isPast ? "rgba(212,175,55,0.55)" : "rgba(244,235,225,0.3)",
                  lineHeight: 1.2,
                }}
              >
                {era.label}
              </p>

              {/* Empire colour dots */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "3px", marginTop: "6px" }}>
                {era.empires.map((emp) => (
                  <span
                    key={emp.id}
                    title={emp.name}
                    style={{
                      display: "inline-block",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: isActive ? emp.borderColor : "rgba(212,175,55,0.2)",
                    }}
                  />
                ))}
              </div>

              {/* Active underline */}
              {isActive && (
                <div style={{ marginTop: "6px", height: "2px", borderRadius: "2px", background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`, boxShadow: `0 0 8px ${GOLD}` }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
