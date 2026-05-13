import Container from "@/components/layout/Container";
import EditorialSection from "@/components/sections/EditorialSection";
import MetaLabel from "@/components/ui/MetaLabel";
import Divider from "@/components/ui/Divider";
import CTASection from "@/components/sections/CTASection";
import EngineeringNote from "@/components/archival/EngineeringNote";
import EraLabsContent from "@/components/sections/EraLabsContent";

export const metadata = { title: "Labs" };

export default function LabsPage() {
  return (
    <>
      <section className="border-b border-border-soft">
        <Container size="wide" className="pt-20 pb-16">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex gap-x-10 gap-y-2 flex-wrap">
              {/* Archive era labels */}
              <MetaLabel className="archive-only">★ NORTHSTER / LABS</MetaLabel>
              <MetaLabel className="archive-only">RESEARCH DIVISION</MetaLabel>
              {/* Future era labels */}
              <MetaLabel className="future-only">★ NORTHSTER / CONTINUUM</MetaLabel>
              <MetaLabel className="future-only">RESEARCH STREAMS / 2225</MetaLabel>
            </div>
            <MetaLabel accent>● UNDER OBSERVATION</MetaLabel>
          </div>
          <hr className="rule mt-10" />
          <div className="pt-16 md:pt-24 pb-8 grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Archive heading */}
            <h1 className="archive-only md:col-span-9 font-display text-5xl md:text-6xl lg:text-7xl leading-[0.92]">
              Quiet <span className="italic text-accent">experiments</span>.
            </h1>
            {/* Future heading */}
            <h1 className="future-only md:col-span-9 font-display text-5xl md:text-6xl lg:text-7xl leading-[0.92]">
              Active <span className="italic text-accent">research streams</span>.
            </h1>
            {/* Archive intro */}
            <p className="archive-only md:col-span-3 md:pt-6 text-base text-muted leading-relaxed">
              Northster Labs pursues research without urgency. Some
              programmes have continued for decades. Results, when they
              arrive, are quietly published into the archive.
            </p>
            {/* Future intro */}
            <p className="future-only md:col-span-3 md:pt-6 text-base text-muted leading-relaxed">
              The Continuum research division operates without interruption.
              Six active programmes. 236 years of accumulated compute depth.
              Results are published into the institutional record.
            </p>
          </div>
        </Container>
      </section>

      <EditorialSection>
        <Divider label="01 — PROGRAMMES" />
        <EraLabsContent />
      </EditorialSection>

      <EditorialSection>
        <Divider label="02 — ENGINEERING OBSERVATIONS" />
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <EngineeringNote
            date="1987.05.14"
            author="CHIEF ENG. VARN"
            title="Observations on High-Altitude Signal Capture"
          >
            <p>
              The receivers at Station Tyra have begun to pick up harmonics that do not correspond to any known meteorological phenomena. The patterns are recursive.
            </p>
            <p>
              We have adjusted the tungsten filtration. The signal remains stable, though its source continues to elude triangulated capture.
            </p>
          </EngineeringNote>

          <EngineeringNote
            date="1991.11.02"
            author="SNR RES. HALDOR"
            title="Neural Linkage / Phase I Field Trials"
            classification="RESTRICTED"
          >
            <p>
              Subject reports a sensation of &apos;mechanical stillness&apos; when interfaced with the AX-01 array. The auditory signal is described as &apos;distant wind on metal&apos;.
            </p>
            <p>
              Stability remains at 98.4%. We are proceeding with secondary link tests under Revision IV protocols.
            </p>
          </EngineeringNote>
        </div>
      </EditorialSection>

      <CTASection
        label="TRANSMISSION / 05"
        title="Research is conducted at the speed of its environment."
        cta="READ THE PHILOSOPHY"
        href="/philosophy"
      />
    </>
  );
}
