# Changelog

All notable changes to the **NORTHSTER INC.** project will be documented in this file.

## [1.1.0] - 2026-05-12

### Added
- **Vocal Infrastructure Environmental Audio System**:
  - Implemented a purely procedural atmospheric audio engine using **Vocal Formant Synthesis**.
  - Layers include `Infrastructural Hum` (vowel "U"), `Signal Texture` (vowel "O"), and `Ventilation` (filtered sibilance).
  - Added `AudioManager` for global state management and theme-synced audio modes (Archive Night vs. Archive Day).
  - Integrated a subtle **Volume Slider** and status indicator ("AUDIO: ACTIVE / CH.04") into the primary Navbar.
  - Persistent user preference storage for audio state and volume in `localStorage`.

### Changed
- **Institutional Branding Refresh**:
  - Replaced all framework default icons (Next.js/Vercel) with NORTHSTER institutional branding.
  - Created high-resolution `favicon.ico` and `favicon.png` assets based on the corporate star symbol.
  - Updated site `metadata` for improved SEO and social sharing consistency.
- **Performance Optimization**:
  - Replaced all high-resolution product photography with **compressed versions** (~67% reduction in file size), drastically improving page load and development server stability.
  - Optimized `next.config.mjs` to disable heavy development-mode image processing.
  - Increased Node.js memory limit to **4GB** for `npm run dev` to prevent system freezes and swap thrashing on macOS.

### Fixed
- Fixed unescaped entities in `app/labs/page.js` to satisfy ESLint requirements.
- Resolved layout inconsistencies in `app/design-system/loading.js` using the standard `Container` component.

---

## [1.0.0] - 2026-05-12

### Added
- Initial release of the **NORTHSTER INC.** institutional archive.
- Full catalogue of 7 indexed computational systems.
- Layered worldbuilding via Transmission Logs, Engineering Notes, and Research Summaries.
- CRT-inspired atmospheric CSS layers (Grain, Scanlines, Phosphor Drift).
- Next.js 16 App Router architecture with static export capability.
