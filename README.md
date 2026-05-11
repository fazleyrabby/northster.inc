# NORTHSTER INC.

> *A preserved computational archive from another timeline.*

---

**NORTHSTER INC.** is an alternate-history industrial computing organization that built monochrome workstations, signal infrastructure, and quiet machines for research environments between **1978** and **1998**.

The site functions as a living archival record — part institutional catalog, part field documentation, part implied organizational history. It should feel like arriving at an abandoned research facility whose systems have been running continuously for decades.

---

## The World

**What it is:**
- An archival-industrial web experience resembling a preserved late-70s/80s institutional computing archive
- A fictional organization with layered operational documentation, field logs, transmission records, and implied history
- Monochrome industrial hardware photographed in service and presented alongside engineering reference material

**What it is NOT:**
- An ARG, puzzle hunt, or mystery game
- Cyberpunk, synthwave, or dystopian fiction
- A sci-fi terminal simulator or fictional operating system
- Horror or glitch-storytelling

**The emotional target:**
> *"this organization existed long before I arrived."*

The world should feel **operational**, **preserved**, **procedurally documented**, **computationally atmospheric**, and **archivally incomplete** — not dramatic or theatrical.

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Institutional homepage — hero, systems teaser, timeline, network map |
| `/products` | Full catalogue listing — all 7 indexed systems |
| `/products/[slug]` | Individual product pages with archival photography, technical specs, and field notes |
| `/philosophy` | Six founding principles — unchanged since 1978 |
| `/archive` | Timeline and recovered field entries |
| `/labs` | Research programmes — past and ongoing |
| `/network` | NS-MESH V3 relay status and node register |
| `/design-system` | Visual reference — palette, typography, motion |

---

## Systems — Catalog

| Code | Name | Year | Status |
|------|------|------|--------|
| AX–01 | Computational Workstation | 1981 | ARCHIVE |
| MONO/3 | Editorial Terminal | 1983 | ARCHIVE |
| SIGNAL NODE | Network Relay Unit | 1985 | FIELD |
| VECTOR TERMINAL | Engineering Display | 1986 | ARCHIVE |
| HZN–90 | Horizon Compute Cluster | 1989 | FIELD |
| POLARIS UNIT | Research Station Console | 1990 | RESTRICTED |
| ORBITAL | Atmospheric Signal Receiver | 1992 | RESTRICTED |

---

## Worldbuilding Systems

The site includes layered institutional documentation:

- **Transmission Logs** — 8 operational field logs with timestamps, division references, and status indicators
- **Engineering Notes** — 8 internal notices spanning AXIS LABORATORY through ARCHIVE DIV. 04
- **Maintenance Reports** — 6 manufacturing/deployment records
- **Deployment Records** — 6 regional deployment summaries
- **Internal Notices** — 6 institutional communications
- **Catalog Revisions** — 2 partial revisions tracking system evolution
- **Archive Inconsistencies** — 6 flagged incompletenesses (partial redactions, unavailable records, restricted files)
- **Operational Indicators** — 6 ambient system signals
- **Research Summaries** — 5 Northster Labs programme entries
- **Divisions** — 7 institutional divisions with distinct terminology and archival focus

---

## Visual Language

- **Palette:** Graphite/charcoal base (`#101215`), amber accent (`#c7a96b`), institutional warm tungsten undertone
- **Typography:** Cormorant Garamond (display serif) + IBM Plex Mono (body/meta)
- **Atmosphere:** Grain, vignette, scanline, and copy-noise CSS layers creating archival CRT texture
- **Motion:** Restrained phosphor emergence animations — no bounce, no overshoot
- **Photography:** Monochrome industrial hardware photographed in service — preserved, not polished

---

## Architecture

```
/app/                     Next.js App Router pages
/components/
  archival/               Archival UI components (EngineeringSheet, TransmissionExcerpt, etc.)
  atmosphere/             Grain overlay, ProductGlyph (SVG illustrations)
  layout/                 Navbar, Footer, Container, PageTransition
  sections/               Hero, ProductCard, ArchiveItem, TimelineBlock, CTASection
  typography/             SectionHeader, EditorialHeading
  ui/                     Button, MetaLabel, Divider, TechnicalPanel
/data/
  archival.js             Worldbuilding content — divisions, logs, reports
  archive.js              Archive entries, labs projects, network nodes
  products.js             All 7 systems with specs, field notes, revision history
  timeline.js             Company history 1978–1998
/lib/
  constants.js            NAV, SITE, FOOTER_GROUPS
  motion.js               Animation preset constants
/public/
  images/products/        Product photography for each system
```

---

## Worldbuilding Rules

1. **Restraint over drama** — The atmosphere is quiet and procedural, not theatrical or mysterious-for-its-own-sake
2. **Implication over exposition** — History emerges through gaps, missing records, and operational inconsistencies
3. **Archival incompleteness** — Not everything is explained; some records are partial, redacted, or unavailable
4. **Institutional continuity** — Systems have been running for decades; field crews, relay chains, and research programmes persist quietly
5. **No puzzles or mechanics** — Nothing requires interaction to understand the world; observation is sufficient

---

## Stack

- **Framework:** Next.js 16 App Router
- **Styling:** Tailwind CSS v4 + CSS atmosphere system
- **Fonts:** Google Fonts (Cormorant Garamond + IBM Plex Mono)
- **Images:** Next.js `<Image>` with `object-contain`
- **Animation:** CSS keyframes — restrained phosphor emergence
- **Deployment:** Static export (`next build`) — compatible with Vercel or any static host

---

## Quick Start

```bash
npm install
npm run dev
```

---

## Deploy

```bash
npm run build
```

The project builds to a fully static export. Deploy the `.next/` output folder to Vercel, Netlify, Cloudflare Pages, or any static host.

---

## Note on Images

Product photography was generated via API and imported from local source files. See `/prompts/products/` for detailed visual direction prompts used for each system's canonical imagery.

The SVG `ProductGlyph` illustrations (in `components/atmosphere/`) remain on product pages as secondary technical reference alongside the primary archival photographs.