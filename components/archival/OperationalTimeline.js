import MetaLabel from "@/components/ui/MetaLabel";

export default function OperationalTimeline({ entries, className = "" }) {
  return (
    <div className={`border border-border bg-panel ${className}`}>
      <div className="border-b border-border bg-panel-2 px-5 py-3 flex justify-between items-center gap-4">
        <MetaLabel>OPERATIONAL TIMELINE</MetaLabel>
        <span className="doc-ref">CONTINUOUS</span>
      </div>
      <div className="divide-y divide-border">
        {entries.map((e, i) => (
          <div key={e.id} className={`group grid grid-cols-12 gap-0 hover:bg-panel/30 transition-colors duration-300 ${i % 2 === 0 ? "bg-panel-2/30" : ""}`}>
            <div className="col-span-5 md:col-span-3 px-4 py-4 border-r border-border flex flex-col gap-1">
              <span className="doc-ref text-accent/70">{e.timestamp}</span>
              <span className="doc-ref">{e.source}</span>
            </div>
            <div className="col-span-7 md:col-span-3 px-4 py-4 border-r border-border flex flex-col gap-1">
              <MetaLabel>{e.division}</MetaLabel>
              <span className={`doc-ref ${e.status === "DEGRADED" ? "text-amber-400/60" : e.status === "SEALED" || e.status === "RESTRICTED" ? "text-accent/50" : "text-text/60"}`}>
                {e.status}
              </span>
            </div>
            <div className="col-span-12 md:col-span-6 px-4 py-4">
              <p className="text-xs text-text/70 leading-relaxed">{e.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}