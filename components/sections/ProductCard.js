import Link from "next/link";
import MetaLabel from "@/components/ui/MetaLabel";
import ProductGlyph from "@/components/atmosphere/ProductGlyph";

export default function ProductCard({ product, index }) {
  const partCode = `NS-${product.slug.toUpperCase().replace(/-/g, "").slice(0, 8)}`;
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block border border-border bg-panel hover-illuminate"
    >
      {/* Glyph + catalog header */}
      <div className="aspect-[4/3] overflow-hidden border-b border-border relative archival-plate">
        <ProductGlyph
          slug={product.slug}
          className="w-full h-full text-text transition-transform duration-700 ease-out group-hover:scale-[1.012]"
        />
        <div className="absolute top-0 left-0 right-0 border-b border-border bg-panel/80 px-3 py-2 flex justify-between items-center">
          <span className="doc-ref">{partCode}</span>
          <div className="flex items-center gap-2">
            <MetaLabel accent>●</MetaLabel>
            <MetaLabel>{product.status}</MetaLabel>
          </div>
        </div>
        {index !== undefined && (
          <div className="absolute bottom-2 left-3">
            <span className="doc-ref">ITEM {String(index).padStart(2, "0")}/{String(index + 6).padStart(2, "0")}</span>
          </div>
        )}
      </div>

      {/* Data section */}
      <div className="border-b border-border px-4 py-2 flex justify-between items-center bg-panel/60">
        <MetaLabel>{product.series}</MetaLabel>
        <MetaLabel>{product.year}</MetaLabel>
      </div>

      <div className="px-4 pt-4 pb-5">
        <h3 className="font-display text-3xl md:text-4xl leading-[0.9] transition-colors duration-400 group-hover:text-accent">
          {product.code}
        </h3>
        <p className="text-xs text-muted mt-1.5 uppercase tracking-widest">{product.name}</p>
        <p className="text-xs text-text/65 mt-4 leading-relaxed">
          {product.tagline}
        </p>
      </div>

      {/* Catalog footer */}
      <div className="border-t border-border px-4 py-2 flex justify-between items-center">
        <span className="doc-ref label-shift">VIEW SYSTEM DATA →</span>
        <span className="doc-ref">REV. A</span>
      </div>
    </Link>
  );
}
