
# NORTHSTER INC.
## PRODUCTION IMPLEMENTATION ARCHITECTURE
### Classification: Engineering / Temporal Systems Division / Rev. 01

---

> This document is the canonical engineering reference for the NORTHSTER INC. frontend architecture. It covers all rendering, motion, state, audio, WebGL, and tooling systems. It is intended to be read by principal engineers, creative technologists, and technical art directors.

---

# PART I — CORE ARCHITECTURE

---

## 01. Overall Application Architecture

The system is a **two-layer composition**: a Document Layer and an Environment Layer. They exist at the same stacking level, composited by the browser's GPU compositor — not by JavaScript.

```
┌──────────────────────────────────────────────────────┐
│  DOCUMENT LAYER (Next.js RSC + Tailwind + CSS vars)  │
│  All typography, navigation, editorial content        │
│  Renders on server, hydrates on client               │
├──────────────────────────────────────────────────────┤
│  ENVIRONMENT LAYER (R3F canvas, position: fixed)     │
│  Atmospheric rendering, product scenes, depth fog    │
│  Client-only, lazy loaded, gracefully degraded       │
├──────────────────────────────────────────────────────┤
│  OVERLAY LAYER (TemporalTransition, GrainOverlay)    │
│  CSS-only, position: fixed, pointer-events: none     │
│  Never blocks interaction                            │
└──────────────────────────────────────────────────────┘
```

**Critical principle:** WebGL never owns layout. It is always a background texture — the document reads cleanly without it. If WebGL fails, loads slowly, or is disabled, the site is still fully usable at 100% visual fidelity (CSS-only mode).

**Temporal state** flows top-down from `TemporalEngine` context. Era changes cascade through CSS variable swaps on `<html>`, React re-renders for era-aware text, and R3F scene parameter updates — all triggered from a single source of truth.

---

## 02. Recommended Next.js Architecture

Stay on **Next.js App Router** (current: v16). Do not migrate to Pages Router.

**RSC boundary strategy:**
- All archive content, product data, editorial copy: Server Components
- All interactive, animated, era-aware components: Client Components (`"use client"`)
- WebGL canvas: always Client Component, always lazy-loaded with `next/dynamic`

```js
// Correct pattern for WebGL integration
const AtmosphereCanvas = dynamic(
  () => import("@/components/webgl/AtmosphereCanvas"),
  { ssr: false, loading: () => null }
);
```

**Do not** attempt SSR of any Three.js/R3F code. Three.js accesses `window`, `document`, and WebGL context — it will fail on the server. The `ssr: false` flag is mandatory.

**Streaming:** Use `loading.js` Suspense boundaries on all route segments. Product pages stream product data while the shell (navbar, atmosphere) renders immediately. This prevents layout shift and makes the site feel instantaneous.

**Metadata:** Use the App Router `metadata` export on every page. Add `metadataBase` to `layout.js` to silence the OG image warning:

```js
export const metadata = {
  metadataBase: new URL("https://northster.inc"),
  // ...
};
```

---

## 03. App Router Structure

```
app/
├── layout.js                  # Root: providers, navbar, footer, atmosphere
├── page.js                    # Homepage: hero, featured products, archive excerpt
├── loading.js                 # Root loading state
│
├── products/
│   ├── layout.js              # Products shell (era-aware header context)
│   ├── page.js                # Product index: all products, epoch filter
│   ├── loading.js
│   └── [slug]/
│       ├── page.js            # Individual product: hero, specs, lineage
│       └── loading.js
│
├── archive/
│   ├── layout.js              # Archive shell
│   ├── page.js                # Archive index
│   ├── loading.js
│   ├── documents/
│   │   ├── page.js
│   │   └── [id]/page.js
│   ├── transmissions/
│   │   └── page.js
│   └── divisions/
│       └── page.js
│
├── labs/
│   ├── page.js
│   └── loading.js
│
├── network/
│   ├── page.js
│   └── loading.js
│
└── philosophy/
    ├── page.js
    └── loading.js
```

**Route-level era awareness:** Each route's `layout.js` can export metadata that reflects era-aware titles via a helper:

```js
// lib/era-metadata.js
export function eraTitle(archive, future) {
  // Returns static archive title — era switching is client-side only
  return archive;
}
```

Server components always render archive-mode content. Era switching is a client-side enhancement only.

---

## 04. Folder Structure

```
northsterinc/
├── app/                       # Next.js App Router (above)
├── components/
│   ├── atmosphere/            # TemporalEngine, ThemeProvider, AudioManager,
│   │                          # GrainOverlay, TemporalTransition, ThemeToggle
│   ├── archival/              # Archive-specific display components
│   ├── layout/                # Navbar, NavMobile, Footer, Container, PageTransition
│   ├── sections/              # Hero, FeaturedProduct, CTASection, EditorialSection
│   ├── typography/            # EditorialHeading, SectionHeader
│   ├── ui/                    # Button, Divider, MetaLabel, Skeleton, TechnicalPanel
│   ├── webgl/                 # (new) Canvas, scenes, shaders, post-processing
│   │   ├── AtmosphereCanvas.js
│   │   ├── scenes/
│   │   │   ├── HomeScene.js
│   │   │   └── ProductScene.js
│   │   ├── shaders/
│   │   │   ├── atmosphere.glsl
│   │   │   ├── grain.glsl
│   │   │   └── temporal-distortion.glsl
│   │   ├── effects/
│   │   │   ├── TemporalBloom.js
│   │   │   └── VolumetricFog.js
│   │   └── hooks/
│   │       ├── useEraUniforms.js
│   │       └── useSceneQuality.js
│   └── motion/                # (new) GSAP wrappers, scroll orchestration
│       ├── ScrollReveal.js
│       ├── TemporalReveal.js
│       └── hooks/
│           ├── useGSAP.js
│           └── useTemporalMotion.js
├── lib/
│   ├── constants.js           # NAV, SITE, product slugs
│   ├── audio/
│   │   └── vocal-engine.js
│   ├── data/                  # (new) Product data, archive data
│   │   ├── products.js
│   │   ├── archive.js
│   │   └── epochs.js
│   └── utils/
│       ├── era.js
│       └── motion.js
├── public/
│   ├── fonts/                 # Self-hosted if needed
│   ├── textures/              # WebGL textures (noise, grain, environment maps)
│   │   ├── noise-256.webp
│   │   ├── grain-512.webp
│   │   └── env-studio.hdr
│   └── products/              # Product photography
├── docs/                      # Architecture documents (this file)
└── styles/                    # (Tailwind v4 uses app/globals.css)
```

---

## 05. Component Hierarchy

```
RootLayout
├── [inline script: era/theme from localStorage]
├── ThemeProvider
│   └── TemporalEngine
│       └── AudioManager
│           ├── TemporalTransition   (overlay, CSS-only)
│           ├── GrainOverlay         (overlay, CSS-only)
│           ├── AtmosphereCanvas     (dynamic, ssr:false)
│           ├── Navbar
│           │   ├── TemporalTrigger
│           │   └── ThemeToggle
│           ├── main
│           │   └── PageTransition
│           │       └── [page content — RSC]
│           └── Footer
```

**Rule:** Only atmosphere-layer components need era context. Content components (product cards, archive items, editorial sections) are Server Components — they don't subscribe to era at all. Era-aware variations are handled via CSS `[data-era="future"]` selectors, not JS branching in content components.

**Exception:** Interactive era-aware components (TemporalTrigger, ThemeToggle, Navbar status labels, GrainOverlay strings) remain Client Components because they react to user-triggered era changes.

---

## 06. Scene Architecture

The WebGL environment uses **scene-per-route** isolation. Each route mounts its own R3F scene graph. Scenes share common resources (lighting rig, fog system, post-processing pipeline) via a shared `SceneEnvironment` component.

```
AtmosphereCanvas (position:fixed, full viewport, pointer-events:none)
└── Canvas (R3F)
    ├── SceneEnvironment          # Shared: lighting, fog, env map
    │   ├── EraLighting           # Switches warm/cool based on era
    │   ├── VolumetricFog
    │   └── EffectComposer        # Post-processing pipeline
    │       ├── Bloom (restrained, era-tuned)
    │       ├── ChromaticAberration (future only, subtle)
    │       ├── Vignette
    │       └── Noise (archive only — replaces CSS grain)
    └── ActiveScene               # Driven by pathname
        ├── HomeScene
        ├── ProductScene
        └── ArchiveScene
```

Scene switching uses a `usePathname`-driven enum, not routing. Scenes fade between each other via a `SceneFader` component that crossfades opacity uniforms on the scene's root mesh group.

---

## 07. Shared Layout Systems

The `Container` component is the sole layout primitive. It accepts `size` prop: `"narrow"`, `"default"`, `"wide"`, `"full"`.

Internally it maps to CSS max-width tokens:

```css
/* In globals.css */
:root {
  --container-narrow: 48rem;   /* 768px — editorial reading width */
  --container-default: 72rem;  /* 1152px — standard content */
  --container-wide: 88rem;     /* 1408px — data-rich layouts */
  --container-full: 100%;      /* edge-to-edge with padding only */
}
```

**Grid system:** 12-column grid defined in CSS:

```css
.grid-doc {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--grid-gap, 1.5rem);
}
```

All editorial layouts use `col-span-N` utilities. This avoids magic number px values in components. Future mode shifts certain layouts (wider margins, more white space) purely via CSS `[data-era="future"] .grid-doc { gap: 2.5rem; }`.

---

## 08. Era-State Management Architecture

Single source of truth: `TemporalEngine` React context.

```js
// Shape of TemporalContext
{
  era: "archive" | "future",
  isTransitioning: boolean,
  transitionDirection: "to-future" | "to-archive" | null,
  toggleEra: () => void,
}
```

**Propagation path:**
1. `era` state changes in `TemporalEngine`
2. `useEffect([era])` writes `data-era` attribute to `document.documentElement`
3. All CSS `[data-era="future"]` rules activate — instant, no JS
4. Components subscribed via `useTemporal()` re-render for text/label changes
5. `AtmosphereCanvas` receives era via `useEraUniforms()` hook — updates shader uniforms

**localStorage strategy:**
- Reading: mount effect in `TemporalEngine`, after hydration
- Writing: inside `toggleEra`, at the moment of era switch (inside the 1500ms timeout)
- Inline script in `layout.js` sets `data-era` on `<html>` before React hydrates — prevents CSS flash

**No Redux, no Zustand required.** The era system is simple enough for React Context. The only reason to externalize would be if WebGL scenes need to subscribe without React — handled via an event emitter pattern instead (see §16).

---

## 09. Temporal Engine Architecture

```js
// TemporalEngine state machine
const STATES = {
  STABLE:       "stable",        // normal operation
  INITIATING:   "initiating",    // button clicked, 0-0.2s
  ACCELERATING: "accelerating",  // 0.2-1.2s — overlay animating
  APEX:         "apex",          // 1.2-1.7s — white flash, era switches
  RESOLVING:    "resolving",     // 1.7-3.2s — new era fading in
  STABILIZING:  "stabilizing",   // 3.2-3.7s — overlay exits
};
```

Rather than two `setTimeout` calls, evolve to a proper state machine with an `eraPhase` value. This enables fine-grained animation control in both CSS and R3F:

```js
const PHASE_DURATIONS = {
  initiating:   200,
  accelerating: 1000,
  apex:         500,   // era switches at start of apex
  resolving:    1500,
  stabilizing:  500,
};

// CSS class on body during transition:
// [data-temporal-phase="apex"] triggers flash keyframe
// [data-temporal-phase="resolving"] triggers atmosphere fade-in
```

