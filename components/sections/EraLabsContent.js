"use client";

import { useTemporal } from "@/components/atmosphere/TemporalEngine";
import { labsProjects, futureLabsProjects } from "@/data/archive";
import MetaLabel from "@/components/ui/MetaLabel";

export default function EraLabsContent() {
  const { era } = useTemporal();
  const isFuture = era === "future";
  const projects = isFuture ? futureLabsProjects : labsProjects;

  return (
    <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((p) => (
        <article
          key={p.code}
          className="group border border-border-soft hover:border-accent/50 transition-colors duration-500 bg-panel/40 p-8 md:p-10"
        >
          <div className="flex justify-between items-center">
            <MetaLabel>{p.code}</MetaLabel>
            <MetaLabel accent>● {p.state}</MetaLabel>
          </div>
          <h3 className="font-display text-3xl md:text-5xl mt-6 leading-tight group-hover:text-accent transition-colors duration-500">
            {p.title}
          </h3>
          <p className="mt-6 text-sm md:text-base text-muted leading-relaxed">
            {p.body}
          </p>
          <div className="mt-10 pt-6 border-t border-border-soft flex justify-between">
            <MetaLabel>{isFuture ? "NS / CONTINUUM" : "NS / LAB"}</MetaLabel>
            <MetaLabel className="link-amber cursor-pointer">VIEW PROGRAMME →</MetaLabel>
          </div>
        </article>
      ))}
    </div>
  );
}
