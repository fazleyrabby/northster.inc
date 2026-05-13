"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ATMOSPHERE_VERT, ATMOSPHERE_FRAG } from "./shaders/index";
import { useEraUniforms } from "./hooks/useEraUniforms";

export default function FogPlane({ z = -20, scale = 14, opacity = 0.08, speed = 0.004, noiseScale = 1.2, phaseOffset = 0 }) {
  const meshRef = useRef();
  const matRef = useRef();

  const geometry = useMemo(() => new THREE.PlaneGeometry(1, 1, 1, 1), []);

  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: ATMOSPHERE_VERT,
    fragmentShader: ATMOSPHERE_FRAG,
    uniforms: {
      uTime:     { value: phaseOffset },
      uEraBlend: { value: 0.0 },
      uOpacity:  { value: opacity },
      uScale:    { value: noiseScale },
      uSpeed:    { value: speed },
    },
    transparent: true,
    depthWrite: false,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
  }), [opacity, noiseScale, speed, phaseOffset]);

  matRef.current = material;
  useEraUniforms(matRef);

  useFrame(({ clock, invalidate }) => {
    if (material.uniforms) {
      material.uniforms.uTime.value = (clock.getElapsedTime() % 1000) + phaseOffset;
      invalidate();
    }
  });

  // Cleanup on unmount
  useMemo(() => () => {
    geometry.dispose();
    material.dispose();
  }, [geometry, material]);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      position={[0, 0, z]}
      scale={[scale, scale * 0.6, 1]}
    />
  );
}
