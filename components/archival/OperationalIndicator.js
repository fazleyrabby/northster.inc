import MetaLabel from "@/components/ui/MetaLabel";

export default function OperationalIndicator({ indicator, className = "" }) {
  const isActive = indicator.status === "STABLE" || indicator.status === "ACTIVE" || indicator.status === "OPEN" || indicator.status === "CONTINUOUS";
  return (
    <div className={`flex items-center gap-3 px-3 py-2 border border-border bg-panel ${className}`}>
      <MetaLabel accent={isActive}>●</MetaLabel>
      <span className="doc-ref">{indicator.label}</span>
      <span className="doc-ref text-muted-2 ml-auto">{indicator.status}</span>
      {indicator.since && (
        <span className="doc-ref text-muted-2 ml-4">SINCE: {indicator.since}</span>
      )}
    </div>
  );
}