Apply phase as `data-temporal-phase` on `<html>` alongside `data-era`. CSS keyframes key off both attributes — no JavaScript needed in transition animations.

---

## 10. Theme Engine Architecture

`ThemeProvider` owns `theme: "archive-night" | "archive-day"`. Combined with `era` from `TemporalEngine`, four visual modes exist:

| era | theme | Result |
|-----|-------|--------|
| archive | archive-night | Default — warm amber dark |
| archive | archive-day | Warm paper light |
| future | archive-night | Cool steel dark |
| future | archive-day | Clinical cool-white light |

CSS specificity handles mode stacking automatically:

```css
:root                                          { /* archive dark — specificity 0 */ }
[data-theme="archive-day"]                     { /* archive light — specificity 1 */ }
[data-era="future"]                            { /* future dark — specificity 1 */ }
[data-era="future"][data-theme="archive-day"]  { /* future light — specificity 2 */ }
```

No JavaScript theme logic needed in components. All visual differences are CSS-only. Components read `useTemporal()` and `useTheme()` only for label text, never for visual styling.

---

## 11. Design Token Architecture

Design tokens live exclusively in CSS custom properties. No JavaScript token objects. No Tailwind config overrides. Pure CSS variables in `globals.css`.

**Token categories:**

```css
:root {
  /* Color primitives (never use directly in components) */
  --amber-500: #c7a96b;
  --slate-900: #0d1119;

  /* Semantic tokens (use these everywhere) */
  --background: var(--slate-900);
  --text: #e8dcc8;
  --accent: var(--amber-500);
  --border: rgba(255,255,255,0.08);
  --panel: rgba(255,255,255,0.04);
  --elevated: rgba(255,255,255,0.06);

  /* Typography scale */
  --text-xs: 0.6875rem;   /* 11px */
  --text-sm: 0.75rem;     /* 12px */
  --text-base: 0.875rem;  /* 14px */
  --text-lg: 1rem;        /* 16px */
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-display: clamp(2.5rem, 5vw, 4.5rem);

  /* Spacing scale */
  --space-unit: 0.25rem;  /* 4px base unit */

  /* Motion tokens */
  --duration-fast: 150ms;
  --duration-base: 300ms;
  --duration-slow: 500ms;
  --duration-cinematic: 1200ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.87, 0, 0.13, 1);
}
```

**Token inheritance:** Future mode overrides only the semantic tokens, never primitives:

```css
[data-era="future"] {
  --background: #0d1119;
  --accent: #7aa3c8;      /* steel instead of amber */
  --border: rgba(255,255,255,0.06);
  /* typography, spacing, motion tokens unchanged */
}
```

This ensures future mode feels like the same system evolved, not replaced.

---

## 12. CSS Variable Architecture

Variables are organized in three layers:

**Layer 1 — Foundation** (`:root`): Color primitives, neutral scale, brand primitives. Never referenced directly in components.

**Layer 2 — Semantic** (`:root` after primitives): All component-facing variables. These are the only ones Tailwind classes and component styles should reference.

**Layer 3 — Era/Theme overrides** (`[data-era]`, `[data-theme]`): Overrides only semantic tokens. Never introduces new tokens — only overrides existing ones.

**Transition smoothing:** Add a global transition for CSS variable consumers when era is changing:

```css
[data-temporal-phase="resolving"] * {
  transition:
    background-color var(--duration-cinematic) var(--ease-out),
    border-color var(--duration-cinematic) var(--ease-out),
    color calc(var(--duration-cinematic) * 0.6) var(--ease-out);
}
```

This is scoped to the `resolving` phase only — not always active — so normal navigation doesn't have weird color transitions.

---

## 13. Typography System Implementation

Two font families, loaded via `next/font/google`:

- **Cormorant Garamond** — display/editorial, weights 300/400/500/600
- **IBM Plex Mono** — all metadata, labels, references, UI chrome

Typography classes (defined in globals.css, not Tailwind utilities):

```css
/* Display — rare, section titles only */
.font-display {
  font-family: var(--font-cormorant);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.1;
  font-size: var(--text-display);
}

/* Meta — all UI chrome */
.meta {
  font-family: var(--font-plex-mono);
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: var(--text-sm);
}

/* Document reference — archival labels, metadata */
.doc-ref {
  font-family: var(--font-plex-mono);
  font-weight: 300;
  letter-spacing: 0.15em;
  font-size: var(--text-xs);
  opacity: 0.6;
}

/* Body editorial */
.editorial {
  font-family: var(--font-cormorant);
  font-weight: 400;
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  line-height: 1.75;
}
```

**Future mode typography evolution:** Increase tracking on `.meta`, reduce opacity on `.doc-ref`, shift `.font-display` weight lighter:

```css
[data-era="future"] .meta {
  letter-spacing: 0.14em;
  font-weight: 300;
}
[data-era="future"] .doc-ref {
  opacity: 0.4;
  letter-spacing: 0.2em;
}
```

Typography evolves subtly — same typefaces, same scale, refined proportions.

---

## 14. Responsive Layout Architecture

**Breakpoints** (Tailwind v4 defaults, aligned with container system):

```
sm:  640px   — mobile landscape, small tablet
md:  768px   — tablet portrait
lg:  1024px  — tablet landscape, small laptop
xl:  1280px  — standard desktop
2xl: 1536px  — large display
```

**Mobile-first principle:** Base CSS targets 320–639px. All breakpoints enhance upward.

**Layout strategy per route:**

- **Homepage:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-12` — editorial hero at full width, products in 12-col grid
- **Product page:** `grid-cols-1 lg:grid-cols-3` — content 2/3, metadata 1/3
- **Archive:** Single-column, max-width `var(--container-narrow)`, centered — document reading layout
- **Products index:** CSS Grid auto-fill with `minmax(280px, 1fr)` — responsive without breakpoints

**No horizontal overflow:** All components tested at 320px minimum width. Temporal trigger and ThemeToggle collapse gracefully. NavMobile portal covers full viewport.

---

## 15. State Synchronization Systems

Three state domains — deliberately isolated:

| Domain | Owner | Storage | Scope |
|--------|-------|---------|-------|
| Era | TemporalEngine context | localStorage | Global, persisted |
| Theme | ThemeProvider context | localStorage | Global, persisted |
| Audio | AudioManager context | localStorage | Global, persisted |

**WebGL sync:** R3F scenes do not subscribe to React context directly (React context in R3F causes entire scene re-renders). Instead, use a lightweight event emitter:

```js
// lib/era-bus.js
const listeners = new Set();
export const eraBus = {
  emit: (era) => listeners.forEach(fn => fn(era)),
  subscribe: (fn) => { listeners.add(fn); return () => listeners.delete(fn); },
};

// In TemporalEngine, after era changes:
useEffect(() => { eraBus.emit(era); }, [era]);

// In R3F shader components:
useEffect(() => {
  return eraBus.subscribe((era) => {
    uniforms.uEraBlend.value = era === "future" ? 1 : 0;
  });
}, []);
```

This means era changes in R3F are zero-cost from React's perspective — no re-renders, no fiber reconciliation. Shader uniforms update directly.

---

# PART II — WEBGL + RENDERING

---

## 16. Three.js Integration Strategy

**Package:** `three` (latest stable) + `@react-three/fiber` + `@react-three/drei` + `@react-three/postprocessing`

**Mount strategy:** Single R3F `<Canvas>` mounted in `AtmosphereCanvas.js`, loaded via `next/dynamic` with `ssr: false`. Canvas is `position: fixed`, full viewport, `z-index: -1`, `pointer-events: none`.

```js
// components/webgl/AtmosphereCanvas.js
"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import SceneEnvironment from "./SceneEnvironment";
import ActiveScene from "./scenes/ActiveScene";

export default function AtmosphereCanvas() {
  return (
    <Canvas
      style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}     // cap at 1.5x — no need for 2x on atmosphere
      frameloop="demand" // only re-render when something changes
      flat               // disable tone mapping — we handle it in post
    >
      <Suspense fallback={null}>
        <SceneEnvironment />
        <ActiveScene />
      </Suspense>
    </Canvas>
  );
}
```

**`frameloop="demand"`** is critical for performance. Atmosphere scenes are mostly static — they shouldn't render 60fps continuously. Call `invalidate()` from `useThree()` when uniforms update.

---

## 17. React Three Fiber Architecture

**Hook conventions:**
- `useFrame(callback, priority)` — animations, uniform updates
- `useThree()` — access renderer, camera, size
- `useTexture()` — texture loading with Suspense
- Custom hooks for era-uniform synchronization

**Component rules:**
- Each mesh/effect is its own component — no monolithic scene files
- Props over context for scene-local state
- `ref` forwarding for imperative animation access

**R3F performance contract:**
- No inline object/array literals in JSX (creates new refs every render)
- `useMemo` for all geometry, material, and texture objects
- `dispose` all Three.js objects on unmount:

```js
useEffect(() => {
  return () => {
    geometry.dispose();
    material.dispose();
  };
}, [geometry, material]);
```

---

## 18. Scene Graph Structure

```
<Canvas>
  <SceneEnvironment>
    <EraLighting era={era} />          // Directional + ambient, era-tuned
    <VolumetricFog />                  // Fog mesh, custom shader
    <EffectComposer>                   // Post-processing (see §23)
      <Vignette />
      <EraBloom era={era} />
      <EraChromatic era={era} />       // Future only
      <EraGrain era={era} />           // Archive only (supplement CSS grain)
    </EffectComposer>
  </SceneEnvironment>

  <ActiveScene pathname={pathname}>
    {/* Conditionally renders based on route */}
    <HomeScene />        // pathname === "/"
    <ProductScene />     // pathname.startsWith("/products")
    <ArchiveScene />     // pathname.startsWith("/archive")
  </ActiveScene>
</Canvas>
```

Scene switching uses **opacity-based crossfade**, not mount/unmount. Scenes remain mounted for 600ms during transition to allow outgoing scene to fade. This prevents Three.js disposal/reconstruction overhead on every route change.

---

## 19. WebGL Layering Strategy

Three z-layers in the WebGL scene:

**Layer 0 — Atmosphere** (z: -50 to -20): Fog planes, depth haze, environmental gradient. Always present. Never interactive.

**Layer 1 — Product/Content** (z: -20 to -5): Product models, architectural forms. Present on product routes only.

**Layer 2 — Distortion** (z: -5 to 0): Temporal transition effects, slit-scan planes. Activated during transition phase only, then returned to identity.

CSS z-stacking:
```css
.atmosphere-canvas { z-index: -1; }       /* behind all DOM */
.grain-overlay     { z-index: 10; }       /* above atmosphere canvas */
.temporal-overlay  { z-index: 100; }      /* above all content */
.navbar            { z-index: 50; }       /* above grain, below temporal */
```

---

## 20. DOM/WebGL Composition Architecture

The canvas is purely additive. WebGL renders to a transparent `alpha: true` canvas — only the WebGL-rendered pixels contribute. DOM content shows through.

**Blend strategies:**

For archive mode: slight warm ambient from WebGL (mimics phosphor glow) blended with `mix-blend-mode: screen` on the canvas element. Very subtle — adds depth, not color.

For future mode: canvas rendered without blend mode. WebGL contributes a clean cool-dark atmosphere layer that sits underneath document content.

**Critical:** Only apply blend modes to the canvas wrapper `<div>`, never to the canvas itself. Canvas element blend mode is GPU-expensive and inconsistent across browsers.

```jsx
<div
  style={{
    position: "fixed",
    inset: 0,
    zIndex: -1,
    mixBlendMode: era === "archive" ? "screen" : "normal",
    opacity: era === "archive" ? 0.12 : 0.18,
    pointerEvents: "none",
  }}
