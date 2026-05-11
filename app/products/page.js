import Container from "@/components/layout/Container";
import EditorialSection from "@/components/sections/EditorialSection";
import ProductCard from "@/components/sections/ProductCard";
import MetaLabel from "@/components/ui/MetaLabel";
import Divider from "@/components/ui/Divider";
import CTASection from "@/components/sections/CTASection";
import { products } from "@/data/products";

export const metadata = {
  title: "Products — NORTHSTER INC.",
};

export default function ProductsPage() {
  return (
    <>
      {/* ── Classification header ─────────────────────────────── */}
      <div className="border-b border-border bg-panel-2">
        <Container size="wide">
          <div className="py-2 flex flex-wrap justify-between gap-3">
            <span className="doc-ref">NORTHSTER INC. / MANUFACTURING DIVISION — NS-CAT-001</span>
            <div className="flex gap-5 flex-wrap">
              <span className="doc-ref">{products.length} SYSTEMS INDEXED</span>
              <span className="doc-ref">CLEARANCE: OPEN (PARTIAL)</span>
              <span className="doc-ref">ARCHIVE DIV. 04</span>
            </div>
          </div>
        </Container>
      </div>

      <section className="border-b border-border">
        <Container size="wide" className="pt-14 pb-0">
          <div className="flex flex-wrap justify-between gap-3">
            <MetaLabel>★ NORTHSTER / CATALOGUE</MetaLabel>
            <MetaLabel accent>● CATALOGUE ACTIVE</MetaLabel>
          </div>
          <hr className="rule mt-6" />

          {/* Cinematic heading */}
          <div className="pt-14 pb-16 grid grid-cols-12 gap-0">
            <div className="col-span-12 md:col-span-9">
              <span className="doc-ref">NS-CAT-001 / COMPUTATIONAL SYSTEMS / 1981–1992</span>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.92] mt-4">
                The Northster <span className="italic text-accent">catalogue</span>.
              </h1>
            </div>
            <div className="col-span-12 md:col-span-3 md:pt-6 flex flex-col justify-end">
              <div className="border border-border bg-panel p-4 space-y-2">
                <MetaLabel>CATALOGUE STATUS</MetaLabel>
                <div className="pt-1 space-y-1.5">
                  <span className="doc-ref block">NS-CAT-001 / ACTIVE</span>
                  <span className="doc-ref block">{products.length} SYSTEMS LISTED</span>
                  <span className="doc-ref block">2 RESTRICTED ENTRIES</span>
                  <span className="doc-ref block">ARCHIVE DIV. 04</span>
                  <span className="doc-ref block">LAST REVISED: 1998.01.30</span>
                </div>
              </div>
            </div>
          </div>

          {/* Catalogue index table — compact listing above the cards */}
          <div className="border border-border mb-0">
            <div className="border-b border-border bg-panel-2 px-5 py-2 grid grid-cols-12 gap-4">
              <span className="col-span-1 doc-ref">NO.</span>
              <span className="col-span-2 doc-ref">CODE</span>
              <span className="col-span-3 doc-ref">NAME</span>
              <span className="col-span-2 doc-ref">YEAR</span>
              <span className="col-span-2 doc-ref">STATUS</span>
              <span className="col-span-2 doc-ref">ARCHIVE REF</span>
            </div>
            {products.map((p, i) => (
              <div
                key={p.slug}
                className={`grid grid-cols-12 gap-4 border-b border-border last:border-b-0 hover:bg-panel/50 transition-colors duration-300 ${i % 2 === 0 ? "bg-panel-2/25" : ""}`}
              >
                <div className="col-span-1 px-5 py-3">
                  <span className="doc-ref">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="col-span-2 px-2 py-3">
                  <span className="text-xs font-mono text-text/80 tracking-wide">{p.code}</span>
                </div>
                <div className="col-span-3 px-2 py-3">
                  <span className="text-xs text-muted font-mono">{p.name}</span>
                </div>
                <div className="col-span-2 px-2 py-3">
                  <span className="doc-ref">{p.year}</span>
                </div>
                <div className="col-span-2 px-2 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="meta meta-accent">●</span>
                    <span className="doc-ref">{p.status}</span>
                  </div>
                </div>
                <div className="col-span-2 px-2 py-3">
                  <span className="doc-ref">{p.archiveId}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Full catalogue grid ────────────────────────────────── */}
      <EditorialSection>
        <Divider label="01 — SYSTEMS / INDEXED" meta="NS-CAT-001 / FULL LISTING" />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i + 1} />
          ))}
        </div>
      </EditorialSection>

      <CTASection
        label="TRANSMISSION / 04"
        docRef="NS-TRANS-04 / RESTRICTED"
        title="Several systems remain partially classified. Listen carefully."
        cta="ENTER LABS"
        href="/labs"
      />
    </>
  );
}
