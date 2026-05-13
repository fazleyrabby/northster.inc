"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const ref = useRef();

  useGSAP(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", clearProps: "transform,opacity" }
    );
  }, { dependencies: [pathname], scope: ref });

  return (
    <div ref={ref}>
      {children}
    </div>
  );
}
