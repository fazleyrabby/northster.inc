"use client";

import { useTemporal } from "@/components/atmosphere/TemporalEngine";
import { archiveTimeline, futureTimeline } from "@/data/timeline";
import TimelineBlock from "@/components/sections/TimelineBlock";

export default function EraTimelineBlock({ limit }) {
  const { era } = useTemporal();
  const list = era === "future" ? futureTimeline : archiveTimeline;
  const entries = limit ? list.slice(0, limit) : list;
  return <TimelineBlock entries={entries} />;
}
