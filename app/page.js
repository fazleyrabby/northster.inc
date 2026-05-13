import Hero from "@/components/sections/Hero";
import EditorialSection from "@/components/sections/EditorialSection";
import CTASection from "@/components/sections/CTASection";
import SectionHeader from "@/components/typography/SectionHeader";
import Button from "@/components/ui/Button";
import { EraFeaturedProduct, EraSystemsTeaser, EraNetworkSection } from "@/components/sections/EraHomeContent";
import EraTimelineBlock from "@/components/sections/EraTimelineBlock";

export default function HomePage() {
  return (
    <>
      <Hero />
      <EraFeaturedProduct />

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
          {/* Pull quote */}
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

          {/* Body */}
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

      {/* ── Section 03 — Systems (era-aware) ────────────────── */}
      <EraSystemsTeaser />

      {/* ── Section 04 — Timeline (era-aware) ───────────────── */}
      <EditorialSection>
        <SectionHeader
          index="04"
          label="TIMELINE"
          docRef="NS-ARC-0356 / PARTIAL CLEARANCE"
          title="Recovered from the manufacturing record."
          intro="The timeline is partial. Some divisions kept careful logs; others did not. What follows has been cleared for general circulation."
        />
        <div className="mt-10">
          <EraTimelineBlock limit={4} />
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <Button href="/archive" variant="ghost">ENTER THE ARCHIVE</Button>
          <span className="doc-ref">ENTRIES 01–04 SHOWN</span>
        </div>
      </EditorialSection>

      {/* ── Section 05 — Network (era-aware) ────────────────── */}
      <EraNetworkSection />

      <CTASection />
    </>
  );
}
