"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "archive-night",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

function readStoredTheme() {
  if (typeof window === "undefined") return "archive-night";
  try {
    return localStorage.getItem("northster-theme") || "archive-night";
  } catch {
    return "archive-night";
  }
}

export default function ThemeProvider({ children }) {
  // Always start with "archive-night" — matches server render, avoids hydration mismatch.
  const [theme, setTheme] = useState("archive-night");

  // On mount: apply stored theme and sync DOM attribute
  useEffect(() => {
    const stored = readStoredTheme();
    document.documentElement.setAttribute("data-theme", stored);
    if (stored !== "archive-night") setTheme(stored);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep DOM attribute in sync on subsequent theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "archive-night" ? "archive-day" : "archive-night";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    try { localStorage.setItem("northster-theme", newTheme); } catch {}
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
