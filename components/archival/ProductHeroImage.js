"use client";

import { useState } from "react";
import Image from "next/image";
import { products } from "@/data/products";
import Skeleton from "@/components/ui/Skeleton";

export default function ProductHeroImage({ slug }) {
  const [loaded, setLoaded] = useState(false);
  const product = products.find((p) => p.slug === slug);
  const imgPath = product?.image ?? `/images/products/${slug}/product.png`;

  return (
    <div className="relative w-full aspect-[3/2] bg-panel overflow-hidden archival-plate">
      {!loaded && (
        <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end gap-4">
          <Skeleton className="w-48 h-4" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-2/3 h-8" />
        </div>
      )}
      <Image
        src={imgPath}
        alt={`${product?.code} — ${product?.name}`}
        width={1536}
        height={1024}
        className={`w-full h-full object-contain object-center transition-opacity duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        sizes="(max-width: 768px) 100vw, 66vw"
        priority
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}