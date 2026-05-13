"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Reveals children on scroll with a restrained upward fade.
// Use on editorial sections, product cards, archive blocks.
// Never use in archive documents — that layout is scroll-free.
export default function ScrollReveal({
  children,
  delay = 0,
  y = 14,
  className,
  once = true,
}) {
  const ref = useRef();

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay,
        ease: "power2.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once,
        },
      }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
