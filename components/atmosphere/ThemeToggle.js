"use client";

import { useTheme } from "./ThemeProvider";
import { useTemporal } from "./TemporalEngine";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { era } = useTemporal();

  const isFuture = era === "future";
  const isDark = theme === "archive-night";

  const darkLabel = isFuture ? "DARK" : "PHOSPHOR";
  const lightLabel = isFuture ? "LIGHT" : "PAPER";

  return (
    <button
      onClick={toggleTheme}
      className="group flex items-center gap-3 px-3 py-1 border border-border bg-panel/40 hover:border-accent/40 transition-all duration-300"
      aria-label="Toggle atmospheric mode"
    >
      <div className="flex items-baseline gap-2">
        <span className={`doc-ref transition-colors duration-500 ${isDark ? "text-accent" : "opacity-40"}`}>
          {darkLabel}
        </span>
        <span className="doc-ref opacity-20">/</span>
        <span className={`doc-ref transition-colors duration-500 ${!isDark ? "text-accent" : "opacity-40"}`}>
          {lightLabel}
        </span>
      </div>

      <div className="relative w-8 h-3 bg-elevated/50 border border-border rounded-full overflow-hidden">
        <div
          className={`absolute top-0 bottom-0 w-1/2 bg-accent/80 transition-all duration-500 ease-in-out ${
            !isDark ? "left-1/2" : "left-0"
          }`}
        />
      </div>
    </button>
  );
}
