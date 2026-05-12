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
  title: {
    default: "NORTHSTER INC. — Computational Systems for a New Era",
    template: "%s | NORTHSTER INC."
  },
  description: "Northster Inc. — institutional computing systems, neural workstations, and analog mesh infrastructure preserved by Archive Division 04.",
  keywords: ["Northster", "Archival Computing", "Analog Mesh", "Computational Systems", "Division 04", "Signal Stability"],
  authors: [{ name: "NORTHSTER INC. / Archive Division 04" }],
  creator: "Northster Industries",
  publisher: "Archive Division 04",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://northster.inc",
    siteName: "NORTHSTER INC.",
    title: "NORTHSTER INC. — Institutional Record",
    description: "Recovered manufacturing archive and computational ecosystem from Archive Division 04.",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "NORTHSTER INC. Institutional Symbol",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
};

import ThemeProvider from "@/components/atmosphere/ThemeProvider";
import AudioManager from "@/components/atmosphere/AudioManager";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background text-text" suppressHydrationWarning>
        <ThemeProvider>
          <AudioManager>
            <GrainOverlay />
            <Navbar />
            <main className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </AudioManager>
        </ThemeProvider>
      </body>
    </html>
  );
}
