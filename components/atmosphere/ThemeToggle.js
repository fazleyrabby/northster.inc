"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="group flex items-center gap-3 px-3 py-1 border border-border bg-panel/40 hover:border-accent/40 transition-all duration-300"
      aria-label="Toggle atmospheric mode"
    >
      <div className="flex items-baseline gap-2">
        <span className={`doc-ref transition-colors duration-500 ${theme === 'archive-night' ? 'text-accent' : 'opacity-40'}`}>
          PHOSPHOR
        </span>
        <span className="doc-ref opacity-20">/</span>
        <span className={`doc-ref transition-colors duration-500 ${theme === 'archive-day' ? 'text-accent' : 'opacity-40'}`}>
          PAPER
        </span>
      </div>
      
      <div className="relative w-8 h-3 bg-elevated/50 border border-border rounded-full overflow-hidden">
        <div 
          className={`absolute top-0 bottom-0 w-1/2 bg-accent/80 transition-all duration-500 ease-in-out ${
            theme === 'archive-day' ? 'left-1/2' : 'left-0'
          }`}
        />
      </div>
    </button>
  );
}
