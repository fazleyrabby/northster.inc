import Container from "@/components/layout/Container";
import MetaLabel from "@/components/ui/MetaLabel";
import Button from "@/components/ui/Button";

const STATS = [
  { k: "ESTABLISHED",   v: "1978" },
  { k: "DIVISIONS",     v: "07" },
  { k: "FIELD UNITS",   v: "4,210" },
  { k: "ARCHIVE INDEX", v: "NS-ARC-0356" },
  { k: "SIGNAL CH.",    v: "04" },
];

export default function Hero() {
  return (
    <section className="relative border-b border-border">

      {/* ── Document classification bar — topmost strip ─────── */}
      <div className="border-b border-border bg-panel-2">
        <Container size="wide">
          <div className="py-2 grid grid-cols-12 gap-4 items-center">
            <div className="col-span-7 flex flex-wrap gap-x-6 gap-y-0.5">
              <span className="doc-ref phosphor-emerge">NORTHSTER INC. / COMPUTATIONAL DIVISION</span>
              <span className="doc-ref phosphor-emerge reveal-delay-1">NS-SYS-INDEX / REVISION IV</span>
              <span className="doc-ref phosphor-emerge reveal-delay-2">ARCHIVE DIV. 04</span>
            </div>
            <div className="col-span-5 flex justify-end items-center gap-x-5 flex-wrap gap-y-0.5">
              <span className="doc-ref phosphor-emerge reveal-delay-2">EST. 1978 — NORTHERN PROVINCES</span>
              <span className="doc-ref phosphor-emerge reveal-delay-3 inline-flex items-center gap-1.5">
                <span className="meta meta-accent signal-pulse">●</span>
                CH.04 STABLE
              </span>
            </div>
          </div>
        </Container>
      </div>

      {/* ── Operational status strip ─────────────────────────── */}
      <div className="border-b border-border bg-panel/40">
        <Container size="wide">
          <div className="py-1.5 flex flex-wrap gap-x-8 gap-y-0.5">
            <MetaLabel>★ INDEX / NORTHSTER</MetaLabel>
            <MetaLabel>FIELD RECORD // 1978–PRESENT</MetaLabel>
            <MetaLabel>MANUFACTURING LOG ACTIVE</MetaLabel>
            <MetaLabel>INTERNAL DISTRIBUTION ONLY</MetaLabel>
            <MetaLabel>REF: NS-PROG-AX</MetaLabel>
          </div>
        </Container>
      </div>

      {/* ── Three-column institutional body ──────────────────── */}
      <Container size="wide">
        <div className="grid grid-cols-12 gap-0 pt-12 pb-0">

          {/* ── Col 1: Classification index ─────────────────── */}
          <div className="col-span-12 md:col-span-3 border-b md:border-b-0 md:border-r border-border pr-0 md:pr-7 pb-8 md:pb-0 flex flex-col gap-0 reveal">

            <div className="pb-5 border-b border-border">
              <MetaLabel>CLASSIFICATION</MetaLabel>
              <p className="font-display text-xl mt-3 leading-snug">
                Institutional<br />Computing<br />Systems
              </p>
            </div>

            <div className="py-5 border-b border-border space-y-2">
              <div className="flex justify-between items-baseline">
                <MetaLabel>PROGRAM</MetaLabel>
                <span className="doc-ref">AXIS</span>
              </div>
              <div className="flex justify-between items-baseline">
                <MetaLabel>ARCHIVED</MetaLabel>
                <span className="doc-ref">1981</span>
              </div>
              <div className="flex justify-between items-baseline">
                <MetaLabel>STATUS</MetaLabel>
                <span className="doc-ref flex items-center gap-1">
                  <span className="meta meta-accent signal-breathe">●</span> FIELD ACTIVE
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <MetaLabel>MESH</MetaLabel>
                <span className="doc-ref">V3 / STABLE</span>
              </div>
            </div>

            <div className="py-5 border-b border-border space-y-1.5">
              <span className="doc-ref block">NS-PROG-AX / AXIS PROGRAMME</span>
              <span className="doc-ref block">NS-CAT-001 / CATALOGUE ACTIVE</span>
              <span className="doc-ref block">TRANSMISSION OPEN</span>
            </div>

            <div className="pt-5 hidden md:block">
              <MetaLabel>DIVISIONS</MetaLabel>
              <div className="mt-3 space-y-1">
                {["AXIS LAB","EDITORIAL","INFRASTRUCTURE","HORIZON","POLARIS","ORBITAL","ARCHIVE"].map(d => (
                  <span key={d} className="doc-ref block">{d}</span>
                ))}
              </div>
            </div>

          </div>

          {/* ── Col 2: Primary heading ───────────────────────── */}
          <div className="col-span-12 md:col-span-5 px-0 md:px-8 pt-10 md:pt-0 pb-0 border-b md:border-b-0 md:border-r border-border flex flex-col justify-between">
            <div>
              <span className="doc-ref reveal">
                VOL. IV — RECOVERED TRANSMISSIONS // 1978–1998
              </span>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.92] mt-5 reveal reveal-delay-1">
                Computing<br />
                <span className="italic text-accent">without</span><br />
                distraction.
              </h1>
              <p className="text-sm text-muted leading-relaxed mt-7 max-w-xs reveal reveal-delay-2">
                Northster Inc. archives industrial computing systems
                from a parallel timeline — monochrome workstations,
                signal infrastructure, and quiet machines built for
                environments that reward focus.
              </p>
            </div>

            <div className="pt-8 pb-10 md:pb-12 reveal reveal-delay-2">
              <hr className="rule mb-6" />
              <div className="flex flex-wrap gap-3">
                <Button href="/products">VIEW THE ARCHIVE</Button>
                <Button href="/philosophy" variant="ghost">PHILOSOPHY</Button>
              </div>
            </div>
          </div>

          {/* ── Col 3: System index + operational status ─────── */}
          <div className="col-span-12 md:col-span-4 pl-0 md:pl-8 pt-10 md:pt-0 pb-10 reveal reveal-delay-1">

            <div className="pb-5 border-b border-border">
              <MetaLabel>SYSTEM INDEX / NS-CAT-001</MetaLabel>
            </div>

            <div className="mt-0 divide-y divide-border">
              {[
                { code: "AX–01",           year: "1981", status: "ARCHIVE" },
                { code: "MONO/3",          year: "1983", status: "ARCHIVE" },
                { code: "SIGNAL NODE",     year: "1985", status: "FIELD" },
                { code: "VECTOR TERMINAL", year: "1986", status: "ARCHIVE" },
                { code: "HZN–90",          year: "1989", status: "FIELD" },
                { code: "POLARIS UNIT",    year: "1990", status: "RESTRICTED" },
                { code: "ORBITAL",         year: "1992", status: "RESTRICTED" },
              ].map((sys, i) => (
                <div key={sys.code} className="py-2.5 grid grid-cols-12 gap-2 items-baseline phosphor-emerge" style={{animationDelay: `${0.1 + i * 0.07}s`}}>
                  <span className="col-span-1 doc-ref">{String(i + 1).padStart(2, "0")}</span>
                  <span className="col-span-6 text-xs font-mono text-text/75 tracking-wide">{sys.code}</span>
                  <span className="col-span-2 doc-ref text-right">{sys.year}</span>
                  <span className={`col-span-3 doc-ref text-right ${sys.status === "RESTRICTED" ? "text-accent/60" : ""}`}>
                    {sys.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-5 border-t border-border space-y-2">
              <div className="flex justify-between">
                <MetaLabel>OPEN ENTRIES</MetaLabel>
                <span className="doc-ref">5 / 7</span>
              </div>
              <div className="flex justify-between">
                <MetaLabel>RESTRICTED</MetaLabel>
                <span className="doc-ref text-accent/60">2 / 7</span>
              </div>
              <div className="flex justify-between">
                <MetaLabel>ARCHIVE DATE</MetaLabel>
                <span className="doc-ref">1998.01.30</span>
              </div>
            </div>

          </div>
        </div>

        {/* ── Stats strip ───────────────────────────────────── */}
        <div className="border-t border-border-strong">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 divide-x divide-border">
            {STATS.map((s) => (
              <div key={s.k} className="py-4 px-5 flex flex-col gap-1 first:pl-0">
                <MetaLabel>{s.k}</MetaLabel>
                <span className="font-display text-2xl">{s.v}</span>
              </div>
            ))}
          </div>
        </div>

      </Container>
    </section>
  );
}
