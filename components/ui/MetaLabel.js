export default function MetaLabel({ children, accent = false, className = "", as: As = "span" }) {
  return (
    <As className={`meta ${accent ? "meta-accent" : ""} ${className}`}>
      {children}
    </As>
  );
}
