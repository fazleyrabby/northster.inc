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
import { 
  products, 
  productBySlug 
} from "@/data/products";
import { 
  maintenanceReports, 
  catalogRevisions 
} from "@/data/archival";

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

  const related = products.filter((p) => p.slug !== slug && p.era === product.era).slice(0, 3);
  const isRestricted = product.clearance === "RESTRICTED";

  // Filter maintenance records for this specific system
  const systemLogs = maintenanceReports.filter(r => r.system === product.code);
  
  // Find catalog revision where this system was first introduced
  const catalog = catalogRevisions[0];
  const introduction = catalog.revisions.find(r => r.systems.includes(product.code));

  return (
    <>
      {/* ── Document classification header ───────────────────── */}
      <div className="border-b border-border bg-panel-2">
        <Container size="wide">
          <div className="py-2 flex flex-wrap justify-between items-center gap-x-4 gap-y-0.5">
            <div className="flex flex-wrap gap-x-4 gap-y-0.5 min-w-0">
              <span className="doc-ref">NORTHSTER INC. / {product.division}</span>
              <span className="doc-ref hidden md:inline">RECORD_STATUS: PRESERVED</span>
            </div>
            <div className="flex flex-wrap justify-end gap-x-4 gap-y-0.5 shrink-0">
              <span className="doc-ref hidden sm:inline">ARCHIVE_ID: {product.archiveId}</span>
              <span className="doc-ref hidden md:inline">PART_NO: {product.partNumber}</span>
              <span className="doc-ref border border-border px-1.5 bg-background">
                CLEARANCE:{" "}
                {isRestricted
                  ? <span className="text-accent/90">RESTRICTED</span>
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
              <Link href="/products" className="doc-ref link-amber uppercase tracking-widest text-[10px]">← Catalogue Index / NS-CAT-001</Link>
              <span className="doc-ref opacity-40">|</span>
              <MetaLabel>{product.series}</MetaLabel>
              <MetaLabel accent>● {product.status}</MetaLabel>
            </div>
            <div className="flex gap-4">
              <span className="doc-ref text-[10px] opacity-40 italic">Rev IV Protocol Active</span>
              <span className="doc-ref text-[10px] tabular-nums">{product.lot}</span>
            </div>
          </div>
        </Container>
      </div>

      {/* ── Cinematic hero — institutional focus ──────────────── */}
      <section className="border-b border-border-strong bg-panel/10">
        <Container size="wide">
          <div className="pt-20 pb-20 grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-9">
              <div className="flex items-center gap-4 mb-6">
                <span className="doc-ref text-xs tracking-[0.3em] opacity-40">{product.division}</span>
                <span className="w-8 h-[1px] bg-border-strong" />
                <span className="doc-ref text-xs tracking-[0.3em] opacity-40">{product.year}</span>
              </div>
              <h1 className="font-display text-5xl sm:text-7xl md:text-9xl leading-[0.88] reveal break-words">
                {product.code}
              </h1>
              <p className="font-display italic text-2xl md:text-4xl text-muted mt-6 reveal reveal-delay-1 max-w-2xl leading-tight">
                {product.name}
              </p>
            </div>
            <div className="col-span-12 lg:col-span-3 lg:pt-12">
              <div className="border border-border-strong bg-panel/40 p-6 md:p-8 space-y-6 archival-plate">
                <div className="space-y-1">
                  <MetaLabel>INSTITUTIONAL_REF</MetaLabel>
                  <p className="doc-ref text-xs font-bold">{product.archiveId}</p>
                </div>
                <div className="space-y-1">
                  <MetaLabel>PRODUCTION_STATUS</MetaLabel>
                  <p className="doc-ref text-xs">{product.status}</p>
                </div>
                <div className="pt-4 border-t border-border-soft">
                  <p className="text-[11px] text-muted leading-relaxed italic">
                    &ldquo;{product.tagline}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Technical Documentation Dossier ──────────────────── */}
      <section className="border-b border-border-strong">
        <Container size="wide" className="py-20">
          <Divider label="01 — SYSTEM DOSSIER" meta={product.archiveId} />
          
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Illustrations & History */}
            <div className="lg:col-span-7 space-y-12">
              <div className="border border-border-strong bg-panel relative archival-plate">
                <div className="border-b border-border-strong px-4 py-2 bg-panel-2 flex justify-between">
                  <span className="doc-ref text-[10px]">FIG_01 / TECHNICAL_ILLUSTRATION</span>
                  <span className="doc-ref text-[10px]">SCALE: NTS</span>
                </div>
                <div className="p-8 md:p-12">
                  <ProductGlyph slug={product.slug} className="w-full h-auto text-text opacity-90" />
                </div>
                <div className="border-t border-border-strong px-4 py-2 bg-panel-2 flex justify-between">
                  <span className="doc-ref text-[10px]">{product.code} / FRONT_ELEVATION</span>
                  <span className="doc-ref text-[10px]">REV_A</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <Divider label="MANUFACTURING_HISTORY" />
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <span className="doc-ref text-[10px] tabular-nums opacity-40">1978</span>
                      <p className="doc-ref text-[10px] leading-relaxed">Design cooperative established in Northern Provinces.</p>
                    </div>
                    {introduction && (
                      <div className="flex gap-4">
                        <span className="doc-ref text-[10px] tabular-nums text-accent">{introduction.date.split('.')[0]}</span>
                        <p className="doc-ref text-[10px] leading-relaxed font-bold">Initial deployment. Catalogued under {catalog.code} REV {introduction.rev}.</p>
                      </div>
                    )}
                    <div className="flex gap-4">
                      <span className="doc-ref text-[10px] tabular-nums opacity-40">{product.year}</span>
                      <p className="doc-ref text-[10px] leading-relaxed">Manufacturing Lot {product.lot} initiated.</p>
                    </div>
                    <div className="flex gap-4">
                      <span className="doc-ref text-[10px] tabular-nums opacity-40">1998</span>
                      <p className="doc-ref text-[10px] leading-relaxed">Archive Division 04 seals manufacturing record.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <Divider label="OPERATIONAL_RECORDS" />
                  <div className="space-y-4">
                    {systemLogs.length > 0 ? systemLogs.map(log => (
                      <div key={log.id} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="doc-ref text-[9px] text-accent/80 font-bold">{log.date}</span>
                          <span className="doc-ref text-[9px] opacity-30">{log.id}</span>
                        </div>
                        <p className="doc-ref text-[10px] leading-relaxed opacity-60 italic">{log.action}</p>
                      </div>
                    )) : (
                      <p className="doc-ref text-[10px] opacity-40 italic">No historical service logs recovered for this ID.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Technical Spec Table */}
            <div className="lg:col-span-5">
              <TechnicalPanel
                title="TECHNICAL SPECIFICATIONS"
                docRef={`${product.partNumber} / FULL_SPEC`}
                className="archival-plate"
                flush
              >
                <table className="w-full text-left border-collapse">
                  <tbody>
                    {product.spec.map((row, i) => (
                      <tr
                        key={row.label}
                        className={`border-b border-border-soft ${i % 2 === 0 ? "bg-panel-2/40" : ""}`}
                      >
                        <td className="px-5 py-3">
                          <MetaLabel className="text-[10px]">{row.label}</MetaLabel>
                        </td>
                        <td className="px-5 py-3 text-[11px] text-text font-mono tracking-wide text-right">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TechnicalPanel>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="border border-border-strong p-5 bg-panel/20">
                  <MetaLabel className="mb-2">DEPLOYMENT</MetaLabel>
                  <p className="font-display text-3xl">{product.unitsDeployed}</p>
                  <span className="doc-ref text-[9px] opacity-40">TOTAL_UNITS</span>
                </div>
                <div className="border border-border-strong p-5 bg-panel/20">
                  <MetaLabel className="mb-2">LAST_SERVICE</MetaLabel>
                  <p className="font-display text-3xl tabular-nums">{product.lastMaintenance.split(' ')[0]}</p>
                  <span className="doc-ref text-[9px] opacity-40">RECORDED_DATE</span>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* ── Product Hero Photography ────────────────────────── */}
      <section className="border-b border-border-strong">
        <Container size="wide" className="py-0">
          <div className="border-b border-border-strong bg-panel-2 px-5 py-3 flex justify-between items-center">
            <span className="doc-ref text-[10px]">RECORD_PHOTO / {product.code}_FRONT_STATIONARY</span>
            <span className="doc-ref text-[10px]">TUNGSTEN_LIGHTING_ENV</span>
          </div>
          <div className="bg-panel min-h-[400px] flex items-center justify-center">
            <ProductHeroImage slug={product.slug} product={product} />
          </div>
        </Container>
      </section>

      {/* ── Editorial Summary ────────────────────────────────── */}
      <EditorialSection>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <Divider label="02 — SYSTEM SUMMARY" />
            <div className="mt-10 space-y-6">
              <h2 className="font-display text-4xl leading-tight">
                Engineered for <span className="italic text-accent">stability</span>.
              </h2>
              <p className="text-sm text-muted leading-relaxed">
                {product.summary}
              </p>
            </div>
          </div>
          <div className="md:col-span-7 md:col-start-6 space-y-8 md:border-l border-border-strong md:pl-12 pt-8 md:pt-0 border-t md:border-t-0">
            <Divider label="ENGINEERING_NOTES" />
            {product.notes.map((n, i) => (
              <p key={i} className="text-sm md:text-base text-text/80 leading-relaxed font-mono italic">
                &ldquo;{n}&rdquo;
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

            <div className="mt-8 border border-border overflow-x-auto">
              <div className="min-w-[560px]">
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
