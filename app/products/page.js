import CTASection from "@/components/sections/CTASection";
import EraProductGrid from "@/components/sections/EraProductGrid";

export const metadata = {
  title: "Products — NORTHSTER INC.",
};

export default function ProductsPage() {
  return (
    <>
      <EraProductGrid />

      <CTASection
        label="TRANSMISSION / 04"
        docRef="NS-TRANS-04 / RESTRICTED"
        title="Several systems remain partially classified. Listen carefully."
        cta="ENTER LABS"
        href="/labs"
      />
    </>
  );
}
