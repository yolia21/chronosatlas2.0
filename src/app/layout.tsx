import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "تاریخ بصری — Visual History | Interactive Historical Atlas",
  description:
    "An immersive interactive historical atlas spanning 12 civilisations from Ancient Egypt (1350 BCE) to the 1857 South Asian Uprising. Built with Next.js, Leaflet, and TypeScript.",
  keywords: [
    "تاریخ بصری", "Visual History", "historical atlas", "interactive map",
    "Ancient Egypt", "Carthage", "Roman Empire", "Abbasid Caliphate", "Maya",
    "Delhi Sultanate", "Aztec", "Inca", "Mughal Empire", "Ottoman Empire", "Safavid",
    "1857 Indian Rebellion", "GIS history",
  ],
  openGraph: {
    title: "تاریخ بصری — Visual History",
    description: "Journey through 3,000 years of human civilisation on an immersive interactive atlas.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full`}>
      <body className="h-full antialiased overflow-hidden">{children}</body>
    </html>
  );
}
