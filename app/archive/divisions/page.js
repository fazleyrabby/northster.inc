import Container from "@/components/layout/Container";
import EditorialSection from "@/components/sections/EditorialSection";
import Divider from "@/components/ui/Divider";
import MetaLabel from "@/components/ui/MetaLabel";
import Link from "next/link";
import { divisions } from "@/data/archival";

export const metadata = { title: "Institutional Divisions — NORTHSTER INC." };

export default function DivisionsPage() {
  return (
    <>
      <section className="border-b border-border-strong bg-panel/30">
        <Container size="wide" className="pt-20 pb-16">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex gap-x-10 gap-y-2 flex-wrap">
              <MetaLabel>★ INSTITUTIONAL / DIVISIONS</MetaLabel>
              <MetaLabel>{divisions.length} ENTITIES ACTIVE</MetaLabel>
            </div>
            <MetaLabel accent>● SYSTEM_AUDIT_COMPLETE</MetaLabel>
          </div>
          <hr className="rule mt-10" />
          <div className="pt-16 md:pt-24 pb-8 grid grid-cols-1 md:grid-cols-12 gap-10">
            <h1 className="md:col-span-9 font-display text-5xl md:text-6xl lg:text-7xl leading-[0.92]">
              Archive <span className="italic text-accent">structure</span>.
            </h1>
            <p className="md:col-span-3 md:pt-6 text-sm text-muted leading-relaxed font-mono">
              The organisational architecture of Northster Inc. Each division 
              maintains its own segment of the institutional record.
            </p>
          </div>
        </Container>
      </section>

      <EditorialSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {divisions.map((div) => (
            <div 
              key={div.code} 
              className="border border-border-strong bg-panel/20 p-8 flex flex-col justify-between archival-plate group"
            >
              <div>
                <div className="flex justify-between items-center mb-8">
                  <MetaLabel>{div.code}</MetaLabel>
                  <span className="doc-ref text-[10px] opacity-40">EST. {div.established}</span>
                </div>
                <h3 className="font-display text-3xl mb-4 group-hover:text-accent transition-colors">
                  {div.name}
                </h3>
                <p className="text-sm text-muted leading-relaxed font-mono mb-8">
                  {div.notes}
                </p>
                <div className="space-y-4">
                  <Divider label="FOCUS" />
                  <p className="doc-ref text-[10px] uppercase tracking-wider">{div.focus}</p>
                  
                  <Divider label="TERMINOLOGY" />
                  <div className="flex flex-wrap gap-2">
                    {div.terminology.map(t => (
                      <span key={t} className="doc-ref text-[9px] px-1.5 py-0.5 border border-border-soft opacity-60">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-6 border-t border-border-soft flex justify-between items-center">
                <MetaLabel accent>{div.status}</MetaLabel>
                <span className="doc-ref text-[10px] opacity-30">{div.archiveId}</span>
              </div>
            </div>
          ))}
        </div>
      </EditorialSection>
    </>
  );
}
