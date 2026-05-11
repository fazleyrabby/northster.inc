import Link from "next/link";
import Container from "./Container";
import NavMobile from "./NavMobile";
import { NAV, SITE } from "@/lib/constants";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-[3px]" style={{"--navbar-h": "88px"}}>

      {/* ── Top classification strip ─────────────────────────── */}
      <div className="border-b border-border bg-panel/60">
        <Container size="wide">
          <div className="py-1.5 flex justify-between items-center gap-4">
            <div className="flex gap-x-6 flex-wrap gap-y-0.5">
              <span className="doc-ref">NS-SYS-INDEX / COMPUTATIONAL DIVISION</span>
              <span className="doc-ref hidden sm:inline">INTERNAL DISTRIBUTION</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="meta meta-accent signal-pulse">●</span>
              <span className="doc-ref">SIGNAL STABLE / CH.04</span>
            </div>
          </div>
        </Container>
      </div>

      {/* ── Main nav row ─────────────────────────────────────── */}
      <div className="border-b border-border">
        <Container size="wide">
          <div className="flex items-center justify-between h-12">
            <Link href="/" className="flex items-baseline gap-2.5 group">
              <span className="font-display text-xl tracking-tight text-text">★</span>
              <span className="meta text-text group-hover:text-accent transition-colors">
                {SITE.shortName} / INC.
              </span>
            </Link>

            <nav className="hidden md:flex items-center divide-x divide-border border-l border-r border-border">
              {NAV.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="meta text-text link-amber px-5 py-3.5 hover:bg-panel/40 transition-colors duration-280"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <NavMobile />
          </div>
        </Container>
      </div>

    </header>
  );
}
