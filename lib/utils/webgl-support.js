// Detects WebGL2/WebGL1 availability. Returns "webgl2" | "webgl" | "none".
// WebGL atmosphere is always a progressive enhancement — never required.
export function getWebGLSupport() {
  if (typeof window === "undefined") return "none";
  try {
    const canvas = document.createElement("canvas");
    if (canvas.getContext("webgl2")) return "webgl2";
    if (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) return "webgl";
    return "none";
  } catch {
    return "none";
  }
}
