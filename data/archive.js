export const archiveEntries = [
  {
    id: "NS-ARC-0012",
    date: "1979.09.15",
    division: "INFRASTRUCTURE",
    title: "Founding Memorandum: The Quiet Cooperative",
    excerpt:
      "We do not build for the market. We build for the environment. The northern signal is a constant, and our machines must become part of that constant.",
    category: "INTERNAL MEMO",
  },
  {
    id: "NS-ARC-0041",
    date: "1981.04.12",
    division: "AXIS LAB",
    title: "On the discipline of monochrome interfaces",
    excerpt:
      "Colour was deliberately withheld. The team observed that, in its absence, users formed deeper relationships with the structure of the interface itself.",
    category: "FIELD NOTE",
  },
  {
    id: "NS-ARC-0089",
    date: "1983.11.02",
    division: "EDITORIAL",
    title: "Notes on the MONO/3 typeface programme",
    excerpt:
      "Three years of internal trials produced a single serif. It was not designed to be beautiful — it was designed to disappear into prolonged reading.",
    category: "ENGINEERING LOG",
  },
  {
    id: "NS-ARC-0142",
    date: "1985.06.27",
    division: "INFRASTRUCTURE",
    title: "Mesh stability across continuous winter",
    excerpt:
      "The northern relay chain held without intervention through eleven months of darkness. The amber lamp on each unit became, for the field crews, a kind of companion.",
    category: "FIELD NOTE",
  },
  {
    id: "NS-ARC-0156",
    date: "1986.12.04",
    division: "AXIS LAB",
    title: "Tungsten filament thermal stability report",
    excerpt:
      "The shift to tungsten allows for a cleaner, more mechanical light. It lacks the jitter of early phosphor, lending a stillness to the documentation.",
    category: "TECHNICAL BULLETIN",
  },
  {
    id: "NS-ARC-0211",
    date: "1989.02.19",
    division: "HORIZON",
    title: "Distributed compute and the discipline of waiting",
    excerpt:
      "The Horizon cluster was designed to operate at the speed of its environment, not the speed of its operators. This was, internally, a contested decision.",
    category: "INTERNAL MEMO",
  },
  {
    id: "NS-ARC-0298",
    date: "1992.10.08",
    division: "ORBITAL",
    title: "Continuous capture: first six months",
    excerpt:
      "The recordings show patterns that were not expected. Further details are held within Archive Division 04 and are not yet cleared for circulation.",
    category: "RESTRICTED",
  },
  {
    id: "NS-ARC-0301",
    date: "1994.05.22",
    division: "ORBITAL",
    title: "Signal Anomaly [REDACTED]",
    excerpt:
      "The source is not atmospheric. It is originating from within the northern ice shelf. Revision IV protocols are now in effect for all subsequent logs.",
    category: "RESTRICTED",
  },
  {
    id: "NS-ARC-0356",
    date: "1998.01.30",
    division: "ARCHIVE",
    title: "On closing the manufacturing record",
    excerpt:
      "The decision to seal the manufacturing archive was not a closure. It was an acknowledgement that the work, as built, was complete.",
    category: "INTERNAL MEMO",
  },
];

export const labsProjects = [
  {
    code: "LAB/01",
    title: "Atmospheric Signal Capture",
    state: "ONGOING",
    body: "Long-duration passive recording of atmospheric phenomena across multiple frequency bands. Output rendered as monochrome waterfall prints.",
  },
  {
    code: "LAB/02",
    title: "Mechanical Memory Systems",
    state: "PROTOTYPE",
    body: "Research into long-stable storage media operating without semiconductor dependency. Intended for environments where electronic memory is unreliable.",
  },
  {
    code: "LAB/03",
    title: "Vector Cartography",
    state: "ARCHIVE",
    body: "Pen-plotted cartographic systems used by the Northster mapping division through the late 1980s. Now preserved in field operation only.",
  },
  {
    code: "LAB/04",
    title: "Quiet Compute",
    state: "ONGOING",
    body: "An investigation into fanless, passive-cooled workstation design for environments requiring acoustic stillness.",
  },
  {
    code: "LAB/05",
    title: "Neural Linkage (Phase I)",
    state: "RESTRICTED",
    body: "Field trials for low-latency machine interfacing. Results remain classified within the Northern research facilities.",
  },
  {
    code: "LAB/06",
    title: "Vellum Stability Research",
    state: "ONGOING",
    body: "Investigating the long-term archival properties of various paper stocks when exposed to constant tungsten illumination.",
  },
];

export const networkNodes = [
  { id: "NODE/01", location: "NORTHERN PROVINCE — STATION KARLA", status: "STABLE", uptime: "11Y 04M" },
  { id: "NODE/02", location: "POLARIS RESEARCH — STATION HALDOR", status: "STABLE", uptime: "09Y 11M" },
  { id: "NODE/03", location: "COASTAL RELAY — STATION VARN", status: "DEGRADED", uptime: "06Y 02M" },
  { id: "NODE/04", location: "INLAND ARCHIVE — STATION OLM", status: "STABLE", uptime: "14Y 07M" },
  { id: "NODE/05", location: "ATMOSPHERIC ARRAY — STATION TYRA", status: "STABLE", uptime: "08Y 09M" },
  { id: "NODE/06", location: "EDITORIAL LINK — STATION HEIM", status: "STABLE", uptime: "12Y 00M" },
];
