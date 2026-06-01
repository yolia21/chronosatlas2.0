"use client";

import React from "react";
import { ERAS, type EraYear, type EmpireData } from "@/data/worldHistoryData";

const GOLD = "#D4AF37";
const DARK = "rgba(16,14,11,0.97)";
const BORDER = "1px solid rgba(212,175,55,0.2)";

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
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9995,
          background: "rgba(0,0,0,0.52)",
          backdropFilter: "blur(4px)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Drawer */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 9996,
          width: "270px",
          background: `linear-gradient(to bottom, #141210, #1A1814)`,
          borderRight: BORDER,
          boxShadow: isOpen ? "6px 0 40px rgba(0,0,0,0.75)" : "none",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s ease",
          display: "flex",
          flexDirection: "column",
          paddingBottom: "140px",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 16px 14px",
            borderBottom: BORDER,
            flexShrink: 0,
          }}
        >
          <div>
            <p style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: "15px", fontWeight: 700, color: GOLD }}>
              تاریخ بصری
            </p>
            <p style={{ margin: "3px 0 0", fontFamily: "Arial, sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(212,175,55,0.4)" }}>
              Browse Empires
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close navigation"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "rgba(212,175,55,0.12)",
              border: "1px solid rgba(212,175,55,0.3)",
              color: GOLD,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              lineHeight: 1,
              outline: "none",
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>

        {/* Hint text */}
        <p style={{ margin: "10px 16px 4px", fontFamily: "Arial, sans-serif", fontSize: "10px", color: "rgba(212,175,55,0.45)", fontStyle: "italic" }}>
          Select an era and empire to explore
        </p>

        {/* Era / empire list */}
        <nav style={{ flex: 1, overflowY: "auto", paddingBottom: "16px" }}>
          {ERAS.map((era) => {
            const isActiveEra = era.year === activeYear;

            return (
              <div key={era.year} style={{ marginBottom: "4px" }}>
                {/* Era label */}
                <div
                  style={{
                    padding: "10px 16px 6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Arial, sans-serif",
                      fontSize: "10px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      color: isActiveEra ? GOLD : "rgba(244,235,225,0.28)",
                    }}
                  >
                    {era.label}
                  </span>
                  {isActiveEra && (
                    <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, rgba(212,175,55,0.4), transparent)" }} />
                  )}
                </div>

                {/* Empire rows */}
                {era.empires.map((empire) => {
                  const isSelected = selectedEmpireId === empire.id && isActiveEra;

                  return (
                    <button
                      key={empire.id}
                      onClick={() => {
                        onSelectEmpire(empire);
                        onClose();
                      }}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "10px 16px",
                        background: isSelected ? `${empire.borderColor}28` : "transparent",
                        borderLeft: `3px solid ${isSelected ? empire.borderColor : "transparent"}`,
                        borderTop: "none",
                        borderRight: "none",
                        borderBottom: "none",
                        cursor: "pointer",
                        outline: "none",
                        textAlign: "left",
                        transition: "background 0.2s",
                      }}
                    >
                      {/* Color dot */}
                      <span
                        style={{
                          display: "inline-block",
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          background: empire.borderColor,
                          flexShrink: 0,
                          boxShadow: isSelected ? `0 0 8px ${empire.borderColor}` : "none",
                        }}
                      />
                      <div style={{ minWidth: 0 }}>
                        <p
                          style={{
                            margin: 0,
                            fontFamily: "Arial, sans-serif",
                            fontSize: "13px",
                            color: isSelected ? "#F4EBE1" : isActiveEra ? "#C8B89A" : "rgba(244,235,225,0.38)",
                            fontWeight: isSelected ? 600 : 400,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {empire.name}
                        </p>
                        {empire.nameAr && (
                          <p
                            style={{
                              margin: "2px 0 0",
                              fontFamily: "Georgia, serif",
                              fontSize: "11px",
                              color: isSelected ? GOLD : "rgba(212,175,55,0.28)",
                              direction: "rtl",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
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
