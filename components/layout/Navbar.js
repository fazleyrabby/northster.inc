"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import NavMobile from "./NavMobile";
import { NAV, SITE } from "@/lib/constants";
import ThemeToggle from "@/components/atmosphere/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();

  // Dynamic context for the Archive Rail
  const getContext = () => {
    if (pathname === "/") return "ROOT / SYSTEM INDEX";
    if (pathname.startsWith("/products/")) {
      const slug = pathname.split("/").pop();
      return `RECORD: NS-${slug?.toUpperCase().replace(/-/g, "")} / PRODUCT ARCHIVE`;
    }
    if (pathname.startsWith("/products")) return "CATALOG: NS-CAT-001 / PRODUCT INDEX";
    const item = NAV.find(n => n.href === pathname);
    return item ? `DIVISION: ${item.label} / RECORD REVISION IV` : "NORTHSTER ARCHIVE SYSTEM";
  };

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-[3px]">

      {/* ── RAIL A: SYSTEM STATUS / MOBILE ROW 1 ──────────────── */}
      <div className="border-b border-border/20 bg-panel/30">
        <Container size="wide">
          <div className="py-1 md:py-0.5 flex justify-between items-center gap-4 opacity-50 md:hover:opacity-100 transition-opacity duration-500">
            <div className="flex gap-x-4 items-center">
              <span className="doc-ref text-[8px] md:text-[9px] tracking-[0.2em]">SYS: STABLE</span>
              <div className="hidden sm:block scale-90 origin-left">
                <ThemeToggle />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="meta meta-accent signal-pulse text-[8px]">●</span>
                <span className="doc-ref text-[8px] md:text-[9px]">CH.04 / NODE:6</span>
              </div>
              <span className="doc-ref text-[9px] hidden md:block">EST. 1978 / DIV. 04</span>
            </div>
          </div>
        </Container>
      </div>

      {/* ── RAIL B: PRIMARY NAVIGATION / MOBILE ROW 2 ──────────── */}
      <div className="border-b border-border/30">
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

            <nav className="hidden md:flex items-center h-full border-l border-r border-border/30 divide-x divide-border/30">
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

            <div className="flex items-center gap-4 md:hidden">
              <div className="scale-75 origin-right">
                <ThemeToggle />
              </div>
              <NavMobile />
            </div>
          </div>
        </Container>
      </div>

      {/* ── RAIL C: CONTEXTUAL ARCHIVE / MOBILE ROW 3 ─────────── */}
      <div className="border-b border-border/20 bg-panel/10">
        <Container size="wide">
          <div className="py-1.5 flex justify-between items-center opacity-60 md:opacity-70">
            <div className="flex gap-x-4 items-center">
              <span className="doc-ref text-[9px] md:text-[10px] uppercase tracking-wider">{getContext()}</span>
            </div>
            <div className="flex items-center gap-4 md:gap-6">
              <span className="doc-ref text-[9px] md:text-[10px] tabular-nums">REV: 04.22</span>
              <span className="doc-ref text-[10px] hidden lg:block uppercase tracking-widest opacity-40">Classification: Restricted</span>
            </div>
          </div>
        </Container>
      </div>

    </header>
  );
}
