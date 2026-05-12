import Container from "@/components/layout/Container";
import EditorialSection from "@/components/sections/EditorialSection";
import Divider from "@/components/ui/Divider";
import MetaLabel from "@/components/ui/MetaLabel";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  engineeringNotes, 
  maintenanceReports, 
  internalNotices 
} from "@/data/archival";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return { title: `${id} — Document Record — NORTHSTER INC.` };
}

export default async function DocumentPage({ params }) {
  const { id } = await params;
  
  const doc = [
    ...engineeringNotes.map(d => ({ ...d, type: "ENGINEERING_LOG", category: "TECHNICAL" })),
    ...maintenanceReports.map(d => ({ ...d, type: "SERVICE_RECORD", category: "MAINTENANCE", subject: d.action })),
    ...internalNotices.map(d => ({ ...d, type: "INTERNAL_NOTICE", category: "ADMIN" })),
  ].find(d => d.id === id);

  if (!doc) notFound();

  return (
    <div className="min-h-screen pb-24">
      <section className="border-b border-border-strong bg-panel/30">
        <Container size="wide" className="py-6 flex justify-between items-center">
          <Link href="/archive/documents" className="doc-ref text-[10px] hover:text-accent transition-colors">
            ← RETURN TO INDEX
          </Link>
          <div className="flex gap-6">
            <span className="doc-ref text-[10px] opacity-40">DOC_ID: {doc.id}</span>
            <span className="doc-ref text-[10px] opacity-40">REV: 04.22.81</span>
          </div>
        </Container>
      </section>

      <EditorialSection>
        <div className="max-w-4xl mx-auto">
          
          {/* Document Header */}
          <div className="border border-border-strong bg-panel/10 p-8 md:p-12 mb-8 archival-plate">
            <div className="flex justify-between items-start mb-12">
              <div className="space-y-1">
                <span className="meta text-xl font-bold tracking-widest">NORTHSTER INC.</span>
                <p className="doc-ref text-[10px] opacity-40">COMPUTATIONAL ARCHIVE / DIVISION 04</p>
              </div>
              <div className="text-right">
                <div className="inline-block border border-accent/40 px-3 py-1 bg-accent/5">
                  <span className="doc-ref text-[11px] text-accent tracking-[0.2em]">REVISION IV</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div className="space-y-6">
                <div>
                  <span className="doc-ref text-[9px] opacity-30 block mb-1">DATE OF RECORD</span>
                  <span className="doc-ref text-sm tabular-nums tracking-widest">{doc.date}</span>
                </div>
                <div>
                  <span className="doc-ref text-[9px] opacity-30 block mb-1">ORIGINATING DIVISION</span>
                  <span className="doc-ref text-sm">{doc.division}</span>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <span className="doc-ref text-[9px] opacity-30 block mb-1">DOCUMENT TYPE</span>
                  <span className="doc-ref text-sm">{doc.type}</span>
                </div>
                <div>
                  <span className="doc-ref text-[9px] opacity-30 block mb-1">CLASSIFICATION</span>
                  <span className="doc-ref text-sm">{doc.priority || "UNRESTRICTED"}</span>
                </div>
              </div>
            </div>

            <Divider label="RECORD_BODY" />
            
            <div className="mt-12 space-y-8">
              <h1 className="font-display text-4xl md:text-5xl leading-tight">
                {doc.subject || doc.title}
              </h1>
              
              <div className="font-mono text-base md:text-lg leading-relaxed text-text/90 space-y-6 max-w-2xl">
                {doc.body ? (
                  <p className="whitespace-pre-wrap">{doc.body}</p>
                ) : (
                  <p className="whitespace-pre-wrap">{doc.detail}</p>
                )}
              </div>

              {doc.author && (
                <div className="pt-12 border-t border-border-soft flex flex-col gap-2">
                  <span className="doc-ref text-[9px] opacity-30">AUTHENTICATED BY</span>
                  <span className="doc-ref text-xs">{doc.author}</span>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="doc-ref text-[9px] opacity-60 italic">ELECTRONIC_SIGNATURE_VERIFIED</span>
                  </div>
                </div>
              )}
            </div>

            {/* Redaction Stamp for specific docs */}
            {(doc.id === "NS-ARC-0298" || doc.priority === "RESTRICTED") && (
              <div className="mt-16 p-6 border border-accent/20 bg-accent/5">
                <span className="doc-ref text-[10px] text-accent block mb-2 uppercase tracking-widest">Archive Notice</span>
                <p className="doc-ref text-[11px] leading-relaxed opacity-60">
                  Portions of this record have been held within Archive Division 04 pending further clearance. 
                  Reference NS-ARC-TX-04 for extended capture rolls.
                </p>
              </div>
            )}
          </div>

          {/* Institutional Footer */}
          <div className="px-8 flex justify-between items-center opacity-40">
            <span className="doc-ref text-[9px]">NS-SYS-REF / {doc.id}</span>
            <span className="doc-ref text-[9px]">© 1978-1998 NORTHSTER INDUSTRIES</span>
          </div>

        </div>
      </EditorialSection>
    </div>
  );
}