>
  <Canvas ... />
</div>
```

---

## 21. Shader Architecture

Custom shaders live in `components/webgl/shaders/`. Convention: one `.glsl` file per effect.

**Shader organization:**

```
shaders/
├── chunks/          # Reusable GLSL functions (imported via string concat)
│   ├── noise.glsl   # Classic 3D noise
│   ├── sdf.glsl     # Signed distance field helpers
│   └── color.glsl   # Color space conversions
├── atmosphere.glsl  # Volumetric fog plane
├── grain.glsl       # Animated film grain
├── temporal.glsl    # Slit-scan distortion
└── vignette.glsl    # Radial darkness
```

**Import pattern:** Raw GLSL as string via `?raw` import (Vite/Turbopack support):

```js
import atmosphereFrag from "./shaders/atmosphere.glsl?raw";
import { chunks } from "./shaders/chunks";

const material = new THREE.ShaderMaterial({
  fragmentShader: chunks.noise + atmosphereFrag,
  uniforms: { uTime: { value: 0 }, uEraBlend: { value: 0 } },
});
```

---

## 22. GLSL Organization Strategy

**Naming conventions:**
- Uniforms: `u` prefix — `uTime`, `uEraBlend`, `uAccent`
- Varyings: `v` prefix — `vUv`, `vWorldPos`
- Functions: camelCase — `fbmNoise()`, `eraLerp()`

**Era interpolation in shaders:** Every visual parameter that differs between eras uses `uEraBlend` (0.0 = archive, 1.0 = future). During transition, `uEraBlend` animates from 0→1 or 1→0 over 1.5s:

```glsl
// In any era-aware shader
uniform float uEraBlend;

vec3 archiveColor = vec3(0.78, 0.66, 0.42);   // amber
vec3 futureColor  = vec3(0.48, 0.64, 0.78);   // steel

vec3 accentColor = mix(archiveColor, futureColor, uEraBlend);
```

This creates smooth material color transitions during temporal shift — even on product models.

---

## 23. Post-Processing Pipeline

Using `@react-three/postprocessing` (wraps pmndrs/postprocessing):

```jsx
<EffectComposer multisampling={0} depthBuffer={false}>
  {/* Always active */}
  <Vignette offset={0.3} darkness={0.6} eskil={false} />

  {/* Archive only — film grain supplement */}
  {era === "archive" && (
    <Noise opacity={0.04} premultiply blendFunction={BlendFunction.ADD} />
  )}

  {/* Bloom — subtle in archive, near-zero in future */}
  <Bloom
    intensity={era === "future" ? 0.1 : 0.25}
    luminanceThreshold={0.8}
    luminanceSmoothing={0.9}
    radius={0.6}
  />

  {/* Future only — chromatic aberration, extremely subtle */}
  {era === "future" && (
    <ChromaticAberration
      offset={new Vector2(0.0008, 0.0008)}
      radialModulation
      modulationOffset={0.4}
    />
  )}
</EffectComposer>
```

**Performance note:** `multisampling={0}` is critical — MSAA at the composer level is extremely expensive. Instead rely on TAA (temporal anti-aliasing) or simply accept the slight aliasing in a full-viewport atmosphere render.

---

## 24. Volumetric Atmosphere Implementation

Not true volumetric (ray marching) — that's too expensive for a background layer. Instead: **layered fog planes** — 3–5 semi-transparent planes at different z-depths, each with a custom noise-scrolling shader.

```glsl
// atmosphere.frag
uniform float uTime;
uniform float uEraBlend;
uniform sampler2D uNoiseTex;

void main() {
  vec2 uv = vUv;

  // Slowly scrolling noise
  float noise = texture2D(uNoiseTex, uv * 0.4 + uTime * 0.008).r;
  noise = smoothstep(0.3, 0.7, noise);

  // Era-blended color
  vec3 archiveAtmos = vec3(0.06, 0.05, 0.03) * noise;
  vec3 futureAtmos  = vec3(0.03, 0.05, 0.08) * noise;
  vec3 color = mix(archiveAtmos, futureAtmos, uEraBlend);

  gl_FragColor = vec4(color, noise * 0.15);
}
```

Five planes stacked:
- z = -50: Large, low frequency, very transparent (0.05 opacity)
- z = -35: Medium, mid frequency, slightly more opaque (0.08)
- z = -20: Smaller, high frequency detail (0.06)
- z = -10: Near-camera wisps — optional, routes that need depth
- z = -5: Edge vignette plane — pure radial gradient

---

## 25. Environmental Depth Systems

Depth is communicated through:

1. **Fog density** — Three.js `FogExp2` with era-tuned density. Archive: `density: 0.008`, Future: `density: 0.003` (cleaner, less haze)

2. **Scale falloff** — Planes further away are larger, lower opacity. Creates parallax depth illusion when camera drifts.

3. **Subtle camera drift** — Camera orbits a null point by ±0.4 degrees over 8-second cycle. Too slow to see, enough to feel. Only on desktop.

4. **Depth-of-field (post)** — Not full DoF (too expensive). Instead: a custom `DepthPass` on the fog planes only, subtly blurring only the deepest layer. Adds depth without impacting foreground clarity.

---

## 26. Fog Systems

```js
// In SceneEnvironment.js
const fogColor = era === "future" ? "#050810" : "#100d08";
const fogDensity = era === "future" ? 0.003 : 0.008;

useEffect(() => {
  scene.fog = new THREE.FogExp2(fogColor, fogDensity);
  scene.background = new THREE.Color(fogColor);
}, [era]);
```

For smooth era transitions, animate fog parameters via `useFrame`:

```js
useFrame(() => {
  if (!scene.fog) return;
  const target = era === "future" ? 0.003 : 0.008;
  scene.fog.density = THREE.MathUtils.lerp(scene.fog.density, target, 0.02);
});
```

This lerp over ~50 frames creates a 0.8s smooth fog density transition.

---

## 27. Motion Blur Systems

**Strategy:** No full-scene motion blur (prohibitively expensive in a background layer). Instead: **selective motion blur on the temporal transition plane only**.

During the `accelerating` phase, the slit-scan overlay planes accumulate velocity-based UV offset:

```glsl
// temporal-distortion.frag
uniform float uVelocity;   // 0 → 1 during acceleration
uniform float uTime;

void main() {
  vec2 uv = vUv;

  // Velocity-based horizontal smear
  float smear = uVelocity * 0.08;
  vec4 current = texture2D(uSceneTex, uv);
  vec4 past1   = texture2D(uSceneTex, uv - vec2(smear * 0.33, 0.0));
  vec4 past2   = texture2D(uSceneTex, uv - vec2(smear * 0.66, 0.0));
  vec4 past3   = texture2D(uSceneTex, uv - vec2(smear, 0.0));

  gl_FragColor = mix(current, (current + past1 + past2 + past3) * 0.25, uVelocity);
}
```

This creates the visual sensation of horizontal velocity without affecting scene performance during normal browsing.

---

## 28. Temporal Distortion Shaders

The temporal transition uses three shader passes:

**Pass 1 — Desaturation + blur** (initiating phase):
```glsl
// Desaturate toward steel gray, slight gaussian blur
float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));
color.rgb = mix(color.rgb, vec3(luma), uDesaturation);
```

**Pass 2 — Slit-scan distortion** (accelerating phase):
```glsl
// Horizontal slit-scan: each row displaced by different time offset
float rowOffset = sin(vUv.y * 40.0 + uTime * 12.0) * uDistortion * 0.04;
vec4 slitColor = texture2D(uSceneTex, vec2(vUv.x + rowOffset, vUv.y));
```

**Pass 3 — Convergence** (apex approach):
```glsl
// Radial UV convergence toward center point
vec2 center = vec2(0.5, 0.5);
vec2 toCenter = center - vUv;
vec2 distortedUv = vUv + toCenter * uConvergence * 0.3;
vec4 convergColor = texture2D(uSceneTex, distortedUv);
```

All three pass intensities are driven by `uEraPhase` uniform, which maps the temporal phase enum to a 0–1 float.

---

## 29. Slit-Scan Implementation Strategy

The CSS slit-scan overlay (current implementation) handles the full-screen transition visually. WebGL slit-scan is an enhancement for browsers where R3F is active — it applies the distortion effect to the 3D scene underneath the document layer.

**CSS layer** (always, all browsers): The existing `TemporalTransition.js` overlay with `temporal-lines` keyframe. Reliable, fast, zero GPU overhead.

**WebGL layer** (progressive enhancement): When R3F is mounted, the `temporal-distortion.glsl` pass runs on the scene render target. The CSS overlay becomes partially transparent, revealing the distorted 3D atmosphere underneath.

```js
// During transition, reduce CSS overlay opacity and let WebGL carry it:
// [data-temporal-phase="accelerating"] .temporal-lines { opacity: 0.4; }
// WebGL distortion carries remaining visual weight
```

This creates a more physically convincing transition without breaking graceful degradation.

---

## 30. Camera Choreography Systems

Camera has two modes:

**Ambient drift** (always active): Sub-perceptual gentle rotation. Uses `useFrame` with sine wave:

```js
useFrame(({ clock, camera }) => {
  const t = clock.getElapsedTime();
  camera.position.x = Math.sin(t * 0.05) * 0.3;
  camera.position.y = Math.sin(t * 0.03) * 0.15;
  camera.lookAt(0, 0, 0);
});
```

**Transition choreography**: During temporal shift, camera performs a timed dolly-in:

```js
// Accelerating: camera moves from z=8 to z=2 over 1.0s
// Apex: z=0.5 (extreme close — like entering a slit)
// Resolving: z eases back to 8 from the opposite direction
```

This creates the physical sensation of passing through a temporal aperture. Never snaps — always eased via `THREE.MathUtils.damp()`.

---

## 31. Lighting Architecture

Archive era lighting:
- `DirectionalLight` color `#e8c87a`, intensity 0.4, from upper-left (45°, 60°)
- `AmbientLight` color `#2a1f0e`, intensity 0.6
- Optional: `PointLight` color `#c7a96b`, intensity 0.2 behind camera — warm fill

Future era lighting:
- `DirectionalLight` color `#a8c4d8`, intensity 0.3, directly overhead (flatter)
- `AmbientLight` color `#0a0f1a`, intensity 0.8 (brighter ambient, less shadow)
- No fill light — future feels more evenly, coldly lit

Transitions: lerp light color and intensity over 1500ms via `useFrame` during era switch.

---

## 32. Environmental Rendering Systems

Product scenes use **studio HDRI environment** for reflections — loaded via `useEnvironment` from drei:

```js
const env = useEnvironment({ files: "/textures/env-studio.hdr" });
// Archive: warm HDRI, applied at intensity 0.3
// Future: same HDRI desaturated, applied at intensity 0.15 (cooler, flatter)
```

The HDRI is the same file for both eras — a custom studio environment with warm-neutral light. Era difference is created by:
- `envMapIntensity` on materials (lower in future)
- `toneMapping` shader parameter (`ACESFilmic` in archive, `Linear` in future)
- Post-processing bloom threshold (higher in future)

---

# PART III — PERFORMANCE

---

## 33. GPU Optimization Strategy

**Core principle:** WebGL is a background layer. It should consume at most 15% of frame time on a midrange device.

