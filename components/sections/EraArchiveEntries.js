"use client";

import { useTemporal } from "@/components/atmosphere/TemporalEngine";
import { archiveEntries, futureArchiveEntries } from "@/data/archive";
import ArchiveItem from "@/components/sections/ArchiveItem";

export default function EraArchiveEntries() {
  const { era } = useTemporal();
  const entries = era === "future" ? futureArchiveEntries : archiveEntries;
  return (
    <>
      {entries.map((e) => (
        <ArchiveItem key={e.id} entry={e} />
      ))}
    </>
  );
}
