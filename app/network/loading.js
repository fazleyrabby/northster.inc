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
            <Skeleton className="w-32 h-3" />
          </div>
          <hr className="rule mt-10" />

          <div className="pt-16 md:pt-24 pb-8 grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-8 space-y-4">
               <Skeleton className="w-full h-16 md:h-20" />
            </div>
            <div className="md:col-span-4 space-y-3">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-2/3 h-4" />
            </div>
          </div>
        </Container>
      </section>

      <EditorialSection>
        <Divider label="01 — FIELD MAP / SCANNING" />
        <div className="mt-12 border border-border-soft bg-panel/30 aspect-[16/9] relative overflow-hidden flex items-center justify-center p-20">
          <Skeleton className="w-full h-full" />
        </div>
      </EditorialSection>

      <EditorialSection>
        <Divider label="02 — NODE REGISTER / RECOVERING" />
        <div className="mt-12 space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="grid grid-cols-4 gap-4 py-6 border-b border-border-soft">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24 ml-auto" />
            </div>
          ))}
        </div>
      </EditorialSection>
    </>
  );
}
