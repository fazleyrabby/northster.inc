"use client";

import { useTemporal } from "@/components/atmosphere/TemporalEngine";

export default function TemporalTrigger() {
  const { era, isTransitioning, toggleEra } = useTemporal();

  const label = isTransitioning
    ? "TRAVERSING"
    : era === "future"
    ? "← ARCHIVE / 1981"
    : "TEMPORAL SHIFT / 2225 →";

  return (
    <button
      onClick={toggleEra}
      disabled={isTransitioning}
      className={`
        doc-ref text-[8px] md:text-[9px] tracking-[0.2em] uppercase
        transition-all duration-500 shrink-0 select-none cursor-crosshair
        ${isTransitioning
          ? "opacity-20 cursor-wait"
          : era === "future"
          ? "text-[#7aa3c8] hover:text-[#dce4ec] opacity-70 hover:opacity-100"
          : "opacity-60 hover:opacity-100 hover:text-accent"
        }
      `}
    >
      {label}
    </button>
  );
}
