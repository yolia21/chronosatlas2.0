"use client";

import React from "react";
import { X, Globe } from "lucide-react";
import { ERAS, formatYear, type EraYear, type EmpireData } from "@/data/worldHistoryData";

interface EmpireNavSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeYear: EraYear;
  selectedEmpireId: string | null;
  onSelectEmpire: (empire: EmpireData) => void;
}

export default function EmpireNavSidebar({
  isOpen,
  onClose,
  activeYear,
  selectedEmpireId,
  onSelectEmpire,
}: EmpireNavSidebarProps) {
  return (
    <>
      {/* ── Backdrop ──────────────────────────────────────── */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(3px)" }}
        />
      )}

      {/* ── Drawer panel ──────────────────────────────────── */}
      <aside
        className="fixed top-0 left-0 bottom-0 z-50 flex flex-col"
        style={{
          width: "260px",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          background: "linear-gradient(to bottom, #141210, #1A1814)",
          borderRight: "1px solid rgba(212,175,55,0.2)",
          boxShadow: isOpen ? "4px 0 40px rgba(0,0,0,0.7)" : "none",
          paddingBottom: "130px",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(212,175,55,0.15)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#8B6914,#D4AF37)" }}
            >
              <Globe size={15} color="#1A1814" />
            </div>
            <div>
              <p className="font-serif text-sm font-bold" style={{ color: "#D4AF37" }}>تاریخ بصری</p>
              <p className="text-[9px] font-sans tracking-widest uppercase" style={{ color: "rgba(212,175,55,0.45)" }}>
                Visual History
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full flex-shrink-0 transition-colors duration-150"
            style={{ background: "rgba(212,175,55,0.1)", color: "#D4AF37" }}
            aria-label="Close navigation"
          >
            <X size={14} />
          </button>
        </div>

        {/* Scrollable empire list */}
        <nav className="flex-1 overflow-y-auto py-2" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(212,175,55,0.2) transparent" }}>
          {ERAS.map((era) => {
            const isActiveEra = era.year === activeYear;

            return (
              <div key={era.year} className="mb-1">
                {/* Era header */}
                <div className="flex items-center gap-2 px-4 py-2 mt-1">
                  <span
                    className="text-[10px] font-sans uppercase tracking-[0.18em] font-semibold"
                    style={{ color: isActiveEra ? "#D4AF37" : "rgba(244,235,225,0.3)" }}
                  >
                    {era.label}
                  </span>
                  {isActiveEra && (
                    <div
                      className="h-px flex-1"
                      style={{ background: "linear-gradient(to right, rgba(212,175,55,0.4), transparent)" }}
                    />
                  )}
                </div>

                {/* Empire buttons */}
                {era.empires.map((empire) => {
                  const isSelected = selectedEmpireId === empire.id && isActiveEra;

                  return (
                    <button
                      key={empire.id}
                      onClick={() => {
                        onSelectEmpire(empire);
                        onClose();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all duration-200"
                      style={{
                        background: isSelected ? `${empire.borderColor}28` : "transparent",
                        borderLeft: isSelected ? `3px solid ${empire.borderColor}` : "3px solid transparent",
                      }}
                    >
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{
                          background: empire.borderColor,
                          boxShadow: isSelected ? `0 0 8px ${empire.borderColor}` : "none",
                        }}
                      />
                      <div className="min-w-0">
                        <p
                          className="text-sm font-sans leading-tight truncate"
                          style={{
                            color: isSelected ? "#F4EBE1" : isActiveEra ? "#C8B89A" : "rgba(244,235,225,0.38)",
                            fontWeight: isSelected ? 600 : 400,
                          }}
                        >
                          {empire.name}
                        </p>
                        {empire.nameAr && (
                          <p
                            className="text-xs font-serif leading-tight"
                            style={{
                              color: isSelected ? "#D4AF37" : "rgba(212,175,55,0.3)",
                              direction: "rtl",
                            }}
                          >
                            {empire.nameAr}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
