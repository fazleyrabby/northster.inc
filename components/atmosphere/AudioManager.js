"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { vocalEngine } from "@/lib/audio/vocal-engine";
import { useTheme } from "./ThemeProvider";

const AudioContext = createContext({
  isAudioEnabled: false,
  toggleAudio: () => {},
  volume: 0.5,
  setVolume: () => {},
});

export const useAudio = () => useContext(AudioContext);

export default function AudioManager({ children }) {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [volume, setVolumeState] = useState(0.5);
  const [isInitialized, setIsInitialized] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();

  // Load preference from localStorage
  useEffect(() => {
    const savedAudio = localStorage.getItem("northster-audio-enabled");
    const savedVolume = localStorage.getItem("northster-audio-volume");
    
    if (savedAudio === "true") {
      setIsAudioEnabled(true);
    }
    if (savedVolume !== null) {
      const vol = parseFloat(savedVolume);
      setVolumeState(vol);
      vocalEngine?.setVolume(vol);
    }
  }, []);

  // Initialize engine on first interaction if enabled
  const initEngine = useCallback(() => {
    if (!vocalEngine || isInitialized) return;
    vocalEngine.init();
    vocalEngine.setVolume(volume);
    setIsInitialized(true);
  }, [isInitialized, volume]);

  const setVolume = useCallback((val) => {
    setVolumeState(val);
    localStorage.setItem("northster-audio-volume", val.toString());
    vocalEngine?.setVolume(val);
  }, []);

  // Handle Mute/Unmute
  const toggleAudio = useCallback(() => {
    const newState = !isAudioEnabled;
    setIsAudioEnabled(newState);
    localStorage.setItem("northster-audio-enabled", newState.toString());

    if (newState) {
      initEngine();
      vocalEngine?.fadeIn();
    } else {
      vocalEngine?.fadeOut();
    }
  }, [isAudioEnabled, initEngine]);

  // Listen for theme changes to adjust audio texture
  useEffect(() => {
    if (!isInitialized) return;
    const mode = theme === "archive-night" ? "night" : "day";
    vocalEngine?.setMode(mode);
  }, [theme, isInitialized]);

  // Handle page-specific atmospheric shifts (subtle)
  useEffect(() => {
    if (!isInitialized) return;
    // Potentially add logic here for /network or /archive specific tones
    // For now, just ensure the current mode is maintained
    const mode = theme === "archive-night" ? "night" : "day";
    vocalEngine?.setMode(mode);
  }, [pathname, theme, isInitialized]);

  // Global click listener to catch the first interaction if enabled
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (isAudioEnabled && !isInitialized) {
        initEngine();
        vocalEngine?.fadeIn();
      }
      window.removeEventListener("click", handleFirstInteraction);
    };

    if (isAudioEnabled && !isInitialized) {
      window.addEventListener("click", handleFirstInteraction);
    }

    return () => window.removeEventListener("click", handleFirstInteraction);
  }, [isAudioEnabled, isInitialized, initEngine]);

  return (
    <AudioContext.Provider value={{ isAudioEnabled, toggleAudio, volume, setVolume }}>
      {children}
    </AudioContext.Provider>
  );
}
