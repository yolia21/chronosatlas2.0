"use client";

import React, { useEffect, useRef, useState } from "react";
import type { EmpireData, EraYear, EraData } from "@/data/worldHistoryData";

interface MapComponentProps {
  era: EraData;
  selectedEmpire: EmpireData | null;
  onEmpireClick: (empire: EmpireData) => void;
}

const MARKER_COLORS: Record<string, string> = {
  capital: "#D4AF37",
  city: "#B8C4CC",
  battle: "#E74C3C",
  rebellion: "#E74C3C",
  exile: "#8E44AD",
  mosque: "#27AE60",
  migration: "#3498DB",
  temple: "#E67E22",
};

const MARKER_ICONS: Record<string, string> = {
  capital: "★",
  city: "●",
  battle: "✕",
  rebellion: "⚡",
  exile: "→",
  mosque: "☪",
  migration: "↝",
  temple: "⬡",
};

export default function MapComponent({ era, selectedEmpire, onEmpireClick }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<import("leaflet").Map | null>(null);
  const geojsonLayersRef = useRef<import("leaflet").GeoJSON[]>([]);
  const markerLayersRef = useRef<import("leaflet").Layer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ── Init map once ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    const init = async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      const map = L.map(mapRef.current!, {
        center: era.mapView.center,
        zoom: era.mapView.zoom,
        zoomControl: false,
        attributionControl: false,
      });

      L.control.attribution({ position: "bottomright", prefix: false }).addTo(map);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png",
        {
          attribution: '&copy; <a href="https://carto.com/">CARTO</a> | &copy; OSM contributors',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      L.control.zoom({ position: "topright" }).addTo(map);
      leafletMapRef.current = map;
      setIsLoading(false);
    };

    init();
    return () => {
      leafletMapRef.current?.remove();
      leafletMapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Update layers when era or selection changes ────────────────────────────
  useEffect(() => {
    if (!leafletMapRef.current || isLoading) return;

    const updateAll = async () => {
      const L = (await import("leaflet")).default;
      const map = leafletMapRef.current!;

      // Fly to era view
      map.flyTo(era.mapView.center, era.mapView.zoom, { duration: 1.2, easeLinearity: 0.3 });

      // Clear old layers
      geojsonLayersRef.current.forEach((l) => map.removeLayer(l));
      geojsonLayersRef.current = [];
      markerLayersRef.current.forEach((l) => map.removeLayer(l));
      markerLayersRef.current = [];

      // Draw all empires for this era
      for (const empire of era.empires) {
        const isSelected = selectedEmpire?.id === empire.id;

        try {
          const res = await fetch(empire.geojsonFile);
          const data = await res.json();

          const layer = L.geoJSON(data, {
            style: (feature) => {
              const fType = feature?.properties?.type;
              if (fType === "rebellion_route") return { color: "#C0392B", weight: 3, opacity: 0.85, dashArray: "6,4" };
              if (fType === "exile_route") return { color: "#8E44AD", weight: 2.5, opacity: 0.75, dashArray: "10,6" };

              return {
                color: isSelected ? "#D4AF37" : empire.borderColor,
                weight: isSelected ? 2.5 : 1.5,
                opacity: isSelected ? 1 : 0.75,
                fillColor: empire.fillColor,
                fillOpacity: isSelected ? empire.fillOpacity + 0.1 : empire.fillOpacity,
              };
            },
            onEachFeature: (feature, fl) => {
              const fType = feature?.properties?.type;
              if (fType === "rebellion_route" || fType === "exile_route") {
                fl.bindTooltip(feature.properties.name, { permanent: false, className: "chronos-tooltip" });
                return;
              }

              fl.on("mouseover", function (this: import("leaflet").Layer) {
                (this as import("leaflet").Path).setStyle({ color: "#D4AF37", weight: 3, fillOpacity: empire.fillOpacity + 0.15 });
              });
              fl.on("mouseout", function (this: import("leaflet").Layer) {
                layer.resetStyle(this as import("leaflet").Path);
              });
              fl.on("click", () => onEmpireClick(empire));

              if (empire.name) {
                fl.bindTooltip(empire.name, { permanent: false, className: "chronos-tooltip" });
              }
            },
          }).addTo(map);

          geojsonLayersRef.current.push(layer);
        } catch (err) {
          console.error(`Failed to load GeoJSON for ${empire.id}:`, err);
        }

        // Markers for this empire
        empire.markers.forEach((marker) => {
          const color = MARKER_COLORS[marker.type] || "#D4AF37";
          const icon = MARKER_ICONS[marker.type] || "●";
          const isCapital = marker.type === "capital";

          const divIcon = L.divIcon({
            className: "",
            html: `<div style="
              background:${color};border:2px solid rgba(13,12,10,0.8);
              border-radius:${isCapital ? "0" : "50%"};
              width:${isCapital ? "22px" : "18px"};height:${isCapital ? "22px" : "18px"};
              display:flex;align-items:center;justify-content:center;
              font-size:${isCapital ? "11px" : "9px"};
              box-shadow:0 0 8px ${color}77,0 2px 4px rgba(0,0,0,0.5);
              cursor:pointer;
              transform:${isCapital ? "rotate(45deg)" : "none"};
              transition:box-shadow 0.2s,transform 0.2s;
            "><span style="transform:${isCapital ? "rotate(-45deg)" : "none"};color:#0D0C0A;font-weight:bold">${icon}</span></div>`,
            iconSize: [22, 22],
            iconAnchor: [11, 11],
          });

          const lm = L.marker([marker.lat, marker.lng], { icon: divIcon })
            .bindPopup(
              `<div class="chronos-popup"><div class="chronos-popup-title">${marker.name}</div><div class="chronos-popup-body">${marker.description}</div></div>`,
              { className: "chronos-popup-wrapper", maxWidth: 280 }
            )
            .addTo(map);

          markerLayersRef.current.push(lm);
        });
      }
    };

    updateAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [era, selectedEmpire, isLoading]);

  return (
    <div className="relative w-full h-full">
      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(13,12,10,0.35) 100%)" }}
      />

      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#0D0C0A]">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 border-4 border-[#D4AF37]/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-transparent border-t-[#D4AF37] rounded-full animate-spin" />
            </div>
            <p className="font-serif text-[#D4AF37] text-lg tracking-widest animate-pulse">
              Charting the world…
            </p>
          </div>
        </div>
      )}

      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
