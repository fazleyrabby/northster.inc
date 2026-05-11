import MetaLabel from "@/components/ui/MetaLabel";

export default function CatalogRevision({ entry, className = "" }) {
  return (
    <div className={`border border-border bg-panel-2/60 p-4 md:p-5 ${className}`}>
      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-4 items-center">
          <MetaLabel>REV. {entry.rev}</MetaLabel>
          <span className="doc-ref">{entry.date}</span>
        </div>
        <span className="doc-ref text-muted-2">{entry.systems.length} SYSTEMS</span>
      </div>
      <div className="mt-3">
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          {entry.systems.map((s) => (
            <span key={s} className="text-xs font-mono text-accent/50">{s}</span>
          ))}
        </div>
      </div>
      {entry.note && (
        <p className="text-xs text-muted mt-3 leading-relaxed">{entry.note}</p>
      )}
    </div>
  );
}