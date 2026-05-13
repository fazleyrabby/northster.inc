"use client";

import { useTemporal } from "./TemporalEngine";

export default function TemporalTransition() {
  const { isTransitioning, transitionDirection } = useTemporal();

  if (!isTransitioning) return null;

  const yearLabel = transitionDirection === "to-future" ? "2225" : "1981";

  return (
    <div className="temporal-overlay" aria-hidden="true" role="presentation">
      <div className="temporal-bg" />
      <div className="temporal-convergence" />
      <div className="temporal-lines" />
      <div className="temporal-flash" />
      <div className="temporal-label">
        <span>{yearLabel}</span>
      </div>
    </div>
  );
}
