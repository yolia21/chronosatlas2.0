"use client";

import React, { useState } from "react";
import { X, MapPin, Users, BookOpen, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import type { EmpireData, HistoricalFigure } from "@/data/worldHistoryData";

interface SidebarPanelProps {
  empire: EmpireData | null;
  isOpen: boolean;
  onClose: () => void;
}

function FigureCard({ figure }: { figure: HistoricalFigure }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bg-[#F4EBE1]/40 border border-[#D4AF37]/30 rounded-lg p-4 cursor-pointer 
                 hover:border-[#D4AF37]/70 hover:bg-[#D4AF37]/10 transition-all duration-300 group"
      onClick={() => setExpanded((p) => !p)}
    >
      <div className="flex items-start gap-3">
        <div
          className="text-2xl w-10 h-10 flex items-center justify-center 
                        bg-[#D4AF37]/20 rounded-full flex-shrink-0 
                        group-hover:bg-[#D4AF37]/35 transition-colors"
        >
          {figure.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-serif text-[#D4AF37] text-sm font-semibold leading-tight">
            {figure.name}
          </p>
          <p className="text-[#F4EBE1]/70 text-xs mt-0.5 leading-tight">{figure.title}</p>
          <p className="text-[#F4EBE1]/50 text-xs mt-0.5 font-mono">{figure.years}</p>
        </div>
        <div className="text-[#D4AF37]/50 text-xs mt-1 flex-shrink-0">
          {expanded ? "▲" : "▼"}
        </div>
      </div>
      {expanded && (
        <p className="mt-3 text-[#F4EBE1]/80 text-xs leading-relaxed border-t border-[#D4AF37]/20 pt-3">
          {figure.bio}
        </p>
      )}
    </div>
  );
}

export default function SidebarPanel({ empire, isOpen, onClose }: SidebarPanelProps) {
  const [figureStart, setFigureStart] = useState(0);
  const FIGURES_PER_PAGE = 3;

  if (!empire) return null;

  const figures = empire.figures;
  const totalPages = Math.ceil(figures.length / FIGURES_PER_PAGE);
  const currentPage = Math.floor(figureStart / FIGURES_PER_PAGE);
  const visibleFigures = figures.slice(figureStart, figureStart + FIGURES_PER_PAGE);

  const prevFigures = () =>
    setFigureStart((p) => Math.max(0, p - FIGURES_PER_PAGE));
  const nextFigures = () =>
    setFigureStart((p) => Math.min((totalPages - 1) * FIGURES_PER_PAGE, p + FIGURES_PER_PAGE));

  return (
    <>
      {/* Backdrop overlay on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`
          fixed top-0 right-0 h-full z-40
          w-[min(420px,100vw)] 
          bg-gradient-to-b from-[#1A1814] via-[#1E1C18] to-[#1A1814]
          border-l border-[#D4AF37]/25
          flex flex-col
          transform transition-transform duration-500 ease-in-out
          shadow-2xl shadow-black/60
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
        style={{ paddingBottom: "120px" }} // clear time slider
      >
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div
          className="relative px-6 pt-6 pb-5 border-b border-[#D4AF37]/20 flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${empire.borderColor}22 0%, transparent 60%)`,
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#D4AF37]/60 hover:text-[#D4AF37] 
                       transition-colors bg-[#D4AF37]/10 rounded-full p-1.5"
            aria-label="Close panel"
          >
            <X size={16} />
          </button>

          {/* Era badge */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span
              className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#D4AF37]/80 
                            border border-[#D4AF37]/40 rounded-full px-3 py-0.5"
            >
              {empire.era} CE
            </span>
          </div>

          <h2 className="font-serif text-[#F4EBE1] text-xl leading-tight font-bold">
            {empire.name}
          </h2>
          <p className="text-[#D4AF37] text-xs mt-1 font-sans tracking-wide">
            {empire.eraLabel}
          </p>

          <div className="flex items-center gap-2 mt-3">
            <MapPin size={13} className="text-[#D4AF37] flex-shrink-0" />
            <p className="text-[#F4EBE1]/70 text-xs font-sans">{empire.capital}</p>
          </div>
        </div>

        {/* ── Scrollable body ────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#D4AF37]/30">

          {/* FLAG SECTION */}
          <div className="px-6 py-5 border-b border-[#D4AF37]/15">
            <div className="flex items-center gap-2 mb-3">
              <Shield size={14} className="text-[#D4AF37]" />
              <h3 className="text-[#D4AF37] text-xs uppercase tracking-[0.18em] font-sans font-semibold">
                Imperial Standard
              </h3>
            </div>
            <div
              className="rounded-lg border-2 border-[#D4AF37]/40 overflow-hidden 
                            shadow-inner shadow-black/40 mx-auto"
              style={{ maxWidth: 200 }}
              dangerouslySetInnerHTML={{ __html: empire.flagSymbol }}
            />
            <p className="text-[#F4EBE1]/60 text-xs mt-3 leading-relaxed font-sans">
              {empire.flagDescription}
            </p>
          </div>

          {/* KEY EVENTS */}
          <div className="px-6 py-5 border-b border-[#D4AF37]/15">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={14} className="text-[#D4AF37]" />
              <h3 className="text-[#D4AF37] text-xs uppercase tracking-[0.18em] font-sans font-semibold">
                Chronicle
              </h3>
            </div>
            <p className="text-[#F4EBE1]/80 text-xs leading-relaxed mb-4 font-sans">
              {empire.summary}
            </p>
            <ul className="space-y-2">
              {empire.keyEvents.map((event, idx) => (
                <li key={idx} className="flex gap-2 text-xs font-sans">
                  <span className="text-[#D4AF37] flex-shrink-0 mt-0.5">◆</span>
                  <span className="text-[#F4EBE1]/70 leading-relaxed">{event}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* HISTORICAL FIGURES */}
          <div className="px-6 py-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Users size={14} className="text-[#D4AF37]" />
                <h3 className="text-[#D4AF37] text-xs uppercase tracking-[0.18em] font-sans font-semibold">
                  Historical Figures
                </h3>
              </div>
              {totalPages > 1 && (
                <div className="flex items-center gap-2">
                  <span className="text-[#F4EBE1]/40 text-xs font-sans">
                    {currentPage + 1}/{totalPages}
                  </span>
                  <button
                    onClick={prevFigures}
                    disabled={figureStart === 0}
                    className="text-[#D4AF37]/60 hover:text-[#D4AF37] disabled:opacity-25 
                               transition-colors"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    onClick={nextFigures}
                    disabled={figureStart + FIGURES_PER_PAGE >= figures.length}
                    className="text-[#D4AF37]/60 hover:text-[#D4AF37] disabled:opacity-25 
                               transition-colors"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </div>
            <div className="space-y-3">
              {visibleFigures.map((fig) => (
                <FigureCard key={fig.id} figure={fig} />
              ))}
            </div>
          </div>

          {/* ROUTE LEGEND (only for 1850 CE) */}
          {empire.routes && empire.routes.length > 0 && (
            <div className="px-6 pb-5">
              <h3 className="text-[#D4AF37] text-xs uppercase tracking-[0.18em] font-sans font-semibold mb-3">
                Route Legend
              </h3>
              <div className="space-y-2">
                {empire.routes.map((route) => (
                  <div key={route.id} className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="h-[3px] w-4 rounded-full"
                          style={{
                            background: route.color,
                            opacity: route.dashArray ? (i % 2 === 0 ? 1 : 0.1) : 1,
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-[#F4EBE1]/65 text-xs font-sans">{route.name}</p>
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
