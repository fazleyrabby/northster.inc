"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { eraBus } from "@/lib/era-bus";

const TemporalContext = createContext(null);

export function useTemporal() {
  return useContext(TemporalContext);
}

function readStoredEra() {
  if (typeof window === "undefined") return "archive";
  try {
    return localStorage.getItem("northster-era") === "future" ? "future" : "archive";
  } catch {
    return "archive";
  }
}

export default function TemporalEngine({ children }) {
  // Always start with "archive" — matches server render, avoids hydration mismatch.
  // Mount effect applies stored preference after hydration.
  const [era, setEra] = useState("archive");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState(null);
  const timers = useRef([]);

  // On mount: apply stored era and sync DOM attribute
  useEffect(() => {
    const stored = readStoredEra();
    document.documentElement.setAttribute("data-era", stored);
    if (stored !== "archive") setEra(stored);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep DOM attribute in sync and broadcast to R3F world
  useEffect(() => {
    document.documentElement.setAttribute("data-era", era);
    eraBus.emit(era);
  }, [era]);

  const toggleEra = useCallback(() => {
    if (isTransitioning) return;

    const next = era === "archive" ? "future" : "archive";
    setTransitionDirection(next === "future" ? "to-future" : "to-archive");
    setIsTransitioning(true);

    // Switch era at apex — covered by flash at ~1.5s
    const t1 = setTimeout(() => {
      setEra(next);
      try { localStorage.setItem("northster-era", next); } catch {}
    }, 1500);

    // End overlay
    const t2 = setTimeout(() => {
      setIsTransitioning(false);
      setTransitionDirection(null);
    }, 3700);

    timers.current = [t1, t2];
  }, [era, isTransitioning]);

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  return (
    <TemporalContext.Provider value={{ era, isTransitioning, transitionDirection, toggleEra }}>
      {children}
    </TemporalContext.Provider>
  );
}
