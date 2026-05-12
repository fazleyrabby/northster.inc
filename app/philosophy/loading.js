import Container from "@/components/layout/Container";
import EditorialSection from "@/components/sections/EditorialSection";
import Divider from "@/components/ui/Divider";
import Skeleton from "@/components/ui/Skeleton";
import MetaLabel from "@/components/ui/MetaLabel";

export default function Loading() {
  return (
    <>
      <section className="border-b border-border-soft">
        <Container size="wide" className="pt-20 pb-16">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex gap-x-10 gap-y-2 flex-wrap">
              <Skeleton className="w-48 h-3" />
              <Skeleton className="w-32 h-3" />
            </div>
            <Skeleton className="w-40 h-3" />
          </div>
          <hr className="rule mt-10" />
          <div className="pt-20 md:pt-32 pb-12 max-w-5xl space-y-6">
            <Skeleton className="w-48 h-3" />
            <Skeleton className="w-full h-20 md:h-24" />
            <Skeleton className="w-2/3 h-12 md:h-16 opacity-60" />
          </div>
        </Container>
      </section>

      <EditorialSection>
        <Divider label="01 — PRINCIPLES / RECOVERING" />
        <div className="mt-14 border-t border-border-soft">
           {Array.from({ length: 6 }).map((_, i) => (
             <div key={i} className="grid grid-cols-12 gap-6 py-12 border-b border-border-soft">
               <Skeleton className="col-span-2 h-16" />
               <Skeleton className="col-span-6 h-12" />
               <Skeleton className="col-span-4 h-24" />
             </div>
           ))}
        </div>
      </EditorialSection>
    </>
  );
}
