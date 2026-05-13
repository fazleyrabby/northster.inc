import MetaLabel from "@/components/ui/MetaLabel";

export default function TimelineBlock({ entries }) {
  const lastIndex = entries.length - 1;

  return (
    <ol className="border-t border-border">
      {entries.map((entry, i) => {
        const isActive = i === lastIndex;
        return (
          <li
            key={entry.year + entry.title}
            className={`group grid grid-cols-12 gap-0 border-b border-border transition-colors duration-400 ${
              isActive ? "bg-panel/30" : "hover:bg-panel/40"
            }`}
          >
            {/* Index + year */}
            <div className={`col-span-3 md:col-span-2 border-r px-4 py-8 flex flex-col justify-between ${
              isActive ? "border-accent/40" : "border-border"
            }`}>
              <span className="doc-ref">{String(i + 1).padStart(2, "0")}</span>
              <div className="mt-4 flex flex-col gap-1">
                {isActive && (
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent opacity-90" />
                    <span className="font-mono text-[9px] text-accent opacity-70 tracking-widest uppercase">NOW</span>
                  </span>
                )}
                <span className={`font-display transition-colors duration-400 ${
                  isActive
                    ? "text-accent text-4xl md:text-5xl font-bold"
                    : "text-3xl md:text-4xl group-hover:text-accent"
                }`}>
                  {entry.year}
                </span>
              </div>
            </div>

            {/* Title */}
            <div className="col-span-9 md:col-span-5 px-5 md:px-8 py-8 border-r border-border">
              <MetaLabel>FIELD RECORD // {entry.year}</MetaLabel>
              <h3 className="font-display text-xl md:text-2xl mt-3 leading-tight">
                {entry.title}
              </h3>
            </div>

            {/* Body */}
            <div className="col-span-12 md:col-span-5 px-5 md:px-8 py-8 border-t md:border-t-0 border-border">
              <p className="text-xs text-muted leading-relaxed">{entry.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
