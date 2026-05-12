import MetaLabel from "@/components/ui/MetaLabel";

export default function EngineeringNote({ date, author, title, children, classification = "UNRESTRICTED" }) {
  return (
    <div className="border border-border-strong bg-panel/20 p-6 md:p-8 relative overflow-hidden archival-plate">
      {/* Redaction overlay for restricted notes */}
      {classification === "RESTRICTED" && (
        <div className="absolute top-4 right-4 bg-accent/20 text-accent text-[9px] px-2 py-0.5 doc-ref border border-accent/40 animate-pulse">
          RESTRICTED
        </div>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <MetaLabel>{date}</MetaLabel>
          <MetaLabel>{author}</MetaLabel>
        </div>
        <span className="doc-ref text-[10px] opacity-40">REF: NS-LOG-{date.replace(/\./g, "")}</span>
      </div>

      <h4 className="font-display text-2xl md:text-3xl mb-4 italic text-text/90">
        {title}
      </h4>

      <div className="text-sm md:text-base text-muted leading-relaxed font-mono space-y-4">
        {children}
      </div>

      <div className="mt-8 pt-6 border-t border-border-soft flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="doc-ref text-[10px]">AUTH_SIG_VERIFIED</span>
        </div>
        <span className="doc-ref text-[10px] opacity-30 italic">Revision IV Protocol</span>
      </div>
    </div>
  );
}
