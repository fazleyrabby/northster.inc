"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { vocalEngine } from "@/lib/audio/vocal-engine";
import { useTheme } from "./ThemeProvider";
import { useTemporal } from "./TemporalEngine";

const AudioContext = createContext({
  isAudioEnabled: false,
  toggleAudio: () => {},
  volume: 0.5,
  setVolume: () => {},
});

export const useAudio = () => useContext(AudioContext);

function readStoredAudio() {
  if (typeof window === "undefined") return false;
  try { return localStorage.getItem("northster-audio-enabled") === "true"; } catch { return false; }
}

function readStoredVolume() {
  if (typeof window === "undefined") return 0.5;
  try {
    const saved = localStorage.getItem("northster-audio-volume");
    return saved !== null ? parseFloat(saved) : 0.5;
  } catch { return 0.5; }
}

export default function AudioManager({ children }) {
  const [isAudioEnabled, setIsAudioEnabled] = useState(readStoredAudio);
  const [volume, setVolumeState] = useState(readStoredVolume);
  const [isInitialized, setIsInitialized] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();
  const { era } = useTemporal();
  const initialVolume = useRef(volume);

  // Sync stored volume to engine on mount (engine reads this.volume before init)
  useEffect(() => {
    vocalEngine?.setVolume(initialVolume.current);
  }, []);

  const initEngine = useCallback(() => {
    if (!vocalEngine || isInitialized) return;
    vocalEngine.init();
    vocalEngine.setVolume(volume);
    setIsInitialized(true);
  }, [isInitialized, volume]);

  const setVolume = useCallback((val) => {
    setVolumeState(val);
    try { localStorage.setItem("northster-audio-volume", val.toString()); } catch {}
    vocalEngine?.setVolume(val);
  }, []);

  const toggleAudio = useCallback(() => {
    const newState = !isAudioEnabled;
    setIsAudioEnabled(newState);
    try { localStorage.setItem("northster-audio-enabled", newState.toString()); } catch {}

    if (newState) {
      initEngine();
      vocalEngine?.fadeIn();
    } else {
      vocalEngine?.fadeOut();
    }
  }, [isAudioEnabled, initEngine]);

  // Sync audio mode to era + theme
  useEffect(() => {
    if (!isInitialized) return;
    if (era === "future") {
      vocalEngine?.setMode("future");
    } else {
      const mode = theme === "archive-night" ? "night" : "day";
      vocalEngine?.setMode(mode);
    }
  }, [era, theme, isInitialized, pathname]);

  // Catch first interaction if audio was enabled from stored preference
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
