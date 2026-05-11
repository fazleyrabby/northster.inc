import Container from "@/components/layout/Container";
import MetaLabel from "@/components/ui/MetaLabel";
import Button from "@/components/ui/Button";
import ProductGlyph from "@/components/atmosphere/ProductGlyph";
import Divider from "@/components/ui/Divider";

export default function FeaturedProduct({ product }) {
  return (
    <section className="border-b border-border-soft">
      <Container size="wide" className="py-16 md:py-20">

        <Divider
          label={`01 — FEATURED SYSTEM / ${product.code}`}
          meta={`NS-CAT-001 / ${product.year}`}
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Glyph panel */}
          <div className="lg:col-span-7 border border-border bg-panel relative">
            <ProductGlyph slug={product.slug} className="w-full h-auto text-text" />
            {/* Catalog overlay strip */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-panel/80 px-5 py-3 flex justify-between items-center">
              <span className="doc-ref">{product.code} — UNIT REFERENCE RENDER</span>
              <span className="doc-ref">DIV. 04 / MANUFACTURING RECORD</span>
            </div>
          </div>

          {/* Specification column */}
          <div className="lg:col-span-5">

            {/* Classification header */}
            <div className="border border-border bg-panel/40 px-5 py-4 flex justify-between items-start gap-4 mb-5">
              <div>
                <MetaLabel>{product.series}</MetaLabel>
                <div className="mt-1 flex gap-4">
                  <MetaLabel>{product.year}</MetaLabel>
                  <MetaLabel accent>● {product.status}</MetaLabel>
                </div>
              </div>
              <div className="text-right">
                <span className="doc-ref">PART: NS-{product.slug.toUpperCase().replace(/-/g, "")}</span>
                <br />
                <span className="doc-ref">REV. A</span>
              </div>
            </div>

            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.88]">
              {product.code}
            </h2>
            <p className="font-display text-xl text-muted mt-2 italic leading-tight">
              {product.name}
            </p>

            <p className="text-sm text-text/75 mt-8 leading-relaxed border-l border-border pl-5">
              {product.summary}
            </p>

            {/* Specification table */}
            <div className="mt-8 border border-border">
              <div className="border-b border-border px-4 py-2 bg-panel/60">
                <MetaLabel>TECHNICAL SPECIFICATION — PARTIAL</MetaLabel>
              </div>
              <dl className="grid grid-cols-2">
                {product.spec.slice(0, 4).map((row, i) => (
                  <div
                    key={row.label}
                    className={`px-4 py-3 flex flex-col gap-1 border-border ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b" : ""}`}
                  >
                    <MetaLabel>{row.label}</MetaLabel>
                    <span className="text-xs text-text font-mono">{row.value}</span>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <Button href={`/products/${product.slug}`}>VIEW SYSTEM</Button>
              <span className="doc-ref">CATALOGUE: NS-CAT-001</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
