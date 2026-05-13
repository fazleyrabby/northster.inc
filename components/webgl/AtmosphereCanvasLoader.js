"use client";

import dynamic from "next/dynamic";

// Client Component wrapper — dynamic with ssr:false is only valid inside "use client"
const AtmosphereCanvas = dynamic(
  () => import("./AtmosphereCanvas"),
  { ssr: false }
);

export default function AtmosphereCanvasLoader() {
  return <AtmosphereCanvas />;
}
