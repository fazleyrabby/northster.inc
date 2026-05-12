import Container from "@/components/layout/Container";
import MetaLabel from "@/components/ui/MetaLabel";

export default function Loading() {
  return (
    <Container size="wide" className="min-h-[70vh] flex flex-col justify-center">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="meta meta-accent signal-pulse">●</span>
          <MetaLabel>ESTABLISHING SIGNAL...</MetaLabel>
        </div>
        <div className="space-y-4">
          <div className="h-12 md:h-16 w-full md:w-3/4 bg-elevated animate-pulse" />
          <div className="h-12 md:h-16 w-full md:w-1/2 bg-elevated animate-pulse opacity-50" />
        </div>
        <div className="mt-10 flex gap-10">
          <div className="h-4 w-32 bg-elevated animate-pulse" />
          <div className="h-4 w-32 bg-elevated animate-pulse" />
          <div className="h-4 w-32 bg-elevated animate-pulse" />
        </div>
      </div>
    </Container>
  );
}
