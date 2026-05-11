import Hero from "@/components/sections/Hero";
import FeaturedProduct from "@/components/sections/FeaturedProduct";
import EditorialSection from "@/components/sections/EditorialSection";
import TimelineBlock from "@/components/sections/TimelineBlock";
import CTASection from "@/components/sections/CTASection";
import SectionHeader from "@/components/typography/SectionHeader";
import Container from "@/components/layout/Container";
import MetaLabel from "@/components/ui/MetaLabel";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import ProductCard from "@/components/sections/ProductCard";
import { featuredProduct, products } from "@/data/products";
import { timeline } from "@/data/timeline";

export default function HomePage() {
  const featured = featuredProduct;
  const teaser = products.slice(1, 4);
  const timelineTeaser = timeline.slice(0, 4);

  return (
    <>
      <Hero />
      <FeaturedProduct product={featured} />

      {/* ── Section 02 — Philosophy ─────────────────────────── */}
      <EditorialSection>
        <SectionHeader
          index="02"
          label="DESIGN PHILOSOPHY"
          docRef="NS-PHL-01 / UNCHANGED SINCE 1978"
          title="A future built from analog discipline."
          intro="The interface should disappear so the work can appear. Quiet machines for environments that reward focus — research stations, editorial bureaus, signal infrastructure."
        />

        <div className="mt-16 grid grid-cols-12 gap-0 border border-border">
          {/* Pull quote — left */}
          <div className="col-span-12 md:col-span-7 border-b md:border-b-0 md:border-r border-border p-6 md:p-8">
            <span className="doc-ref block mb-4">FIELD NOTE / NS-ARC-0041 — AXIS LAB / 1981</span>
            <p className="font-display text-2xl md:text-3xl leading-snug">
              &ldquo;Colour was deliberately withheld. In its absence,
              users formed deeper relationships with the structure
              of the interface itself.&rdquo;
            </p>
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex flex-wrap gap-x-6 gap-y-1">
                <span className="doc-ref">DOC: NS-ARC-0041</span>
                <span className="doc-ref">DIVISION: AXIS LAB</span>
                <span className="doc-ref">DATE: 1981.04.12</span>
              </div>
            </div>
          </div>

          {/* Body — right */}
          <div className="col-span-12 md:col-span-5 p-6 md:p-8 flex flex-col gap-5">
            <p className="text-sm text-muted leading-relaxed">
              Northster was founded in 1978 as a research cooperative.
              It was never a consumer brand. The systems it built were
              intended for long service in environments where reliability
              mattered more than novelty.
            </p>
            <p className="text-sm text-muted leading-relaxed">
              Many systems remain in continuous field operation. The
              SIGNAL NODE mesh — first deployed in 1985 — has not been
              switched off since.
            </p>
            <div className="pt-2 border-t border-border flex items-center justify-between">
              <Button href="/philosophy" variant="bare">READ PHILOSOPHY</Button>
              <span className="doc-ref">NS-PHL-01</span>
            </div>
          </div>
        </div>
      </EditorialSection>

      {/* ── Section 03 — Systems ─────────────────────────────── */}
      <EditorialSection>
        <SectionHeader
          index="03"
          label="SYSTEMS / SELECTED"
          docRef="NS-CAT-001 / PARTIAL LISTING"
          title="Three systems from the archive."
          intro="Selected from the Northster catalogue. Hardware, terminals, and signal infrastructure. Full catalogue contains seven indexed systems."
        />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {teaser.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i + 2} />
          ))}
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <Button href="/products" variant="ghost">VIEW FULL CATALOGUE</Button>
          <span className="doc-ref">7 SYSTEMS INDEXED / NS-CAT-001</span>
        </div>
      </EditorialSection>

      {/* ── Section 04 — Timeline ────────────────────────────── */}
      <EditorialSection>
        <SectionHeader
          index="04"
          label="TIMELINE"
          docRef="NS-ARC-0356 / PARTIAL CLEARANCE"
          title="Recovered from the manufacturing record."
          intro="The timeline is partial. Some divisions kept careful logs; others did not. What follows has been cleared for general circulation."
        />
        <div className="mt-10">
          <TimelineBlock entries={timelineTeaser} />
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <Button href="/archive" variant="ghost">ENTER THE ARCHIVE</Button>
          <span className="doc-ref">ENTRIES 01–04 OF 07 SHOWN</span>
        </div>
      </EditorialSection>

      {/* ── Section 05 — Network ─────────────────────────────── */}
      <EditorialSection>
        <SectionHeader
          index="05"
          label="NETWORK / INFRASTRUCTURE"
          docRef="NS-MESH-V3 / UPTIME 14Y 07M"
          title="The signal has not been switched off."
          intro="Northster's analog mesh network — first deployed in 1985 — continues to operate. Over 4,000 SIGNAL NODE units remain in the field."
        />

        <div className="mt-10 grid grid-cols-12 gap-0 border border-border">
          {/* Map panel */}
          <div className="col-span-12 md:col-span-8 border-b md:border-b-0 md:border-r border-border relative">
            <div className="border-b border-border px-4 py-2 bg-panel/60 flex justify-between items-center">
              <span className="doc-ref">FIELD MAP — NORTHERN PROVINCES / PARTIAL</span>
              <span className="doc-ref">NS-MESH-V3</span>
            </div>
            <div className="aspect-[16/9] relative overflow-hidden bg-panel/20">
              <svg viewBox="0 0 800 450" className="absolute inset-0 w-full h-full text-text" preserveAspectRatio="xMidYMid meet">
                <g stroke="currentColor" strokeWidth="0.2" opacity="0.15">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="450" />
                  ))}
                  {Array.from({ length: 9 }).map((_, i) => (
                    <line key={`h${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} />
                  ))}
                </g>
                {[
                  [180, 110], [330, 90], [480, 160], [610, 130],
                  [220, 280], [400, 320], [580, 290], [690, 380],
                ].map(([x, y], i) => (
                  <g key={i}>
                    <circle cx={x} cy={y} r="12" stroke="currentColor" strokeWidth="0.35" fill="none" opacity="0.5" />
                    <circle cx={x} cy={y} r="3" fill={i % 3 === 0 ? "#c7a96b" : "currentColor"} />
                    <text x={x + 16} y={y + 4} fontFamily="monospace" fontSize="7" fill="currentColor" opacity="0.65">
                      NODE/0{i + 1}
                    </text>
                  </g>
                ))}
                <g stroke="currentColor" strokeWidth="0.5" opacity="0.35" fill="none">
                  <path d="M 180 110 L 330 90 L 480 160 L 610 130" />
                  <path d="M 220 280 L 400 320 L 580 290 L 690 380" />
                  <path d="M 330 90 L 400 320" />
                  <path d="M 480 160 L 580 290" />
                </g>
              </svg>
            </div>
            <div className="border-t border-border px-4 py-2 flex justify-between">
              <MetaLabel accent>● MESH STABLE</MetaLabel>
              <span className="doc-ref">LAST AUDIT: 1998.01.30</span>
            </div>
          </div>

          {/* Status column */}
          <div className="col-span-12 md:col-span-4 flex flex-col">
            <div className="border-b border-border px-4 py-2 bg-panel/60">
              <MetaLabel>NETWORK STATUS</MetaLabel>
            </div>
            <div className="flex-1 p-5 flex flex-col gap-5 text-sm text-muted leading-relaxed">
              <p>Over four thousand SIGNAL NODE units remain in continuous field operation. Many have not been touched by an engineer in over a decade.</p>
              <p>The mesh is slow by modern standards. It was never meant to be fast. It was meant to be there.</p>
            </div>
            <div className="border-t border-border px-5 py-4 flex flex-col gap-2">
              <Button href="/network" variant="bare">VIEW THE NETWORK</Button>
              <span className="doc-ref">6 NODES VISIBLE / PARTIAL REGISTER</span>
            </div>
          </div>
        </div>
      </EditorialSection>

      <CTASection />
    </>
  );
}
