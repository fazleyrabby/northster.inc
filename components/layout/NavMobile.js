"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/constants";
import ThemeToggle from "@/components/atmosphere/ThemeToggle";

export default function NavMobile() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mounted) return;
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open, mounted]);

  const overlay = (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 80,
        backgroundColor: "var(--background)",
        overflowY: "auto",
        animation: "mobile-menu-in 0.22s cubic-bezier(0.2,0.7,0.2,1) both",
      }}
    >
      {/* Close strip — sits at top of overlay so user can dismiss */}
      <div className="border-b border-border/20 bg-panel/30">
        <div className="px-5 py-2 flex justify-between items-center opacity-60">
          <span className="doc-ref text-[10px]">NS-NAV / MOBILE_INDEX.REV4</span>
          <button
            type="button"
            className="meta text-[10px] text-text hover:text-accent transition-colors"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            DISMISS ✕
          </button>
        </div>
      </div>

      <nav className="py-4">
        {NAV.map((item, i) => {
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-baseline gap-6 px-6 py-4 transition-all duration-300 ${active ? "bg-accent/5 border-l-2 border-accent" : "border-l-2 border-transparent"}`}
            >
              <span className="doc-ref text-[10px] w-6 opacity-30">{String(i + 1).padStart(2, "0")}</span>
              <span
                className={`meta text-sm tracking-[0.12em] ${active ? "text-text font-medium" : "text-text/60"}`}
                style={{ animation: `mobile-menu-in 0.28s cubic-bezier(0.2,0.7,0.2,1) ${0.04 + i * 0.04}s both` }}
              >
                {item.label}
              </span>
              {active && (
                <span className="doc-ref text-[9px] ml-auto text-accent/60 phosphor-emerge">ACTIVE_RECORD</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-6 py-6 border-t border-border/20 bg-panel/10">
        <div className="space-y-4">
          <div className="pb-4 border-b border-border/20">
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="meta meta-accent signal-pulse text-[8px]">●</span>
              <span className="doc-ref text-[10px]">SIGNAL STABLE / CH.04</span>
            </div>
            <span className="doc-ref text-[10px] opacity-40">NODE:6_ACTIVE</span>
          </div>
          <p className="doc-ref text-[9px] leading-relaxed opacity-40 max-w-[200px]">
            NORTHSTER INC. ARCHIVAL INTERFACE / INTERNAL DISTRIBUTION ONLY
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        className="md:hidden meta text-[11px] text-text/80 hover:text-accent transition-colors border border-border/40 px-3 py-1.5"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        type="button"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "DISMISS" : "INDEX_ACCESS"}
      </button>

      {mounted && open && createPortal(overlay, document.body)}
    </>
  );
}
