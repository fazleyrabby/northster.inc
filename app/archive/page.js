import Container from "@/components/layout/Container";
import Link from "next/link";
import EditorialSection from "@/components/sections/EditorialSection";
import MetaLabel from "@/components/ui/MetaLabel";
import Divider from "@/components/ui/Divider";
import CTASection from "@/components/sections/CTASection";
import EraTimelineBlock from "@/components/sections/EraTimelineBlock";
import EraArchiveEntries from "@/components/sections/EraArchiveEntries";

export const metadata = { title: "Archive" };

export default function ArchivePage() {
  return (
    <>
      <section className="border-b border-border-soft">
        <Container size="wide" className="pt-20 pb-16">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex gap-x-10 gap-y-2 flex-wrap">
              {/* Archive era */}
              <MetaLabel className="archive-only">★ ARCHIVE / DIVISION 04</MetaLabel>
              <MetaLabel className="archive-only">PARTIAL CLEARANCE</MetaLabel>
              {/* Future era */}
              <MetaLabel className="future-only">★ CONTINUUM RECORD / 2225</MetaLabel>
              <MetaLabel className="future-only">FULL CLEARANCE / OPEN RECORD</MetaLabel>
            </div>
            <MetaLabel accent>● TRANSMISSION OPEN</MetaLabel>
          </div>
          <hr className="rule mt-10" />
          <div className="pt-16 md:pt-24 pb-8 grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Archive heading */}
            <h1 className="archive-only md:col-span-9 font-display text-5xl md:text-6xl lg:text-7xl leading-[0.92]">
              The recovered <span className="italic text-accent">record</span>.
            </h1>
            {/* Future heading */}
            <h1 className="future-only md:col-span-9 font-display text-5xl md:text-6xl lg:text-7xl leading-[0.92]">
              The institutional <span className="italic text-accent">record</span>.
            </h1>
            {/* Archive intro */}
            <p className="archive-only md:col-span-3 md:pt-6 text-base text-muted leading-relaxed">
              Field notes, engineering logs, and internal memoranda preserved
              by Archive Division 04. Some entries remain partially redacted.
            </p>
            {/* Future intro */}
            <p className="future-only md:col-span-3 md:pt-6 text-base text-muted leading-relaxed">
              The complete institutional record. Field notes, continuity logs,
              and internal memoranda spanning 1978 to 2225.
              All entries cleared for general circulation.
            </p>
          </div>
        </Container>
      </section>

      <EditorialSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/archive/documents" className="group border border-border-strong bg-panel/30 p-8 hover:border-accent/40 transition-colors archival-plate">
            <MetaLabel className="mb-6">SEGMENT: DOCUMENTATION</MetaLabel>
            <h3 className="font-display text-4xl mb-4 group-hover:text-accent transition-colors">Engineering Records</h3>
            <p className="text-sm text-muted leading-relaxed font-mono">Recovered maintenance logs, engineering notes, and internal manufacturing notices. Classified under Revision IV protocol.</p>
            <div className="mt-8 pt-6 border-t border-border-soft flex justify-between items-center">
              <span className="doc-ref text-[10px] opacity-40">NS-ARC-DOC</span>
              <span className="doc-ref text-[10px] link-amber">ACCESS_ARCHIVE →</span>
            </div>
          </Link>

          <Link href="/archive/transmissions" className="group border border-border-strong bg-panel/30 p-8 hover:border-accent/40 transition-colors archival-plate">
            <MetaLabel className="mb-6">SEGMENT: TRANSMISSIONS</MetaLabel>
            <h3 className="font-display text-4xl mb-4 group-hover:text-accent transition-colors">Signal Capture</h3>
            <p className="text-sm text-muted leading-relaxed font-mono">Passive recordings from the Northern Relay Chain. Continuous waterfall capture data recovered through 1998.</p>
            <div className="mt-8 pt-6 border-t border-border-soft flex justify-between items-center">
              <span className="doc-ref text-[10px] opacity-40">NS-ARC-TX</span>
              <span className="doc-ref text-[10px] link-amber">ACCESS_TRANS →</span>
            </div>
          </Link>

          <Link href="/archive/divisions" className="group border border-border-strong bg-panel/30 p-8 hover:border-accent/40 transition-colors archival-plate">
            <MetaLabel className="mb-6">SEGMENT: STRUCTURE</MetaLabel>
            <h3 className="font-display text-4xl mb-4 group-hover:text-accent transition-colors">Institutional Divisions</h3>
            <p className="text-sm text-muted leading-relaxed font-mono">The organizational architecture of Northster Inc. Focus, terminology, and status records for all branches.</p>
            <div className="mt-8 pt-6 border-t border-border-soft flex justify-between items-center">
              <span className="doc-ref text-[10px] opacity-40">NS-ARC-DIV</span>
              <span className="doc-ref text-[10px] link-amber">VIEW_DIVISIONS →</span>
            </div>
          </Link>
        </div>
      </EditorialSection>

      <EditorialSection>
        <Divider label="01 — INSTITUTIONAL TIMELINE" />
        <div className="mt-14">
          <EraTimelineBlock />
        </div>
      </EditorialSection>

      <EditorialSection>
        <Divider label="02 — RECORD FRAGMENTS" />
        <div className="mt-12">
          <EraArchiveEntries />
        </div>
      </EditorialSection>

      <CTASection
        label="FACILITY / 02"
        title="Research continues at the speed of its environment."
        cta="VIEW RESEARCH LABS"
        href="/labs"
      />
    </>
  );
}
