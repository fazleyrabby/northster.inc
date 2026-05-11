import MetaLabel from "@/components/ui/MetaLabel";

export default function EngineeringSheet({
  id,
  date,
  division,
  subject,
  body,
  archiveRef,
  className = "",
}) {
  return (
    <div className={`border border-border bg-panel ${className}`}>
      <div className="border-b border-border bg-panel-2 px-5 py-3 flex justify-between items-center gap-4">
        <MetaLabel>ENGINEERING NOTICE</MetaLabel>
        {id && <span className="doc-ref">{id}</span>}
      </div>
      <div className="p-5 space-y-4">
        {subject && (
          <div className="border-b border-border pb-4">
            <p className="text-xs text-muted-2 mb-1.5 font-mono uppercase tracking-widest">RE: {subject}</p>
            <h3 className="font-display text-xl md:text-2xl leading-tight">{subject}</h3>
          </div>
        )}
        {body && (
          <p className="text-xs text-text/80 leading-relaxed font-mono tracking-wide">{body}</p>
        )}
        <div className="pt-4 border-t border-border space-y-1">
          {date && (
            <div className="flex justify-between gap-4">
              <MetaLabel>DATE</MetaLabel>
              <span className="doc-ref">{date}</span>
            </div>
          )}
          {division && (
            <div className="flex justify-between gap-4">
              <MetaLabel>DIVISION</MetaLabel>
              <span className="doc-ref">{division}</span>
            </div>
          )}
          {archiveRef && (
            <div className="flex justify-between gap-4">
              <MetaLabel>ARCHIVE REF</MetaLabel>
              <span className="doc-ref">{archiveRef}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}