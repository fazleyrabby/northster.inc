"use client";

import { useTemporal } from "@/components/atmosphere/TemporalEngine";
import { featuredProduct, featuredFutureProduct, archiveProducts, futureProducts } from "@/data/products";
import FeaturedProduct from "@/components/sections/FeaturedProduct";
import ProductCard from "@/components/sections/ProductCard";
import EditorialSection from "@/components/sections/EditorialSection";
import SectionHeader from "@/components/typography/SectionHeader";
import MetaLabel from "@/components/ui/MetaLabel";
import Button from "@/components/ui/Button";
import { futureNetworkNodes } from "@/data/archive";

export function EraFeaturedProduct() {
  const { era } = useTemporal();
  const product = era === "future" ? featuredFutureProduct : featuredProduct;
  return <FeaturedProduct product={product} />;
}

export function EraSystemsTeaser() {
  const { era } = useTemporal();
  const isFuture = era === "future";
  const list = isFuture ? futureProducts.slice(0, 3) : archiveProducts.slice(1, 4);
  const total = isFuture ? futureProducts.length : archiveProducts.length;

  return (
    <EditorialSection>
      <SectionHeader
        index="03"
        label={isFuture ? "SYSTEMS / ACTIVE" : "SYSTEMS / SELECTED"}
        docRef={isFuture ? "NS-CAT-V / PARTIAL LISTING" : "NS-CAT-001 / PARTIAL LISTING"}
        title={isFuture ? "Three systems from the continuum." : "Three systems from the archive."}
        intro={
          isFuture
            ? `Selected from the 2225 Northster catalogue. Continuity workstations, editorial systems, and relay infrastructure. Full catalogue contains ${total} active systems.`
            : `Selected from the Northster catalogue. Hardware, terminals, and signal infrastructure. Full catalogue contains ${total} indexed systems.`
        }
      />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {list.map((p, i) => (
          <ProductCard key={p.slug} product={p} index={i + 2} />
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
        <Button href="/products" variant="ghost">
          {isFuture ? "VIEW FULL CONTINUUM" : "VIEW FULL CATALOGUE"}
        </Button>
        <span className="doc-ref">
          {isFuture ? `${total} SYSTEMS ACTIVE / NS-CAT-V` : `${total} SYSTEMS INDEXED / NS-CAT-001`}
        </span>
      </div>
    </EditorialSection>
  );
}

export function EraNetworkSection() {
  const { era } = useTemporal();
  const isFuture = era === "future";

  if (isFuture) {
    return (
      <EditorialSection>
        <SectionHeader
          index="05"
          label="NETWORK / RELAY MESH"
          docRef="NS-RELAY-V5 / GLOBAL DISTRIBUTION"
          title="1.2 million nodes. Not one switched off."
          intro="The RELAY MESH NODE network — successor to the 1985 analog mesh — distributes continuously across six atmospheric layers and four ocean basins. 240 years of uninterrupted uptime."
        />

        <div className="mt-10 grid grid-cols-12 gap-0 border border-border">
          <div className="col-span-12 md:col-span-8 border-b md:border-b-0 md:border-r border-border relative">
            <div className="border-b border-border px-4 py-2 bg-panel/60 flex justify-between items-center">
              <span className="doc-ref">RELAY MAP — GLOBAL DISTRIBUTION / PARTIAL</span>
              <span className="doc-ref">NS-RELAY-V5</span>
            </div>
            <div className="aspect-[16/9] relative overflow-hidden bg-panel/20">
              <svg viewBox="0 0 800 450" className="absolute inset-0 w-full h-full text-text" preserveAspectRatio="xMidYMid meet">
                <g stroke="currentColor" strokeWidth="0.15" opacity="0.1">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="450" />
                  ))}
                  {Array.from({ length: 9 }).map((_, i) => (
                    <line key={`h${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} />
                  ))}
                </g>
                {/* Dense node scatter for 1.2M nodes impression */}
                {Array.from({ length: 28 }).map((_, i) => {
                  const x = 60 + (i * 97 + (i % 3) * 41) % 680;
                  const y = 40 + (i * 61 + (i % 5) * 29) % 370;
                  return (
                    <g key={i}>
                      <circle cx={x} cy={y} r={i % 7 === 0 ? 6 : 3} stroke="currentColor" strokeWidth="0.25" fill="none" opacity="0.3" />
                      <circle cx={x} cy={y} r="1.5" fill="currentColor" opacity="0.5" />
                    </g>
                  );
                })}
                {/* Primary relay spines */}
                <g stroke="currentColor" strokeWidth="0.4" opacity="0.25" fill="none">
                  <path d="M 80 60 L 200 80 L 350 55 L 500 70 L 650 45 L 750 80" />
                  <path d="M 60 200 L 180 220 L 320 195 L 480 215 L 620 200 L 740 230" />
                  <path d="M 100 360 L 250 340 L 400 370 L 560 345 L 700 380" />
                  <path d="M 200 80 L 180 220 L 250 340" />
                  <path d="M 500 70 L 480 215 L 400 370" />
                  <path d="M 650 45 L 620 200 L 700 380" />
                </g>
              </svg>
            </div>
            <div className="border-t border-border px-4 py-2 flex justify-between">
              <MetaLabel accent>● MESH STABLE</MetaLabel>
              <span className="doc-ref">DISTRIBUTION: GLOBAL / {futureNetworkNodes.length - 1} SECTORS VISIBLE</span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 flex flex-col">
            <div className="border-b border-border px-4 py-2 bg-panel/60">
              <MetaLabel>RELAY STATUS</MetaLabel>
            </div>
            <div className="flex-1 p-5 flex flex-col gap-5 text-sm text-muted leading-relaxed">
              <p>1,200,000+ RELAY MESH NODE units distributed across six atmospheric layers. Each unit has not been physically touched since deployment.</p>
              <p>The mesh is not fast. It was never meant to be fast. It was meant to outlast everything around it.</p>
              <div className="border-t border-border pt-4 space-y-1">
                <span className="doc-ref block">UPTIME: 240Y 00M</span>
                <span className="doc-ref block">LAST NODE ADDED: 2224.12.31</span>
                <span className="doc-ref block">INTERRUPTIONS: NONE ON RECORD</span>
              </div>
            </div>
            <div className="border-t border-border px-5 py-4 flex flex-col gap-2">
              <Button href="/network" variant="bare">VIEW THE RELAY MESH</Button>
              <span className="doc-ref">PARTIAL REGISTER / NS-RELAY-V5</span>
            </div>
          </div>
        </div>
      </EditorialSection>
    );
  }

  return (
    <EditorialSection>
      <SectionHeader
        index="05"
        label="NETWORK / INFRASTRUCTURE"
        docRef="NS-MESH-V3 / UPTIME 14Y 07M"
        title="The signal has not been switched off."
        intro="Northster's analog mesh network — first deployed in 1985 — continues to operate. Over 4,000 SIGNAL NODE units remain in the field."
      />

      <div className="mt-10 grid grid-cols-12 gap-0 border border-border">
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
  );
}
