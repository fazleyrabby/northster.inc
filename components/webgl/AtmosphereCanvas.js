"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useTemporal } from "@/components/atmosphere/TemporalEngine";
import { eraBus } from "@/lib/era-bus";
import { getWebGLSupport } from "@/lib/utils/webgl-support";
import { useSceneQuality } from "./hooks/useSceneQuality";
import EraAtmosphere from "./EraAtmosphere";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function AtmosphereCanvas() {
  const { era } = useTemporal();
  const quality = useSceneQuality();
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  // Defer canvas mount until browser is idle — never blocks initial render
  useEffect(() => {
    if (typeof requestIdleCallback !== "undefined") {
      const id = requestIdleCallback(() => setMounted(true), { timeout: 2500 });
      return () => cancelIdleCallback(id);
    }
    const t = setTimeout(() => setMounted(true), 800);
    return () => clearTimeout(t);
  }, []);

  // Broadcast era to R3F world whenever it changes
  useEffect(() => {
    eraBus.emit(era);
  }, [era]);

  // Don't mount on low-tier devices, no WebGL, or reduced motion preference
  if (!mounted || quality.tier === "low" || quality.webglSupport === "none" || reducedMotion) {
    return null;
  }

  const isFuture = era === "future";

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: isFuture ? 0.85 : 0.75,
        transition: "opacity 1.5s ease-out",
      }}
    >
      <Canvas
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: false,
        }}
        dpr={quality.dpr}
        frameloop="demand"
        flat
        camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 100 }}
      >
        <Suspense fallback={null}>
          <EraAtmosphere era={era} quality={quality} />
        </Suspense>
      </Canvas>
    </div>
  );
}
