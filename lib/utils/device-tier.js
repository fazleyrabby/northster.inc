// Returns "low" | "mid" | "high" based on hardware concurrency and device memory.
// Used to gate WebGL features and avoid GPU overload on weak devices.
export function getDeviceTier() {
  if (typeof window === "undefined") return "high";
  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 4;
  if (cores <= 4 || memory <= 2) return "low";
  if (cores <= 6 || memory <= 4) return "mid";
  return "high";
}
