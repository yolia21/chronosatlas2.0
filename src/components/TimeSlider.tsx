"use client";

import React from "react";
import { Clock } from "lucide-react";
import { ERAS, formatYear, type EraYear } from "@/data/worldHistoryData";

interface TimeSliderProps {
  activeYear: EraYear;
  onYearChange: (year: EraYear) => void;
}

export default function TimeSlider({ activeYear, onYearChange }: TimeSliderProps) {
  const activeIndex = ERAS.findIndex((e) => e.year === activeYear);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex flex-col"
      style={{
        background: "linear-gradient(to top, rgba(13,12,10,0.99) 0%, rgba(13,12,10,0.92) 100%)",
        borderTop: "1px solid rgba(212,175,55,0.25)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Label row */}
      <div className="flex items-center justify-between px-6 pt-3 pb-1 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Clock size={12} className="text-[#D4AF37]/70" />
          <span className="text-[#D4AF37]/70 text-[10px] uppercase tracking-[0.25em] font-sans">
            Timeline
          </span>
        </div>
        <div className="text-right">
          <span className="font-serif text-[#D4AF37] text-base font-bold leading-none">
            {formatYear(activeYear)}
          </span>
          <p className="text-[#F4EBE1]/50 text-[10px] font-sans mt-0.5 leading-none">
            {ERAS[activeIndex]?.subtitle}
          </p>
        </div>
      </div>

      {/* Era cards */}
      <div className="flex items-stretch overflow-x-auto gap-px px-1 pb-2 pt-1 no-scrollbar">
        {ERAS.map((era, idx) => {
          const isActive = era.year === activeYear;
          const isPast = idx < activeIndex;

          return (
            <button
              key={era.year}
              onClick={() => onYearChange(era.year)}
              className="flex-1 min-w-[80px] flex flex-col items-center justify-center px-2 py-2 rounded-lg relative transition-all duration-200 group"
              style={{
                background: isActive
                  ? "linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.08))"
                  : isPast
                  ? "rgba(212,175,55,0.05)"
                  : "rgba(255,255,255,0.02)",
                border: isActive
                  ? "1px solid rgba(212,175,55,0.55)"
                  : "1px solid rgba(212,175,55,0.1)",
                boxShadow: isActive ? "0 0 16px rgba(212,175,55,0.2)" : "none",
              }}
              aria-label={`Navigate to ${era.label}`}
              aria-pressed={isActive}
            >
              {/* Year label */}
              <span
                className="font-serif font-bold leading-none text-sm transition-colors duration-200"
                style={{
                  color: isActive ? "#D4AF37" : isPast ? "rgba(212,175,55,0.6)" : "rgba(244,235,225,0.35)",
                }}
              >
                {era.label}
              </span>

              {/* Empire count pill */}
              <div
                className="mt-1.5 flex items-center gap-0.5"
              >
                {era.empires.map((emp) => (
                  <div
                    key={emp.id}
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: isActive ? emp.borderColor : "rgba(212,175,55,0.25)" }}
                    title={emp.name}
                  />
                ))}
              </div>

              {/* Active underline */}
              {isActive && (
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300"
                  style={{
                    width: "60%",
                    background: "linear-gradient(to right, transparent, #D4AF37, transparent)",
                    boxShadow: "0 0 8px rgba(212,175,55,0.6)",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
