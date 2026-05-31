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
  title: "ChronosAtlas — Interactive Historical Atlas",
  description:
    "An immersive, interactive historical atlas spanning the Roman Empire (100 CE), Mughal Empire (1550 CE), and the 1857 South Asian Uprising. Built with Next.js, Leaflet, and TypeScript.",
  keywords: [
    "historical atlas",
    "Roman Empire",
    "Mughal Empire",
    "1857 Indian Rebellion",
    "GIS history",
    "interactive map",
  ],
  openGraph: {
    title: "ChronosAtlas — Cartographer's Journal",
    description: "Journey through history — an immersive interactive historical atlas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full`}>
      <body className="h-full antialiased overflow-hidden">{children}</body>
    </html>
  );
}
