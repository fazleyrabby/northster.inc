import Image from "next/image";
import { products } from "@/data/products";

export default function ProductHeroImage({ slug }) {
  const product = products.find(p => p.slug === slug);
  const imgPath = `/images/products/${slug}/product.png`;
  return (
    <div className="relative w-full h-auto bg-panel overflow-hidden">
      <Image
        src={imgPath}
        alt={`${product?.code} — ${product?.name}`}
        width={1536}
        height={1024}
        className="w-full h-auto object-contain object-center"
        sizes="(max-width: 768px) 100vw, 66vw"
        priority
      />
    </div>
  );
}