"use client";

import { useTemporal } from "@/components/atmosphere/TemporalEngine";
import { archiveProducts, futureProducts } from "@/data/products";
import ProductCard from "@/components/sections/ProductCard";
import MetaLabel from "@/components/ui/MetaLabel";
import Divider from "@/components/ui/Divider";
import EditorialSection from "@/components/sections/EditorialSection";

export default function EraProductGrid() {
  const { era } = useTemporal();
  const isFuture = era === "future";
  const list = isFuture ? futureProducts : archiveProducts;

  return (
    <>
      {/* ── Classification header ─────────────────────────────── */}
      <div className="border-b border-border bg-panel-2">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="py-2 flex flex-wrap justify-between gap-3">
            {isFuture ? (
              <>
                <span className="doc-ref">NORTHSTER INC. / CONTINUITY SYSTEMS — NS-CAT-V / 2225</span>
                <div className="flex gap-5 flex-wrap">
                  <span className="doc-ref">{list.length} SYSTEMS ACTIVE</span>
                  <span className="doc-ref">CLEARANCE: CONTINUITY RECORD</span>
                  <span className="doc-ref">CONTINUUM DIV. 04</span>
                </div>
              </>
            ) : (
              <>
                <span className="doc-ref">NORTHSTER INC. / MANUFACTURING DIVISION — NS-CAT-001</span>
                <div className="flex gap-5 flex-wrap">
                  <span className="doc-ref">{list.length} SYSTEMS INDEXED</span>
                  <span className="doc-ref">CLEARANCE: OPEN (PARTIAL)</span>
                  <span className="doc-ref">ARCHIVE DIV. 04</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Page heading ──────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-14 pb-0">
          <div className="flex flex-wrap justify-between gap-3">
            <MetaLabel>{isFuture ? "★ NORTHSTER / CONTINUUM" : "★ NORTHSTER / CATALOGUE"}</MetaLabel>
            <MetaLabel accent>{isFuture ? "● SYSTEMS ACTIVE" : "● CATALOGUE ACTIVE"}</MetaLabel>
          </div>
          <hr className="rule mt-6" />

          <div className="pt-14 pb-16 grid grid-cols-12 gap-0">
            <div className="col-span-12 md:col-span-9">
              <span className="doc-ref">
                {isFuture ? "NS-CAT-V / CONTINUITY SYSTEMS / 2225" : "NS-CAT-001 / COMPUTATIONAL SYSTEMS / 1981–1992"}
              </span>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.92] mt-4">
                {isFuture ? (
                  <>The Northster <span className="italic text-accent">continuum</span>.</>
                ) : (
                  <>The Northster <span className="italic text-accent">catalogue</span>.</>
                )}
              </h1>
            </div>
            <div className="col-span-12 md:col-span-3 md:pt-6 flex flex-col justify-end">
              <div className="border border-border bg-panel p-4 space-y-2">
                <MetaLabel>{isFuture ? "CONTINUUM STATUS" : "CATALOGUE STATUS"}</MetaLabel>
                <div className="pt-1 space-y-1.5">
                  <span className="doc-ref block">{isFuture ? "NS-CAT-V / ACTIVE" : "NS-CAT-001 / ACTIVE"}</span>
                  <span className="doc-ref block">{list.length} SYSTEMS LISTED</span>
                  <span className="doc-ref block">
                    {isFuture ? "2 RESTRICTED ENTRIES" : "2 RESTRICTED ENTRIES"}
                  </span>
                  <span className="doc-ref block">
                    {isFuture ? "CONTINUUM DIV. 04" : "ARCHIVE DIV. 04"}
                  </span>
                  <span className="doc-ref block">
                    {isFuture ? "RECORD: 2225.01.01" : "LAST REVISED: 1998.01.30"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Catalogue index table */}
          <div className="border border-border mb-0 hidden md:block">
            <div className="border-b border-border bg-panel-2 px-5 py-2 grid grid-cols-12 gap-4">
              <span className="col-span-1 doc-ref">NO.</span>
              <span className="col-span-2 doc-ref">CODE</span>
              <span className="col-span-3 doc-ref">NAME</span>
              <span className="col-span-2 doc-ref">YEAR</span>
              <span className="col-span-2 doc-ref">STATUS</span>
              <span className="col-span-2 doc-ref">{isFuture ? "CONTINUUM REF" : "ARCHIVE REF"}</span>
            </div>
            {list.map((p, i) => (
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
                  <span className="doc-ref">{p.archiveId || p.continuumRef || "—"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product grid ─────────────────────────────────────── */}
      <EditorialSection>
        <Divider
          label={isFuture ? "01 — SYSTEMS / ACTIVE" : "01 — SYSTEMS / INDEXED"}
          meta={isFuture ? "NS-CAT-V / CONTINUUM LISTING" : "NS-CAT-001 / FULL LISTING"}
        />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i + 1} />
          ))}
        </div>
      </EditorialSection>
    </>
  );
}