Key rules:
1. `frameloop="demand"` on Canvas — no idle rendering
2. `dpr={[1, 1.5]}` — cap pixel ratio
3. `antialias: false` — no hardware MSAA
4. `powerPreference: "high-performance"` — request discrete GPU on macOS
5. Maximum 5 draw calls in atmosphere scene (one per fog plane)
6. No more than 2 real-time shadow casters ever
7. All geometry instanced where repeated

**Frame budget target:** 3ms GPU time for atmosphere scene on M1 MacBook Pro.

---

## 34. Apple Silicon Optimization

Apple Silicon has a unified memory architecture — texture reads from CPU-written memory are zero-copy. Exploit this:

- Use `Float32Array` typed arrays for all geometry data — stays in shared memory pool
- Prefer `half_float` textures (16-bit) over `float` (32-bit) where precision allows
- Avoid round-trips: don't read back from GPU (no `readPixels` in render loop)
- `powerPreference: "high-performance"` works on M-series to request the GPU explicitly

**Metal backend:** Three.js WebGPU renderer (currently experimental) will run natively on Metal via browser WebGPU. Plan the shader architecture to be portable: avoid WebGL-only extensions. Future migration path to WebGPU becomes easier.

---

## 35. Mobile Optimization

**Detection:** Use `navigator.hardwareConcurrency` and `navigator.deviceMemory` (where available) to classify device tier:

```js
// lib/utils/device-tier.js
export function getDeviceTier() {
  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 4;
  if (cores <= 4 || memory <= 2) return "low";
  if (cores <= 6 || memory <= 4) return "mid";
  return "high";
}
```

**Low tier:** No WebGL canvas at all. CSS-only atmosphere. Grain overlays reduced. Transition CSS-only (already implemented).

**Mid tier:** WebGL mounted but: `dpr=1`, no bloom, no chromatic aberration, single fog plane, `frameloop="demand"`.

**High tier:** Full feature set.

Apply via `useSceneQuality` hook that reads device tier and exports quality flags consumed by all R3F components.

---

## 36. Dynamic Quality Scaling

Monitor frame time in `useFrame`. If consistently above 20ms (< 50fps), downgrade quality:

```js
const frameHistory = useRef([]);

useFrame(({ clock }) => {
  const now = performance.now();
  const delta = now - (frameHistory.current.last || now);
  frameHistory.current.last = now;
  frameHistory.current.push(delta);

  if (frameHistory.current.length > 60) {
    const avg = frameHistory.current.reduce((a,b) => a+b) / 60;
    if (avg > 20) {
      // Reduce fog plane count, lower bloom intensity
      setQualityTier(t => Math.max(0, t - 1));
    }
    frameHistory.current = [];
  }
});
```

Quality downgrade never changes the visual feel — just reduces polygon density and effect intensity. Users never see a pop.

---

## 37. Shader Optimization

- Avoid branching in shaders (no `if` inside `main()` in hot paths). Use `mix()` and `step()` instead.
- Prefer `mediump` precision in fragment shaders — sufficient for atmosphere, saves bandwidth
- Pre-compute expensive values in vertex shader, pass as varyings to fragment shader
- Texture lookups: limit to 2 per fragment shader. More than 2 = profiling required.
- `uTime` uniform: pass modulo 1000 to avoid float precision degradation over time:

```js
useFrame(({ clock }) => {
  material.uniforms.uTime.value = clock.getElapsedTime() % 1000;
});
```

---

## 38. Lazy Loading Architecture

```
Initial page load:
├── Critical CSS (globals.css, fonts)
├── React hydration bundle
├── ThemeProvider, TemporalEngine, AudioManager (lightweight)
├── Navbar, Footer (server-rendered shell)
└── [deferred]
    ├── AtmosphereCanvas — lazy, after 1s idle or first scroll
    ├── Three.js bundle — ~580KB, only when canvas mounts
    └── GSAP — lazy, after hydration + 500ms

Product page:
├── Shell renders immediately (SSR)
├── Product data streams via Suspense
├── Product WebGL scene — lazy, mounts after product data resolves
└── R3F product model — lazy, streams via useLoader
```

**Idle loading:** Use `requestIdleCallback` to initiate AtmosphereCanvas mount:

```js
useEffect(() => {
  const id = requestIdleCallback(() => setShowCanvas(true), { timeout: 2000 });
  return () => cancelIdleCallback(id);
}, []);
```

---

## 39. Asset Streaming Systems

Textures loaded via React Suspense through `useTexture` (drei). Wrap scenes in `<Suspense fallback={null}>` — canvas renders without texture until loaded, then updates.

**Texture loading priority:**
1. Noise texture (8KB, critical for atmosphere) — preload via `<link rel="preload">`
2. Grain texture (12KB) — load on first frame
3. Environment HDRI (~200KB) — load after scene mounts, `requestIdleCallback`
4. Product models — load per-route, cancel on route change

**Model format:** Use DRACO-compressed glTF (.glb). Target < 200KB per product model. Load via `useGLTF` with preloading on product index page hover:

```js
// Preload on hover — by the time user clicks, model is cached
<div onMouseEnter={() => useGLTF.preload(`/models/${slug}.glb`)}>
```

---

## 40. Texture Compression

All textures processed at build time via `sharp` and `squoosh` CLI:

| Texture type | Format | Size target |
|-------------|--------|-------------|
| Noise (tileable) | WebP lossless | < 20KB |
| Grain (tileable) | WebP lossy 85% | < 15KB |
| Product hero photos | AVIF/WebP | < 80KB |
| Environment HDRI | RGBE/HDR | < 300KB |
| Product models | DRACO glTF | < 200KB |

Generate multiple sizes for product photos (`next/image` handles format selection). Never use PNG for atmospheric textures.

---

## 41. Render Throttling

Three throttle strategies:

1. **`frameloop="demand"`**: R3F only renders when `invalidate()` is called. Use `useFrame` with `invalidate` dependency for self-invalidating animations.

2. **Visibility API**: Pause rendering when tab is not visible:
```js
useEffect(() => {
  const handleVisibility = () => {
    if (document.hidden) gl.setAnimationLoop(null);
    else gl.setAnimationLoop(render);
  };
  document.addEventListener("visibilitychange", handleVisibility);
  return () => document.removeEventListener("visibilitychange", handleVisibility);
}, []);
```

3. **Intersection Observer on canvas**: If canvas is scrolled out of view (impossible for fixed canvas — but for inline product scenes), pause rendering.

---

## 42. Memory Management

**Critical:** Three.js objects are NOT garbage collected automatically. Every geometry, material, and texture must be explicitly disposed.

Pattern using `useEffect` cleanup:

```js
const geo = useMemo(() => new THREE.PlaneGeometry(2, 2), []);
const mat = useMemo(() => new THREE.ShaderMaterial({ ... }), []);

useEffect(() => {
  return () => {
    geo.dispose();
    mat.dispose();
  };
}, [geo, mat]);
```

**Texture reuse:** Cache textures at the module level in a `TextureLoader` with `.load()` memoized by URL. `useTexture` from drei handles this automatically.

**Scene cleanup on route change:** When `ActiveScene` switches scenes, delay disposal of outgoing scene's resources by 800ms (allows crossfade to complete).

---

## 43. WebGL Fallback Systems

**Detection:**

```js
// lib/utils/webgl-support.js
export function isWebGLSupported() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}
```

**Fallback tree:**
- WebGL2 available: Full feature set
- WebGL1 only: Disable post-processing (requires WebGL2 render targets), use basic fog
- No WebGL: CSS-only atmosphere — the site looks identical, just without the 3D depth layer

The CSS grain, vignette, scanlines, and atmospheric overlays are entirely CSS-based and work without WebGL. The WebGL layer is purely additive.

---

## 44. Accessibility Fallback Systems

**`prefers-reduced-motion`:**

```css
@media (prefers-reduced-motion: reduce) {
  .temporal-overlay,
  .temporal-lines,
  .temporal-convergence,
  .temporal-flash { animation: none !important; transition: none !important; }

  .grain, .grain-slow, .scanlines,
  .phosphor-drift, .operational-breathing { display: none !important; }
}
```

In R3F: `const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches` — if true, disable all `useFrame` animations, keep fog and environment static.

**Temporal transition with reduced motion:** Still switches era (functional), but without animation. `isTransitioning` completes in 0ms — instant cut.

---

## 45. Reduced Motion Systems

```js
// hooks/useReducedMotion.js
import { useEffect, useState } from "react";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    mq.addEventListener("change", e => setReduced(e.matches));
    return () => mq.removeEventListener("change", e => setReduced(e.matches));
  }, []);
  return reduced;
}
```

All animation-triggering components (`PageTransition`, `TemporalEngine`, motion hooks) consume this hook. When `reduced === true`:
- Page transitions: instant replace, no crossfade
- Temporal transition: instant era switch, no overlay
- Ambient drift: disabled
- Typography reveals: instant visibility

---

# PART IV — MOTION SYSTEMS

---

## 46. GSAP Architecture

**Package:** `gsap` + `@gsap/react` (official React integration, released 2024).

**Install:**
```bash
npm install gsap @gsap/react
```

**Never import GSAP at module level in files that might be SSR'd.** Always import inside `useEffect` or via dynamic import. With `@gsap/react`, use the `useGSAP` hook which handles cleanup automatically:

```js
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function AnimatedHeading({ children }) {
  const ref = useRef();

  useGSAP(() => {
    gsap.from(ref.current, {
      opacity: 0,
      y: 12,
      duration: 0.8,
      ease: "power2.out",
    });
  }, { scope: ref });

  return <h1 ref={ref}>{children}</h1>;
}
```

**Plugins to register:** `ScrollTrigger` for scroll orchestration. Register once at application root:

```js
// app/layout.js (inside a client component wrapper)
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
```

---

## 47. Theatre.js Integration

**For:** Cinematic, keyframe-based animations on specific showcase pages (hero product presentation, temporal transition choreography for a future dedicated "timejump" page).

**Not for:** General page animations — that's GSAP.

Theatre.js enables timeline editing of complex multi-object animations with a visual editor. Use it for:
- Product showcase hero: object rotates, lights shift, text reveals in precise sequence
- "Temporal corridor" full-screen experience (future feature)
- Custom loading animations if implemented

```js
import { getProject } from "@theatre/core";
import studio from "@theatre/studio";

const project = getProject("NORTHSTER_PRODUCT_SHOWCASE");
const sheet = project.sheet("Product Hero");
// Export state JSON at design time, ship to production
```

Production: ship the exported JSON state, use `@theatre/core` without studio. Studio is dev-only.

---

## 48. Motion Timeline Orchestration

For temporal transition, the motion timeline is:

```
T+0ms    User clicks TemporalTrigger
T+0ms    CSS: data-temporal-phase="initiating" on <html>
T+0ms    GSAP: begin desaturating page content (0.2s)
T+200ms  CSS: phase="accelerating"
T+200ms  R3F: uVelocity starts ramping to 1.0 (over 1.0s)
T+200ms  GSAP: camera dolly begins
T+1200ms CSS: phase="apex"
T+1200ms R3F: uConvergence ramps to 1.0 (0.5s)
T+1500ms ERA SWITCHES — localStorage, React state, data-era attribute
T+1700ms CSS: phase="resolving"
T+1700ms R3F: uEraBlend animates to new target (1.0s)
T+1700ms GSAP: camera dolly reverses, page content fades in
T+3200ms CSS: phase="stabilizing"
T+3700ms CSS: phase removed, isTransitioning=false
```

This timeline is centrally owned in `TemporalEngine.js` — a single orchestration function, not scattered across components.

---

## 49. Transition Sequencing Systems

