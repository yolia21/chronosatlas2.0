# 🗺️ ChronosAtlas — Interactive Historical Atlas

> *"Through cartography, the past speaks."*

A highly responsive, visually immersive **historical atlas application** built with Next.js, React-Leaflet, and TypeScript. Explore three pivotal eras of world history through interactive maps, clickable empire regions, and rich historical panels — all rendered from static data with **zero API keys required**.

---

## ✨ Features

- **Interactive GeoJSON Map** — Clickable empire/region overlays with gold hover glow effects
- **Global Time Slider** — Navigate between 100 CE, 1550 CE, and 1850 CE with smooth map transitions
- **Historical Sidebar Panel** — Per-empire flags, biographies of key figures, key events chronicle, and route legends
- **1857 Rebellion Routes** — Mapped rebellion corridors (Meerut → Bihar) and exile routes (Delhi → Makkah)
- **Vintage Cartographic Aesthetic** — Sepia tile filter, parchment palette, Playfair Display serif typography
- **Fully Offline-Capable** — All historical data is statically coded; map overlays are served from `/public`

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher

### Install & Run

```bash
# 1. Clone / open the project directory
cd "ChronosAtlas"

# 2. Install dependencies (already done if you followed the setup)
npm install

# 3. Launch the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. That's it — no `.env` file, no API keys, no additional setup required.

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout — Playfair Display + Inter fonts, SEO metadata
│   ├── page.tsx             # Main ChronosAtlas page — map + sidebar + slider assembly
│   └── globals.css          # Cartographer's Journal design system + Leaflet overrides
├── components/
│   ├── HistoricalMap.tsx    # SSR-safe Next.js dynamic() wrapper for Leaflet
│   ├── MapComponent.tsx     # Core Leaflet map — GeoJSON overlays, custom markers
│   ├── SidebarPanel.tsx     # Sliding detail panel — figures, flags, chronicle
│   └── TimeSlider.tsx       # Sticky bottom timeline navigator
└── data/
    └── worldHistoryData.ts  # Central data engine — all empires, figures, markers

public/
├── roman-empire-100ce.json       # Roman Empire GeoJSON polygon (100 CE)
├── mughal-empire-1550ce.json     # Mughal Empire GeoJSON polygon (1550 CE)
└── south-asia-1850ce.json        # 1850 CE multi-feature: territories + rebellion/exile routes
```

---

## 🏛️ Historical Data — Prototype Cases

| Year | Region | Key Coverage |
|------|--------|-------------|
| **100 CE** | Roman Empire | Mediterranean Basin polygon; 5 city markers (Rome, Alexandria, Carthage, Antioch, Londinium); figures: Trajan, Tacitus, Pliny, Epictetus |
| **1550 CE** | Mughal Empire | Indian Subcontinent polygon; 5 city markers (Agra, Fatehpur Sikri, Delhi, Lahore, Kabul); figures: Akbar, Bairam Khan, Hamida Banu Begum, Tansen, Todar Mal |
| **1850 CE** | South Asia — 1857 Rebellion | Multi-polygon (Bengal, Awadh, Punjab); rebellion corridor (Meerut → Arrah, Bihar); exile route (Delhi → Makkah); 9 markers; figures: Bahadur Shah Zafar, Rani Lakshmibai, Kunwar Singh, Begum Hazrat Mahal, Shah Waliullah legacy |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + custom CSS |
| Mapping | Leaflet + React-Leaflet (dynamic import) |
| Tiles | CartoDB Voyager (no API key) |
| Fonts | Playfair Display + Inter (Google Fonts) |
| Icons | Lucide React |

---

## 🎨 Design System

**Palette** (`Cartographer's Journal`):
- Parchment Cream: `#F4EBE1` — backgrounds, text on dark panels
- Deep Charcoal: `#2C2A29` — primary text, borders
- Antique Gold: `#D4AF37` — accents, hover states, headings
- Imperial Crimson: `#8B1A1A` — Roman Empire
- Imperial Emerald: `#1A5E37` — Mughal Empire
- Imperial Purple: `#4A235A` — 1850 CE South Asian territories

---

## 📜 License

Built as a historical education prototype. All historical data is in the public domain. Map tiles © CARTO, © OpenStreetMap contributors.
