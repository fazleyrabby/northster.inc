"use client";

import { useEffect, useState } from "react";

export default function NavHints() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("northster-hints-seen")) {
        // Small delay so page settles before hints appear
        const show = setTimeout(() => setVisible(true), 1800);
        const hide = setTimeout(() => dismiss(), 7000);
        return () => { clearTimeout(show); clearTimeout(hide); };
      }
    } catch {}
  }, []);

  function dismiss() {
    setVisible(false);
    try { localStorage.setItem("northster-hints-seen", "1"); } catch {}
  }

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] pointer-events-none"
      style={{ animation: "hint-fade 0.6s ease both" }}
    >
      {/* Audio hint — left side of Rail A */}
      <div className="absolute top-[6px] left-[120px] flex flex-col items-start gap-0.5 pointer-events-auto" onClick={dismiss}>
        <span className="doc-ref text-[8px] text-accent/70 tracking-widest whitespace-nowrap">
          ↑ toggle audio
        </span>
        <div className="w-px h-3 bg-accent/30 ml-1" />
      </div>

      {/* Temporal trigger hint — right side of Rail A */}
      <div className="absolute top-[6px] right-[110px] flex flex-col items-end gap-0.5 pointer-events-auto" onClick={dismiss}>
        <span className="doc-ref text-[8px] text-accent/70 tracking-widest whitespace-nowrap">
          time travel ↑
        </span>
        <div className="w-px h-3 bg-accent/30 mr-1 self-end" />
      </div>

      <style>{`
        @keyframes hint-fade {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