**Page transitions** (route changes) use a GSAP `ScrollTrigger`-independent timeline:

```js
// components/layout/PageTransition.js
"use client";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function PageTransition({ children }) {
  const ref = useRef();
  const pathname = usePathname();

  useGSAP(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", clearProps: "all" }
    );
  }, { dependencies: [pathname], scope: ref });

  return <div ref={ref}>{children}</div>;
}
```

**Era-aware page transition duration:** In future mode, transitions are 20% slower (more deliberate):

```js
const duration = era === "future" ? 0.6 : 0.5;
```

---

## 50. Scroll Orchestration

**Tool:** GSAP `ScrollTrigger` + Lenis (smooth scroll).

Editorial sections reveal on scroll using a reusable `ScrollReveal` component:

```jsx
// components/motion/ScrollReveal.js
"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollReveal({ children, delay = 0, className }) {
  const ref = useRef();

  useGSAP(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 16 },
      {
        opacity: 1, y: 0,
        duration: 0.7,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          once: true,
        },
      }
    );
  }, { scope: ref });

  return <div ref={ref} className={className}>{children}</div>;
}
```

**Archive pages:** No scroll animations. Archive documents are read linearly — animation is a distraction. `ScrollReveal` is never used in archive route.

---

## 51. Lenis Integration

Lenis provides smooth, physics-based scroll inertia that makes the archival site feel more like a printed document being scrolled through than a webpage.

```js
// components/motion/SmoothScroll.js
"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
```

Lenis is applied at root layout level, wrapping all page content. GSAP ScrollTrigger integrates via `lenis.on("scroll", ScrollTrigger.update)` — they stay in sync.

**Reduced motion:** If `prefers-reduced-motion`, do not mount Lenis. Native scroll only.

---

## 52. Microinteraction Systems

Four categories of microinteraction in this system:

**1. Hover states:** CSS-only, never GSAP. Instant feedback is non-negotiable. `transition-colors duration-300` on nav links, `transition-opacity duration-200` on metadata labels.

**2. Active/press states:** CSS `active:` pseudo. Scale 0.98 on buttons, no JS needed.

**3. Focus states:** Custom focus rings styled to the era's accent color. Never removed — accessibility requirement.

**4. Loading states:** Skeleton components with subtle shimmer animation. Archive-era: warm amber shimmer. Future: cool steel shimmer.

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--panel) 25%,
    var(--elevated) 50%,
    var(--panel) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.4s ease-in-out infinite;
}
```

---

## 53. Typography Animation Systems

Typography animates in two situations only:

**1. Page entry** (via ScrollReveal or PageTransition): `opacity: 0 → 1`, `y: 16px → 0`. Duration 700ms, ease `power2.out`. Never scale, never rotate.

**2. Era transition** (via TemporalEngine resolving phase): Typography re-reveals with a subtle `letter-spacing` shift — archive tracking compresses slightly (future = more open). This is CSS-only, driven by `[data-era="future"]` selectors.

```css
[data-temporal-phase="resolving"] .font-display {
  animation: temporal-type-resolve 0.8s var(--ease-out) forwards;
}
@keyframes temporal-type-resolve {
  from { opacity: 0.2; letter-spacing: -0.04em; }
  to   { opacity: 1;   letter-spacing: -0.02em; }
}
```

**Never animate:** font-size, font-weight, font-family. These cause layout reflow and look uncanny.

---

## 54. Temporal Instability Systems

Archive mode includes a subtle "signal instability" layer — brief, rare glitches in metadata labels. This communicates the archival, slightly degraded nature of the system.

Implementation: CSS animation + low `animation-iteration-count` + long `animation-delay`:

```css
.doc-ref {
  animation: signal-flicker 0.1s step-end 3 45s;
}
@keyframes signal-flicker {
  0%, 100% { opacity: 0.6; }
  33%       { opacity: 0.1; }
  66%       { opacity: 0.8; }
}
```

In future mode, this animation is disabled:
```css
[data-era="future"] .doc-ref { animation: none; }
```

Future = stable, perfect signal. Archive = slightly degraded.

---

## 55. Spatial Transition Choreography

During temporal transition, the spatial composition of elements changes:

**Archive to future:**
- Document content: fade out, compress slightly (scaleY 0.98)
- Camera: dolly forward
- Fog: thins and cools
- Grain/scanlines: CSS opacity → 0
- New era content: expands from center, letter-spacing increases

**Future to archive:**
- Same sequence reversed
- Grain/scanlines: fade in during resolving phase
- Camera: pulls back slightly
- Warm light bleeds in from upper left

All choreographed via `data-temporal-phase` CSS attribute + GSAP timeline registered in `TemporalEngine.js`.

---

## 56. Ambient Motion Systems

Background motion operates at three frequencies:

**Infraslow (10–60s cycle):** Camera drift, fog plane scrolling. Below conscious perception.

**Slow (4–12s cycle):** Operational breathing pulse on system status indicators. The `signal-pulse` animation on the `●` status dot. `.metadata-cycling` string rotation every 12s.

**Micromotion (0–1s, triggered):** Hover states, focus states, active press states.

**Rule:** No persistent sub-second animations on non-interactive elements. The `grain` and `grain-slow` overlays are exceptions — they are textures, not animations to read. All other ambient motion is > 4s cycle.

---

## 57. Environmental Motion Systems

In R3F, two continuous environmental motions:

**Fog plane drift:** Each fog plane has a UV offset that scrolls slowly in a unique direction. Archive: meanders. Future: nearly static (clean, no drift).

```js
useFrame(({ clock }) => {
  const t = clock.getElapsedTime();
  fogMat.uniforms.uOffset.value.set(
    Math.sin(t * 0.01 + phaseOffset) * 0.1,
    t * 0.003
  );
  invalidate();
});
```

**Light flicker (archive only):** Directional light intensity oscillates ±0.02 over 3–8s random interval. Below perceptual threshold for most users but feels right in archive mode — old systems have unstable power.

---

# PART V — PRODUCT SYSTEMS

---

## 58. Product Data Architecture

Products as structured JSON data. Co-located in `lib/data/products.js`:

```js
// lib/data/products.js
export const PRODUCTS = [
  {
    slug: "ax-01",
    name: "AX-01",
    fullName: "NORTHSTER AX-01 Computational Terminal",
    era: "archive",         // which era this product belongs to
    epoch: "1981-1994",
    category: "terminal",
    division: "04",
    status: "archived",     // "archived" | "active" | "restricted" | "classified"
    futureLineage: "meridian-v",  // slug of future-era successor
    specs: {
      processor: "NS-CPU-3 / 4MHz",
      memory: "128KB SRAM",
      display: "Monochrome phosphor / 640×480",
    },
    materials: ["NSM-7 cast aluminum", "NS-Glass laminate"],
    photography: {
      hero: "/products/ax-01/hero.jpg",
      detail: ["/products/ax-01/detail-1.jpg"],
    },
    model: "/models/ax-01.glb",
    archiveRef: "DOC-AX01-REV-IV",
    description: "...",
    engineeringNotes: "...",
  },
  // ...
];

export function getProduct(slug) {
  return PRODUCTS.find(p => p.slug === slug);
}

export function getProductsByEra(era) {
  return PRODUCTS.filter(p => p.era === era);
}
```

---

## 59. Product Lineage System

Each archive product has a `futureLineage` field pointing to its 2225 successor. The lineage system renders a visual timeline of product evolution.

```js
// lib/data/lineage.js
export function getLineage(archiveSlug) {
  const archiveProduct = getProduct(archiveSlug);
  const futureProduct = getProduct(archiveProduct.futureLineage);
  return {
    archive: archiveProduct,
    future: futureProduct,
    evolutionYears: 2225 - parseInt(archiveProduct.epoch),
    continuityPoints: [
      // Shared material DNA, design language continuities
    ],
  };
}
```

The `ProductLineage` component renders a two-column comparison: archive left, future right, connected by a horizontal timeline bar. In archive era, future column is dimmed and labeled "RESTRICTED / TEMPORAL LAYER: 2225". In future era, archive column is labeled "ARCHIVAL RECORD / EPOCH: [year]".

---

## 60. Epoch Evolution System

Products are grouped by epoch (manufacturing period):

```js
// lib/data/epochs.js
export const EPOCHS = [
  { id: "1978-1981", label: "Foundation", products: ["proto-01"] },
  { id: "1981-1994", label: "Division 04 / First Generation", products: ["ax-01", "mono-3"] },
  { id: "1994-2006", label: "Signal Era", products: ["relay-04", "signal-array"] },
  { id: "2006-2024", label: "Transition Period", products: [] },
  { id: "2225",      label: "Meridian / Continuum Era", products: ["meridian-v", "continuum-iii"] },
];
```

The epoch timeline drives the visual timeline on the products index page — a horizontal rule showing temporal distance, with products as nodes.

---

## 61. Future/Present Product Mapping

When user is in future era on the products page, the product grid shows future products. Archive products become accessible via a "ARCHIVAL RECORD" filter. The mapping:

```
Archive          →  Future
AX-01            →  MERIDIAN/V
MONO/3           →  CONTINUUM/III
RELAY-04         →  RELAY MESH NODE
SIGNAL ARRAY     →  CONTINUITY LAYER
[new in future]  →  STRATUM ARCHIVE
[new in future]  →  TEMPORAL RELAY UNIT
```

In React, the product page fetches products based on `era` from context:

```js
// This is a CLIENT component because it needs era
"use client";
const { era } = useTemporal();
const products = era === "future" ? getProductsByEra("future") : getProductsByEra("archive");
```

---

## 62. Product Rendering Architecture

Product pages have three visual zones:

**Zone A — Hero:** Full-width atmospheric image or WebGL scene. The product model renders in isolation — dramatic lighting, deep fog, black background.

**Zone B — Specification:** Two-column engineering-document layout. Left: tabular specs, material callouts. Right: detail photography or exploded diagram.

**Zone C — Lineage:** Timeline strip showing epoch context and lineage connection to future/archive counterpart.

Product page rendering is RSC-first: all static spec data renders server-side. The WebGL product scene (`ProductScene.js`) is the only client-only component — lazy loaded after product data.

---

## 63. Product Scene Systems

Each product has a corresponding `.glb` model. The `ProductScene.js` renders:

```
<ProductScene productSlug={slug}>
  <fog attach="fog" args={[fogColor, 2, 12]} />
  <EraLighting />
  <ProductModel url={`/models/${slug}.glb`} />
  <ProductEnvironment />
  <EffectComposer>
    <Bloom intensity={0.3} luminanceThreshold={0.85} />
    <Vignette darkness={0.7} />
  </EffectComposer>
