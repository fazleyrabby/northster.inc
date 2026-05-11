import MetaLabel from "@/components/ui/MetaLabel";

export default function TransmissionExcerpt({ log, className = "" }) {
  const typeStyles = {
    ROUTINE: "text-text/60",
    DEGRADED: "text-amber-400/60",
    ADMINISTRATIVE: "text-text/60",
    CONTINUOUS: "text-text/60",
    RESTRICTED: "text-accent/50",
  };
  const typeStyle = typeStyles[log.type] || "text-text/60";
  return (
    <div className={`border border-border bg-panel ${className}`}>
      <div className="border-b border-border bg-panel-2 px-4 py-2 flex justify-between items-center gap-3">
        <div className="flex gap-4 items-center">
          <MetaLabel>TRANSMISSION LOG</MetaLabel>
          <span className="doc-ref">{log.id}</span>
        </div>
        <div className="flex gap-4 items-center">
          <span className={`doc-ref ${typeStyle}`}>{log.type}</span>
          <span className={`doc-ref ${log.status === "STABLE" || log.status === "ACTIVE" || log.status === "OPEN" ? "text-accent/50" : log.status === "DEGRADED" ? "text-amber-400/60" : "text-muted-2"}`}>
            ● {log.status}
          </span>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex flex-wrap gap-x-6 gap-y-1">
          <span className="doc-ref">TS: {log.timestamp}</span>
          <span className="doc-ref">SRC: {log.source}</span>
          <span className="doc-ref">DIV: {log.division}</span>
        </div>
        <div className="border-t border-border-soft pt-3">
          <p className={`text-xs leading-relaxed font-mono tracking-wide ${log.status === "RESTRICTED" ? "text-accent/50 italic" : "text-text/70"}`}>
            {log.text}
          </p>
        </div>
      </div>
    </div>
  );
}