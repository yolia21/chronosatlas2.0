"use client";

import React, { useRef } from "react";
import { Clock } from "lucide-react";
import { TIMELINE_MILESTONES, type EraYear } from "@/data/worldHistoryData";

interface TimeSliderProps {
  activeYear: EraYear;
  onYearChange: (year: EraYear) => void;
}

export default function TimeSlider({ activeYear, onYearChange }: TimeSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const milestones = TIMELINE_MILESTONES;
  const activeIndex = milestones.findIndex((m) => m.year === activeYear);
  const progressPct = (activeIndex / (milestones.length - 1)) * 100;

  const handleMilestoneClick = (year: EraYear) => {
    onYearChange(year);
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background:
          "linear-gradient(to top, rgba(20,18,15,0.98) 0%, rgba(26,24,20,0.95) 100%)",
        borderTop: "1px solid rgba(212,175,55,0.3)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-4">
        {/* Title row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-[#D4AF37]" />
            <span className="text-[#D4AF37]/80 text-[11px] uppercase tracking-[0.2em] font-sans">
              Timeline
            </span>
          </div>
          <div className="text-right">
            <span className="font-serif text-[#F4EBE1] text-xl font-bold">
              {activeYear} CE
            </span>
            <p className="text-[#D4AF37]/70 text-[10px] font-sans tracking-wide mt-0.5">
              {milestones[activeIndex]?.subtitle}
            </p>
          </div>
        </div>

        {/* Slider track */}
        <div ref={sliderRef} className="relative">
          {/* Background track */}
          <div className="h-[3px] w-full bg-[#F4EBE1]/10 rounded-full relative">
            {/* Filled portion */}
            <div
              className="absolute left-0 top-0 h-full rounded-full transition-all duration-500"
              style={{
                width: `${progressPct}%`,
                background: "linear-gradient(to right, #8B6914, #D4AF37)",
                boxShadow: "0 0 8px rgba(212,175,55,0.5)",
              }}
            />
          </div>

          {/* Milestone nodes */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between">
            {milestones.map((milestone, idx) => {
              const isActive = milestone.year === activeYear;
              const isPast = idx <= activeIndex;

              return (
                <button
                  key={milestone.year}
                  onClick={() => handleMilestoneClick(milestone.year)}
                  className="group flex flex-col items-center relative"
                  style={{ transform: "translateX(-50%)", left: idx === 0 ? "0" : idx === milestones.length - 1 ? "auto" : undefined, right: idx === milestones.length - 1 ? "0" : undefined }}
                  aria-label={`Navigate to ${milestone.label}`}
                >
                  {/* Node dot */}
                  <div
                    className={`
                      rounded-full border-2 transition-all duration-300 flex items-center justify-center
                      ${isActive
                        ? "w-5 h-5 bg-[#D4AF37] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/50 scale-125"
                        : isPast
                        ? "w-3.5 h-3.5 bg-[#8B6914] border-[#D4AF37]/60"
                        : "w-3.5 h-3.5 bg-[#2C2A29] border-[#F4EBE1]/25 group-hover:border-[#D4AF37]/60"
                      }
                    `}
                  >
                    {isActive && (
                      <div className="w-2 h-2 bg-[#2C2A29] rounded-full" />
                    )}
                  </div>

                  {/* Label above */}
                  <div
                    className={`
                      absolute bottom-6 whitespace-nowrap text-center transition-all duration-300
                      ${isActive ? "opacity-100" : "opacity-50 group-hover:opacity-80"}
                    `}
                  >
                    <p
                      className={`font-serif text-sm font-bold leading-tight
                        ${isActive ? "text-[#D4AF37]" : "text-[#F4EBE1]/70"}`}
                    >
                      {milestone.label}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom padding for nodes */}
        <div className="h-7 mt-1" />
      </div>
    </div>
  );
}
