"use client";

import { useState, useEffect } from "react";

export default function GrainOverlay() {
  const [meta, setMeta] = useState("NORTHSTER_SYSTEM_ARCHIVE / READY");

  useEffect(() => {
    const strings = [
      "NORTHSTER_SYSTEM_ARCHIVE / READY",
      "SIGNAL_STABLE / CH.04",
      "DIV_04 / MANUFACTURING_RECORD_SEALED",
      "REV_IV_PROTOCOL_ACTIVE",
      "ARCHIVE_INDEXING / CONTINUOUS",
      "RELAY_CHAIN_04 / STABLE",
      "NODE_MEMORY_AUDIT / COMPLETE",
      "WATERFALL_CAPTURE / ONGOING",
      "ATMOSPHERIC_NOISE_FLOOR / NOMINAL",
    ];
    
    const interval = setInterval(() => {
      setMeta(strings[Math.floor(Math.random() * strings.length)]);
    }, 12000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ── BASE ATMOSPHERE ──────────────────────────────────── */}
      <div className="page-vignette" aria-hidden="true" />
      <div className="photocopy" aria-hidden="true" />
      <div className="grain-slow" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />

      {/* ── PHASE 3 ENVIRONMENTAL SYSTEM ─────────────────────── */}
      <div className="phosphor-drift" aria-hidden="true" />
      <div className="operational-breathing" aria-hidden="true" />
      <div className="signal-instability" aria-hidden="true" />

      {/* ── METADATA CYCLING ─────────────────────────────────── */}
      <div className="metadata-cycling hidden md:block" aria-hidden="true">
        <div className="flex items-center gap-3">
          <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
          <span className="doc-ref text-[8px] opacity-20 uppercase tracking-[0.3em] font-mono whitespace-nowrap">
            {meta}
          </span>
        </div>
      </div>
    </>
  );
}