</ProductScene>
```

The product model auto-rotates at 0.1 rad/s. On hover/interaction (if canvas pointer events enabled for product scenes), rotation pauses and follows mouse for inspection.

---

## 64. Product Visualization Systems

Three visualization modes:

**Standard:** Model on black, studio lighting, subtle rotation.

**Materials overlay:** Click a material callout in the spec sheet → camera moves to that face of the model, area highlighted via `OutlinePass`.

**Epoch ghost:** In archive era, hovering "VIEW IN 2225" shows a ghost overlay of the future model composited over the current model at 30% opacity — same geometry anchor, different silhouette.

All three modes are driven by a `productViewMode` state in `ProductScene.js` — local state, not global.

---

## 65. Product Interaction Systems

Desktop: hover over product card → slight reveal of engineering data underlay. A 1px horizontal rule sweeps across the card revealing secondary metadata row.

Product detail page: the specification table highlights rows on hover. Corresponding part of the 3D model receives a subtle rim light in R3F.

**Interaction philosophy:** Interactions should feel like operating a precision instrument — deliberate, minimal, feedback proportional to action. Nothing springs or bounces. Everything eases in one direction.

---

## 66. Volumetric Product Showcases

For featured products on the homepage and product detail hero, a volumetric environment:

```
Ambient haze (5 fog planes at z: -40 → -5)
Product model at z: 0
Studio rim light from z: -5, y: 3 (upper rear)
Key light from z: 5, y: 2, x: -3 (front upper left)
Fill light from z: 5, y: -1, x: 3 (front lower right)
Bounce card (invisible plane with white emissive material) below model
```

Product floats in haze — legible, dramatic, physically convincing.

---

## 67. Product Metadata Systems

Each product has multiple metadata layers:

- **Display metadata:** Name, epoch, division, status (shown in product card header)
- **Engineering metadata:** Material specs, process notes, archive references (shown in spec sheet)
- **Temporal metadata:** Era, lineage, evolution years (shown in lineage component)
- **Classification metadata:** Archive reference codes, revision numbers (shown in doc-ref labels)

Metadata displayed in Mono/IBM Plex Mono. Editorial description displayed in Cormorant. Never mix these within a single content block.

---

## 68. Engineering Annotation Systems

The `EngineeringNote.js` component renders inline annotations in the product spec sheet — styled as numbered callout bubbles, referencing specific components of the product.

Future era equivalents: same component, different visual style — annotations become cleaner, less analog-looking.

```jsx
// Future: annotation box has no border, just subtle color differentiation
[data-era="future"] .engineering-annotation {
  border: none;
  background: var(--elevated);
  letter-spacing: 0.12em;
}
```

---

## 69. Product Specification Architecture

Specifications as typed objects — never free-form strings for structured data:

```js
const spec = {
  processor: { value: "NS-CPU-3", unit: null, note: "4MHz base clock" },
  memory:    { value: "128", unit: "KB", note: "SRAM / expandable" },
  weight:    { value: "4.2", unit: "kg", note: "without peripherals" },
};
```

Rendered via `<SpecTable specs={spec} />` — a pure presentation component, no era logic. Era-specific styling via CSS.

---

# PART VI — THEMING + TEMPORALITY

---

## 70. Present vs Future Styling Architecture

**Archive (present) visual character:**
- Warm amber accent (#c7a96b)
- Phosphor dark background (#101215)
- Film grain texture overlay
- Scanline overlay
- Warm, slightly uneven typography
- Analog degradation signals

**Future visual character:**
- Steel blue accent (#7aa3c8)
- Deep clean background (#0d1119)
- No grain, no scanlines
- Perfectly even typography
- Chromatic aberration hint (CSS and WebGL)
- Near-perfect signal stability

Both eras use the same typefaces, same layout grid, same component hierarchy. The evolution is material and atmospheric — not structural.

---

## 71. Temporal Transition Synchronization

During transition, all sub-systems synchronize to the same timeline via `data-temporal-phase` attribute:

| Phase | CSS animations | GSAP | R3F uniforms | Audio |
|-------|---------------|------|-------------|-------|
| initiating | desaturation begins | page content dims | uDesaturation ramps | audio fade starts |
| accelerating | slit-scan lines sweep | camera dolly in | uVelocity → 1.0 | tone shifts |
| apex | white flash | — | uConvergence → 1.0 | silence |
| resolving | new era CSS vars | content re-reveal | uEraBlend → target | new era audio fades in |
| stabilizing | overlays fade out | final settle | uVelocity → 0 | audio stabilizes |

---

## 72. Theme Interpolation Systems

CSS transitions handle color interpolation between era/theme switches. For the era switch (covered by transition flash), no interpolation is needed — instant cut under the flash.

For theme switches (dark ↔ light within same era), smooth CSS transitions:

```css
:root {
  --transition-theme:
    background-color 400ms var(--ease-out),
    color 300ms var(--ease-out),
    border-color 350ms var(--ease-out);
}

html { transition: var(--transition-theme); }
```

Important: This transition is applied to `html`, which cascades to all children that inherit these properties. No per-component transition declarations needed.

---

## 73. Color Transition Systems

When era switches (under the flash):
1. Flash covers entire viewport
2. `data-era` attribute changes → new CSS variable values active
3. Flash begins to resolve (1700ms)
4. During resolving phase, `* { transition: background-color 1200ms ease-out; }` is active

The `color-transition-active` class is added to `<html>` only during the resolving phase, then removed. This prevents unwanted transitions during normal interaction.

---

## 74. Typography Transition Systems

Typography does not transition between eras (transitions on font properties cause layout reflow). Instead:

- During `apex` phase: all text opacity → 0 (under flash)
- During `resolving` phase: text re-appears with new era styling
- New era letter-spacing, opacity, and weight classes apply during the opacity-0 window

This is achieved via:

```css
[data-temporal-phase="apex"] .meta,
[data-temporal-phase="apex"] .doc-ref,
[data-temporal-phase="apex"] .font-display { opacity: 0 !important; }

[data-temporal-phase="resolving"] .meta,
[data-temporal-phase="resolving"] .doc-ref { animation: temporal-type-resolve 0.9s ease-out forwards; }
```

---

## 75. Layout Evolution Systems

Minor layout shifts between eras — subtle but felt:

```css
/* Future: slightly more breathing room */
[data-era="future"] .grid-doc { gap: 2rem; }
[data-era="future"] .container { --padding-x: 2.5rem; }
[data-era="future"] .doc-ref { letter-spacing: 0.2em; }
[data-era="future"] .section-gap { padding-block: 8rem; }
```

Archive: slightly tighter, more compressed. Future: more space, more air. Same content, different density. This communicates the temporal advancement without changing structure.

---

## 76. Environmental Evolution Systems

Archive environment layers:
- Film grain (fast, slow)
- Photocopy texture
- Scanline overlay
- Phosphor drift
- Operational breathing
- Signal instability

Future environment layers:
- Phosphor-drift: removed
- Grain: removed
- Scanlines: removed
- Photocopy: removed
- New: extremely subtle chromatic aberration on corners (CSS only)
- New: `operational-breathing` changes from warm dark overlay to cool dark overlay

CSS implementation:

```css
[data-era="future"] .grain,
[data-era="future"] .grain-slow,
[data-era="future"] .scanlines,
[data-era="future"] .photocopy,
[data-era="future"] .phosphor-drift { opacity: 0; pointer-events: none; }

[data-era="future"] .operational-breathing {
  background: rgba(7, 12, 20, 0.08);
}
```

---

## 77. Atmospheric Lighting Transitions

In R3F, light color and intensity lerp during era transition:

```js
const archiveLight = { color: new THREE.Color("#e8c87a"), intensity: 0.4 };
const futureLight  = { color: new THREE.Color("#a8c4d8"), intensity: 0.3 };

useFrame(() => {
  const target = era === "future" ? futureLight : archiveLight;
  lightRef.current.color.lerp(target.color, 0.015);
  lightRef.current.intensity = THREE.MathUtils.lerp(
    lightRef.current.intensity, target.intensity, 0.015
  );
  invalidate();
});
```

The lerp speed (0.015) means the full transition takes ~130 frames = ~2.2s at 60fps. Slower than the CSS transition — the atmosphere settles after the main transition resolves.

---

## 78. Future Light Mode Implementation

```css
[data-era="future"][data-theme="archive-day"] {
  --background: #eef2f7;
  --panel: #e4ebf2;
  --elevated: #d8e4ed;
  --text: #1c2b3a;
  --text-secondary: rgba(28,43,58,0.6);
  --accent: #2e6fa8;
  --border: rgba(28,43,58,0.1);

  /* Remove all warm atmospheric layers */
  .grain, .grain-slow, .photocopy, .scanlines, .phosphor-drift { opacity: 0; }

  /* Future light signal pulse — cool blue */
  .signal-pulse { animation: future-day-pulse 2s ease-in-out infinite; }
}

