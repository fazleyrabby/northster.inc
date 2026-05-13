"use client";

import { useTemporal } from "@/components/atmosphere/TemporalEngine";
import { networkNodes, futureNetworkNodes } from "@/data/archive";
import MetaLabel from "@/components/ui/MetaLabel";

export default function EraNetworkContent() {
  const { era } = useTemporal();
  const isFuture = era === "future";
  const nodes = isFuture ? futureNetworkNodes : networkNodes;

  return (
    <table className="w-full mt-12 text-left border-collapse">
      <thead>
        <tr className="border-y border-border-soft">
          <th className="meta py-4 pr-6 font-normal">ID</th>
          <th className="meta py-4 pr-6 font-normal">LOCATION</th>
          <th className="meta py-4 pr-6 font-normal">STATUS</th>
          <th className="meta py-4 font-normal text-right">UPTIME</th>
        </tr>
      </thead>
      <tbody>
        {nodes.map((n) => (
          <tr
            key={n.id}
            className="border-b border-border-soft hover:bg-panel/40 transition-colors duration-500"
          >
            <td className="py-6 pr-6 meta">{n.id}</td>
            <td className="py-6 pr-6 text-sm text-text">{n.location}</td>
            <td className="py-6 pr-6">
              <span className={`meta ${n.status === "STABLE" ? "meta-accent" : ""}`}>
                ● {n.status}
              </span>
            </td>
            <td className="py-6 meta text-right">{n.uptime}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
