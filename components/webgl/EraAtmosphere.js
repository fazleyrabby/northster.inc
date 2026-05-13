"use client";

import { Suspense } from "react";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { Vector2 } from "three";
import EraLighting from "./EraLighting";
import FogPlane from "./FogPlane";

// All scene content: lighting, fog planes, post-processing.
// era prop is passed from AtmosphereCanvas (which has React context).
// Everything else syncs via eraBus inside components.
export default function EraAtmosphere({ era, quality }) {
  const isFuture = era === "future";

  return (
    <>
      <EraLighting />

      {/* Layered atmospheric fog planes — z depths create perceived depth */}
      <FogPlane z={-45} scale={18} opacity={0.06} speed={0.003} noiseScale={0.8} phaseOffset={0} />
      {quality.fogPlanes >= 2 && (
        <FogPlane z={-28} scale={14} opacity={0.08} speed={0.004} noiseScale={1.2} phaseOffset={33} />
      )}
      {quality.fogPlanes >= 3 && (
        <FogPlane z={-14} scale={10} opacity={0.05} speed={0.006} noiseScale={1.8} phaseOffset={71} />
      )}

      <Suspense fallback={null}>
        <EffectComposer multisampling={0} disableNormalPass>
          <Vignette offset={0.28} darkness={0.55} eskil={false} />
          {quality.bloom && (
            <Bloom
              intensity={isFuture ? 0.08 : 0.18}
              luminanceThreshold={0.82}
              luminanceSmoothing={0.9}
              radius={0.6}
            />
          )}
          {/* Future: barely-perceptible chromatic aberration */}
          {isFuture && quality.chromatic && (
            <ChromaticAberration
              offset={new Vector2(0.0006, 0.0006)}
              radialModulation
              modulationOffset={0.5}
            />
          )}
        </EffectComposer>
      </Suspense>
    </>
  );
}
