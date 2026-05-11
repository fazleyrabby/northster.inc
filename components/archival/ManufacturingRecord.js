import MetaLabel from "@/components/ui/MetaLabel";

export default function ManufacturingRecord({ product, className = "" }) {
  const isRestricted = product.status === "RESTRICTED";
  return (
    <div className={`border border-border bg-panel ${className}`}>
      <div className="border-b border-border bg-panel-2 px-5 py-3 flex justify-between items-center gap-4">
        <MetaLabel>MANUFACTURING RECORD</MetaLabel>
        <span className="doc-ref">{product.archiveId}</span>
      </div>
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <MetaLabel>DIVISION</MetaLabel>
            <p className="text-xs text-muted mt-1 leading-relaxed">{product.division}</p>
          </div>
          <div>
            <MetaLabel>LOT</MetaLabel>
            <p className={`text-xs font-mono mt-1 ${isRestricted ? "text-accent/50" : "text-text/80"}`}>{product.lot}</p>
          </div>
          <div>
            <MetaLabel>PART NUMBER</MetaLabel>
            <p className="text-xs font-mono mt-1 text-text/80">{product.partNumber}</p>
          </div>
          <div>
            <MetaLabel>CLEARANCE</MetaLabel>
            <p className={`text-xs font-mono mt-1 ${isRestricted ? "text-accent/50" : "text-text/80"}`}>{product.clearance}</p>
          </div>
        </div>
        <div className="border-t border-border-soft pt-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span className="doc-ref">AXIS LABORATORY / MANUFACTURING DIV. 02</span>
            <span className="doc-ref">EDITORIAL SYSTEMS / MANUFACTURING DIV. 03</span>
            <span className="doc-ref">INFRASTRUCTURE / MANUFACTURING DIV. 01</span>
            <span className="doc-ref">ENGINEERING SYSTEMS / MANUFACTURING DIV. 04</span>
            <span className="doc-ref">HORIZON PROGRAM / MANUFACTURING DIV. 02</span>
            <span className="doc-ref">POLARIS PROGRAM / MANUFACTURING DIV. 01</span>
          </div>
        </div>
        <div className="border-t border-border-soft pt-4">
          <div className="flex justify-between items-center">
            <MetaLabel>STATUS</MetaLabel>
            <MetaLabel accent={product.status === "FIELD"}>{product.status}</MetaLabel>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {product.notes && product.notes.map((n, i) => (
              <p key={i} className="text-xs text-muted leading-relaxed border-l border-border-soft pl-3">{n}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}