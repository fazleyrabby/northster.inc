import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import MetaLabel from "@/components/ui/MetaLabel";
import Divider from "@/components/ui/Divider";

export default function CTASection({
  label = "TRANSMISSION / 04",
  docRef = "NS-TRANS-04 / BROADCAST",
  title = "Listen to a signal that has been broadcasting for forty years.",
  cta = "ENTER THE ARCHIVE",
  href = "/archive",
}) {
  return (
    <section className="border-b border-border-soft">

      {/* Transmission log header */}
      <div className="border-b border-border bg-panel/40">
        <Container size="wide">
          <div className="py-3 flex flex-wrap justify-between items-center gap-3">
            <div className="flex items-center gap-3">
              <MetaLabel accent>●</MetaLabel>
              <MetaLabel>{label}</MetaLabel>
            </div>
            <span className="doc-ref">{docRef}</span>
          </div>
        </Container>
      </div>

      <Container size="wide" className="py-20 md:py-28">
        <Divider label="SIGNAL LOG — OPEN TRANSMISSION" meta="STATUS: BROADCASTING" />

        <div className="mt-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.92]">
              {title}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:flex md:flex-col md:justify-end">
            <div className="border-l border-border pl-6 space-y-4">
              <Button href={href}>{cta}</Button>
              <div className="space-y-1">
                <span className="doc-ref block">CH. 04 / NORTHSTER MESH V3</span>
                <span className="doc-ref block">ACTIVE SINCE: 1985.06.27</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
