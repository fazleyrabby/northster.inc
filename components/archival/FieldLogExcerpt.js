import MetaLabel from "@/components/ui/MetaLabel";

export default function FieldLogExcerpt({ excerpt, className = "" }) {
  return (
    <div className={`border border-border bg-panel ${className}`}>
      <div className="border-b border-border bg-panel-2 px-4 py-2 flex justify-between items-center gap-3">
        <MetaLabel>FIELD LOG EXCERPT</MetaLabel>
        <span className="doc-ref">{excerpt.id}</span>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex flex-wrap gap-x-6 gap-y-1">
          <span className="doc-ref">DATE: {excerpt.date}</span>
          <span className="doc-ref">LOC: {excerpt.location}</span>
          <span className="doc-ref">DIV: {excerpt.division}</span>
        </div>
        <div className="border-t border-border-soft pt-3">
          <p className="text-xs text-text/70 leading-relaxed font-mono tracking-wide italic border-l border-accent/30 pl-4">
            {excerpt.excerpt}
          </p>
        </div>
      </div>
    </div>
  );
}