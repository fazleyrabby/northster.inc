import Container from "@/components/layout/Container";
import EditorialSection from "@/components/sections/EditorialSection";
import Divider from "@/components/ui/Divider";
import Skeleton from "@/components/ui/Skeleton";
import MetaLabel from "@/components/ui/MetaLabel";

export default function Loading() {
  return (
    <>
      <div className="border-b border-border bg-panel-2">
        <Container size="wide">
          <div className="py-2 flex justify-between">
            <Skeleton className="w-64 h-3" />
            <Skeleton className="w-32 h-3" />
          </div>
        </Container>
      </div>

      <section className="border-b border-border">
        <Container size="wide" className="pt-14 pb-0">
          <div className="flex justify-between">
            <Skeleton className="w-48 h-4" />
            <Skeleton className="w-32 h-4" />
          </div>
          <hr className="rule mt-6" />

          <div className="pt-14 pb-16 grid grid-cols-12 gap-0">
            <div className="col-span-12 md:col-span-9 space-y-4">
              <Skeleton className="w-64 h-3" />
              <Skeleton className="w-full md:w-3/4 h-16" />
            </div>
          </div>

          <div className="border border-border">
            <div className="border-b border-border bg-panel-2 px-5 py-2 grid grid-cols-12 gap-4">
               {Array.from({ length: 6 }).map((_, i) => (
                 <Skeleton key={i} className="col-span-2 h-3" />
               ))}
            </div>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="grid grid-cols-12 gap-4 border-b border-border p-5">
                <Skeleton className="col-span-1 h-3" />
                <Skeleton className="col-span-11 h-3" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <EditorialSection>
        <Divider label="01 — SYSTEMS / LOADING" />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border border-border bg-panel p-5 space-y-6">
              <Skeleton className="aspect-[4/3] w-full" />
              <div className="space-y-3">
                <Skeleton className="w-3/4 h-8" />
                <Skeleton className="w-1/2 h-4" />
              </div>
              <Skeleton className="w-full h-12" />
            </div>
          ))}
        </div>
      </EditorialSection>
    </>
  );
}
