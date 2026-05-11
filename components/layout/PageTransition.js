"use client";

import { usePathname } from "next/navigation";

/* Page-change transition.
   Phosphor-style emergence on every route — a brief luminance flare
   then settle. The `key` forces React to remount the wrapper on
   pathname change so the CSS animation re-fires.
   Reads as a CRT switching channels: a moment of unstable signal,
   then stabilized image. */
export default function PageTransition({ children }) {
  const pathname = usePathname();
  return (
    <div
      key={pathname}
      style={{
        animation: "page-emerge 0.55s cubic-bezier(0.2, 0.7, 0.2, 1) both",
      }}
    >
      {children}
    </div>
  );
}
