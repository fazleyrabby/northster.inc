import { Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GrainOverlay from "@/components/atmosphere/GrainOverlay";
import PageTransition from "@/components/layout/PageTransition";
import ThemeProvider from "@/components/atmosphere/ThemeProvider";
import AudioManager from "@/components/atmosphere/AudioManager";
import TemporalEngine from "@/components/atmosphere/TemporalEngine";
import TemporalTransition from "@/components/atmosphere/TemporalTransition";
import SmoothScroll from "@/components/motion/SmoothScroll";
// Client wrapper handles the ssr:false dynamic import (required in App Router)
import AtmosphereCanvasLoader from "@/components/webgl/AtmosphereCanvasLoader";

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
  metadataBase: new URL("https://northster.inc"),
  title: {
    default: "NORTHSTER INC. — Computational Systems for a New Era",
    template: "%s | NORTHSTER INC."
  },
  description: "Northster Inc. — institutional computing systems, neural workstations, and analog mesh infrastructure preserved by Archive Division 04.",
  keywords: ["Northster", "Archival Computing", "Analog Mesh", "Computational Systems", "Division 04", "Signal Stability"],
  authors: [{ name: "NORTHSTER INC. / Archive Division 04" }],
  creator: "Northster Industries",
  publisher: "Archive Division 04",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://northster.inc",
    siteName: "NORTHSTER INC.",
    title: "NORTHSTER INC. — Institutional Record",
    description: "Recovered manufacturing archive and computational ecosystem from Archive Division 04.",
    images: [{ url: "/icon.png", width: 512, height: 512, alt: "NORTHSTER INC. Institutional Symbol" }],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.png", type: "image/png" }, { url: "/icon.png", type: "image/png" }],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background text-text" suppressHydrationWarning>
        {/* Runs before React hydration — applies stored era/theme to prevent CSS flash */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var e=localStorage.getItem("northster-era");if(e==="future")document.documentElement.setAttribute("data-era","future");var t=localStorage.getItem("northster-theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}})()` }} />

        <ThemeProvider>
          <TemporalEngine>
            <AudioManager>
              {/* WebGL atmosphere layer — z-index: 0, behind all document content */}
              <AtmosphereCanvasLoader />

              {/* Document layer — z-index: 1, above atmosphere */}
              <div className="relative z-10 min-h-screen flex flex-col">
                <TemporalTransition />
                <GrainOverlay />
                <Navbar />
                <SmoothScroll>
                  <main className="flex-1">
                    <PageTransition>{children}</PageTransition>
                  </main>
                  <Footer />
                </SmoothScroll>
              </div>
            </AudioManager>
          </TemporalEngine>
        </ThemeProvider>
      </body>
    </html>
  );
}
