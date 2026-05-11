import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/layout/Container";
import EditorialSection from "@/components/sections/EditorialSection";
import MetaLabel from "@/components/ui/MetaLabel";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import TechnicalPanel from "@/components/ui/TechnicalPanel";
import ProductGlyph from "@/components/atmosphere/ProductGlyph";
import ProductHeroImage from "@/components/archival/ProductHeroImage";
import ProductCard from "@/components/sections/ProductCard";
import CTASection from "@/components/sections/CTASection";
import { products, productBySlug } from "@/data/products";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return { title: "Not Found — NORTHSTER INC." };
  return {
    title: `${product.code} — ${product.name} — NORTHSTER INC.`,
    description: product.summary,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== slug).slice(0, 3);
  const isRestricted = product.clearance === "RESTRICTED";

  return (
    <>
      {/* ── Document classification header ───────────────────── */}
      <div className="border-b border-border bg-panel-2">
        <Container size="wide">
          <div className="py-2 grid grid-cols-12 gap-4 items-center">
            <div className="col-span-6 flex flex-wrap gap-x-6 gap-y-0.5">
              <span className="doc-ref">NORTHSTER INC. / {product.division}</span>
            </div>
            <div className="col-span-6 flex justify-end flex-wrap gap-x-5 gap-y-0.5">
              <span className="doc-ref">DOC: {product.archiveId}</span>
              <span className="doc-ref">PART: {product.partNumber}</span>
              <span className="doc-ref">
                CLEARANCE: {" "}
                {isRestricted
                  ? <span className="text-accent/70">RESTRICTED</span>
                  : "OPEN"}
              </span>
            </div>
          </div>
        </Container>
      </div>

      {/* ── Catalogue breadcrumb ──────────────────────────────── */}
      <div className="border-b border-border bg-panel/50">
        <Container size="wide">
          <div className="py-2 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-x-4 gap-y-1 items-center">
              <Link href="/products" className="doc-ref link-amber">← NS-CAT-001 / CATALOGUE</Link>
              <span className="doc-ref opacity-40">|</span>
              <MetaLabel>{product.series}</MetaLabel>
              <MetaLabel>{product.year}</MetaLabel>
              <MetaLabel accent>● {product.status}</MetaLabel>
            </div>
            <span className="doc-ref">{product.lot}</span>
          </div>
        </Container>
      </div>

      {/* ── Cinematic hero — spacious, type-led ──────────────── */}
      <section className="border-b border-border">
        <Container size="wide">
          <div className="pt-14 pb-16 grid grid-cols-12 gap-0">
            {/* Heading block */}
            <div className="col-span-12 md:col-span-9">
              <span className="doc-ref">{product.series} / {product.year} — {product.division}</span>
              <h1 className="font-display text-7xl md:text-8xl lg:text-9xl leading-[0.92] mt-4 reveal">
                {product.code}
              </h1>
              <p className="font-display italic text-2xl md:text-3xl text-muted mt-4 leading-tight reveal reveal-delay-1">
                {product.name}
              </p>
            </div>
            {/* Classification block — right-aligned */}
            <div className="col-span-12 md:col-span-3 md:pt-8 flex flex-col gap-3 reveal reveal-delay-2">
              <div className="border border-border bg-panel p-4 space-y-2">
                <MetaLabel>DOCUMENT REFERENCE</MetaLabel>
                <div className="pt-1 space-y-1.5">
                  <span className="doc-ref block">{product.archiveId}</span>
                  <span className="doc-ref block">{product.partNumber}</span>
                  <span className="doc-ref block">{product.lot}</span>
                  <span className="doc-ref block">REV. A</span>
                  <span className="doc-ref block">CLEARANCE: {product.clearance}</span>
                </div>
              </div>
              <div className="border-l border-accent/40 pl-4">
                <p className="text-xs text-text/70 leading-relaxed italic">
                  &ldquo;{product.tagline}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Hero archival product photograph ─────────────────── */}
      <section className="border-b border-border">
        <Container size="wide" className="py-0">
          {/* Title block */}
          <div className="border-b border-border bg-panel-2 px-5 py-2 flex justify-between items-center">
            <div className="flex gap-6 flex-wrap">
              <span className="doc-ref">UNIT REFERENCE PHOTOGRAPH / FRONT VIEW</span>
              <span className="doc-ref">{product.code} — {product.name.toUpperCase()}</span>
            </div>
            <span className="doc-ref">ARCHIVE / INTERNAL USE ONLY</span>
          </div>
          {/* Hero photograph */}
          <div className="bg-panel">
            <ProductHeroImage slug={product.slug} product={product} />
          </div>
          {/* Annotation strip */}
          <div className="border-t border-border bg-panel-2 px-5 py-2 grid grid-cols-2 md:grid-cols-4 gap-4">
            {product.spec.slice(0, 4).map((row) => (
              <div key={row.label} className="flex flex-col gap-0.5">
                <span className="doc-ref">{row.label}</span>
                <span className="meta text-text/80">{row.value}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Technical reference render ────────────────────────── */}
      <section className="border-b border-border">
        <Container size="wide" className="py-0">
          {/* Blueprint title block */}
          <div className="border-b border-border bg-panel-2 px-5 py-2 flex justify-between items-center">
            <div className="flex gap-6 flex-wrap">
              <span className="doc-ref">UNIT REFERENCE ILLUSTRATION / FRONT VIEW</span>
              <span className="doc-ref">{product.code} — {product.name.toUpperCase()}</span>
            </div>
            <span className="doc-ref">SCALE: NTS / INTERNAL USE ONLY</span>
          </div>
          {/* Render */}
          <div className="bg-panel">
            <ProductGlyph slug={product.slug} className="w-full h-auto text-text" />
          </div>
          {/* Annotation strip */}
          <div className="border-t border-border bg-panel-2 px-5 py-2 grid grid-cols-2 md:grid-cols-4 gap-4">
            {product.spec.slice(0, 4).map((row) => (
              <div key={row.label} className="flex flex-col gap-0.5">
                <span className="doc-ref">{row.label}</span>
                <span className="meta text-text/80">{row.value}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Technical documentation panels ───────────────────── */}
      <section className="border-b border-border">
        <Container size="wide" className="py-12 md:py-16">
          <Divider
            label="02 — ENGINEERING DOCUMENTATION"
            meta={`${product.archiveId} / REV. A`}
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-4">

            {/* Panel A — Full specification */}
            <div className="md:col-span-5">
              <TechnicalPanel
                title="TECHNICAL SPECIFICATION"
                docRef={`${product.partNumber} / COMPLETE`}
                flush
              >
                <table className="w-full text-left border-collapse">
                  <tbody>
                    {product.spec.map((row, i) => (
                      <tr
                        key={row.label}
                        className={`border-b border-border ${i % 2 === 0 ? "bg-panel-2/60" : ""}`}
                      >
                        <td className="px-4 py-2.5">
                          <MetaLabel>{row.label}</MetaLabel>
                        </td>
                        <td className="px-4 py-2.5 text-xs text-text/80 font-mono tracking-wide text-right">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TechnicalPanel>
            </div>

            {/* Panel B — Deployment record */}
            <div className="md:col-span-4">
              <TechnicalPanel
                title="DEPLOYMENT & FIELD RECORD"
                docRef="NS-FLD-04"
                className="h-full"
              >
                <dl className="space-y-4">
                  {[
                    { k: "UNITS DEPLOYED", v: product.unitsDeployed },
                    { k: "LAST MAINTENANCE", v: product.lastMaintenance },
                    { k: "FIELD STATUS", v: product.status },
                    { k: "DIVISION", v: product.division },
                    { k: "ARCHIVE ID", v: product.archiveId },
                    { k: "PART NUMBER", v: product.partNumber },
                    { k: "LOT", v: product.lot },
                    { k: "CLEARANCE", v: product.clearance },
                  ].map(({ k, v }) => (
                    <div key={k} className="flex justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
                      <MetaLabel>{k}</MetaLabel>
                      <span className={`text-xs font-mono tracking-wide text-right ${
                        isRestricted && v === "RESTRICTED" ? "text-accent/70" : "text-text/75"
                      }`}>
                        {v}
                      </span>
                    </div>
                  ))}
                </dl>
              </TechnicalPanel>
            </div>

            {/* Panel C — Archive status */}
            <div className="md:col-span-3">
              <TechnicalPanel
                title="ARCHIVE STATUS"
                docRef="DIV. 04"
                className="h-full"
              >
                <div className="space-y-5">
                  <div>
                    <MetaLabel>SYSTEM STATUS</MetaLabel>
                    <div className="mt-2 flex items-center gap-2">
                      <MetaLabel accent>●</MetaLabel>
                      <span className="text-xs text-text/80 font-mono">{product.status}</span>
                    </div>
                  </div>
                  <hr className="rule" />
                  <div>
                    <MetaLabel>MANUFACTURING SERIES</MetaLabel>
                    <p className="text-xs text-text/75 mt-1.5 font-mono leading-relaxed">{product.series}</p>
                  </div>
                  <hr className="rule" />
                  <div>
                    <MetaLabel>PRODUCTION YEAR</MetaLabel>
                    <p className="font-display text-4xl mt-1.5">{product.year}</p>
                  </div>
                  <hr className="rule" />
                  <div>
                    <MetaLabel>ARCHIVE DIVISION</MetaLabel>
                    <p className="text-xs text-text/75 mt-1.5 font-mono leading-relaxed">
                      NORTHSTER INC.<br />
                      ARCHIVE DIV. 04<br />
                      MANUFACTURING RECORD<br />
                      SEALED: 1998.01.30
                    </p>
                  </div>
                </div>
              </TechnicalPanel>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Editorial summary — spacious, cinematic ──────────── */}
      <EditorialSection>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <Divider label="03 — SYSTEM SUMMARY" meta="NS-SUMMARY" />
            <h2 className="font-display text-3xl md:text-4xl mt-10 leading-tight">
              Designed for sustained operation.
            </h2>
            <p className="text-xs text-muted mt-6 leading-relaxed">
              {product.division}
            </p>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6 mt-10 md:mt-0 space-y-5 border-l border-border pl-6 md:pl-8">
            <p className="text-sm text-text/80 leading-relaxed">{product.summary}</p>
            {product.notes.map((n, i) => (
              <p key={i} className="text-sm text-muted leading-relaxed border-l border-border-soft pl-4">
                {n}
              </p>
            ))}
          </div>
        </div>
      </EditorialSection>

      {/* ── Field notes — operational log entries ────────────── */}
      {product.fieldNotes.length > 0 && (
        <section className="border-b border-border">
          <Container size="wide" className="py-12 md:py-16">
            <Divider label="04 — FIELD NOTES / OPERATIONAL LOG" meta={`${product.archiveId} / ${product.fieldNotes.length} ENTRIES`} />

            <div className="mt-8 border border-border">
              <div className="border-b border-border bg-panel-2 px-5 py-2 grid grid-cols-12 gap-4">
                <span className="col-span-2 doc-ref">ID</span>
                <span className="col-span-2 doc-ref">DATE</span>
                <span className="col-span-2 doc-ref">DIVISION</span>
                <span className="col-span-6 doc-ref">NOTATION</span>
              </div>
              {product.fieldNotes.map((note, i) => (
                <div
                  key={note.id}
                  className={`grid grid-cols-12 gap-4 border-b border-border last:border-b-0 hover:bg-panel/40 transition-colors duration-300 ${i % 2 === 0 ? "bg-panel-2/30" : ""}`}
                >
                  <div className="col-span-2 px-5 py-4 border-r border-border">
                    <span className="doc-ref">{note.id}</span>
                  </div>
                  <div className="col-span-2 px-4 py-4 border-r border-border">
                    <span className="doc-ref">{note.date}</span>
                  </div>
                  <div className="col-span-2 px-4 py-4 border-r border-border">
                    <span className="doc-ref">{note.division}</span>
                  </div>
                  <div className="col-span-6 px-4 py-4">
                    <p className={`text-xs leading-relaxed ${isRestricted ? "text-accent/60" : "text-text/70"}`}>
                      {note.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── Related systems ───────────────────────────────────── */}
      <section className="border-b border-border">
        <Container size="wide" className="py-12 md:py-16">
          <Divider
            label="05 — RELATED SYSTEMS"
            meta="NS-CAT-001 / CROSS-REFERENCE"
          />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i + 1} />
            ))}
          </div>
          <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
            <Button href="/products" variant="ghost">RETURN TO CATALOGUE</Button>
            <span className="doc-ref">{products.length} SYSTEMS INDEXED / NS-CAT-001</span>
          </div>
        </Container>
      </section>

      <CTASection
        label="TRANSMISSION / 03"
        docRef="NS-TRANS-03 / ACTIVE"
        title="Each system in the archive remains under active care."
        cta="VIEW THE NETWORK"
        href="/network"
      />
    </>
  );
}
