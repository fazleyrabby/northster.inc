"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/constants";

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
        backgroundColor: "#101215",
        overflowY: "auto",
        animation: "mobile-menu-in 0.22s cubic-bezier(0.2,0.7,0.2,1) both",
      }}
    >
      {/* Close strip — sits at top of overlay so user can dismiss */}
      <div className="border-b border-border bg-panel-2">
        <div className="px-5 py-3 flex justify-between items-center">
          <span className="doc-ref">NS-NAV / MOBILE INDEX — {NAV.length} ENTRIES</span>
          <button
            type="button"
            className="meta text-text hover:text-accent transition-colors"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            CLOSE ✕
          </button>
        </div>
      </div>

      <nav>
        {NAV.map((item, i) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-baseline gap-5 px-5 py-5 border-b border-border hover:bg-panel/60 transition-colors ${active ? "bg-panel/40" : ""}`}
            >
              <span className="doc-ref w-6">{String(i + 1).padStart(2, "0")}</span>
              <span
                className={`meta ${active ? "text-accent" : "text-text"}`}
                style={{ animation: `mobile-menu-in 0.28s cubic-bezier(0.2,0.7,0.2,1) ${0.04 + i * 0.04}s both` }}
              >
                {item.label}
              </span>
              {active && <span className="doc-ref ml-auto">← ACTIVE</span>}
            </Link>
          );
        })}
      </nav>

      <div className="px-5 py-4 border-t border-border-strong">
        <div className="flex items-center gap-2">
          <span className="meta meta-accent signal-pulse">●</span>
          <span className="doc-ref">SIGNAL STABLE / CH.04</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        className="md:hidden meta text-text hover:text-accent transition-colors"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        type="button"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "CLOSE" : "MENU"}
      </button>

      {mounted && open && createPortal(overlay, document.body)}
    </>
  );
}
