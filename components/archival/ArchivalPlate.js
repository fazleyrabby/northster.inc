import Image from "next/image";
import MetaLabel from "@/components/ui/MetaLabel";

export default function ArchivalPlate({ src, title, year, code, description }) {
  return (
    <div className="group space-y-6">
      <div className="relative aspect-[3/4] bg-panel border border-border-strong overflow-hidden archival-plate shadow-xl transition-transform duration-700 hover:scale-[1.01]">
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover grayscale contrast-125 mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity duration-700"
        />
        {/* Archival metadata overlay */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start pointer-events-none">
          <div className="flex flex-col gap-1">
            <span className="doc-ref text-[9px] bg-background/80 px-1.5 py-0.5 border border-border-soft">PLATE_{code}</span>
            <span className="doc-ref text-[9px] bg-background/80 px-1.5 py-0.5 border border-border-soft">YEAR_{year}</span>
          </div>
          <span className="doc-ref text-[9px] bg-accent/20 text-accent px-1.5 py-0.5 border border-accent/40">NORTHSTER_INTERNAL</span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-display text-2xl md:text-3xl leading-tight uppercase tracking-tight">
          {title}
        </h3>
        <p className="text-xs text-muted leading-relaxed max-w-xs">
          {description}
        </p>
        <div className="pt-4 flex items-center gap-4">
          <MetaLabel>{code}</MetaLabel>
          <MetaLabel>{year}</MetaLabel>
        </div>
      </div>
    </div>
  );
}