@keyframes future-day-pulse {
  0%, 100% { opacity: 0.6; color: #2e6fa8; }
  50%       { opacity: 1.0; color: #5a8ec4; }
}
```

Future light mode feels like clinical precision — no warmth, no analog artifacts. The same institutional authority as archive mode, evolved across centuries.

---

## 79. Future Dark Mode Implementation

```css
[data-era="future"] {
  --background: #0d1119;
  --panel: rgba(17,24,39,0.7);
  --elevated: rgba(255,255,255,0.05);
  --text: #d8e6f2;
  --text-secondary: rgba(216,230,242,0.5);
  --accent: #7aa3c8;
  --border: rgba(255,255,255,0.06);
  --shadow: rgba(0,0,0,0.5);
}
```

The cooler, deeper background compared to archive (#0d1119 vs #101215) creates a distinctly different spatial quality — archive feels enclosed, future feels expansive.

---

# PART VII — UI + INTERACTION

---

## 80. Navigation Architecture

Three-rail navigation (current implementation):

- **Rail A:** System status, audio control, volume, theme toggle, temporal trigger
- **Rail B:** Primary nav links, logo
- **Rail C:** Contextual breadcrumb, classification label

This structure persists across eras. Future era changes text content of metadata labels, not structure. No layout shifts between eras.

**Desktop:** Full three-rail display. Nav links in Rail B use `position: relative` active indicator (bottom border, not background).

**Mobile:** Rails A and C collapse. Rail B retains logo + hamburger. Full menu as portal overlay.

---

## 81. Temporal Navigation Evolution

Navigation labels in future era:
- "ARCHIVE" → "INSTITUTIONAL RECORD"
- "LABS" → "RESEARCH CONTINUUM"
- "NETWORK" → "RELAY MESH"
- Logo subtext: "Industries" → "CONTINUUM / 2225"

These are era-aware label overrides in `constants.js`:

```js
// lib/constants.js
export const NAV = [
  { href: "/", label: "HOME", futureLabel: "ORIGIN" },
  { href: "/products", label: "PRODUCTS", futureLabel: "SYSTEMS" },
  { href: "/archive", label: "ARCHIVE", futureLabel: "RECORD" },
  { href: "/labs", label: "LABS", futureLabel: "CONTINUUM" },
  { href: "/network", label: "NETWORK", futureLabel: "RELAY MESH" },
];
```

Nav component reads era and selects appropriate label:

```js
const navLabel = isFuture ? (item.futureLabel || item.label) : item.label;
```

---

## 82. Spatial UI Systems

Depth is created without parallax (parallax causes motion sickness and is visually cheap):

**Elevation via opacity:** Higher z-level elements are more opaque. Background labels: 20% opacity. Foreground labels: 60%. Active elements: 100%.

**Elevation via border:** Higher elements have stronger border contrast. Background panels: `border: 1px solid rgba(255,255,255,0.04)`. Foreground panels: `border: 1px solid rgba(255,255,255,0.12)`.

**Elevation via font weight:** Deeper content uses lighter font weight. Active/foreground content uses regular weight.

No drop shadows. No elevation tokens beyond these three systems. Restraint.

---

## 83. Depth-Aware UI Systems

Components are aware of their depth level — passed as a `depth` prop:

```jsx
<TechnicalPanel depth={1}>...</TechnicalPanel>  // surface level
<TechnicalPanel depth={2}>...</TechnicalPanel>  // nested
<TechnicalPanel depth={3}>...</TechnicalPanel>  // deep nested
```

Each depth level adjusts `--panel-opacity`, `--border-opacity`, `--text-opacity` via inline CSS variables.

---

## 84. Contextual Metadata Systems

Rail C in navbar displays context-aware text based on pathname + era. This pattern extends to page-level metadata: each major section renders a metadata bar at the top with system reference codes.

```
[SEGMENT: PRODUCTS / RECORD_REV_IV]   [REV: 04.22]   [Classification: Restricted]
```

These metadata bars are decorative but authentic-feeling. They follow the same pattern as aerospace instrumentation documentation — every screen has a header identifying it in the context of the larger system.

---

## 85. Ambient Interface Systems

Non-interactive system details that create atmospheric density:

- Signal pulse dot (●) in navbar with `signal-pulse` animation
- Rotating metadata string in `GrainOverlay` (bottom-left, 8px, 20% opacity)
- Revision counter in Rail C
- Epoch date in footer
- Operational status (SYS: STABLE / MERIDIAN)

These are "wallpaper text" — legible if you look, invisible if you don't. They must be `aria-hidden="true"` and must not be interactive.

---

## 86. Invisible Interaction Systems

Interactions that exist at the system level, not UI level:

**Keyboard:** `Alt+T` toggles temporal transition. `Alt+M` toggles audio. `Alt+L` toggles light/dark mode. These are utility shortcuts, not advertised.

**Keyboard implementation:**

```js
useEffect(() => {
  const handler = (e) => {
    if (e.altKey && e.key === "t") toggleEra();
    if (e.altKey && e.key === "m") toggleAudio();
    if (e.altKey && e.key === "l") toggleTheme();
  };
  window.addEventListener("keydown", handler);
  return () => window.removeEventListener("keydown", handler);
}, [toggleEra, toggleAudio, toggleTheme]);
```

**Easter egg:** Typing "NORTHSTER" anywhere on the page activates a brief, subtle visual acknowledgment — a single frame of the full temporal overlay at 5% opacity. Implemented via `keydown` sequence detection.

---

## 87. Product Exploration UX

Products page: grid of product cards. Filtering by:
- Era (archive / future)
- Epoch (decade range)
- Category (terminal, relay, sensor, array)
- Division (01–06)

Filters are URL-driven (`/products?era=future&epoch=2225`) for shareability and SSR compatibility. No client-side filtering — all filtering goes through Next.js router, which triggers a server fetch.

Product cards: minimal. Product name, epoch, status indicator. No thumbnails on archive cards (document-first). On hover: reveal photography.

---

## 88. Cursor Behavior Systems

Custom cursor on desktop, optional (opt-in via GSAP):

```js
// A minimal crosshair cursor — no gimmicky circles
const cursor = { x: 0, y: 0 };
window.addEventListener("mousemove", e => {
  gsap.to(cursorEl, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.15,
    ease: "power2.out",
  });
});
```

Cursor states:
- Default: 12px crosshair `+` (mono)
- Hovering links: crosshair grows to 16px
- Hovering product: crosshair transforms to a targeting reticle (CSS border + rotation)
- During temporal transition: cursor hides

**Do not implement:** trailing cursor, cursor-following bubbles, cursor-reactive particles. These are portfolio clichés that destroy the archival credibility.

---

## 89. Hover Philosophy

**Cardinal rule:** Hover never reveals critical information. It reveals additional context for information already present. A user on touch (no hover) must have complete access to all content.

Hover effects:
- Nav links: opacity increase (50% → 100%)
- Product cards: photography fade in over name
- Metadata labels: opacity increase (20% → 50%)
- Buttons: border lightens, background tints

Hover never: scales elements, moves elements, triggers audio, changes layout.

---

## 90. Cinematic Page Transition Systems

Route changes use a minimal fade + slight upward drift. Not a full-page wipe — that would be too theatrical for an archival system.

```
Route A → Route B:
1. Route A content: opacity 1 → 0, y: 0 → -8px (100ms)
2. Route B content: y: 12px, opacity: 0 (ready)
3. Route B content: opacity 0 → 1, y: 12px → 0 (450ms, ease power2.out)
```

Total duration: 550ms. Shorter in future era (450ms) — slightly more precise, less analog fade.

The navbar does NOT fade during route changes — it stays fully visible and stable, communicating that the user is still within the same system.

---

# PART VIII — AUDIO

---

## 91. Ambient Audio Architecture

Audio is a single always-running synthesis engine (`VocalEngine`) that modulates parameters based on era, theme, and page context. It is NOT a file player — no audio files are loaded.

Architecture:
```
AudioContext
└── VocalEngine
    ├── HumOscillator (55Hz, sine)
    ├── FormantFilter (BiquadFilter, bandpass)
    ├── LFO → HumOscillator.frequency (0.08Hz drift)
    ├── MasterFilter (lowpass, era-tuned cutoff)
    ├── MasterGain (user volume control)
    └── [future only] CrystallineLayer (220Hz, sine, 8kHz filter)
```

---

## 92. Web Audio API Integration

Always initialize AudioContext from a user gesture. In `AudioManager.js`:

```js
const initAudio = useCallback(async () => {
  if (audioCtxRef.current?.state === "suspended") {
    await audioCtxRef.current.resume();
  }
  if (!isInitialized) {
    vocalEngine.init(volume);
    setIsInitialized(true);
  }
}, [isInitialized, volume]);
```

This fires on the first `toggleAudio()` call — the user clicks "AUDIO: MUTED" → audio initializes and starts.

**Safari:** AudioContext requires user gesture AND `.resume()` call. The pattern above handles both.

---

## 93. Era-Aware Audio Systems

Archive mode audio:
- 55Hz hum, formant filter centered at 800Hz Q: 12
- LFO drifting ±3Hz over 8-second cycle
- Master lowpass at 4kHz (warm, muffled)
- Volume: 0.015 (near-silent hum)

Future mode audio:
- Crystalline layer added: 220Hz sine, bandpass at 2.2kHz Q: 25
- LFO disabled (no drift — stable, perfect signal)
- Master lowpass lifted to 8kHz (cleaner, more present)
- Hum volume reduced to 0.006
- Crystalline volume: 0.018

```js
setMode(mode) {
  if (mode === "future") {
    this.masterFilter.frequency.rampTo(8000, 1.5);
    this.humGain.gain.rampTo(0.006, 1.5);
    this.createFutureLayer();  // idempotent
    this.futureGain.gain.rampTo(0.018, 1.5);
  }
}

// rampTo: AudioParam exponential ramp
rampTo(param, value, time) {
  param.linearRampToValueAtTime(value, this.ctx.currentTime + time);
}
```

---

## 94. Spatial Audio Concepts

Web Audio `PannerNode` for page-context spatial positioning:

- Homepage: audio centered (stereo pan 0)
- Archive: audio slightly left-panned (-0.1) — the system is reading from the left
- Products: audio centered, slight room reverb via `ConvolverNode`
- Labs: audio slightly right-panned (+0.1)

These are micro-shifts — perceptible subconsciously, not consciously. They reinforce the spatial narrative of each section without being distracting.

```js
const panner = ctx.createStereoPanner();
panner.pan.value = -0.1;  // archive mode
```

---

## 95. Near-Silent Future Sound Design

Future audio is barely present. The crystalline layer at 220Hz with 0.018 gain is at the threshold of hearing when volume is at 50%. It communicates:

- Digital precision (pure sine, no harmonics)
- Temporal distance (a frequency that doesn't sound "old")
- Institutional permanence (constant, unwavering)

The absence of drift (no LFO) in future mode is itself a sound design statement — archive mode has imperfect power, future mode is perfect. Silence as meaning.

---

## 96. Audio Performance Optimization

Web Audio API runs on a dedicated audio thread — CPU cost is extremely low. However:

- Oscillators: keep count below 4 active at once
- `ConvolverNode` (reverb): expensive. Use only on product pages, not globally.
- Filters: `BiquadFilter` is cheap. `IIRFilter` is cheaper but less flexible. Use `BiquadFilter`.
- Disconnect nodes when not in use — don't just gain.value = 0 (still processes signal)

```js
// Proper node cleanup
deactivateFutureLayer() {
  this.futureGain.disconnect();
  this.futureOsc.stop();
  this.futureOsc.disconnect();
}
```

---

## 97. Accessibility Handling for Audio

- Audio is **off by default**. Users must explicitly enable it.
- Audio control is visible in the primary navbar rail — always accessible
- Screen readers: `aria-label` on audio toggle button describes current state ("Audio: active, click to mute")
- No audio plays on page load, ever.
- Volume slider includes keyboard support (arrow keys)
- `prefers-reduced-motion` does not affect audio (separate concern) but `prefers-reduced-transparency` should reduce atmospheric overlay opacity

---

# PART IX — DEVELOPMENT + TOOLING

---

## 98. Recommended npm Packages

**Core rendering:**
```
three                           # WebGL engine
@react-three/fiber              # React renderer for Three.js
@react-three/drei               # R3F helpers (useGLTF, useTexture, etc.)
@react-three/postprocessing     # Post-processing pipeline
```

**Animation:**
```
gsap                            # Primary animation engine
@gsap/react                     # React integration (useGSAP hook)
lenis                           # Smooth scroll
```

**Audio:** No additional packages. Web Audio API is sufficient.

**Utilities:**
```
clsx                            # Conditional className merging
```

**Dev:**
```
typescript                      # Type safety (see §103)
@types/three                    # Three.js types
```

**Optional / future:**
```
@theatre/core                   # Cinematic timeline animation
@theatre/studio                 # Visual editor (dev-only)
```

---

## 99. Libraries to Use

| Library | Why |
|---------|-----|
| Three.js + R3F | Industry standard, excellent React integration, large ecosystem |
| GSAP | Best-in-class timeline animation, well-maintained, React hook available |
| Lenis | Smooth scroll that integrates cleanly with GSAP ScrollTrigger |
| `@react-three/drei` | Avoids reinventing common R3F patterns (loaders, helpers, controls) |
| `@react-three/postprocessing` | pmndrs/postprocessing is faster than THREE.EffectComposer |
| Tailwind v4 | Already in use; excellent for utility classes, CSS variables for tokens |

---

## 100. Libraries to Avoid

| Library | Why not |
|---------|---------|
| Framer Motion | React re-render coupling, large bundle, not needed with GSAP |
| React Spring | Similar issues; GSAP is more appropriate for this complexity level |
| CANNON.js / Rapier | No physics needed — atmosphere is visual, not simulated |
| Particle.js / tsParticles | Exactly the kind of aesthetic this project must avoid |
| Swiper.js | Use CSS scroll snap + native scroll — cleaner and lighter |
| Chakra UI / MUI | Component libraries conflict with the bespoke design system |
| Lottie | No Lottie animations — all motion is code-driven |
| p5.js | Use Three.js instead — consistent toolchain |
| GSAP ScrollSmoother | Replace with Lenis — lighter, more composable |

---

## 101. Build Tooling

Next.js 16 uses Turbopack (default in dev since Next 15). No Webpack config needed.

```json
// next.config.js
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        "*.glsl": { loaders: ["raw-loader"], as: "*.js" },
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};
```

**GLSL files:** Turbopack needs explicit `raw-loader` rule for `.glsl` imports. Without it, shader imports fail.

---

## 102. Vite/Turbopack Strategy

Stay with Turbopack (built into Next.js). Do not eject to Vite for a Next.js project — you lose SSR, App Router, `next/image`, `next/font`, and all the optimizations that make Next.js worth using.

Turbopack is significantly faster than webpack for development. On a clean dev server start, Turbopack with this codebase should be under 3 seconds.

**Bundle analysis:**

```bash
ANALYZE=true npm run build
```

Use `@next/bundle-analyzer` to inspect bundle composition. Target: Three.js should be code-split into a separate chunk (it will be automatically, since it's behind a `dynamic(() => import(...))`).

---

## 103. TypeScript Architecture

Migrate from `.js` to `.ts`/`.tsx` incrementally:

**Phase 1 — Data layer first:** `lib/data/products.ts`, `lib/constants.ts`. These have the most to gain from type safety.

```ts
// lib/data/products.ts
export interface Product {
  slug: string;
  name: string;
  era: "archive" | "future";
  epoch: string;
  status: "archived" | "active" | "restricted" | "classified";
  futureLineage?: string;
  specs: Record<string, { value: string; unit?: string; note?: string }>;
  // ...
}
```

**Phase 2 — Context types:** Type `TemporalContext`, `ThemeContext`, `AudioContext`.

**Phase 3 — Component props:** Convert components to `.tsx` with typed props.

**Phase 4 — GLSL:** Add `*.glsl.d.ts` declaration file:
```ts
declare module "*.glsl" { const value: string; export default value; }
```

---

## 104. ESLint Strategy

Current: `eslint-config-next` (standard Next.js lint config).

Add rules:

```js
// eslint.config.js
export default [
  ...nextConfig,
  {
    rules: {
      "no-restricted-imports": ["error", {
        patterns: [{
          group: ["three", "@react-three/*"],
          message: "Three.js imports must be inside components/webgl/ or loaded dynamically",
        }],
      }],
    },
  },
];
```

This enforces that Three.js never leaks into non-WebGL files — protecting SSR from Three.js's browser-only APIs.

---

## 105. Motion Debugging Workflows

GSAP provides a debug plugin for development:

```js
if (process.env.NODE_ENV === "development") {
  import("gsap/GSDevTools").then(({ GSDevTools }) => {
    gsap.registerPlugin(GSDevTools);
    GSDevTools.create();
  });
}
```

This adds a timeline scrubber in development. Disable in production.

For Theatre.js animations: the studio UI is the debug workflow — visual keyframe editing.

For CSS temporal phases: add a debug panel in development that shows current `data-temporal-phase`, `data-era`, `data-theme` in a fixed overlay:

```jsx
{process.env.NODE_ENV === "development" && <DebugPanel />}
```

---

## 106. Shader Debugging Workflows

**Spector.js:** Browser extension for WebGL frame capture. Essential for debugging post-processing pipeline issues, texture binding problems, and shader compilation errors.

**GLSL type checking:** Use `glslify` or `glsl-lint` CLI for shader linting at build time. Catches type errors before browser.

**Shader error handling:** Wrap shader material creation in try/catch:

```js
try {
  material = new THREE.ShaderMaterial({ vertexShader, fragmentShader });
} catch (e) {
  console.error("Shader compilation failed:", e);
  material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
}
```

Fallback to red wireframe on shader failure — visible problem without crashing the page.

---

## 107. Design System Documentation

Use Storybook (see §108) for interactive component documentation.

In addition: `docs/design.md` (already exists) should be the canonical reference for visual language. Extend with:
- Color token reference table
- Typography specimen with class names
- Component usage guidelines
- Era-specific variants documentation

---

## 108. Storybook Strategy

```bash
npx storybook@latest init
# Select Next.js framework
```

Stories for every UI primitive:
- `Button.stories.tsx` — all variants, all states, both eras
- `MetaLabel.stories.tsx`
- `TechnicalPanel.stories.tsx`
- `ProductCard.stories.tsx`

Storybook decorator to simulate era:

```jsx
// .storybook/preview.js
const withEra = (Story, context) => {
  const era = context.globals.era || "archive";
  return (
    <div data-era={era}>
      <Story />
    </div>
  );
};
export const decorators = [withEra];
export const globalTypes = {
  era: { name: "Era", defaultValue: "archive", toolbar: { items: ["archive", "future"] } },
};
```

This adds an era toggle to every story — all components are tested in both eras automatically.

---

## 109. Testing Strategy

**Unit tests:** `vitest` for pure functions in `lib/` — product data transforms, era utilities, audio parameter calculations.

**Component tests:** React Testing Library for UI components. Focus on:
- Temporal trigger button renders correct label per era
- NavMobile closes on navigation
- ThemeToggle reflects current theme
- Era-aware labels update on era change

**Integration tests:** Playwright for critical flows:
- Homepage loads without hydration errors
- Temporal transition completes without console errors
- Product page renders product data
- Mobile menu opens and closes

**WebGL tests:** Not unit tested — use visual regression testing (Playwright screenshots) for critical renders.

---

## 110. Deployment Strategy

**Platform:** Vercel (native Next.js support, edge network, automatic preview deploys).

**Environment setup:**
```
Production:  northster.inc          — main branch
Staging:     staging.northster.inc  — develop branch
Preview:     auto-deploy per PR
```

**Edge Runtime:** Consider edge middleware for geolocation-based content (future feature: archive shows local division based on user region). Standard Node.js runtime for all current pages.

**Asset CDN:** Vercel handles this automatically. Ensure large assets (HDRI, 3D models) are in `public/` and served from Vercel's CDN edge.

**Lighthouse targets:**
- Performance: > 90 (desktop), > 75 (mobile)
- Accessibility: > 95
- SEO: > 90

---

# PART X — VISUAL SYSTEMS

---

## 111. Product Photography Direction

**Style:** Studio photography against pure black. One product per frame. No lifestyle context. No human hands. No branding in frame.

**Lighting setup:**
- Single large octabox from upper-left 45°/45° — the main source
- Small rim light from rear-right at horizon level — separates product from background
- No fill light — deep shadows are intentional
- Black sweep background, seamless

**Era-specific treatment:**

Archive products: slight underexposure, slight warm grade, subtle vignette. Feel like recovered prototype photography from an engineering record.

Future products: technically perfect exposure, neutral-cool grade, no vignette, higher contrast. Feel like precise manufacturing documentation.

**Post-production:** AVIF export at 85% quality, max 1600px wide for hero images. No watermarks. No color overlays.

---

## 112. Atmospheric Rendering Philosophy

The WebGL atmosphere exists to add a sense of physical space — that the website exists in a room, a facility, a place — not as a flat screen.

Rules:
- Atmosphere is never more visually prominent than content
- Fog planes are visible only in peripheral vision
- Color temperature matches era: warm amber (archive), cool steel (future)
- No stars, no space imagery, no abstract particles
- The atmosphere reads as: an industrial facility with amber task lighting (archive), or a deep-space research station with cool overhead fluorescents (future)

---

## 113. Environmental Lighting Direction

**Archive — the facility:**
Amber task lighting, non-uniform. Feels like a server room or engineering bay with old fluorescent lights and computer monitors as secondary sources. Warm, slightly flickering. Concrete walls catching amber light. Very little bounce.

**Future — the continuum:**
Cool overhead diffuse. No warm source. Even, flat, institutional. Feels like a clean-room or research lab that has been optimized for function over atmosphere. Deliberate absence of warmth.

---

## 114. Typography Hierarchy Systems

Five typographic levels:

1. **Display** (`font-display`): Cormorant, 300 weight, display size. Rare — page titles only.
2. **Subhead** (`meta`, uppercase): IBM Plex Mono, 400 weight, tracking 0.15em. Section headers.
3. **Body** (`editorial`): Cormorant, 400 weight, reading size. Product descriptions, editorial copy.
4. **Label** (`meta`, mixed case): IBM Plex Mono, 400 weight, tracking 0.08em. UI labels, button text.
5. **Reference** (`doc-ref`): IBM Plex Mono, 300 weight, very small, 60% opacity. Archive codes, metadata.

**Never mix levels 3 and 5 in the same sentence.** Editorial body and reference text operate in separate typographic spaces.

---

## 115. Future Industrial Rendering Language

Future NORTHSTER visual vocabulary:

- **Surfaces:** Matte-smooth rather than textured. Perfect machining tolerances visible.
- **Light:** Even, cool, high CRI. No warm sources.
- **Space:** More white space, wider margins. Precision over density.
- **Materials:** NSM-7 (matte-anodized), NTi-3 (titanium ceramic), NGL-2 (gradient glass). All visible in product renders.
- **Text:** Steel-blue accent on deep blue-black. Lighter tracking. More air between letters.
- **Grain:** Absent. Post-analog — no film artifacts.
- **Lines:** Thinner. 0.5px borders. Near-invisible grid structure.

---

## 116. Present-Day Rendering Language

Archive NORTHSTER visual vocabulary:

- **Surfaces:** Slight texture visible. Die-cast aluminum with tool marks.
- **Light:** Warm directional. Amber spill from within or behind products.
- **Space:** Tighter, more compressed. Document-like density.
- **Materials:** NSM-7 original (rough anodize), early polymer composites, phosphor glass.
- **Text:** Amber accent on dark. Tight tracking. Dense.
- **Grain:** Present. Film-like texture.
- **Lines:** 1px. Visible grid. Engineering blueprint language.

---

## 117. Spatial Composition Systems

All product photography and WebGL compositions follow the **NORTHSTER compositional law:**

1. Subject occupies one-third to one-half of frame maximum
2. Dominant negative space on the right or above
3. Engineering details (serial numbers, connection points) visible in frame
4. No centered compositions — always offset to architectural grid position
5. Horizon line (if visible) sits at lower-third

This is derived from aerospace engineering documentation photography and precision manufacturing catalogs.

---

## 118. Editorial Pacing Systems

Long-form pages (archive documents, product pages) follow a pacing rhythm:

```
[Page entry — metadata header]
[Short intro paragraph — 40–60 words]
[Full-width divider — horizontal rule with classification code]
[Primary content block — 200–400 words]
[Engineering note callout]
[Detail image or spec table]
[Secondary content block]
[Timeline or lineage component]
[Archive reference footer]
```

This rhythm is consistent across all long-form pages. It creates the feeling of a well-organized institutional document — not a website.

---

## 119. Visual Restraint Systems

Restraint is enforced by a set of explicit prohibitions:

**Never add:**
- Drop shadows (use border instead)
- Gradient backgrounds (use solid or transparent)
- Rounded corners on content containers (sharp edges are the language)
- Emoji in UI (unless in content)
- Icons from icon libraries (use text labels and ASCII)
- Modal dialogs (use inline expansion instead)
- Toast notifications (use inline status instead)
- Loading spinners (use skeleton states instead)
- Color used for decoration (only for state: accent = active, important)

**Always check:** Before adding any visual element, ask — "does this exist in a NASA documentation system or a Braun industrial product?" If no, reconsider.

---

## 120. How to Preserve Calmness Throughout

The single most important principle, stated plainly:

**Nothing should demand attention. Everything should reward it.**

Technical implementation of calmness:

1. `animation-duration` never below 300ms for any user-visible animation
2. No looping animations visible in the browser viewport at medium scroll depth
3. Maximum one animated element in any given 200px vertical slice of the page
4. Never animate and reflow simultaneously
5. `prefers-reduced-motion` respected without fallback degradation
6. Audio starts at 0 volume on enable, ramps up over 2s
7. Transition states (temporal, page) are always user-initiated — never automatic
8. No auto-play, no auto-scroll, no auto-advance
9. Typography never changes size on hover
10. Focus states are visible but not startling — 2px offset outline in accent color

**The test:** Load the site on a tired afternoon. It should feel like picking up a well-made book — not like opening an app.

---

*NORTHSTER INC. — Engineering Implementation Reference*
*Temporal Systems Division / Classification: Internal*
*Revision: 01 — Architecture Baseline*
*Era: Archive / 2026*

---
