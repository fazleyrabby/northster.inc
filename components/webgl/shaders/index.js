// GLSL shaders as template-literal strings.
// No loader config needed — works with Turbopack out of the box.

export const ATMOSPHERE_VERT = /* glsl */`
  varying vec2 vUv;
  varying vec3 vWorldPos;

  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// 2D gradient noise — no texture dependency
export const ATMOSPHERE_FRAG = /* glsl */`
  uniform float uTime;
  uniform float uEraBlend;   // 0 = archive, 1 = future
  uniform float uOpacity;
  uniform float uScale;
  uniform float uSpeed;

  varying vec2 vUv;

  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(1.7, 9.2);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = rot * p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;

    // Era-aware drift: archive meanders, future is nearly static
    float archiveDrift = uTime * uSpeed;
    float futureDrift  = uTime * uSpeed * 0.12;
    float driftT = mix(archiveDrift, futureDrift, uEraBlend);

    vec2 driftUv = uv * uScale + vec2(driftT * 0.4, driftT * 0.2);
    float n = fbm(driftUv);
    n = n * 0.5 + 0.5;  // remap [-1,1] to [0,1]
    n = smoothstep(0.3, 0.75, n);

    // Edge fadeout so planes tile seamlessly and fade at borders
    float edgeFade = uv.x * (1.0 - uv.x) * uv.y * (1.0 - uv.y) * 16.0;
    edgeFade = clamp(edgeFade, 0.0, 1.0);

    // Era-blended color: warm amber (archive) → cool steel (future)
    vec3 archiveColor = vec3(0.30, 0.20, 0.08);
    vec3 futureColor  = vec3(0.05, 0.10, 0.22);
    vec3 color = mix(archiveColor, futureColor, uEraBlend);

    float alpha = n * edgeFade * uOpacity;
    gl_FragColor = vec4(color * alpha, alpha);
  }
`;
