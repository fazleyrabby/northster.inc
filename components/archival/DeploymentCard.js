import MetaLabel from "@/components/ui/MetaLabel";

export default function DeploymentCard({ record, className = "" }) {
  const isRestricted = record.status === "RESTRICTED";
  return (
    <div className={`border border-border bg-panel hover:border-accent/40 transition-colors duration-400 ${className}`}>
      <div className="border-b border-border bg-panel-2 px-4 py-2 flex justify-between items-center">
        <MetaLabel>{record.system}</MetaLabel>
        <span className={`doc-ref ${isRestricted ? "text-accent/60" : ""}`}>{record.id}</span>
      </div>
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <MetaLabel>DATE</MetaLabel>
            <p className="text-sm font-mono mt-1 text-text/80">{record.year}</p>
          </div>
          <div>
            <MetaLabel>UNITS</MetaLabel>
            <p className={`text-sm font-mono mt-1 ${isRestricted ? "text-accent/60" : "text-text/80"}`}>{record.units}</p>
          </div>
        </div>
        <div className="border-t border-border-soft pt-4">
          <MetaLabel>REGION</MetaLabel>
          <p className="text-xs text-muted mt-1 leading-relaxed">{record.region}</p>
        </div>
        <div>
          <MetaLabel>ENVIRONMENT</MetaLabel>
          <p className="text-xs text-muted mt-1 leading-relaxed">{record.environment}</p>
        </div>
        <div className="border-t border-border-soft pt-4">
          <div className="flex justify-between items-center">
            <MetaLabel>STATUS</MetaLabel>
            <MetaLabel accent={!isRestricted}>{record.status}</MetaLabel>
          </div>
          {record.notes && (
            <p className="text-xs text-muted-2 mt-3 leading-relaxed border-l border-border pl-3">{record.notes}</p>
          )}
        </div>
      </div>
    </div>
  );
}