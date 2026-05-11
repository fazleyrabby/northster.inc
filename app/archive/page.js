import Container from "@/components/layout/Container";
import EditorialSection from "@/components/sections/EditorialSection";
import ArchiveItem from "@/components/sections/ArchiveItem";
import TimelineBlock from "@/components/sections/TimelineBlock";
import MetaLabel from "@/components/ui/MetaLabel";
import Divider from "@/components/ui/Divider";
import CTASection from "@/components/sections/CTASection";
import { archiveEntries } from "@/data/archive";
import { timeline } from "@/data/timeline";

export const metadata = { title: "Archive — NORTHSTER INC." };

export default function ArchivePage() {
  return (
    <>
      <section className="border-b border-border-soft">
        <Container size="wide" className="pt-20 pb-16">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex gap-x-10 gap-y-2 flex-wrap">
              <MetaLabel>★ ARCHIVE / DIVISION 04</MetaLabel>
              <MetaLabel>{archiveEntries.length} ENTRIES INDEXED</MetaLabel>
              <MetaLabel>PARTIAL CLEARANCE</MetaLabel>
            </div>
            <MetaLabel accent>● TRANSMISSION OPEN</MetaLabel>
          </div>
          <hr className="rule mt-10" />
          <div className="pt-16 md:pt-24 pb-8 grid grid-cols-1 md:grid-cols-12 gap-10">
            <h1 className="md:col-span-9 font-display text-5xl md:text-6xl lg:text-7xl leading-[0.92]">
              The recovered <span className="italic text-accent">record</span>.
            </h1>
            <p className="md:col-span-3 md:pt-6 text-base text-muted leading-relaxed">
              Field notes, engineering logs, and internal memoranda preserved
              by Archive Division 04. Some entries remain partially redacted.
            </p>
          </div>
        </Container>
      </section>

      <EditorialSection>
        <Divider label="01 — TIMELINE" />
        <div className="mt-14">
          <TimelineBlock entries={timeline} />
        </div>
      </EditorialSection>

      <EditorialSection>
        <Divider label="02 — ENTRIES" />
        <div className="mt-12">
          {archiveEntries.map((e) => (
            <ArchiveItem key={e.id} entry={e} />
          ))}
        </div>
      </EditorialSection>

      <CTASection
        label="TRANSMISSION / 02"
        title="The record continues to expand. Listen, occasionally."
        cta="VIEW LABS"
        href="/labs"
      />
    </>
  );
}
