import Container from "@/components/layout/Container";
import EditorialSection from "@/components/sections/EditorialSection";
import Divider from "@/components/ui/Divider";
import MetaLabel from "@/components/ui/MetaLabel";
import Link from "next/link";
import { 
  engineeringNotes, 
  maintenanceReports, 
  internalNotices, 
  researchSummaries,
  archiveInconsistencies
} from "@/data/archival";

export const metadata = { title: "Documentation Archive — NORTHSTER INC." };

export default function DocumentsPage() {
  const allDocs = [
    ...engineeringNotes.map(d => ({ ...d, type: "ENGINEERING_LOG", category: "TECHNICAL" })),
    ...maintenanceReports.map(d => ({ ...d, type: "SERVICE_RECORD", category: "MAINTENANCE", subject: d.action })),
    ...internalNotices.map(d => ({ ...d, type: "INTERNAL_NOTICE", category: "ADMIN" })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <section className="border-b border-border-strong bg-panel/20">
        <Container size="wide" className="pt-20 pb-16">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex gap-x-10 gap-y-2 flex-wrap">
              <MetaLabel>★ ARCHIVE / DOCUMENTS</MetaLabel>
              <MetaLabel>{allDocs.length} RECORDS RECOVERED</MetaLabel>
              <MetaLabel>INTERNAL_DISTRIBUTION_ONLY</MetaLabel>
            </div>
            <MetaLabel accent>● CLASSIFIED / REV_IV</MetaLabel>
          </div>
          <hr className="rule mt-10" />
          <div className="pt-16 md:pt-24 pb-8 grid grid-cols-1 md:grid-cols-12 gap-10">
            <h1 className="md:col-span-9 font-display text-5xl md:text-6xl lg:text-7xl leading-[0.92]">
              Institutional <span className="italic text-accent">records</span>.
            </h1>
            <p className="md:col-span-3 md:pt-6 text-sm text-muted leading-relaxed font-mono">
              The recovered manufacturing and engineering archive of Northster Inc. 
              All documents are preserved as built. Some metadata gaps exist in 
              the 1992-1995 segment.
            </p>
          </div>
        </Container>
      </section>

      <EditorialSection>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Index Sidebar */}
          <aside className="lg:col-span-3 space-y-12">
            <div>
              <Divider label="CLASSIFICATIONS" />
              <div className="mt-6 space-y-2">
                {["TECHNICAL", "MAINTENANCE", "ADMIN", "RESTRICTED"].map(cat => (
                  <div key={cat} className="flex justify-between items-center group cursor-pointer">
                    <span className="doc-ref text-[11px] group-hover:text-accent transition-colors">{cat}</span>
                    <span className="doc-ref text-[10px] opacity-30">[{cat === "TECHNICAL" ? engineeringNotes.length : cat === "MAINTENANCE" ? maintenanceReports.length : cat === "ADMIN" ? internalNotices.length : 2}]</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Divider label="ARCHIVE_GAPS" />
              <div className="mt-6 space-y-4">
                {archiveInconsistencies.slice(0, 3).map(inc => (
                  <div key={inc.ref} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="doc-ref text-[10px] text-accent/80">{inc.ref}</span>
                      <span className="doc-ref text-[9px] opacity-40">{inc.type}</span>
                    </div>
                    <p className="doc-ref text-[10px] leading-relaxed opacity-60 italic">{inc.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Document List */}
          <main className="lg:col-span-9">
            <Divider label="RECORD_INDEX" />
            <div className="mt-8 border border-border-strong divide-y divide-border-strong bg-panel/10">
              {allDocs.map((doc) => (
                <Link 
                  key={doc.id} 
                  href={`/archive/documents/${doc.id}`}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 hover:bg-panel/40 transition-colors group"
                >
                  <div className="md:col-span-2">
                    <span className="doc-ref text-[11px] text-muted group-hover:text-text transition-colors tabular-nums">{doc.date}</span>
                  </div>
                  <div className="md:col-span-7">
                    <h3 className="font-display text-xl uppercase tracking-tight group-hover:text-accent transition-colors">
                      {doc.subject || doc.title}
                    </h3>
                    <div className="mt-2 flex gap-4">
                      <span className="doc-ref text-[10px] opacity-40">{doc.division}</span>
                      <span className="doc-ref text-[10px] opacity-40">|</span>
                      <span className="doc-ref text-[10px] opacity-40">{doc.id}</span>
                    </div>
                  </div>
                  <div className="md:col-span-3 flex md:justify-end items-center">
                    <span className="doc-ref text-[9px] border border-border px-2 py-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                      {doc.type}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </main>

        </div>
      </EditorialSection>
    </>
  );
}
