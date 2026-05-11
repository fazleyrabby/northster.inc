import { Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GrainOverlay from "@/components/atmosphere/GrainOverlay";
import PageTransition from "@/components/layout/PageTransition";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata = {
  title: "NORTHSTER INC. — Computational Systems for a New Era",
  description:
    "Northster Inc. — engineered for signal stability. Computational systems, neural workstations, and monochrome interfaces from a parallel timeline.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${plexMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-background text-text" suppressHydrationWarning>
        <GrainOverlay />
        <Navbar />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
