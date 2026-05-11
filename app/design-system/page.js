import Container from "@/components/layout/Container";
import EditorialSection from "@/components/sections/EditorialSection";
import Divider from "@/components/ui/Divider";
import MetaLabel from "@/components/ui/MetaLabel";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/sections/ProductCard";
import TimelineBlock from "@/components/sections/TimelineBlock";
import ArchiveItem from "@/components/sections/ArchiveItem";
import { products } from "@/data/products";
import { timeline } from "@/data/timeline";
import { archiveEntries } from "@/data/archive";

export const metadata = { title: "Design System — NORTHSTER INC." };

const SWATCHES = [
  { name: "BACKGROUND", token: "#101215", className: "bg-background" },
  { name: "PANEL", token: "#15181d", className: "bg-panel" },
  { name: "PANEL-2", token: "#181c21", className: "bg-panel-2" },
  { name: "ELEVATED", token: "#1c2026", className: "bg-elevated" },
  { name: "BORDER", token: "rgba(255,255,255,0.07)", className: "bg-border" },
  { name: "MUTED", token: "#7d828a", className: "bg-muted" },
  { name: "TEXT", token: "#f3f3f3", className: "bg-text" },
  { name: "ACCENT", token: "#c7a96b", className: "bg-accent" },
];

export default function DesignSystemPage() {
  return (
    <>
      <section className="border-b border-border-soft">
        <Container size="wide" className="pt-20 pb-16">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex gap-x-10 gap-y-2 flex-wrap">
              <MetaLabel>★ NORTHSTER / DESIGN-SYSTEM</MetaLabel>
              <MetaLabel>VISUAL REFERENCE</MetaLabel>
              <MetaLabel>NS-DSY-01</MetaLabel>
            </div>
            <MetaLabel accent>● LIVING REFERENCE</MetaLabel>
          </div>
          <hr className="rule mt-10" />
          <div className="pt-16 md:pt-24 pb-8 grid grid-cols-1 md:grid-cols-12 gap-10">
            <h1 className="md:col-span-9 font-display text-5xl md:text-6xl lg:text-7xl leading-[0.92]">
              The visual <span className="italic text-accent">manual</span>.
            </h1>
            <p className="md:col-span-3 md:pt-6 text-base text-muted leading-relaxed">
              A reference page for Northster&apos;s typography, palette, motion, and
              UI components. Use this page as the source of truth.
            </p>
          </div>
        </Container>
      </section>

      <EditorialSection>
        <Divider label="01 — TYPOGRAPHY / DISPLAY" />
        <div className="mt-12 space-y-10 border-t border-border-soft pt-12">
          <div>
            <MetaLabel>DISPLAY / XL</MetaLabel>
            <p className="font-display text-7xl md:text-[10rem] leading-[0.85] mt-3">
              Northster.
            </p>
          </div>
          <div>
            <MetaLabel>DISPLAY / LG</MetaLabel>
            <p className="font-display text-6xl md:text-8xl leading-[0.9] mt-3">
              Computing without distraction.
            </p>
          </div>
          <div>
            <MetaLabel>DISPLAY / MD</MetaLabel>
            <p className="font-display text-5xl md:text-7xl leading-[0.95] mt-3">
              <span className="italic text-accent">Engineered</span> for signal stability.
            </p>
          </div>
          <div>
            <MetaLabel>DISPLAY / SM</MetaLabel>
            <p className="font-display text-4xl md:text-5xl mt-3">A section heading.</p>
          </div>
        </div>
      </EditorialSection>

      <EditorialSection>
        <Divider label="02 — TYPOGRAPHY / EDITORIAL" />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-10 border-t border-border-soft pt-12">
          <div className="md:col-span-6 space-y-5">
            <MetaLabel>BODY / LG</MetaLabel>
            <p className="text-lg leading-relaxed text-text/90">
              Northster Inc. designs and archives industrial computing systems
              from a parallel timeline — monochrome workstations, signal
              infrastructure, and quiet machines built for environments that
              reward focus.
            </p>
          </div>
          <div className="md:col-span-6 space-y-5">
            <MetaLabel>BODY / SM — MUTED</MetaLabel>
            <p className="text-sm leading-relaxed text-muted">
              Many systems remain in continuous field operation. The SIGNAL
              NODE mesh — first deployed in 1985 — has not been switched
              off since.
            </p>
            <div className="pt-4 space-y-3">
              <MetaLabel>META / LABEL</MetaLabel>
              <MetaLabel accent>META / ACCENT</MetaLabel>
            </div>
          </div>
        </div>
      </EditorialSection>

      <EditorialSection>
        <Divider label="03 — PALETTE" />
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {SWATCHES.map((s) => (
            <div key={s.token} className="border border-border-soft">
              <div className={`${s.className} aspect-square`} />
              <div className="p-4 flex justify-between items-center">
                <MetaLabel>{s.name}</MetaLabel>
                <MetaLabel>{s.token}</MetaLabel>
              </div>
            </div>
          ))}
        </div>
      </EditorialSection>

      <EditorialSection>
        <Divider label="04 — SPACING / RHYTHM" />
        <div className="mt-12 space-y-6">
          {[2, 4, 6, 10, 16, 24, 32].map((s) => (
            <div key={s} className="flex items-center gap-6">
              <MetaLabel className="w-24">{s * 4}PX</MetaLabel>
              <div className="bg-accent h-px" style={{ width: `${s * 16}px` }} />
              <MetaLabel>SPACE-{s}</MetaLabel>
            </div>
          ))}
        </div>
      </EditorialSection>

      <EditorialSection>
        <Divider label="05 — BUTTONS" />
        <div className="mt-12 flex flex-wrap gap-5 items-center">
          <Button>PRIMARY ACTION</Button>
          <Button variant="ghost">GHOST</Button>
          <Button variant="accent">ACCENT</Button>
          <Button variant="bare">BARE</Button>
          <Button size="sm">SMALL</Button>
          <Button size="lg">LARGE</Button>
        </div>
      </EditorialSection>

      <EditorialSection>
        <Divider label="06 — METADATA LABELS" />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-border-soft pt-10">
          <div className="space-y-3">
            <MetaLabel>NS-ARC-0089</MetaLabel>
            <MetaLabel>1983.11.02</MetaLabel>
            <MetaLabel>EDITORIAL DIVISION</MetaLabel>
          </div>
          <div className="space-y-3">
            <MetaLabel accent>● ACTIVE</MetaLabel>
            <MetaLabel accent>● SIGNAL STABLE</MetaLabel>
            <MetaLabel accent>● TRANSMITTING</MetaLabel>
          </div>
          <div className="space-y-3">
            <MetaLabel>STATUS / ARCHIVE</MetaLabel>
            <MetaLabel>STATUS / FIELD</MetaLabel>
            <MetaLabel>STATUS / RESTRICTED</MetaLabel>
          </div>
        </div>
      </EditorialSection>

      <EditorialSection>
        <Divider label="07 — DIVIDERS" />
        <div className="mt-12 space-y-8">
          <Divider />
          <Divider label="01 — SECTION TITLE" />
          <Divider label="02 — SECONDARY DIVIDER" />
        </div>
      </EditorialSection>

      <EditorialSection>
        <Divider label="08 — PRODUCT CARD" />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.slice(0, 3).map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i + 1} />
          ))}
        </div>
      </EditorialSection>

      <EditorialSection>
        <Divider label="09 — TIMELINE BLOCK" />
        <div className="mt-12">
          <TimelineBlock entries={timeline.slice(0, 3)} />
        </div>
      </EditorialSection>

      <EditorialSection>
        <Divider label="10 — ARCHIVE ITEM" />
        <div className="mt-8">
          {archiveEntries.slice(0, 2).map((e) => (
            <ArchiveItem key={e.id} entry={e} />
          ))}
        </div>
      </EditorialSection>

      <EditorialSection bordered={false}>
        <Divider label="11 — MOTION / REVEAL" />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {["reveal", "reveal reveal-delay-1", "reveal reveal-delay-2", "reveal reveal-delay-3"].map((c, i) => (
            <div key={c} className={`${c} border border-border-soft p-8 bg-panel/40`}>
              <MetaLabel accent>● REVEAL / {String(i + 1).padStart(2, "0")}</MetaLabel>
              <p className="font-display text-3xl mt-4">Slow fade.</p>
              <p className="text-sm text-muted mt-3">
                Reveal animations are restrained — a slight upward translation
                with eased opacity. No bounce, no overshoot.
              </p>
            </div>
          ))}
        </div>
      </EditorialSection>
    </>
  );
}
