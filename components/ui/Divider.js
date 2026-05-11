export default function Divider({ label, meta, className = "" }) {
  if (!label && !meta) return <hr className={`rule ${className}`} />;
  return (
    <div className={`flex items-center gap-0 ${className}`}>
      {label && (
        <span className="meta whitespace-nowrap pr-5">{label}</span>
      )}
      <hr className="rule flex-1" />
      {meta && (
        <span className="doc-ref whitespace-nowrap pl-5">{meta}</span>
      )}
    </div>
  );
}
