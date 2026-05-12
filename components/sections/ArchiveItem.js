import MetaLabel from "@/components/ui/MetaLabel";
import Link from "next/link";

export default function ArchiveItem({ entry }) {
  return (
    <Link href={`/archive/documents/${entry.id}`} className="block">
      <article className="group grid grid-cols-12 gap-0 border-t border-border hover:bg-panel/30 transition-colors duration-320 hover-row">

        {/* ID column */}
        <div className="col-span-12 md:col-span-2 border-b md:border-b-0 md:border-r border-border px-4 py-6 flex flex-col gap-2 bg-panel/20">
          <MetaLabel>{entry.id}</MetaLabel>
          <span className="doc-ref">{entry.date}</span>
          <span className="doc-ref">{entry.division}</span>
          <div className="mt-2">
            <MetaLabel accent>▸ {entry.category}</MetaLabel>
          </div>
        </div>

        {/* Content */}
        <div className="col-span-12 md:col-span-8 px-5 md:px-8 py-6">
          <h3 className="font-display text-2xl md:text-3xl leading-tight transition-colors duration-400 group-hover:text-accent">
            {entry.title}
          </h3>
          <p className="text-xs md:text-sm text-muted mt-4 leading-relaxed">
            {entry.excerpt}
          </p>
        </div>

        {/* Action column */}
        <div className="col-span-12 md:col-span-2 border-t md:border-t-0 md:border-l border-border px-4 py-6 flex flex-col justify-between items-start md:items-end">
          <span className="doc-ref label-shift cursor-pointer font-bold text-accent">ACCESS_RECORD →</span>
          <div className="flex flex-col items-end gap-1 opacity-30">
            <span className="doc-ref text-[9px]">NS-SYS-REF</span>
            <span className="doc-ref text-[8px] tabular-nums">{entry.id}</span>
          </div>
        </div>

      </article>
    </Link>
  );
}
