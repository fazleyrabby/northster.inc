import MetaLabel from "@/components/ui/MetaLabel";

export default function MaintenanceTable({ reports, className = "" }) {
  return (
    <div className={`border border-border bg-panel ${className}`}>
      <div className="border-b border-border bg-panel-2 px-5 py-3 flex justify-between items-center gap-4">
        <MetaLabel>MAINTENANCE RECORD</MetaLabel>
        <span className="doc-ref">{reports.length} ENTRIES</span>
      </div>
      <div className="divide-y divide-border">
        {reports.map((r, i) => (
          <div key={r.id} className={`grid grid-cols-12 gap-0 ${i % 2 === 0 ? "bg-panel-2/40" : ""}`}>
            <div className="col-span-12 md:col-span-2 px-4 py-3 border-r border-border">
              <MetaLabel>{r.id}</MetaLabel>
              <span className="doc-ref block mt-1">{r.date}</span>
            </div>
            <div className="col-span-6 md:col-span-2 px-4 py-3 border-r border-border">
              <MetaLabel>{r.system}</MetaLabel>
              <span className="doc-ref block mt-1">{r.division}</span>
            </div>
            <div className="col-span-6 md:col-span-4 px-4 py-3 border-r border-border">
              <p className="text-xs text-text/75 leading-relaxed">{r.action}</p>
              <span className="doc-ref block mt-1.5 opacity-60">{r.engineer}</span>
            </div>
            <div className="col-span-12 md:col-span-4 px-4 py-3">
              <p className="text-xs text-muted leading-relaxed">{r.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}