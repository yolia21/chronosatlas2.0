"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Globe } from "lucide-react";
import { ERAS, formatYear, type EraYear, type EmpireData } from "@/data/worldHistoryData";

interface EmpireNavSidebarProps {
  activeYear: EraYear;
  selectedEmpireId: string | null;
  onSelectEmpire: (empire: EmpireData) => void;
}

export default function EmpireNavSidebar({
  activeYear,
  selectedEmpireId,
  onSelectEmpire,
}: EmpireNavSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 z-40 flex flex-col transition-all duration-300 ease-in-out"
      style={{
        width: collapsed ? "52px" : "220px",
        background: "linear-gradient(to bottom, rgba(13,12,10,0.97), rgba(20,18,14,0.97))",
        borderRight: "1px solid rgba(212,175,55,0.2)",
        backdropFilter: "blur(16px)",
        paddingBottom: "130px",
      }}
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <div
        className="flex items-center px-3 py-4 border-b flex-shrink-0"
        style={{ borderColor: "rgba(212,175,55,0.2)" }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#8B6914,#D4AF37)" }}
        >
          <Globe size={15} className="text-[#1A1814]" />
        </div>
        {!collapsed && (
          <div className="ml-2 overflow-hidden">
            <p className="text-[#D4AF37] font-serif text-sm font-bold leading-tight whitespace-nowrap">
              تاریخ بصری
            </p>
            <p className="text-[#F4EBE1]/40 text-[9px] font-sans tracking-widest uppercase whitespace-nowrap">
              Visual History
            </p>
          </div>
        )}
        <button
          onClick={() => setCollapsed((p) => !p)}
          className="ml-auto text-[#D4AF37]/50 hover:text-[#D4AF37] transition-colors flex-shrink-0"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* ── Era / Empire list ──────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto py-2" style={{ scrollbarWidth: "thin" }}>
        {ERAS.map((era) => {
          const isActiveEra = era.year === activeYear;

          return (
            <div key={era.year} className="mb-1">
              {/* Era header */}
              <div
                className="flex items-center px-3 py-1.5 cursor-default"
                title={collapsed ? era.label : undefined}
              >
                <div
                  className="text-[9px] font-sans uppercase tracking-[0.15em] whitespace-nowrap overflow-hidden transition-all duration-300"
                  style={{
                    color: isActiveEra ? "#D4AF37" : "rgba(244,235,225,0.35)",
                    maxWidth: collapsed ? "0px" : "180px",
                    opacity: collapsed ? 0 : 1,
                  }}
                >
                  {era.label}
                </div>
                {collapsed && (
                  <div
                    className="text-[9px] font-sans font-bold"
                    style={{ color: isActiveEra ? "#D4AF37" : "rgba(244,235,225,0.35)" }}
                  >
                    {Math.abs(era.year) >= 1000
                      ? `${Math.abs(era.year) >= 1000 ? Math.round(Math.abs(era.year) / 100) : era.year}c`
                      : era.year < 0
                      ? "B"
                      : `${era.year}`}
                  </div>
                )}
              </div>

              {/* Empires in this era */}
              {era.empires.map((empire) => {
                const isSelected = selectedEmpireId === empire.id && isActiveEra;

                return (
                  <button
                    key={empire.id}
                    onClick={() => onSelectEmpire(empire)}
                    title={collapsed ? empire.name : undefined}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 transition-all duration-200 text-left group relative"
                    style={{
                      background: isSelected
                        ? `${empire.borderColor}33`
                        : isActiveEra
                        ? "rgba(212,175,55,0.05)"
                        : "transparent",
                      borderLeft: isSelected
                        ? `2px solid ${empire.borderColor}`
                        : "2px solid transparent",
                    }}
                  >
                    {/* Color dot */}
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-transform duration-200 group-hover:scale-125"
                      style={{
                        background: empire.borderColor,
                        boxShadow: isSelected ? `0 0 8px ${empire.borderColor}88` : "none",
                      }}
                    />

                    {/* Name */}
                    <span
                      className="text-xs font-sans leading-tight whitespace-nowrap overflow-hidden transition-all duration-300"
                      style={{
                        color: isSelected
                          ? "#F4EBE1"
                          : isActiveEra
                          ? "rgba(244,235,225,0.75)"
                          : "rgba(244,235,225,0.4)",
                        maxWidth: collapsed ? "0px" : "160px",
                        opacity: collapsed ? 0 : 1,
                        fontWeight: isSelected ? 600 : 400,
                      }}
                    >
                      {empire.name}
                    </span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
