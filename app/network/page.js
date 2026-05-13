import Container from "@/components/layout/Container";
import EditorialSection from "@/components/sections/EditorialSection";
import MetaLabel from "@/components/ui/MetaLabel";
import Divider from "@/components/ui/Divider";
import CTASection from "@/components/sections/CTASection";
import EraNetworkContent from "@/components/sections/EraNetworkContent";

export const metadata = { title: "Network" };

export default function NetworkPage() {
  return (
    <>
      <section className="border-b border-border-soft">
        <Container size="wide" className="pt-20 pb-16">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex gap-x-10 gap-y-2 flex-wrap">
              {/* Archive era labels */}
              <MetaLabel className="archive-only">★ NORTHSTER / NETWORK</MetaLabel>
              <MetaLabel className="archive-only">NS–MESH V3</MetaLabel>
              {/* Future era labels */}
              <MetaLabel className="future-only">★ NORTHSTER / RELAY MESH</MetaLabel>
              <MetaLabel className="future-only">NS–RELAY V5</MetaLabel>
              <MetaLabel className="future-only">1.2M+ NODES DISTRIBUTED</MetaLabel>
            </div>
            <MetaLabel accent>● MESH STABLE</MetaLabel>
          </div>
          <hr className="rule mt-10" />

          <div className="pt-16 md:pt-24 pb-8 grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Archive heading */}
            <h1 className="archive-only md:col-span-8 font-display text-5xl md:text-6xl lg:text-7xl leading-[0.92]">
              The mesh that has not <span className="italic text-accent">slept</span>.
            </h1>
            {/* Future heading */}
            <h1 className="future-only md:col-span-8 font-display text-5xl md:text-6xl lg:text-7xl leading-[0.92]">
              1.2 million nodes. Not one <span className="italic text-accent">switched off</span>.
            </h1>
            {/* Archive intro */}
            <p className="archive-only md:col-span-4 md:pt-6 text-base text-muted leading-relaxed max-w-md">
              Northster&apos;s analog mesh network was first deployed in 1985.
              The lanterns have not been switched off. The signal has not
              been interrupted.
            </p>
            {/* Future intro */}
            <p className="future-only md:col-span-4 md:pt-6 text-base text-muted leading-relaxed max-w-md">
              The RELAY MESH NODE network succeeded the original 1985 analog mesh.
              1,200,000+ units distributed across six atmospheric layers and four ocean basins.
              240 years of uninterrupted uptime on record.
            </p>
          </div>
        </Container>
      </section>

      <EditorialSection>
        <Divider label="01 — FIELD MAP" />
        <div className="mt-12 border border-border-soft bg-panel/30 aspect-[16/9] relative overflow-hidden">
          <svg viewBox="0 0 800 450" className="absolute inset-0 w-full h-full text-text" preserveAspectRatio="xMidYMid meet">
            <g stroke="currentColor" strokeWidth="0.2" opacity="0.18">
              {Array.from({ length: 16 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="450" />
              ))}
              {Array.from({ length: 9 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} />
              ))}
            </g>
            {[
              [120, 90], [280, 70], [430, 150], [610, 110],
              [200, 280], [380, 320], [560, 280], [690, 380],
            ].map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="18" stroke="currentColor" strokeWidth="0.4" fill="none" opacity="0.5" />
                <circle cx={x} cy={y} r="4" fill="currentColor" />
                <text x={x + 22} y={y - 4} fontFamily="monospace" fontSize="9" fill="currentColor" opacity="0.85">
                  NODE/{String(i + 1).padStart(2, "0")}
                </text>
              </g>
            ))}
            <g stroke="currentColor" strokeWidth="0.5" opacity="0.4" fill="none">
              <path d="M 120 90 L 280 70 L 430 150 L 610 110" />
              <path d="M 200 280 L 380 320 L 560 280 L 690 380" />
              <path d="M 280 70 L 380 320" />
              <path d="M 430 150 L 560 280" />
              <path d="M 610 110 L 690 380" />
            </g>
          </svg>
          <div className="absolute top-4 left-4 flex gap-4">
            <MetaLabel accent>● MESH STABLE</MetaLabel>
            {/* Archive label */}
            <MetaLabel className="archive-only">NS–MESH V3</MetaLabel>
            {/* Future label */}
            <MetaLabel className="future-only">NS–RELAY V5 / PARTIAL VIEW</MetaLabel>
          </div>
          <div className="absolute bottom-4 right-4">
            <MetaLabel className="archive-only">FIELD MAP / NORTHERN PROVINCES</MetaLabel>
            <MetaLabel className="future-only">RELAY MAP / GLOBAL DISTRIBUTION</MetaLabel>
          </div>
        </div>
      </EditorialSection>

      <EditorialSection>
        <Divider label="02 — NODE REGISTER" />
        <EraNetworkContent />
      </EditorialSection>

      <CTASection
        label="TRANSMISSION / 06"
        title="The lanterns remain lit. Listen — the signal is yours."
        cta="RETURN TO INDEX"
        href="/"
      />
    </>
  );
}
