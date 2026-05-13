"use client";

import { useMemo } from "react";
import { getDeviceTier } from "@/lib/utils/device-tier";
import { getWebGLSupport } from "@/lib/utils/webgl-support";

// Returns quality flags consumed by all R3F components.
// Called once at mount — tier never changes mid-session.
export function useSceneQuality() {
  return useMemo(() => {
    const tier = getDeviceTier();
    const webgl = getWebGLSupport();

    return {
      tier,
      webglSupport: webgl,
      fogPlanes: tier === "low" ? 1 : tier === "mid" ? 2 : 3,
      bloom: tier !== "low",
      chromatic: tier === "high",
      dpr: tier === "low" ? [1, 1] : [1, 1.5],
    };
  }, []);
}
