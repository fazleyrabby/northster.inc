import Container from "@/components/layout/Container";
import EditorialSection from "@/components/sections/EditorialSection";
import MetaLabel from "@/components/ui/MetaLabel";
import Divider from "@/components/ui/Divider";
import CTASection from "@/components/sections/CTASection";

export const metadata = { title: "Philosophy — NORTHSTER INC." };

const PRINCIPLES = [
  {
    n: "01",
    title: "The interface should disappear.",
    body: "A tool that draws attention to itself interrupts the work it is meant to support. We design machines that recede.",
  },
  {
    n: "02",
    title: "Stability before speed.",
    body: "Speed is a property of the moment. Stability is a property of the decade. We design for the decade.",
  },
  {
    n: "03",
    title: "Monochrome by intention.",
    body: "Colour can be a form of distraction. Withholding it produces a different — and often deeper — kind of attention.",
  },
  {
    n: "04",
    title: "Quiet engineering.",
    body: "The most considered work tends to make the least noise. Northster systems are built to be heard rarely, if at all.",
  },
  {
    n: "05",
    title: "Long service over novelty.",
    body: "A system that operates for thirty years has earned a kind of trust that no new release can replicate.",
  },
  {
    n: "06",
    title: "Archive everything.",
    body: "The record is part of the work. We document so that those who arrive later can understand what was built — and why.",
  },
];

export default function PhilosophyPage() {
  return (
    <>
      <section className="border-b border-border-soft">
        <Container size="wide" className="pt-20 pb-16">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex gap-x-10 gap-y-2 flex-wrap">
              <MetaLabel>★ NORTHSTER / PHILOSOPHY</MetaLabel>
              <MetaLabel>SIX PRINCIPLES</MetaLabel>
              <MetaLabel>ARCHIVE NS-PHL-01</MetaLabel>
            </div>
            <MetaLabel accent>● UNCHANGED SINCE 1978</MetaLabel>
          </div>
          <hr className="rule mt-10" />

          <div className="pt-20 md:pt-32 pb-12 max-w-5xl">
            <p className="meta">NS-PHL-01 / 1978 — PRESENT</p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.92] mt-6">
              Computing without <span className="italic text-accent">distraction</span>.
            </h1>
            <p className="mt-14 max-w-2xl text-lg md:text-xl text-text/85 leading-relaxed">
              The philosophy below has been preserved without revision since
              the founding of the cooperative. It is short, deliberately. Each
              principle is intended to be considered slowly.
            </p>
          </div>
        </Container>
      </section>

      <EditorialSection>
        <Divider label="01 — PRINCIPLES" />
        <ol className="mt-14 border-t border-border-soft">
          {PRINCIPLES.map((p) => (
            <li
              key={p.n}
              className="group grid grid-cols-12 gap-6 py-12 md:py-16 border-b border-border-soft hover:bg-panel/40 transition-colors duration-500"
            >
              <div className="col-span-12 md:col-span-2">
                <span className="font-display text-5xl md:text-6xl text-muted group-hover:text-accent transition-colors duration-500">
                  {p.n}
                </span>
              </div>
              <div className="col-span-12 md:col-span-6">
                <h3 className="font-display text-3xl md:text-5xl leading-tight">
                  {p.title}
                </h3>
              </div>
              <div className="col-span-12 md:col-span-4">
                <p className="text-sm md:text-base text-muted leading-relaxed">
                  {p.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </EditorialSection>

      <CTASection
        label="TRANSMISSION / 01"
        title="The record is open. The signal is stable. The work continues."
        cta="ENTER THE ARCHIVE"
        href="/archive"
      />
    </>
  );
}
