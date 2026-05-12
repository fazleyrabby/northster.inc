import Container from "@/components/layout/Container";
import EditorialSection from "@/components/sections/EditorialSection";
import Divider from "@/components/ui/Divider";
import MetaLabel from "@/components/ui/MetaLabel";
import { transmissionLogs } from "@/data/archival";

export const metadata = { title: "Transmission Archive — NORTHSTER INC." };

export default function TransmissionsPage() {
  return (
    <>
      <section className="border-b border-border-strong bg-panel/30">
        <Container size="wide" className="pt-20 pb-16">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex gap-x-10 gap-y-2 flex-wrap">
              <MetaLabel>★ ARCHIVE / TRANSMISSIONS</MetaLabel>
              <MetaLabel>CH_04 / SIGNAL_CAPTURE</MetaLabel>
              <MetaLabel>RECOVERY_STATUS: ONGOING</MetaLabel>
            </div>
            <MetaLabel accent>● LIVE_RELAY_ACTIVE</MetaLabel>
          </div>
          <hr className="rule mt-10" />
          <div className="pt-16 md:pt-24 pb-8 grid grid-cols-1 md:grid-cols-12 gap-10">
            <h1 className="md:col-span-9 font-display text-5xl md:text-6xl lg:text-7xl leading-[0.92]">
              Recovered <span className="italic text-accent">transmissions</span>.
            </h1>
            <p className="md:col-span-3 md:pt-6 text-sm text-muted leading-relaxed font-mono">
              Passive signal capture from the Northern Relay Chain. 
              These broadcasts represent the final operational period 
              before the 1998 archive seal.
            </p>
          </div>
        </Container>
      </section>

      <EditorialSection>
        <div className="max-w-4xl mx-auto space-y-8">
          <Divider label="SIGNAL_LOGS" />
          
          <div className="space-y-6">
            {transmissionLogs.sort((a, b) => b.timestamp.localeCompare(a.timestamp)).map((log) => (
              <article 
                key={log.id} 
                className="border border-border-strong bg-panel/20 p-6 md:p-8 archival-plate relative overflow-hidden"
              >
                {/* Visual signal indicator */}
                <div className="absolute top-0 left-0 w-1 h-full bg-accent/20" />
                
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                  <div className="flex gap-4">
                    <span className="doc-ref text-[11px] tabular-nums font-bold text-text/90">{log.timestamp}</span>
                    <span className="doc-ref text-[10px] opacity-40">[{log.id}]</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`w-1.5 h-1.5 rounded-full ${log.status === 'STABLE' ? 'bg-accent' : 'bg-accent/40 animate-pulse'}`} />
                    <span className="doc-ref text-[10px] uppercase tracking-widest">{log.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-3">
                    <div className="space-y-4">
                      <div>
                        <span className="doc-ref text-[9px] opacity-30 block mb-1">SOURCE_NODE</span>
                        <span className="doc-ref text-[10px] font-bold">{log.source}</span>
                      </div>
                      <div>
                        <span className="doc-ref text-[9px] opacity-30 block mb-1">DIVISION</span>
                        <span className="doc-ref text-[10px]">{log.division}</span>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-9 border-l border-border-soft md:pl-8">
                    <p className="font-mono text-sm md:text-base leading-relaxed text-text/80 whitespace-pre-wrap">
                      {log.text}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border-soft flex justify-between items-center">
                  <span className="doc-ref text-[9px] opacity-30">ENCRYPTION: NONE / CLEAR_TRANS</span>
                  <div className="flex gap-4">
                    <span className="doc-ref text-[9px] opacity-30 italic">Capture Roll 47-09</span>
                    <span className="doc-ref text-[9px] opacity-30">Relay Stable</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="pt-12 text-center">
            <span className="doc-ref text-[10px] opacity-30 italic">
              End of recovered transmission segment. No further signal detected in current capture window.
            </span>
          </div>
        </div>
      </EditorialSection>
    </>
  );
}
