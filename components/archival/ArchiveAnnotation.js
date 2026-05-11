import MetaLabel from "@/components/ui/MetaLabel";

export default function ArchiveAnnotation({ item, className = "" }) {
  return (
    <div className={`border-l-2 border-accent/40 pl-4 py-2 space-y-1 ${className}`}>
      <div className="flex gap-4 items-center">
        <MetaLabel accent>ANNEX</MetaLabel>
        <span className="doc-ref">{item.ref}</span>
        <span className="doc-ref text-muted-2">{item.type}</span>
      </div>
      <p className="text-xs text-muted leading-relaxed">{item.description}</p>
    </div>
  );
}