import Container from "@/components/layout/Container";
import EditorialSection from "@/components/sections/EditorialSection";
import MetaLabel from "@/components/ui/MetaLabel";
import Divider from "@/components/ui/Divider";
import CTASection from "@/components/sections/CTASection";
import { labsProjects } from "@/data/archive";

export const metadata = { title: "Labs — NORTHSTER INC." };

export default function LabsPage() {
  return (
    <>
      <section className="border-b border-border-soft">
        <Container size="wide" className="pt-20 pb-16">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex gap-x-10 gap-y-2 flex-wrap">
              <MetaLabel>★ NORTHSTER / LABS</MetaLabel>
              <MetaLabel>{labsProjects.length} PROGRAMMES ACTIVE</MetaLabel>
              <MetaLabel>RESEARCH DIVISION</MetaLabel>
            </div>
            <MetaLabel accent>● UNDER OBSERVATION</MetaLabel>
          </div>
          <hr className="rule mt-10" />
          <div className="pt-16 md:pt-24 pb-8 grid grid-cols-1 md:grid-cols-12 gap-10">
            <h1 className="md:col-span-9 font-display text-5xl md:text-6xl lg:text-7xl leading-[0.92]">
              Quiet <span className="italic text-accent">experiments</span>.
            </h1>
            <p className="md:col-span-3 md:pt-6 text-base text-muted leading-relaxed">
              Northster Labs pursues research without urgency. Some
              programmes have continued for decades. Results, when they
              arrive, are quietly published into the archive.
            </p>
          </div>
        </Container>
      </section>

      <EditorialSection>
        <Divider label="01 — PROGRAMMES" />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {labsProjects.map((p) => (
            <article
              key={p.code}
              className="group border border-border-soft hover:border-accent/50 transition-colors duration-500 bg-panel/40 p-8 md:p-10"
            >
              <div className="flex justify-between items-center">
                <MetaLabel>{p.code}</MetaLabel>
                <MetaLabel accent>● {p.state}</MetaLabel>
              </div>
              <h3 className="font-display text-3xl md:text-5xl mt-6 leading-tight group-hover:text-accent transition-colors duration-500">
                {p.title}
              </h3>
              <p className="mt-6 text-sm md:text-base text-muted leading-relaxed">
                {p.body}
              </p>
              <div className="mt-10 pt-6 border-t border-border-soft flex justify-between">
                <MetaLabel>NS / LAB</MetaLabel>
                <MetaLabel className="link-amber">VIEW PROGRAMME →</MetaLabel>
              </div>
            </article>
          ))}
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
