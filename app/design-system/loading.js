import Container from "@/components/layout/Container";
import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <section className="border-b border-border-soft">
      <Container size="wide" className="pt-20 pb-16">
        <div className="flex flex-wrap justify-between gap-4">
          <Skeleton className="w-64 h-3" />
          <Skeleton className="w-32 h-3" />
        </div>
        <hr className="rule mt-10" />
        <div className="pt-16 md:pt-24 pb-8 grid grid-cols-1 md:grid-cols-12 gap-10">
          <Skeleton className="md:col-span-9 h-20 md:h-24" />
          <Skeleton className="md:col-span-3 h-16 mt-6" />
        </div>
      </Container>
    </section>
  );
}
