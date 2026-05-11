import MetaLabel from "@/components/ui/MetaLabel";

export default function TechnicalPanel({
  title,
  docRef,
  children,
  className = "",
  flush = false,
}) {
  return (
    <div className={`border border-border bg-panel ${className}`}>
      <div className="border-b border-border px-4 py-2 bg-panel-2 flex justify-between items-center gap-4">
        <MetaLabel>{title}</MetaLabel>
        {docRef && <span className="doc-ref">{docRef}</span>}
      </div>
      <div className={flush ? "" : "p-5"}>{children}</div>
    </div>
  );
}
