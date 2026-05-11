import MetaLabel from "@/components/ui/MetaLabel";

export default function DivisionCard({ division, className = "" }) {
  return (
    <div className={`border border-border bg-panel hover:border-accent/40 transition-colors duration-400 ${className}`}>
      <div className="border-b border-border bg-panel-2 px-4 py-2 flex justify-between items-center gap-3">
        <MetaLabel>{division.code}</MetaLabel>
        <MetaLabel accent={division.status === "OPERATIONAL" || division.status === "ACTIVE"}>
          ● {division.status}
        </MetaLabel>
      </div>
      <div className="p-5 space-y-4">
        <h3 className="font-display text-xl md:text-2xl leading-tight">{division.name}</h3>
        <div className="space-y-2">
          <div className="flex justify-between gap-4 border-b border-border-soft pb-2">
            <MetaLabel>ESTABLISHED</MetaLabel>
            <span className="doc-ref">{division.established}</span>
          </div>
          <div className="flex justify-between gap-4 border-b border-border-soft pb-2">
            <MetaLabel>ARCHIVE REF</MetaLabel>
            <span className="doc-ref">{division.archiveId}</span>
          </div>
        </div>
        <div className="border-t border-border-soft pt-4">
          <MetaLabel>FOCUS</MetaLabel>
          <p className="text-xs text-muted mt-2 leading-relaxed">{division.focus}</p>
        </div>
        <div>
          <MetaLabel>TECHNICAL VOCABULARY</MetaLabel>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
            {division.terminology.map((t) => (
              <span key={t} className="text-xs font-mono text-text/50 bg-panel-2 px-2 py-0.5">{t}</span>
            ))}
          </div>
        </div>
        <div className="border-t border-border-soft pt-4">
          <MetaLabel>DIVISIONS</MetaLabel>
          <div className="mt-2 space-y-1">
            {division.divisions.map((d) => (
              <p key={d} className="text-xs text-muted-2 font-mono">{d}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}