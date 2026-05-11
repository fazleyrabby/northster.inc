import Divider from "@/components/ui/Divider";

export default function SectionHeader({
  index,
  label,
  docRef,
  title,
  intro,
  align = "between",
  className = "",
}) {
  const divLabel = index ? `${index} — ${label}` : label;
  return (
    <div className={className}>
      <Divider label={divLabel} meta={docRef} />
      <div className={`mt-10 grid grid-cols-1 ${align === "between" ? "md:grid-cols-12 gap-10" : ""}`}>
        <h2
          className={`font-display text-4xl md:text-5xl lg:text-6xl leading-[0.92] ${align === "between" ? "md:col-span-7" : ""}`}
        >
          {title}
        </h2>
        {intro && (
          <p
            className={`text-sm text-muted leading-relaxed max-w-sm ${align === "between" ? "md:col-span-5 md:pt-3" : "mt-6"}`}
          >
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}
