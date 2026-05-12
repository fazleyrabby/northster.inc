import Container from "@/components/layout/Container";
import Skeleton from "@/components/ui/Skeleton";
import Divider from "@/components/ui/Divider";

export default function Loading() {
  return (
    <>
      <div className="border-b border-border bg-panel-2">
        <Container size="wide">
          <div className="py-2 flex justify-between">
            <Skeleton className="w-48 h-3" />
            <Skeleton className="w-64 h-3" />
          </div>
        </Container>
      </div>

      <section className="border-b border-border">
        <Container size="wide">
          <div className="pt-14 pb-16 grid grid-cols-12 gap-0">
            <div className="col-span-12 md:col-span-9 space-y-4">
              <Skeleton className="w-64 h-3" />
              <Skeleton className="w-full md:w-3/4 h-20 md:h-24" />
              <Skeleton className="w-1/2 h-8" />
            </div>
            <div className="col-span-12 md:col-span-3 md:pt-8">
              <Skeleton className="w-full h-32" />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border">
        <Container size="wide" className="py-0">
          <div className="border-b border-border bg-panel-2 px-5 py-2 flex justify-between">
            <Skeleton className="w-64 h-3" />
            <Skeleton className="w-32 h-3" />
          </div>
          <div className="bg-panel aspect-[3/2] flex items-center justify-center p-20">
            <Skeleton className="w-full h-full" />
          </div>
        </Container>
      </section>

      <section className="border-b border-border">
        <Container size="wide" className="py-12 md:py-16">
          <Divider label="ENGINEERING DOCUMENTATION / LOADING" />
          <div className="mt-8 grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-5">
              <Skeleton className="h-96 w-full" />
            </div>
            <div className="col-span-12 md:col-span-4">
              <Skeleton className="h-96 w-full" />
            </div>
            <div className="col-span-12 md:col-span-3">
              <Skeleton className="h-96 w-full" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
