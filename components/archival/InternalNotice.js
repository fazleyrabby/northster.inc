import MetaLabel from "@/components/ui/MetaLabel";

export default function InternalNotice({ notice, className = "" }) {
  const isRestricted = notice.priority === "RESTRICTED";
  return (
    <div className={`border border-border bg-panel hover:border-accent/30 transition-colors duration-400 ${className}`}>
      <div className="border-b border-border bg-panel-2 px-4 py-2 flex justify-between items-center gap-3">
        <div className="flex gap-4 items-center">
          <MetaLabel>INTERNAL NOTICE</MetaLabel>
          <span className="doc-ref">{notice.id}</span>
        </div>
        <span className={`doc-ref ${isRestricted ? "text-accent/50" : "text-muted-2"}`}>
          {notice.priority}
        </span>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex flex-wrap gap-x-6 gap-y-1">
          <span className="doc-ref">FROM: {notice.from}</span>
          <span className="doc-ref">TO: {notice.to}</span>
        </div>
        <div className="border-t border-border-soft pt-3">
          <p className="text-xs font-display text-xl leading-tight mb-2">{notice.subject}</p>
          <p className={`text-xs leading-relaxed ${isRestricted ? "text-accent/50 italic" : "text-text/70"}`}>
            {notice.body}
          </p>
        </div>
        <div className="border-t border-border-soft pt-3 flex justify-between">
          <MetaLabel>DATE</MetaLabel>
          <span className="doc-ref">{notice.date}</span>
        </div>
      </div>
    </div>
  );
}