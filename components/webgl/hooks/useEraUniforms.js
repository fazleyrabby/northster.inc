"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { eraBus } from "@/lib/era-bus";

// Subscribes to era changes via eraBus and returns a ref holding current era.
// Also animates uEraBlend uniform toward target on each frame (smooth blend).
export function useEraUniforms(materialRef) {
  const targetBlend = useRef(0); // 0 = archive, 1 = future

  useEffect(() => {
    return eraBus.subscribe(era => {
      targetBlend.current = era === "future" ? 1.0 : 0.0;
    });
  }, []);

  useFrame(() => {
    if (!materialRef?.current) return;
    const u = materialRef.current.uniforms;
    if (!u?.uEraBlend) return;
    const current = u.uEraBlend.value;
    const diff = targetBlend.current - current;
    if (Math.abs(diff) > 0.001) {
      u.uEraBlend.value += diff * 0.025; // ~40 frames to fully transition
    }
  });

  return targetBlend;
}
