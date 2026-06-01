"use client";

import React, { useState } from "react";
import { X, MapPin, Users, BookOpen, Shield, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import type { EmpireData, HistoricalFigure } from "@/data/worldHistoryData";
import { formatYear } from "@/data/worldHistoryData";

function FigureCard({ figure }: { figure: HistoricalFigure }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      className="w-full text-left rounded-lg p-3.5 cursor-pointer transition-all duration-250 border"
      style={{
        background: expanded ? "rgba(212,175,55,0.12)" : "rgba(212,175,55,0.05)",
        borderColor: expanded ? "rgba(212,175,55,0.45)" : "rgba(212,175,55,0.15)",
      }}
      onClick={() => setExpanded((p) => !p)}
    >
      <div className="flex items-start gap-3">
        <div
          className="text-xl w-9 h-9 flex items-center justify-center rounded-full flex-shrink-0"
          style={{ background: "rgba(212,175,55,0.15)" }}
        >
          {figure.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-serif text-[#D4AF37] text-sm font-semibold leading-tight">
            {figure.name}
          </p>
          <p className="text-[#C8B89A] text-xs mt-0.5 leading-tight">{figure.title}</p>
          <p className="text-[#9A8A76] text-xs mt-0.5 font-mono">{figure.years}</p>
        </div>
        <span className="text-[#D4AF37]/50 text-xs mt-1 flex-shrink-0">{expanded ? "▲" : "▼"}</span>
      </div>
      {expanded && (
        <p className="mt-3 text-[#C8B89A] text-xs leading-relaxed border-t border-[#D4AF37]/20 pt-3">
          {figure.bio}
        </p>
      )}
    </button>
  );
}

interface SidebarPanelProps {
  empire: EmpireData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function SidebarPanel({ empire, isOpen, onClose }: SidebarPanelProps) {
  const [figureStart, setFigureStart] = useState(0);
  const PER_PAGE = 3;

  // Reset pagination when empire changes
  React.useEffect(() => { setFigureStart(0); }, [empire?.id]);

  if (!empire) return null;

  const totalPages = Math.ceil(empire.figures.length / PER_PAGE);
  const currentPage = Math.floor(figureStart / PER_PAGE);
  const visibleFigures = empire.figures.slice(figureStart, figureStart + PER_PAGE);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
          onClick={onClose}
        />
      )}

      <aside
        className="fixed top-0 right-0 h-full z-40 flex flex-col transform transition-transform duration-400 ease-in-out"
        style={{
          width: "min(420px, 92vw)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          background: "linear-gradient(160deg, #1C1A16 0%, #161410 50%, #1C1A16 100%)",
          borderLeft: "1px solid rgba(212,175,55,0.2)",
          boxShadow: isOpen ? "-8px 0 40px rgba(0,0,0,0.7)" : "none",
          paddingBottom: "130px",
        }}
      >
        {/* ── Header ──────────────────────────────────────────── */}
        <div
          className="relative px-5 pt-5 pb-4 flex-shrink-0 border-b"
          style={{
            borderColor: "rgba(212,175,55,0.15)",
            background: `linear-gradient(135deg, ${empire.borderColor}22 0%, transparent 70%)`,
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200"
            style={{ background: "rgba(212,175,55,0.12)", color: "#D4AF37" }}
            aria-label="Close panel"
          >
            <X size={14} />
          </button>

          {/* Era badge */}
          <div
            className="inline-flex items-center gap-1.5 mb-3 rounded-full px-3 py-1 border"
            style={{ borderColor: `${empire.borderColor}66`, background: `${empire.borderColor}22` }}
          >
            <Calendar size={10} style={{ color: empire.borderColor }} />
            <span className="text-[10px] uppercase tracking-[0.18em] font-sans font-semibold" style={{ color: empire.borderColor }}>
              {formatYear(empire.era)}
            </span>
          </div>

          <h2 className="font-serif text-xl font-bold leading-tight" style={{ color: "#F4EBE1" }}>
            {empire.name}
          </h2>
          {empire.nameAr && (
            <p className="font-serif text-base mt-0.5" style={{ color: "#D4AF37", direction: "rtl" }}>
              {empire.nameAr}
            </p>
          )}
          <p className="text-xs mt-1.5 font-sans" style={{ color: "#9A8A76" }}>
            {empire.eraLabel}
          </p>

          <div className="flex items-center gap-2 mt-2.5">
            <MapPin size={12} style={{ color: "#D4AF37" }} className="flex-shrink-0" />
            <p className="text-xs font-sans" style={{ color: "#B8A888" }}>{empire.capital}</p>
          </div>
        </div>

        {/* ── Scrollable body ───────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(212,175,55,0.2) transparent" }}>

          {/* FLAG */}
          <div className="px-5 py-4 border-b" style={{ borderColor: "rgba(212,175,55,0.1)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Shield size={13} style={{ color: "#D4AF37" }} />
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-sans font-semibold" style={{ color: "#D4AF37" }}>
                Imperial Standard
              </h3>
            </div>
            <div
              className="rounded-lg overflow-hidden mx-auto"
              style={{
                maxWidth: 180,
                border: "2px solid rgba(212,175,55,0.35)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
              }}
              dangerouslySetInnerHTML={{ __html: empire.flagSymbol }}
            />
            <p className="text-xs mt-3 leading-relaxed font-sans" style={{ color: "#9A8A76" }}>
              {empire.flagDescription}
            </p>
          </div>

          {/* CHRONICLE */}
          <div className="px-5 py-4 border-b" style={{ borderColor: "rgba(212,175,55,0.1)" }}>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={13} style={{ color: "#D4AF37" }} />
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-sans font-semibold" style={{ color: "#D4AF37" }}>
                Chronicle
              </h3>
            </div>
            <p className="text-xs leading-relaxed mb-4 font-sans" style={{ color: "#B8A888" }}>
              {empire.summary}
            </p>
            <ul className="space-y-2">
              {empire.keyEvents.map((event, i) => (
                <li key={i} className="flex gap-2 text-xs font-sans">
                  <span className="flex-shrink-0 mt-0.5" style={{ color: "#D4AF37" }}>◆</span>
                  <span className="leading-relaxed" style={{ color: "#9A8A76" }}>{event}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FIGURES */}
          <div className="px-5 py-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Users size={13} style={{ color: "#D4AF37" }} />
                <h3 className="text-[10px] uppercase tracking-[0.2em] font-sans font-semibold" style={{ color: "#D4AF37" }}>
                  Historical Figures
                </h3>
              </div>
              {totalPages > 1 && (
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-sans" style={{ color: "#6A5A46" }}>
                    {currentPage + 1}/{totalPages}
                  </span>
                  <button
                    onClick={() => setFigureStart((p) => Math.max(0, p - PER_PAGE))}
                    disabled={figureStart === 0}
                    className="w-6 h-6 flex items-center justify-center rounded transition-colors duration-150 disabled:opacity-25"
                    style={{ color: "#D4AF37", background: "rgba(212,175,55,0.1)" }}
                  >
                    <ChevronLeft size={13} />
                  </button>
                  <button
                    onClick={() => setFigureStart((p) => Math.min((totalPages - 1) * PER_PAGE, p + PER_PAGE))}
                    disabled={figureStart + PER_PAGE >= empire.figures.length}
                    className="w-6 h-6 flex items-center justify-center rounded transition-colors duration-150 disabled:opacity-25"
                    style={{ color: "#D4AF37", background: "rgba(212,175,55,0.1)" }}
                  >
                    <ChevronRight size={13} />
                  </button>
                </div>
              )}
            </div>
            <div className="space-y-2.5">
              {visibleFigures.map((fig) => (
                <FigureCard key={fig.id} figure={fig} />
              ))}
            </div>
          </div>

          {/* ROUTE LEGEND */}
          {empire.routes && empire.routes.length > 0 && (
            <div className="px-5 pb-5">
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-sans font-semibold mb-3" style={{ color: "#D4AF37" }}>
                Route Legend
              </h3>
              <div className="space-y-2">
                {empire.routes.map((route) => (
                  <div key={route.id} className="flex items-center gap-3">
                    <div className="flex items-center gap-0.5">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="h-[3px] w-3.5 rounded-full"
                          style={{ background: route.color, opacity: route.dashArray && i % 2 !== 0 ? 0.1 : 1 }}
                        />
                      ))}
                    </div>
                    <p className="text-xs font-sans" style={{ color: "#9A8A76" }}>{route.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
