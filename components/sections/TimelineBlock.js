import MetaLabel from "@/components/ui/MetaLabel";

export default function TimelineBlock({ entries }) {
  return (
    <ol className="border-t border-border">
      {entries.map((entry, i) => (
        <li
          key={entry.year + entry.title}
          className="group grid grid-cols-12 gap-0 border-b border-border hover:bg-panel/40 transition-colors duration-400"
        >
          {/* Index + year */}
          <div className="col-span-3 md:col-span-2 border-r border-border px-4 py-8 flex flex-col justify-between">
            <span className="doc-ref">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-display text-3xl md:text-4xl group-hover:text-accent transition-colors duration-400 mt-4">
              {entry.year}
            </span>
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
      ))}
    </ol>
  );
}
