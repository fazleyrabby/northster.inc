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
              <Skeleton className="w-32 h-3" />
            </div>
            <Skeleton className="w-40 h-3" />
          </div>
          <hr className="rule mt-10" />
          <div className="pt-16 md:pt-24 pb-8 grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-9 space-y-4">
               <Skeleton className="w-full h-16 md:h-20" />
            </div>
            <div className="md:col-span-3 space-y-3">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-2/3 h-4" />
            </div>
          </div>
        </Container>
      </section>

      <EditorialSection>
        <Divider label="01 — PROGRAMMES / RECOVERING" />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
           {Array.from({ length: 4 }).map((_, i) => (
             <div key={i} className="border border-border p-8 md:p-10 space-y-6">
               <div className="flex justify-between">
                 <Skeleton className="w-24 h-4" />
                 <Skeleton className="w-24 h-4" />
               </div>
               <Skeleton className="w-3/4 h-12" />
               <Skeleton className="w-full h-24" />
               <div className="pt-6 border-t border-border flex justify-between">
                 <Skeleton className="w-20 h-3" />
                 <Skeleton className="w-32 h-3" />
               </div>
             </div>
           ))}
        </div>
      </EditorialSection>
    </>
  );
}
