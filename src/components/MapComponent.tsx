"use client";

import React, { useEffect, useRef, useState } from "react";
import type { EmpireData, EraYear } from "@/data/worldHistoryData";

interface MapComponentProps {
  activeEmpire: EmpireData;
  era: EraYear;
  onEmpireClick: (empire: EmpireData) => void;
}

// Marker icon colours per type
const MARKER_COLORS: Record<string, string> = {
  capital: "#D4AF37",
  city: "#F4EBE1",
  battle: "#C0392B",
  rebellion: "#E74C3C",
  exile: "#8E44AD",
  mosque: "#27AE60",
  migration: "#3498DB",
};

const MARKER_ICONS: Record<string, string> = {
  capital: "★",
  city: "●",
  battle: "⚔",
  rebellion: "🔥",
  exile: "→",
  mosque: "☪",
  migration: "↝",
};

export default function MapComponent({ activeEmpire, era, onEmpireClick }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<import("leaflet").Map | null>(null);
  const geojsonLayerRef = useRef<import("leaflet").GeoJSON | null>(null);
  const markerLayersRef = useRef<import("leaflet").Layer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Centre views per era
  const ERA_VIEWS: Record<EraYear, { center: [number, number]; zoom: number }> = {
    100: { center: [38, 20], zoom: 4 },
    1550: { center: [28, 75], zoom: 4 },
    1850: { center: [25, 80], zoom: 5 },
  };

  // ─── Initialise Leaflet map once ─────────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    const initMap = async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      const view = ERA_VIEWS[era];
      const map = L.map(mapRef.current!, {
        center: view.center,
        zoom: view.zoom,
        zoomControl: false,
        attributionControl: false,
      });

      // Custom attribution
      L.control.attribution({ position: "bottomright", prefix: false }).addTo(map);

      // Vintage-looking tile layer (CartoDB Voyager No Labels — free, no API key)
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png",
        {
          attribution: '&copy; <a href="https://carto.com/">CARTO</a> | &copy; OSM contributors',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      // Zoom controls repositioned
      L.control.zoom({ position: "topright" }).addTo(map);

      leafletMapRef.current = map;
      setIsLoading(false);
    };

    initMap();

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Update map content whenever empire / era changes ────────────────────────
  useEffect(() => {
    if (!leafletMapRef.current || isLoading) return;

    const updateLayers = async () => {
      const L = (await import("leaflet")).default;
      const map = leafletMapRef.current!;

      // Fly to new view
      const view = ERA_VIEWS[era];
      map.flyTo(view.center, view.zoom, { duration: 1.4 });

      // Remove previous GeoJSON layer
      if (geojsonLayerRef.current) {
        map.removeLayer(geojsonLayerRef.current);
        geojsonLayerRef.current = null;
      }

      // Remove previous markers
      markerLayersRef.current.forEach((layer) => map.removeLayer(layer));
      markerLayersRef.current = [];

      // Fetch and render new GeoJSON
      try {
        const res = await fetch(activeEmpire.geojsonFile);
        const geojsonData = await res.json();

        const layer = L.geoJSON(geojsonData, {
          style: (feature) => {
            const type = feature?.properties?.type;
            if (type === "rebellion_route") {
              return {
                color: "#C0392B",
                weight: 3,
                opacity: 0.85,
                dashArray: "6,4",
              };
            }
            if (type === "exile_route") {
              return {
                color: "#8E44AD",
                weight: 2.5,
                opacity: 0.75,
                dashArray: "10,6",
              };
            }
            // Polygon territories
            return {
              color: activeEmpire.borderColor,
              weight: 2.5,
              opacity: 0.9,
              fillColor: activeEmpire.fillColor,
              fillOpacity: activeEmpire.fillOpacity,
            };
          },
          onEachFeature: (feature, featureLayer) => {
            const type = feature?.properties?.type;
            if (type === "rebellion_route" || type === "exile_route") {
              featureLayer.bindTooltip(feature.properties.name, {
                permanent: false,
                className: "chronos-tooltip",
                direction: "top",
              });
              return;
            }

            // Polygon interactions
            featureLayer.on("mouseover", function (this: import("leaflet").Layer) {
              (this as import("leaflet").Path).setStyle({
                color: "#D4AF37",
                weight: 3.5,
                fillOpacity: activeEmpire.fillOpacity + 0.15,
              });
            });

            featureLayer.on("mouseout", function (this: import("leaflet").Layer) {
              layer.resetStyle(this as import("leaflet").Path);
            });

            featureLayer.on("click", () => {
              onEmpireClick(activeEmpire);
            });

            if (feature?.properties?.name) {
              featureLayer.bindTooltip(feature.properties.name, {
                permanent: false,
                className: "chronos-tooltip",
                direction: "top",
              });
            }
          },
        }).addTo(map);

        geojsonLayerRef.current = layer;
      } catch (err) {
        console.error("Failed to load GeoJSON:", err);
      }

      // Render custom city / rebellion markers
      activeEmpire.markers.forEach((marker) => {
        const color = MARKER_COLORS[marker.type] || "#D4AF37";
        const icon = MARKER_ICONS[marker.type] || "●";

        const divIcon = L.divIcon({
          className: "",
          html: `
            <div class="chronos-marker" style="
              background: ${color};
              border: 2px solid #2C2A29;
              border-radius: ${marker.type === "capital" ? "0" : "50%"};
              width: ${marker.type === "capital" ? "26px" : "20px"};
              height: ${marker.type === "capital" ? "26px" : "20px"};
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: ${marker.type === "capital" ? "13px" : "10px"};
              box-shadow: 0 0 8px ${color}88, 0 2px 4px rgba(0,0,0,0.4);
              cursor: pointer;
              transform: ${marker.type === "capital" ? "rotate(45deg)" : "none"};
              transition: transform 0.2s, box-shadow 0.2s;
            ">
              <span style="transform: ${marker.type === "capital" ? "rotate(-45deg)" : "none"}">${icon}</span>
            </div>
          `,
          iconSize: [26, 26],
          iconAnchor: [13, 13],
        });

        const leafletMarker = L.marker([marker.lat, marker.lng], { icon: divIcon })
          .bindPopup(
            `
            <div class="chronos-popup">
              <div class="chronos-popup-title">${marker.name}</div>
              <div class="chronos-popup-body">${marker.description}</div>
            </div>
          `,
            { className: "chronos-popup-wrapper", maxWidth: 280 }
          )
          .addTo(map);

        markerLayersRef.current.push(leafletMarker);
      });
    };

    updateLayers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeEmpire, isLoading]);

  return (
    <div className="relative w-full h-full">
      {/* Parchment filter overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 60%, rgba(44,42,41,0.18) 100%)",
          mixBlendMode: "multiply",
        }}
      />
      {/* Loading shimmer */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#F4EBE1]">
          <div className="flex flex-col items-center gap-4">
            <div
              className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"
            />
            <p className="font-serif text-[#2C2A29] text-lg tracking-widest animate-pulse">
              Charting the world…
            </p>
          </div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
