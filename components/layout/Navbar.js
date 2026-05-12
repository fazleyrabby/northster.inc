"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import NavMobile from "./NavMobile";
import { NAV, SITE } from "@/lib/constants";
import ThemeToggle from "@/components/atmosphere/ThemeToggle";
import { useAudio } from "@/components/atmosphere/AudioManager";

export default function Navbar() {
  const pathname = usePathname();
  const { isAudioEnabled, toggleAudio, volume, setVolume } = useAudio();

  // Dynamic context for the Archive Rail
  const getContext = () => {
    if (pathname.startsWith("/archive/documents")) return "SEGMENT: DOC_ARCHIVE / INTERNAL_RECORDS";
    if (pathname.startsWith("/archive")) return "SEGMENT: INSTITUTIONAL_ARCHIVE / DIV_04";
    if (pathname.startsWith("/labs")) return "FACILITY: NORTHSTER_LABS / RESEARCH_NODE";
    if (pathname.startsWith("/network")) return "NETWORK: RELAY_MAP / SIGNAL_DIVISION";
    const item = NAV.find(n => n.href === pathname);
    return item ? `SEGMENT: ${item.label.toUpperCase()} / RECORD_REV_IV` : "NORTHSTER_SYSTEM_ARCHIVE";
  };

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-[3px]">

      {/* ── RAIL A: SYSTEM STATUS / MOBILE ROW 1 ──────────────── */}
      <div className="border-b border-border/40 bg-panel/30">
        <Container size="wide">
          <div className="py-1 md:py-0.5 flex justify-between items-center gap-2 opacity-70 md:hover:opacity-100 transition-opacity duration-500 min-w-0 overflow-hidden">
            <div className="flex gap-x-4 items-center min-w-0 overflow-hidden">
              <div className="flex items-center gap-3 shrink-0">
                <span className="doc-ref text-[8px] md:text-[9px] tracking-[0.2em]">SYS: STABLE</span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleAudio}
                    className={`doc-ref text-[8px] md:text-[9px] tracking-[0.2em] transition-colors shrink-0 ${isAudioEnabled ? "text-accent" : "hover:text-accent/60"}`}
                  >
                    AUDIO: {isAudioEnabled ? "ACTIVE" : "MUTED"}
                  </button>

                  {isAudioEnabled && (
                    <div className="hidden sm:flex items-center gap-2 group/volume">
                      <span className="doc-ref text-[8px] opacity-40">VOL: {Math.round(volume * 100)}%</span>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-14 h-[1px] bg-border appearance-none cursor-crosshair accent-accent"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="hidden sm:block scale-90 origin-left shrink-0">
                <ThemeToggle />
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="meta meta-accent signal-pulse text-[8px]">●</span>
                <span className="doc-ref text-[8px] md:text-[9px] hidden sm:block">SIGNAL_STABLE / CH.04</span>
                <span className="doc-ref text-[8px] sm:hidden">CH.04</span>
              </div>
              <span className="doc-ref text-[9px] hidden md:block">EST. 1978 / DIV. 04</span>
            </div>
          </div>
        </Container>
      </div>

      {/* ── RAIL B: PRIMARY NAVIGATION / MOBILE ROW 2 ──────────── */}
      <div className="border-b border-border/50">
        <Container size="wide">
          <div className="flex items-center justify-between h-14 md:h-16">
            <Link href="/" className="flex items-baseline gap-3 group">
              <span className="font-display text-2xl tracking-tighter text-text opacity-90 group-hover:text-accent transition-colors">★</span>
              <div className="flex flex-col leading-none">
                <span className="meta text-sm font-bold tracking-widest text-text">
                  {SITE.shortName}
                </span>
                <span className="doc-ref text-[8px] opacity-40 group-hover:opacity-100 transition-opacity uppercase tracking-widest">Industries</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center h-full border-l border-r border-border/50 divide-x divide-border/50">
              {NAV.slice(1).map((item) => {
                const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      relative flex items-center h-full px-6 transition-all duration-300 group
                      meta text-xs tracking-[0.15em]
                      ${active ? "text-text font-bold bg-panel/20" : "text-text/50 hover:text-text hover:bg-panel/40"}
                    `}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {active && (
                      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-accent/80 phosphor shadow-[0_0_8px_rgba(199,169,107,0.4)]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3 md:hidden">
              <NavMobile />
            </div>
          </div>
        </Container>
      </div>

      {/* ── RAIL C: CONTEXTUAL ARCHIVE / MOBILE ROW 3 ─────────── */}
      <div className="border-b border-border/40 bg-panel/10">
        <Container size="wide">
          <div className="py-1.5 flex justify-between items-center gap-4 opacity-80 min-w-0 overflow-hidden">
            <div className="flex gap-x-4 items-center min-w-0 overflow-hidden">
              <span className="doc-ref text-[9px] md:text-[10px] uppercase tracking-wider truncate">{getContext()}</span>
            </div>
            <div className="flex items-center gap-4 md:gap-6 shrink-0">
              <span className="doc-ref text-[9px] md:text-[10px] tabular-nums">REV: 04.22</span>
              <span className="doc-ref text-[10px] hidden lg:block uppercase tracking-widest opacity-40">Classification: Restricted</span>
            </div>
          </div>
        </Container>
      </div>

    </header>
  );
}
