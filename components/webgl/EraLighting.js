"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { eraBus } from "@/lib/era-bus";

const ARCHIVE_LIGHT = { color: new THREE.Color("#e8c87a"), intensity: 0.45 };
const FUTURE_LIGHT  = { color: new THREE.Color("#a8c4d8"), intensity: 0.30 };
const ARCHIVE_AMB   = { color: new THREE.Color("#1a1008"), intensity: 0.7 };
const FUTURE_AMB    = { color: new THREE.Color("#06090f"), intensity: 0.9 };

export default function EraLighting() {
  const dirRef = useRef();
  const ambRef = useRef();
  const targetEra = useRef("archive");

  useEffect(() => {
    return eraBus.subscribe(era => { targetEra.current = era; });
  }, []);

  useFrame(({ invalidate }) => {
    if (!dirRef.current || !ambRef.current) return;
    const isFuture = targetEra.current === "future";
    const tDir = isFuture ? FUTURE_LIGHT : ARCHIVE_LIGHT;
    const tAmb = isFuture ? FUTURE_AMB   : ARCHIVE_AMB;
    const k = 0.015;

    dirRef.current.color.lerp(tDir.color, k);
    dirRef.current.intensity = THREE.MathUtils.lerp(dirRef.current.intensity, tDir.intensity, k);
    ambRef.current.color.lerp(tAmb.color, k);
    ambRef.current.intensity = THREE.MathUtils.lerp(ambRef.current.intensity, tAmb.intensity, k);

    invalidate();
  });

  return (
    <>
      <directionalLight
        ref={dirRef}
        color="#e8c87a"
        intensity={0.45}
        position={[-3, 4, 5]}
      />
      <ambientLight
        ref={ambRef}
        color="#1a1008"
        intensity={0.7}
      />
    </>
  );
}
